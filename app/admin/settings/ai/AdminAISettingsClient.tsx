"use client";

import { useState } from "react";
import { updateAISettings } from "@/actions/ai-settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Loader2, Sparkles, AlertCircle } from "lucide-react";

export function AdminAISettingsClient({ settings }: { settings: any }) {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setMessage(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await updateAISettings(formData);
    
    if (result?.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: "AI Settings updated successfully." });
    }
    setIsPending(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 max-w-4xl bg-card p-6 rounded-2xl border border-border shadow-sm">
      
      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 ${message.type === "error" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
          {message.type === "error" ? <AlertCircle className="w-5 h-5" /> : <Check className="w-5 h-5" />}
          <p className="font-medium">{message.text}</p>
        </div>
      )}

      {/* Provider & Model */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-heading">Core Engine</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Provider</label>
            <select 
              name="provider" 
              defaultValue={settings.provider}
              className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-1 focus:ring-ring"
            >
              <option value="openai">OpenAI</option>
              <option value="anthropic">Anthropic (Claude)</option>
              <option value="gemini">Google Gemini</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">API Key</label>
            <Input 
              type="password" 
              name="apiKey" 
              placeholder={settings.apiKey ? "•••••••••••••••• (Set)" : "Enter new API key"} 
            />
            <p className="text-xs text-muted-foreground">Leave blank to keep current key. Keys are never exposed to the client.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Model Name</label>
            <Input type="text" name="modelName" defaultValue={settings.modelName} placeholder="gpt-4o, claude-3-5-sonnet-20240620..." />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium flex justify-between">
              Temperature <span className="text-muted-foreground">{settings.temperature}</span>
            </label>
            <input 
              type="range" 
              name="temperature" 
              min="0" max="2" step="0.1" 
              defaultValue={settings.temperature}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Max Tokens</label>
            <Input type="number" name="maxTokens" defaultValue={settings.maxTokens} />
          </div>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="space-y-6 pt-6">
        <h2 className="text-xl font-heading border-b border-border pb-2">Feature Toggles</h2>
        
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 border border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
            <div>
              <p className="font-medium">AI Chat Assistant</p>
              <p className="text-sm text-muted-foreground">Enable the floating AI assistant for customers.</p>
            </div>
            <input type="checkbox" name="enableChat" defaultChecked={settings.enableChat} className="w-5 h-5 text-primary rounded focus:ring-primary" />
          </label>

          <label className="flex items-center justify-between p-4 border border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
            <div>
              <p className="font-medium">Visual Search</p>
              <p className="text-sm text-muted-foreground">Allow users to search catalog via image upload.</p>
            </div>
            <input type="checkbox" name="enableVisual" defaultChecked={settings.enableVisual} className="w-5 h-5 text-primary rounded focus:ring-primary" />
          </label>

          <label className="flex items-center justify-between p-4 border border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
            <div>
              <p className="font-medium">AI Recommendations</p>
              <p className="text-sm text-muted-foreground">Context-aware product suggestions.</p>
            </div>
            <input type="checkbox" name="enableRecommend" defaultChecked={settings.enableRecommend} className="w-5 h-5 text-primary rounded focus:ring-primary" />
          </label>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" disabled={isPending} className="px-8">
          {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Save Configuration
        </Button>
      </div>
    </form>
  );
}
