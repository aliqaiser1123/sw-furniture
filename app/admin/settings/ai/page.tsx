import { db } from "@/lib/db";
import { AdminAISettingsClient } from "./AdminAISettingsClient";

export default async function AdminAISettingsPage() {
  let settings = await db.aISettings.findUnique({ where: { id: "singleton" } });
  
  if (!settings) {
    settings = await db.aISettings.create({
      data: { id: "singleton" }
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading tracking-tight">AI Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure the AI provider, manage API keys safely, and toggle intelligent shopping features across the storefront.
        </p>
      </div>

      <AdminAISettingsClient settings={settings} />
    </div>
  );
}
