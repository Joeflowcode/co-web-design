import type { LLMProvider } from "@/lib/types";

export const PROVIDER_MODELS: Record<LLMProvider, string[]> = {
  openai: ["gpt-4o", "gpt-4o-mini", "o1-mini"],
  anthropic: ["claude-sonnet-4-20250514", "claude-3-5-haiku-20241022"],
  gemini: ["gemini-2.0-flash", "gemini-1.5-pro"],
  deepseek: ["deepseek-chat", "deepseek-reasoner"],
  ollama: ["llama3.2", "mistral", "codellama"],
};

export const DEFAULT_MODELS: Record<LLMProvider, string> = {
  openai: "gpt-4o-mini",
  anthropic: "claude-sonnet-4-20250514",
  gemini: "gemini-2.0-flash",
  deepseek: "deepseek-chat",
  ollama: "llama3.2",
};
