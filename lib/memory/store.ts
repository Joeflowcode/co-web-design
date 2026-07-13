import type { AgentId, Memory } from "@/lib/types";
import { createClient } from "@/lib/db/supabase";

// In-memory fallback when Supabase is not configured
const localMemories: Memory[] = [];

export async function getMemories(filters?: {
  agentId?: AgentId;
  businessId?: string;
  category?: Memory["category"];
  search?: string;
}): Promise<Memory[]> {
  const supabase = createClient();
  if (!supabase) {
    return filterLocalMemories(localMemories, filters);
  }

  let query = supabase.from("memories").select("*").order("updated_at", { ascending: false });

  if (filters?.agentId) query = query.or(`agent_id.eq.${filters.agentId},agent_id.is.null`);
  if (filters?.businessId) query = query.eq("business_id", filters.businessId);
  if (filters?.category) query = query.eq("category", filters.category);
  if (filters?.search) query = query.ilike("content", `%${filters.search}%`);

  const { data, error } = await query.limit(50);
  if (error) {
    console.error("Memory fetch error:", error);
    return filterLocalMemories(localMemories, filters);
  }

  return (data ?? []).map(mapDbMemory);
}

export async function addMemory(memory: Omit<Memory, "id" | "createdAt" | "updatedAt">): Promise<Memory> {
  const now = new Date().toISOString();
  const record: Memory = {
    ...memory,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  const supabase = createClient();
  if (!supabase) {
    localMemories.unshift(record);
    return record;
  }

  const { data, error } = await supabase
    .from("memories")
    .insert({
      id: record.id,
      agent_id: record.agentId,
      business_id: record.businessId,
      category: record.category,
      title: record.title,
      content: record.content,
      tags: record.tags,
      created_at: record.createdAt,
      updated_at: record.updatedAt,
    })
    .select()
    .single();

  if (error) {
    console.error("Memory insert error:", error);
    localMemories.unshift(record);
    return record;
  }

  return mapDbMemory(data);
}

export async function buildMemoryContext(agentId?: AgentId, businessId?: string): Promise<string> {
  const [shared, agentSpecific] = await Promise.all([
    getMemories({ businessId }),
    agentId ? getMemories({ agentId, businessId }) : Promise.resolve([]),
  ]);

  const all = [...agentSpecific, ...shared.filter((m) => !agentSpecific.find((a) => a.id === m.id))];
  if (all.length === 0) return "";

  return `\n\nSHARED MEMORY (${all.length} entries):\n${all
    .slice(0, 20)
    .map((m) => `[${m.category.toUpperCase()}] ${m.title}: ${m.content.slice(0, 300)}`)
    .join("\n")}`;
}

function filterLocalMemories(memories: Memory[], filters?: Parameters<typeof getMemories>[0]): Memory[] {
  let result = [...memories];
  if (filters?.agentId) {
    result = result.filter((m) => !m.agentId || m.agentId === filters.agentId);
  }
  if (filters?.businessId) {
    result = result.filter((m) => !m.businessId || m.businessId === filters.businessId);
  }
  if (filters?.category) {
    result = result.filter((m) => m.category === filters.category);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (m) => m.title.toLowerCase().includes(q) || m.content.toLowerCase().includes(q)
    );
  }
  return result.slice(0, 50);
}

function mapDbMemory(row: Record<string, unknown>): Memory {
  return {
    id: row.id as string,
    agentId: row.agent_id as AgentId | undefined,
    businessId: row.business_id as string | undefined,
    category: row.category as Memory["category"],
    title: row.title as string,
    content: row.content as string,
    tags: (row.tags as string[]) ?? [],
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}
