import { NextRequest, NextResponse } from "next/server";
import { runSingleAgentChat } from "@/lib/graph/orchestrator";
import { isLLMConfigured } from "@/lib/llm/providers";
import { getAgent } from "@/lib/agents/definitions";
import type { AgentId } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { message, agentId, messages = [], businessId } = await req.json();

    if (!message || !agentId) {
      return NextResponse.json({ error: "message and agentId required" }, { status: 400 });
    }

    const agent = getAgent(agentId as AgentId);

    if (!isLLMConfigured()) {
      return NextResponse.json({
        content: `**${agent.name} (${agent.title})**\n\nI received your message: "${message}"\n\n*Note: No LLM API key configured. Add your API key in Settings or set OPENAI_API_KEY, ANTHROPIC_API_KEY, GEMINI_API_KEY, or DEEPSEEK_API_KEY in your environment.*\n\nAs your ${agent.title}, here's what I'd recommend:\n\n${agent.responsibilities.map((r) => `- ${r}`).join("\n")}\n\nConfigure an API key to get personalized, context-aware responses with access to your business memory.`,
      });
    }

    const content = await runSingleAgentChat(
      agentId as AgentId,
      [...messages, { role: "user" as const, content: message }],
      businessId
    );

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to generate response", details: String(error) },
      { status: 500 }
    );
  }
}
