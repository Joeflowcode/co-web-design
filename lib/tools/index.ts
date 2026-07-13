import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { getMemories, addMemory } from "@/lib/memory/store";
import { SEED_BUSINESSES, SEED_TASKS, SEED_PROJECTS } from "@/lib/db/seed";

export const searchMemoryTool = tool(
  async ({ query, category }) => {
    const memories = await getMemories({ search: query, category: category as never });
    if (memories.length === 0) return "No memories found matching that query.";
    return memories
      .slice(0, 10)
      .map((m) => `[${m.category}] ${m.title}: ${m.content}`)
      .join("\n");
  },
  {
    name: "search_memory",
    description: "Search shared business memory for information about businesses, customers, projects, SOPs, goals, etc.",
    schema: z.object({
      query: z.string().describe("Search query"),
      category: z
        .enum(["business", "customer", "project", "sop", "goal", "document", "brand", "general"])
        .optional(),
    }),
  }
);

export const saveMemoryTool = tool(
  async ({ title, content, category, tags }) => {
    const memory = await addMemory({
      title,
      content,
      category: category as never,
      tags: tags ?? [],
    });
    return `Memory saved: ${memory.id} — "${memory.title}"`;
  },
  {
    name: "save_memory",
    description: "Save important information to shared long-term memory",
    schema: z.object({
      title: z.string(),
      content: z.string(),
      category: z.enum(["business", "customer", "project", "sop", "goal", "document", "brand", "general"]),
      tags: z.array(z.string()).optional(),
    }),
  }
);

export const listBusinessesTool = tool(
  async () => {
    return SEED_BUSINESSES.map(
      (b) =>
        `${b.name} (${b.status}) — Revenue: $${b.monthlyRevenue}/mo, Expenses: $${b.monthlyExpenses}/mo — ${b.description}`
    ).join("\n");
  },
  {
    name: "list_businesses",
    description: "List all businesses in the portfolio with financial summary",
    schema: z.object({}),
  }
);

export const listTasksTool = tool(
  async ({ priority }) => {
    let tasks = SEED_TASKS.filter((t) => t.status !== "done");
    if (priority) tasks = tasks.filter((t) => t.priority === priority);
    if (tasks.length === 0) return "No pending tasks.";
    return tasks
      .map((t) => `[${t.priority.toUpperCase()}] ${t.title} — ${t.status}${t.dueDate ? ` (due ${t.dueDate})` : ""}`)
      .join("\n");
  },
  {
    name: "list_tasks",
    description: "List pending tasks, optionally filtered by priority",
    schema: z.object({
      priority: z.enum(["low", "medium", "high", "critical"]).optional(),
    }),
  }
);

export const listProjectsTool = tool(
  async () => {
    const active = SEED_PROJECTS.filter((p) => p.status === "active");
    return active
      .map((p) => `${p.title} [${p.priority}] — ${p.description}${p.dueDate ? ` (due ${p.dueDate})` : ""}`)
      .join("\n");
  },
  {
    name: "list_projects",
    description: "List active projects across all businesses",
    schema: z.object({}),
  }
);

export const webSearchTool = tool(
  async ({ query }) => {
    // Placeholder — integrate Tavily/SerpAPI in production
    return `Web search results for "${query}":\n[Web search requires TAVILY_API_KEY or SERPAPI_KEY configuration. Enable in Settings → Integrations.]`;
  },
  {
    name: "web_search",
    description: "Search the web for market research, competitor info, trends",
    schema: z.object({
      query: z.string(),
    }),
  }
);

export const agentTools = [
  searchMemoryTool,
  saveMemoryTool,
  listBusinessesTool,
  listTasksTool,
  listProjectsTool,
  webSearchTool,
];
