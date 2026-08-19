import "server-only";
import { StateGraph, Annotation, END, START } from "@langchain/langgraph";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { AGENTS, getAgent } from "@/lib/agents/definitions";
import { buildMemoryContext } from "@/lib/memory/store";
import { createLLM, getDefaultLLMConfig } from "@/lib/llm/providers";
import { ALL_TOOLS } from "@/lib/tools/real-tools";
import type { AgentId, AgentMessage, CollaborationResult } from "@/lib/types";

const GraphState = Annotation.Root({
  userMessage: Annotation<string>,
  businessId: Annotation<string | undefined>,
  memoryContext: Annotation<string>,
  involvedAgents: Annotation<AgentId[]>,
  agentResponses: Annotation<AgentMessage[]>,
  orchestratorSummary: Annotation<string>,
  recommendations: Annotation<string[]>,
  actionItems: Annotation<string[]>,
});

async function planAgents(state: typeof GraphState.State, llm: BaseChatModel) {
  const agentList = Object.values(AGENTS)
    .filter((a) => a.id !== "ceo")
    .map((a) => `${a.id}: ${a.title} — ${a.description}`)
    .join("\n");

  const response = await llm.invoke([
    new SystemMessage(`You are the CEO Assistant planning which team members to involve.
Available agents:
${agentList}

Respond with ONLY a JSON array of agent IDs to involve (1-4 agents), e.g. ["seo", "marketing", "software"]`),
    new HumanMessage(state.userMessage),
  ]);

  const content = typeof response.content === "string" ? response.content : "";
  let involvedAgents: AgentId[] = ["seo", "marketing"];

  try {
    const match = content.match(/\[[\s\S]*?\]/);
    if (match) {
      const parsed = JSON.parse(match[0]) as string[];
      involvedAgents = parsed.filter((id) => id in AGENTS && id !== "ceo") as AgentId[];
    }
  } catch {
    // Use defaults
  }

  return { involvedAgents: involvedAgents.slice(0, 4) };
}

async function runAgent(
  agentId: AgentId,
  userMessage: string,
  memoryContext: string,
  llm: BaseChatModel
): Promise<AgentMessage> {
  const agent = getAgent(agentId);
  const agentMemory = await buildMemoryContext(agentId);

  // Bind tools to the model if it supports tool calling
  const modelWithTools = "bindTools" in llm && typeof (llm as { bindTools?: unknown }).bindTools === "function"
    ? (llm as BaseChatModel & { bindTools: (tools: unknown[]) => BaseChatModel }).bindTools(ALL_TOOLS)
    : llm;

  const response = await modelWithTools.invoke([
    new SystemMessage(`${agent.systemPrompt}${memoryContext}${agentMemory}

You are collaborating with other team members. Be concise (2-4 paragraphs). End with 1-2 specific action items.
You have tools available: web_search, save_memory, recall_memory, create_task, get_financials, trigger_automation. Use them when useful.`),
    new HumanMessage(userMessage),
  ]);

  return {
    agentId,
    agentName: agent.name,
    content: typeof response.content === "string" ? response.content : String(response.content),
  };
}

async function executeAgents(state: typeof GraphState.State, llm: BaseChatModel) {
  const responses = await Promise.all(
    state.involvedAgents.map((id) => runAgent(id, state.userMessage, state.memoryContext, llm))
  );
  return { agentResponses: responses };
}

async function synthesize(state: typeof GraphState.State, llm: BaseChatModel) {
  const teamDiscussion = state.agentResponses
    .map((r) => `${r.agentName} (${AGENTS[r.agentId].title}):\n${r.content}`)
    .join("\n\n---\n\n");

  const response = await llm.invoke([
    new SystemMessage(`${AGENTS.ceo.systemPrompt}

Synthesize the team discussion into an executive summary. Extract clear recommendations and action items.
Respond in this exact JSON format:
{
  "summary": "Executive summary paragraph",
  "recommendations": ["rec1", "rec2", "rec3"],
  "actionItems": ["action1", "action2", "action3"]
}`),
    new HumanMessage(`User request: ${state.userMessage}\n\nTeam discussion:\n${teamDiscussion}`),
  ]);

  const content = typeof response.content === "string" ? response.content : "";
  let orchestratorSummary = "Team collaboration complete.";
  let recommendations: string[] = [];
  let actionItems: string[] = [];

  try {
    const match = content.match(/\{[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]) as {
        summary: string;
        recommendations: string[];
        actionItems: string[];
      };
      orchestratorSummary = parsed.summary;
      recommendations = parsed.recommendations ?? [];
      actionItems = parsed.actionItems ?? [];
    }
  } catch {
    orchestratorSummary = content;
  }

  return { orchestratorSummary, recommendations, actionItems };
}

