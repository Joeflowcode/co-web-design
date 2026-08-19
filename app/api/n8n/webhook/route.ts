import { NextRequest, NextResponse } from "next/server";
import { addMemory } from "@/lib/memory/store";

// Receives callbacks from n8n workflows (e.g. after publishing a city page)
export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-webhook-secret");
    if (process.env.N8N_WEBHOOK_SECRET && secret !== process.env.N8N_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json() as {
      event?: string;
      businessId?: string;
      data?: Record<string, unknown>;
      message?: string;
    };
    const { event, businessId, data, message } = body;

    if (event) {
      await addMemory({
        title: `Automation: ${event}`,
        content: message ?? JSON.stringify(data ?? {}),
        category: "general",
        businessId,
        tags: ["automation", "n8n", event],
      });
    }

    return NextResponse.json({ received: true, event });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
