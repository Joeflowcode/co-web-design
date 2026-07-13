export type AgentId =
  | "ceo"
  | "seo"
  | "marketing"
  | "sales"
  | "operations"
  | "research"
  | "finance"
  | "software"
  | "automation"
  | "customer-success";

export type LLMProvider =
  | "openai"
  | "anthropic"
  | "gemini"
  | "deepseek"
  | "ollama";

export interface Agent {
  id: AgentId;
  name: string;
  title: string;
  description: string;
  responsibilities: string[];
  color: string;
  icon: string;
  systemPrompt: string;
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  description: string;
  industry: string;
  status: "active" | "planning" | "paused";
  monthlyRevenue: number;
  monthlyExpenses: number;
  website?: string;
  location?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  businessId: string;
  title: string;
  description: string;
  status: "active" | "completed" | "on-hold";
  priority: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  assignedAgent?: AgentId;
  createdAt: string;
}

export interface Task {
  id: string;
  businessId?: string;
  projectId?: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high" | "critical";
  assignedAgent?: AgentId;
  dueDate?: string;
  createdAt: string;
}

export interface Memory {
  id: string;
  agentId?: AgentId;
  businessId?: string;
  category: "business" | "customer" | "project" | "sop" | "goal" | "document" | "brand" | "general";
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string;
  title: string;
  agentId: AgentId;
  businessId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  role: "user" | "assistant" | "system";
  agentId?: AgentId;
  content: string;
  createdAt: string;
}

export interface KPI {
  id: string;
  businessId: string;
  label: string;
  value: number;
  target: number;
  unit: string;
  trend: "up" | "down" | "flat";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "action";
  read: boolean;
  agentId?: AgentId;
  createdAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  businessId?: string;
  agentId?: AgentId;
}

export interface AgentMessage {
  agentId: AgentId;
  agentName: string;
  content: string;
}

export interface CollaborationResult {
  orchestratorSummary: string;
  agentMessages: AgentMessage[];
  recommendations: string[];
  actionItems: string[];
}

export interface LLMConfig {
  provider: LLMProvider;
  model: string;
  apiKey?: string;
  baseUrl?: string;
  temperature?: number;
}
