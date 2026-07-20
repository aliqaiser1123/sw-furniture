import { generateText, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { db } from "@/lib/db";

// Minimal message shape compatible with streamText and @ai-sdk/react
type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

// Fallback stub for when no provider or key is set
const getMockProvider = () => {
  return {
    async chatStream(_messages: ChatMessage[], _systemPrompt?: string) {
      // Simulate a streamed response using standard ReadableStream
      const encoder = new TextEncoder();
      const mockResponse =
        "This is a mock AI response. Please configure an API key in the admin settings to enable live generation.";
      const chunks = mockResponse.split(" ");

      const stream = new ReadableStream({
        async start(controller) {
          for (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk + " "));
            await new Promise((resolve) => setTimeout(resolve, 50));
          }
          controller.close();
        },
      });
      return new Response(stream, { headers: { "Content-Type": "text/plain" } });
    },
    async generate(prompt: string) {
      return "Mock generated text from " + prompt;
    },
  };
};

export async function getAIProvider() {
  const settings = await db.aISettings.findUnique({ where: { id: "singleton" } });

  if (!settings || !settings.apiKey) {
    return getMockProvider();
  }

  let model;

  switch (settings.provider) {
    case "openai": {
      const openai = createOpenAI({ apiKey: settings.apiKey });
      model = openai(settings.modelName || "gpt-4o");
      break;
    }
    case "anthropic": {
      const anthropic = createAnthropic({ apiKey: settings.apiKey });
      model = anthropic(settings.modelName || "claude-3-5-sonnet-20240620");
      break;
    }
    case "gemini": {
      const google = createGoogleGenerativeAI({ apiKey: settings.apiKey });
      model = google(settings.modelName || "gemini-1.5-pro");
      break;
    }
    default:
      return getMockProvider();
  }

  return {
    async chatStream(messages: ChatMessage[], systemPrompt?: string) {
      const result = await streamText({
        model,
        messages,
        system: systemPrompt,
        temperature: settings.temperature ?? undefined,
      });
      return result.toTextStreamResponse();
    },
    async generate(prompt: string) {
      const { text } = await generateText({
        model,
        prompt,
        temperature: settings.temperature ?? undefined,
      });
      return text;
    },
  };
}
