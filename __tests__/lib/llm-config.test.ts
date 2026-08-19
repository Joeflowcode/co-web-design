import { PROVIDER_MODELS, DEFAULT_MODELS } from "@/lib/llm/config";

describe("LLM config", () => {
  const providers = ["openai", "anthropic", "gemini", "deepseek", "ollama"] as const;

  it("has default model for every provider", () => {
    for (const p of providers) {
      expect(DEFAULT_MODELS[p]).toBeTruthy();
    }
  });

  it("every provider has at least 2 model options", () => {
    for (const p of providers) {
      expect(PROVIDER_MODELS[p].length).toBeGreaterThanOrEqual(2);
    }
  });

  it("default model is in provider model list", () => {
    for (const p of providers) {
      expect(PROVIDER_MODELS[p]).toContain(DEFAULT_MODELS[p]);
    }
  });

  it("OpenAI defaults to gpt-4o-mini", () => {
    expect(DEFAULT_MODELS.openai).toBe("gpt-4o-mini");
  });
});
