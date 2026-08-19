import { NextRequest, NextResponse } from "next/server";
import { sendLeadToN8n } from "@/lib/tools/n8n";
import { addMemory } from "@/lib/memory/store";
import { z } from "zod";

const LeadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().min(1),
  source: z.string().default("website"),
  message: z.string().optional(),
  businessId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const lead = LeadSchema.parse(body);

    // Save to memory
    await addMemory({
      title: `Lead: ${lead.name} — ${lead.service}`,
      content: `Name: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone ?? "N/A"}\nService: ${lead.service}\nSource: ${lead.source}\nMessage: ${lead.message ?? "N/A"}`,
      category: "customer",
      businessId: lead.businessId,
      tags: ["lead", lead.service, lead.source],
    });

    // Forward to n8n automation
    const n8nResult = await sendLeadToN8n(lead);

    return NextResponse.json({
      success: true,
      saved: true,
      automated: n8nResult.success,
      executionId: n8nResult.executionId,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid lead data", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
