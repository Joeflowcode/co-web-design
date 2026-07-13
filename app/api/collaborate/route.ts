import { NextRequest, NextResponse } from "next/server";
import { runCollaboration, runDemoCollaboration } from "@/lib/graph/orchestrator";
import { isLLMConfigured } from "@/lib/llm/providers";

export async function POST(req: NextRequest) {
  try {
    const { message, businessId } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "message required" }, { status: 400 });
    }

    if (!isLLMConfigured()) {
      const demo = await runDemoCollaboration(message);
      return NextResponse.json(demo);
    }

    const result = await runCollaboration(message, businessId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Collaboration error:", error);
    const demo = await runDemoCollaboration("");
    return NextResponse.json(demo);
  }
}
