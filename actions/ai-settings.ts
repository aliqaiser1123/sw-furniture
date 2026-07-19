"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateAISettings(formData: FormData) {
  try {
    const provider = formData.get("provider") as string;
    const apiKey = formData.get("apiKey") as string;
    const modelName = formData.get("modelName") as string;
    const temperature = parseFloat(formData.get("temperature") as string);
    const maxTokens = parseInt(formData.get("maxTokens") as string, 10);
    
    const enableChat = formData.get("enableChat") === "on";
    const enableVisual = formData.get("enableVisual") === "on";
    const enableRecommend = formData.get("enableRecommend") === "on";

    const updateData: any = {
      provider,
      modelName,
      temperature: isNaN(temperature) ? 0.7 : temperature,
      maxTokens: isNaN(maxTokens) ? 1000 : maxTokens,
      enableChat,
      enableVisual,
      enableRecommend,
    };

    // Only update apiKey if a new one was provided (don't overwrite with empty string if they leave it blank to keep existing)
    if (apiKey && apiKey.trim() !== "") {
      updateData.apiKey = apiKey.trim();
    }

    await db.aISettings.update({
      where: { id: "singleton" },
      data: updateData,
    });

    revalidatePath("/admin/settings/ai");
    return { success: true };
  } catch (error: any) {
    console.error("[Update AI Settings Error]", error);
    return { error: error.message || "Failed to update AI settings" };
  }
}