export function buildCollaborationGraph(llm?: BaseChatModel) {
  const model = llm ?? createLLM(getDefaultLLMConfig());

  const graph = new StateGraph(GraphState)
    .addNode("loadMemory", async (state) => {
      const memoryContext = await buildMemoryContext("ceo", state.businessId);
      return { memoryContext };
    })
    .addNode("planAgents", async (state) => planAgents(state, model))
    .addNode("executeAgents", async (state) => executeAgents(state, model))
    .addNode("synthesize", async (state) => synthesize(state, model))
    .addEdge(START, "loadMemory")
    .addEdge("loadMemory", "planAgents")
    .addEdge("planAgents", "executeAgents")
    .addEdge("executeAgents", "synthesize")
    .addEdge("synthesize", END);

  return graph.compile();
}

export async function runCollaboration(
  userMessage: string,
  businessId?: string,
  llm?: BaseChatModel
): Promise<CollaborationResult> {
  const graph = buildCollaborationGraph(llm);
  const result = await graph.invoke({
    userMessage,
    businessId,
    memoryContext: "",
    involvedAgents: [],
    agentResponses: [],
    orchestratorSummary: "",
    recommendations: [],
    actionItems: [],
  });

  return {
    orchestratorSummary: result.orchestratorSummary,
    agentMessages: result.agentResponses,
    recommendations: result.recommendations,
    actionItems: result.actionItems,
  };
}

export async function runSingleAgentChat(
  agentId: AgentId,
  messages: { role: "user" | "assistant"; content: string }[],
  businessId?: string,
  llm?: BaseChatModel
): Promise<string> {
  const model = llm ?? createLLM(getDefaultLLMConfig());
  const agent = getAgent(agentId);
  const memoryContext = await buildMemoryContext(agentId, businessId);

  const langchainMessages = [
    new SystemMessage(`${agent.systemPrompt}${memoryContext}`),
    ...messages.map((m) =>
      m.role === "user" ? new HumanMessage(m.content) : new AIMessage(m.content)
    ),
  ];

  const response = await model.invoke(langchainMessages);
  return typeof response.content === "string" ? response.content : String(response.content);
}

export async function runDemoCollaboration(userMessage: string): Promise<CollaborationResult> {
  return {
    orchestratorSummary:
      "The team recommends a coordinated lead generation push for Oregon Lead Gen Sites. Creating 30 city pages is the highest-ROI initiative, supported by Facebook campaigns and automated publishing.",
    agentMessages: [
      {
        agentId: "ceo",
        agentName: "Alex",
        content: "We need more leads across our Oregon portfolio. I recommend prioritizing the lead gen sites — they have the lowest marginal cost per acquisition and highest scalability.",
      },
      {
        agentId: "seo",
        agentName: "Morgan",
        content:
          "I recommend creating 30 city pages targeting mid-size Oregon markets: Salem, Eugene, Bend, Medford, and 26 others. Each page should target 3-5 local service keywords with LocalBusiness schema. Expected organic traffic increase: 150-200% within 6 months.",
      },
      {
        agentId: "marketing",
        agentName: "Jordan",
        content:
          "I'll prepare Facebook Marketplace campaigns for bounce houses and outdoor movies to cross-promote while the SEO pages index. Budget recommendation: $500/month split across top 3 businesses.",
      },
      {
        agentId: "software",
        agentName: "Dev",
        content:
          "I'll generate the city page templates with dynamic content blocks, schema markup, and internal linking. Can deliver 30 pages in a batch using our Next.js template system.",
      },
      {
        agentId: "automation",
        agentName: "Avery",
        content:
          "I'll automate publishing via n8n — content generation → review queue → auto-publish → Google Search Console ping → internal link update.",
      },
      {
        agentId: "finance",
        agentName: "Quinn",
        content:
          "Expected ROI is 420%. Investment: ~$2,400 (content + tools). Projected additional monthly revenue: $8,400 within 6 months based on comparable city page performance.",
      },
    ],
    recommendations: [
      "Start with 30 Oregon city pages for lead gen sites",
      "Launch cross-promotional Facebook campaigns at $500/mo",
      "Automate publishing pipeline with n8n",
      "Track rankings weekly for first 90 days",
    ],
    actionItems: [
      "Morgan: Complete keyword research for top 10 cities by Friday",
      "Dev: Build city page template with schema markup",
      "Avery: Set up n8n publishing workflow",
      "Jordan: Draft Facebook Marketplace ad creatives",
      "Quinn: Set up revenue tracking for new city pages",
    ],
  };
}
