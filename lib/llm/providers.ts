import "server-only";
import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { LLMConfig, LLMProvider } from "@/lib/types";
import { DEFAULT_MODELS } from "@/lib/llm/config";

function getApiKey(provider: LLMProvider): string | undefined {
  const keys: Record<LLMProvider, string | undefined> = {
    openai: process.env.OPENAI_API_KEY,
    anthropic: process.env.ANTHROPIC_API_KEY,
    gemini: process.env.GEMINI_API_KEY,
    deepseek: process.env.DEEPSEEK_API_KEY,
    ollama: undefined,
  };
  return keys[provider];
}

export function createLLM(config: LLMConfig): BaseChatModel {
  const { provider, model, temperature = 0.7 } = config;
  const apiKey = config.apiKey ?? getApiKey(provider);

  switch (provider) {
    case "openai":
      return new ChatOpenAI({
        modelName: model || DEFAULT_MODELS.openai,
        temperature,
        openAIApiKey: apiKey,
      });

    case "anthropic":
      return new ChatAnthropic({
        modelName: model || DEFAULT_MODELS.anthropic,
        temperature,
        anthropicApiKey: apiKey,
      });

    case "gemini":
      return new ChatOpenAI({
        modelName: model || DEFAULT_MODELS.gemini,
        temperature,
        openAIApiKey: apiKey ?? process.env.GEMINI_API_KEY,
        configuration: {
          baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
        },
      });

    case "deepseek":
      return new ChatOpenAI({
        modelName: model || DEFAULT_MODELS.deepseek,
        temperature,
        openAIApiKey: apiKey,
        configuration: {
          baseURL: config.baseUrl ?? "https://api.deepseek.com/v1",
        },
      });

    case "ollama":
      return new ChatOpenAI({
        modelName: model || DEFAULT_MODELS.ollama,
        temperature,
        configuration: {
          baseURL: config.baseUrl ?? process.env.OLLAMA_BASE_URL ?? "http://localhost:11434/v1",
        },
        apiKey: "ollama",
      });

    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}

export function getDefaultLLMConfig(): LLMConfig {
  const provider = (process.env.DEFAULT_LLM_PROVIDER as LLMProvider) ?? "openai";
  return {
    provider,
    model: process.env.DEFAULT_LLM_MODEL ?? DEFAULT_MODELS[provider],
    temperature: 0.7,
  };
}

export function isLLMConfigured(): boolean {
  return !!(
    process.env.OPENAI_API_KEY ||
    process.env.ANTHROPIC_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.DEEPSEEK_API_KEY ||
    process.env.OLLAMA_BASE_URL
  );
}
