export interface N8nLeadPayload {
  name: string;
  email: string;
  phone?: string;
  service: string;
  source: string;
  message?: string;
  businessId?: string;
}

export interface N8nWebhookResponse {
  success: boolean;
  executionId?: string;
  message?: string;
}

export async function sendLeadToN8n(lead: N8nLeadPayload): Promise<N8nWebhookResponse> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[n8n] N8N_WEBHOOK_URL not configured — lead not forwarded");
    return { success: false, message: "N8N_WEBHOOK_URL not configured" };
  }

  try {
    const res = await fetch(`${webhookUrl}/lead-capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.N8N_API_KEY ? { "X-N8N-API-KEY": process.env.N8N_API_KEY } : {}),
      },
      body: JSON.stringify({ ...lead, received_at: new Date().toISOString() }),
    });

    if (!res.ok) throw new Error(`n8n returned ${res.status}`);
    const data = await res.json() as { executionId?: string };
    return { success: true, executionId: data.executionId };
  } catch (error) {
    console.error("[n8n] Webhook error:", error);
    return { success: false, message: String(error) };
  }
}

export async function notifyAgentAction(agentId: string, action: string, payload: Record<string, unknown>) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) return;

  await fetch(`${webhookUrl}/agent-action`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ agentId, action, payload, timestamp: new Date().toISOString() }),
  }).catch(() => null); // Fire and forget
}
