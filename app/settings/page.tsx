"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { PROVIDER_MODELS, DEFAULT_MODELS } from "@/lib/llm/config";
import type { LLMProvider } from "@/lib/types";

export default function SettingsPage() {
  const [provider, setProvider] = useState<LLMProvider>("openai");
  const [model, setModel] = useState(DEFAULT_MODELS.openai);

  return (
    <AppShell>
      <ScrollArea className="h-full">
        <div className="mx-auto max-w-3xl space-y-6 p-6">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Configure your AI executive team</p>
          </div>

          <Tabs defaultValue="llm">
            <TabsList>
              <TabsTrigger value="llm">AI Models</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="memory">Memory</TabsTrigger>
            </TabsList>

            <TabsContent value="llm" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>LLM Provider</CardTitle>
                  <CardDescription>Choose your AI model provider. API keys are set via environment variables.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    {(["openai", "anthropic", "gemini", "deepseek", "ollama"] as LLMProvider[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          setProvider(p);
                          setModel(DEFAULT_MODELS[p]);
                        }}
                        className={`flex items-center justify-between rounded-lg border p-4 text-left transition-colors ${
                          provider === p ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                        }`}
                      >
                        <div>
                          <p className="font-medium capitalize">{p === "ollama" ? "Ollama (Local)" : p}</p>
                          <p className="text-xs text-muted-foreground">
                            {p === "openai" && "OPENAI_API_KEY"}
                            {p === "anthropic" && "ANTHROPIC_API_KEY"}
                            {p === "gemini" && "GEMINI_API_KEY"}
                            {p === "deepseek" && "DEEPSEEK_API_KEY"}
                            {p === "ollama" && "OLLAMA_BASE_URL (default: localhost:11434)"}
                          </p>
                        </div>
                        {provider === p && <div className="h-2 w-2 rounded-full bg-primary" />}
                      </button>
                    ))}
                  </div>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium">Model</label>
                    <select
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="mt-1.5 flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                    >
                      {PROVIDER_MODELS[provider].map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>Connect external services. Configure via environment variables.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Supabase", env: "NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY", desc: "PostgreSQL database for persistent memory" },
                    { name: "Gmail", env: "GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET", desc: "Email integration for sales and customer success" },
                    { name: "Google Drive", env: "GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET", desc: "Document storage and search" },
                    { name: "Google Calendar", env: "GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET", desc: "Calendar sync for scheduling" },
                    { name: "Google Maps", env: "GOOGLE_MAPS_API_KEY", desc: "Location research for SEO and operations" },
                    { name: "n8n", env: "N8N_WEBHOOK_URL + N8N_API_KEY", desc: "Workflow automation" },
                    { name: "Web Search", env: "TAVILY_API_KEY or SERPAPI_KEY", desc: "Market research and competitor analysis" },
                  ].map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-xs text-muted-foreground">{integration.desc}</p>
                        <p className="text-xs text-muted-foreground mt-1 font-mono">{integration.env}</p>
                      </div>
                      <Switch />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="memory" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Long-Term Memory</CardTitle>
                  <CardDescription>Shared knowledge accessible by all AI employees</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-save insights</p>
                      <p className="text-xs text-muted-foreground">Automatically save important information from conversations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium">Search Memory</label>
                    <Input placeholder="Search shared knowledge..." className="mt-1.5" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </AppShell>
  );
}
