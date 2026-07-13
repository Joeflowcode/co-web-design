# Executive OS — AI Business Operating System

A local-first AI executive team that helps you build and scale multiple businesses. Instead of juggling individual chatbots, run your portfolio like a company with a full leadership team — each AI employee has a role, memory, and the ability to collaborate.

## Your AI Executive Team

| Agent | Role | Focus |
|-------|------|-------|
| **Alex** | CEO Assistant | Daily planning, ROI prioritization, accountability |
| **Morgan** | SEO Manager | Keywords, city pages, schema, topical authority |
| **Jordan** | Marketing Director | Ads, social, email, landing pages, branding |
| **Taylor** | Sales Manager | Lead qualification, CRM, scripts, proposals |
| **Casey** | Operations Manager | SOPs, scheduling, inventory, workflows |
| **Riley** | Research Analyst | Market research, competitors, opportunity scoring |
| **Quinn** | Finance Manager | Revenue, expenses, ROI, cash flow forecasting |
| **Dev** | Software Engineer | Websites, SaaS, code generation, tech stacks |
| **Avery** | Automation Engineer | n8n, Zapier, API integrations, lead routing |
| **Sam** | Customer Success | Support, FAQs, reviews, upsells |

## Features

- **Multi-agent orchestration** — LangGraph-powered collaboration with CEO delegation
- **Shared long-term memory** — All agents access business knowledge, SOPs, goals, and documents
- **Executive dashboard** — Revenue, KPIs, tasks, calendar, AI recommendations
- **ChatGPT-style interface** — Modern chat UI with streaming, dark mode, mobile responsive
- **Multiple LLM providers** — OpenAI, Anthropic, Gemini, DeepSeek, and local Ollama
- **Project & task management** — Track work across all businesses
- **Docker support** — PostgreSQL, Ollama, and n8n via docker-compose
- **Extensible integrations** — Gmail, Google Drive, Calendar, Maps, n8n (configure via env)

## Tech Stack

- Next.js 16 · React 19 · TypeScript
- Tailwind CSS 4 · shadcn/ui components
- Supabase / PostgreSQL
- LangGraph · LangChain
- Vercel AI SDK · OpenAI · Anthropic SDKs

## Quick Start

### 1. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Configure environment

```bash
cp .env.example .env
```

Add at least one LLM API key:

```env
OPENAI_API_KEY=sk-...
# or
ANTHROPIC_API_KEY=sk-ant-...
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. (Optional) Start with Docker

```bash
docker compose up -d
```

For local LLM and n8n automation:

```bash
docker compose --profile local-llm --profile automation up -d
```

### 5. (Optional) Set up Supabase

Run the migration in `supabase/migrations/001_initial.sql` in your Supabase SQL editor, then add credentials to `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Without Supabase, the app uses in-memory storage with seed data.

## Architecture

```
User → Chat UI / Dashboard
         ↓
    API Routes (/api/chat, /api/collaborate)
         ↓
    LangGraph Orchestrator
    ├── CEO plans which agents to involve
    ├── Specialist agents execute in parallel
    └── CEO synthesizes team output
         ↓
    Shared Memory (Supabase / local)
    Agent Tools (search, save, list businesses/tasks)
         ↓
    LLM Provider (OpenAI / Anthropic / Gemini / DeepSeek / Ollama)
```

Each agent has:
- A dedicated system prompt with role-specific responsibilities
- Access to shared business memory
- Tool calling for memory search, task listing, and web search
- The ability to collaborate via the CEO orchestrator

## Project Structure

```
app/
  page.tsx              # Executive dashboard
  chat/                 # ChatGPT-style chat interface
  team/                 # AI team directory
  projects/             # Project & task management
  businesses/           # Business portfolio
  settings/             # LLM & integration config
  api/                  # Chat, collaborate, memory, dashboard APIs
components/
  chat/                 # Chat interface components
  dashboard/            # Dashboard widgets
  layout/               # App shell, sidebar
  ui/                   # shadcn/ui components
lib/
  agents/               # Agent definitions & system prompts
  graph/                # LangGraph multi-agent orchestration
  llm/                  # LLM provider abstraction
  memory/               # Long-term memory store
  db/                   # Supabase client & seed data
  tools/                # Agent tools (search, save, list)
supabase/
  migrations/           # PostgreSQL schema
```

## Businesses Included

The system ships with seed data for your portfolio:

- Oregon Lead Generation Websites
- Outdoor Movie Rentals
- Bounce House Rentals
- Oregon CoHost
- Oregon Mobile Tire (roadside assistance)

## License

Private — for personal business use.
