# Executive OS — Architecture

## Overview

Executive OS is a **local-first AI business operating system** built on Next.js with a true multi-agent architecture. Each AI employee is a specialized LangGraph node with its own system prompt, tool access, and memory scope.

---

## System Architecture

```mermaid
graph TB
    subgraph Browser["Browser / Mobile"]
        UI["Next.js App Router UI<br/>(React 19, Tailwind, shadcn/ui)"]
        Dashboard["Executive Dashboard"]
        Chat["Chat Interface"]
        Settings["Settings / Config"]
    end

    subgraph Middleware["Next.js Middleware"]
        Auth["Authentication<br/>(NextAuth v5)"]
        RateLimit["Rate Limiting<br/>(60 req/min auth, 10 demo)"]
    end

    subgraph API["API Routes (Next.js Server)"]
        ChatAPI["/api/chat<br/>Single-agent chat"]
        CollabAPI["/api/collaborate<br/>Multi-agent session"]
        LeadsAPI["/api/leads<br/>Lead capture + automation"]
        MemoryAPI["/api/memory<br/>CRUD shared memory"]
        N8nHook["/api/n8n/webhook<br/>Automation callbacks"]
    end

    subgraph LangGraph["LangGraph Orchestration"]
        CEO["CEO Node<br/>Plans which agents to involve"]
        Specialists["Specialist Nodes (parallel)<br/>SEO, Marketing, Sales,<br/>Finance, Software, etc."]
        Synthesize["Synthesis Node<br/>Executive summary + action items"]
    end

    subgraph Tools["Agent Tools"]
        WebSearch["web_search<br/>(Tavily API)"]
        SaveMem["save_memory"]
        RecallMem["recall_memory"]
        CreateTask["create_task"]
        GetFinancials["get_financials"]
        TriggerAuto["trigger_automation<br/>(n8n webhook)"]
    end

    subgraph Memory["Long-term Memory"]
        Supabase["Supabase / PostgreSQL<br/>(production)"]
        LocalMem["In-memory fallback<br/>(development / demo)"]
    end

    subgraph LLM["LLM Providers"]
        OpenAI["OpenAI<br/>(gpt-4o, gpt-4o-mini)"]
        Anthropic["Anthropic<br/>(claude-sonnet-4)"]
        Gemini["Google Gemini<br/>(gemini-2.0-flash)"]
        DeepSeek["DeepSeek<br/>(deepseek-chat)"]
        Ollama["Ollama<br/>(local models)"]
    end

    subgraph Automation["External Automation"]
        N8N["n8n Workflows<br/>Lead routing, publishing,<br/>email sequences"]
    end

    subgraph Auth2["Auth Providers"]
        Google["Google OAuth"]
        Creds["Email / Password"]
        Demo["Demo account"]
    end

    UI --> Middleware
    Middleware --> Auth
    Middleware --> RateLimit
    Auth --> Auth2
    RateLimit --> API

    Chat --> ChatAPI
    Chat --> CollabAPI
    Dashboard --> MemoryAPI

    ChatAPI --> LangGraph
    CollabAPI --> LangGraph

    CEO --> Specialists
    Specialists --> Tools
    Specialists --> Synthesize

    Tools --> WebSearch
    Tools --> SaveMem
    Tools --> RecallMem
    Tools --> CreateTask
    Tools --> GetFinancials
    Tools --> TriggerAuto

    SaveMem --> Memory
    RecallMem --> Memory
    Supabase -.->|"configured"| Memory
    LocalMem -.->|"fallback"| Memory

    LangGraph --> LLM
    OpenAI & Anthropic & Gemini & DeepSeek & Ollama --> LLM

    TriggerAuto --> Automation
    LeadsAPI --> Automation
    N8nHook -.->|"callback"| Memory
```

---

## Request Flow: Team Collaboration

