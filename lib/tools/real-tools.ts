import "server-only";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { addMemory, getMemories } from "@/lib/memory/store";
import { SEED_TASKS, SEED_BUSINESSES } from "@/lib/db/seed";
import type { AgentId, Task } from "@/lib/types";

// --- Web Search via Tavily ---
export const webSearchTool = tool(
  async ({ query }) => {
    const apiKey = process.env.TAVILY_API_KEY;
    if (!apiKey) {
      return `[Web search unavailable — add TAVILY_API_KEY to enable real web search]\nSimulated results for: "${query}"`;
    }
    try {
      const res = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          query,
          search_depth: "basic",
          max_results: 5,
          include_answer: true,
        }),
      });
      const data = await res.json() as { answer?: string; results?: { title: string; url: string; content: string }[] };
      const answer = data.answer ? `Summary: ${data.answer}\n\n` : "";
      const sources = (data.results ?? [])
        .slice(0, 4)
        .map((r) => `• ${r.title}\n  ${r.url}\n  ${r.content.slice(0, 200)}`)
        .join("\n\n");
      return `${answer}${sources}`;
    } catch (e) {
      return `Web search error: ${String(e)}`;
    }
  },
  {
    name: "web_search",
    description: "Search the web for current market data, competitor info, pricing, trends, and news",
    schema: z.object({ query: z.string().describe("Specific search query") }),
  }
);

// --- Save to long-term memory ---
export const saveMemoryTool = tool(
  async ({ title, content, category, agentId, tags }) => {
    const mem = await addMemory({
      title,
      content,
      category: category as never,
      agentId: agentId as AgentId | undefined,
      tags: tags ?? [],
    });
    return `✓ Saved to memory: "${mem.title}" (${mem.id})`;
  },
  {
    name: "save_memory",
    description: "Save important information, insights, or decisions to long-term shared memory",
    schema: z.object({
      title: z.string(),
      content: z.string(),
      category: z.enum(["business", "customer", "project", "sop", "goal", "document", "brand", "general"]),
      agentId: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
  }
);

// --- Search long-term memory ---
export const recallMemoryTool = tool(
  async ({ query, category }) => {
    const mems = await getMemories({ search: query, category: category as never });
    if (!mems.length) return "No memories found for that query.";
    return mems
      .slice(0, 8)
      .map((m) => `[${m.category}] ${m.title}:\n${m.content}`)
      .join("\n\n---\n\n");
  },
  {
    name: "recall_memory",
    description: "Search long-term memory for past decisions, SOPs, business info, or goals",
    schema: z.object({
      query: z.string(),
      category: z
        .enum(["business", "customer", "project", "sop", "goal", "document", "brand", "general"])
        .optional(),
    }),
  }
);

// --- Create task ---
export const createTaskTool = tool(
  async ({ title, priority, assignedAgent, dueDate, businessId }) => {
    const task: Task = {
      id: `task-${Date.now()}`,
      title,
      priority: priority ?? "medium",
      assignedAgent: assignedAgent as AgentId | undefined,
      businessId,
      dueDate,
      status: "todo",
      createdAt: new Date().toISOString(),
    };
    // In production, persist to Supabase
    SEED_TASKS.push(task);
    return `✓ Task created: "${task.title}" [${task.priority}]${dueDate ? ` due ${dueDate}` : ""}`;
  },
  {
    name: "create_task",
    description: "Create a new task and add it to the task list",
    schema: z.object({
      title: z.string(),
      priority: z.enum(["low", "medium", "high", "critical"]).optional(),
      assignedAgent: z.string().optional(),
      dueDate: z.string().optional().describe("ISO date string"),
      businessId: z.string().optional(),
    }),
  }
);

// --- Get business financials ---
export const getFinancialsTool = tool(
  async ({ businessId }) => {
    const businesses = businessId
      ? SEED_BUSINESSES.filter((b) => b.id === businessId || b.slug === businessId)
      : SEED_BUSINESSES;
    return businesses
      .map(
        (b) =>
          `${b.name}: Revenue $${b.monthlyRevenue}/mo | Expenses $${b.monthlyExpenses}/mo | Net $${b.monthlyRevenue - b.monthlyExpenses}/mo`
      )
      .join("\n");
  },
  {
    name: "get_financials",
    description: "Get financial data for one or all businesses",
    schema: z.object({ businessId: z.string().optional() }),
  }
);

// --- Trigger n8n webhook ---
export const triggerAutomationTool = tool(
  async ({ workflow, payload }) => {
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      return `[Automation unavailable — add N8N_WEBHOOK_URL to enable]\nWould have triggered workflow: "${workflow}" with payload: ${JSON.stringify(payload)}`;
    }
    try {
      const res = await fetch(`${webhookUrl}/${workflow}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.N8N_API_KEY ? { "X-N8N-API-KEY": process.env.N8N_API_KEY } : {}),
        },
        body: JSON.stringify({ workflow, ...payload, triggered_at: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return `✓ Automation "${workflow}" triggered successfully.`;
    } catch (e) {
      return `Automation error: ${String(e)}`;
    }
  },
  {
    name: "trigger_automation",
    description: "Trigger an n8n automation workflow (lead routing, email sequences, publishing)",
    schema: z.object({
      workflow: z.string().describe("Workflow name e.g. lead-capture, publish-page, send-email"),
      payload: z.record(z.string(), z.unknown()),
    }),
  }
);

export const ALL_TOOLS = [
  webSearchTool,
  saveMemoryTool,
  recallMemoryTool,
  createTaskTool,
  getFinancialsTool,
  triggerAutomationTool,
];
