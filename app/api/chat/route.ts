import { NextResponse } from "next/server";
import { streamText, convertToModelMessages } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { db } from "@/lib/db";

const SYSTEM_PROMPT = `You are the Shesham Wood Furniture AI Shopping Assistant. 
You help customers discover, compare, and learn about our handcrafted Sheesham wood furniture.
Be polite, concise, and helpful. Focus on the quality of Sheesham (Indian Rosewood) and our artisan heritage.
If you don't know the answer, recommend they contact support or check the FAQs.`;

export async function POST(req: Request) {
  try {
    const settings = await db.aISettings.findUnique({ where: { id: "singleton" } });
    if (settings && !settings.enableChat) {
      return NextResponse.json({ error: "AI Chat is currently disabled." }, { status: 403 });
    }

    const body = await req.json();
    const messages = body.messages ?? [];

    if (!settings || !settings.apiKey) {
      // Return a mock streaming response
      const encoder = new TextEncoder();
      const mockResponse =
        "Hello! I'm the Shesham Wood Furniture assistant. To enable live AI responses, please configure an API key in the Admin Settings → AI Configuration panel.";
      const stream = new ReadableStream({
        async start(controller) {
          const words = mockResponse.split(" ");
          for (const word of words) {
            controller.enqueue(encoder.encode(`0:"${word} "\n`));
            await new Promise((r) => setTimeout(r, 30));
          }
          controller.enqueue(encoder.encode('d:{"finishReason":"stop"}\n'));
          controller.close();
        },
      });
      return new Response(stream, {
        headers: { "Content-Type": "text/event-stream", "X-Vercel-AI-Data-Stream": "v1" },
      });
    }

    let model;
    switch (settings.provider) {
      case "openai": {
        const openai = createOpenAI({ apiKey: settings.apiKey });
        model = openai(settings.modelName || "gpt-4o-mini");
        break;
      }
      case "anthropic": {
        const anthropic = createAnthropic({ apiKey: settings.apiKey });
        model = anthropic(settings.modelName || "claude-3-5-haiku-20241022");
        break;
      }
      case "gemini": {
        const google = createGoogleGenerativeAI({ apiKey: settings.apiKey });
        model = google(settings.modelName || "gemini-1.5-flash");
        break;
      }
      default:
        return NextResponse.json({ error: "Unsupported AI provider." }, { status: 400 });
    }

    const result = await streamText({
      model,
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      temperature: settings.temperature ?? 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("[AI Chat Route Error]", error);
    return NextResponse.json({ error: "Failed to process chat request." }, { status: 500 });
  }
}