```mermaid
sequenceDiagram
    participant User
    participant Middleware
    participant API as /api/collaborate
    participant CEO as CEO Node
    participant Agents as Specialist Agents (parallel)
    participant Tools
    participant Memory
    participant LLM

    User->>Middleware: POST message
    Middleware->>Middleware: Auth check + rate limit
    Middleware->>API: Allowed
    API->>Memory: Load business context
    Memory-->>API: Memory snapshot
    API->>CEO: Plan which agents to involve
    CEO->>LLM: "Which 1-4 specialists are needed?"
    LLM-->>CEO: ["seo", "marketing", "finance"]
    CEO->>Agents: Execute in parallel
    par SEO Agent
        Agents->>Tools: web_search, recall_memory
        Tools-->>Agents: Search results + past decisions
        Agents->>LLM: Generate response with context
        LLM-->>Agents: SEO recommendation
    and Marketing Agent
        Agents->>LLM: Generate response
        LLM-->>Agents: Campaign plan
    and Finance Agent
        Agents->>Tools: get_financials
        Tools-->>Agents: Revenue data
        Agents->>LLM: Generate response
        LLM-->>Agents: ROI analysis
    end
    Agents->>CEO: All responses collected
    CEO->>LLM: Synthesize into executive summary
    LLM-->>CEO: Summary + recommendations + action items
    CEO->>Tools: save_memory (persist insights)
    CEO-->>API: CollaborationResult
    API-->>User: agentMessages + orchestratorSummary
```

---

## Data Model

```mermaid
erDiagram
    BUSINESSES {
        uuid id PK
        text name
        text slug
        text industry
        text status
        numeric monthly_revenue
        numeric monthly_expenses
        text website
        text location
    }
    MEMORIES {
        uuid id PK
        text agent_id
        uuid business_id FK
        text category
        text title
        text content
        text[] tags
        timestamp created_at
    }
    CONVERSATIONS {
        uuid id PK
        text title
        text agent_id
        uuid business_id FK
        timestamp created_at
    }
    MESSAGES {
        uuid id PK
        uuid conversation_id FK
        text role
        text agent_id
        text content
        timestamp created_at
    }
    TASKS {
        uuid id PK
        uuid business_id FK
        uuid project_id FK
        text title
        text status
        text priority
        text assigned_agent
        date due_date
    }
    PROJECTS {
        uuid id PK
        uuid business_id FK
        text title
        text status
        text priority
        text assigned_agent
    }

    BUSINESSES ||--o{ MEMORIES : "scoped to"
    BUSINESSES ||--o{ CONVERSATIONS : "scoped to"
    BUSINESSES ||--o{ TASKS : "scoped to"
    BUSINESSES ||--o{ PROJECTS : "scoped to"
    CONVERSATIONS ||--o{ MESSAGES : "contains"
    PROJECTS ||--o{ TASKS : "contains"
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, React 19) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4, shadcn/ui |
| Multi-agent | LangGraph, LangChain |
| LLM providers | OpenAI, Anthropic, Gemini, DeepSeek, Ollama |
| Auth | NextAuth v5 (Google OAuth + Credentials) |
| Rate limiting | In-memory (dev), Upstash Redis (production) |
| Database | Supabase (PostgreSQL) with in-memory fallback |
| Automation | n8n (webhooks) |
| CI/CD | GitHub Actions → Vercel |
| Testing | Jest + ts-jest, AI eval harness |
| Container | Docker + docker-compose |

---

## Deployment Options

```
┌─────────────────────────────────────┐
│            Vercel (PaaS)            │
│  Next.js serverless functions       │
│  Automatic deploys from GitHub      │
│  Preview URLs per PR                │
└──────────────┬──────────────────────┘
               │
        ┌──────┴───────┐
        │              │
┌───────▼──────┐ ┌─────▼───────────┐
│   Supabase   │ │   Upstash Redis │
│  PostgreSQL  │ │   Rate limiting  │
│  Auth tables │ │                  │
└──────────────┘ └─────────────────┘

─────── OR ───────

┌─────────────────────────────────────┐
│          Docker Compose (VPS)       │
│  app: Next.js (port 3000)           │
│  supabase-db: PostgreSQL (5432)     │
│  ollama: local LLMs (11434)         │
│  n8n: automation (5678)             │
└─────────────────────────────────────┘
```
