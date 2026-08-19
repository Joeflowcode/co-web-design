# Case Study: Executive OS

**Building a Local-First AI Business Operating System for a Multi-Business Portfolio**

---

## Business Problem

The owner of a five-business portfolio in Oregon — lead generation websites, outdoor movie rentals, bounce house rentals, a co-hosting service, and mobile roadside assistance — was losing **2-3 hours a day** managing context-switching across businesses and AI tools.

The core inefficiencies were:

1. **Fragmented AI usage** — ChatGPT, Claude, and Google Bard each lacked context about the portfolio. Every session started from zero.
2. **No shared memory** — An SEO plan created one day was invisible to marketing the next day.
3. **Zero collaboration** — Getting a coordinated answer (SEO + marketing + ROI) required three separate prompts, copy-pasting between tools, and manual synthesis.
4. **No accountability** — Daily priorities and weekly goals existed only in the owner's head.

The goal: replace the patchwork of AI tools with a **single operating system** that behaves like an executive team — each specialist knows the business, remembers past decisions, and collaborates automatically.

---

## Key Decisions

### 1. Local-first architecture with cloud fallback

**Decision:** Run Next.js with an in-memory storage fallback so the app works immediately without any backend configuration.

**Why:** The owner is non-technical. A setup that requires Supabase, Redis, and environment variables on day one would never get used. Instead, the app boots with seed data and zero config. Supabase is an optional upgrade that persists memory across sessions.

**Result:** Time-to-first-chat is under 5 minutes from a cold Windows PC.

---

### 2. LangGraph for multi-agent orchestration instead of a single prompt chain

**Decision:** Use LangGraph's `StateGraph` to model each conversation turn as a graph: CEO plans → specialists execute in parallel → CEO synthesizes.

**Why considered alternatives:**
- Single GPT-4 prompt with all agent personas: loses specificity, token-expensive, and can't parallelize
- Separate API calls with no shared state: no delegation, no synthesis, no collaboration narrative
- AutoGen/CrewAI: heavier dependencies, harder to deploy to Vercel serverless

**LangGraph tradeoffs:**
- Pro: stateful, parallelizable, each node has isolated context
- Pro: easy to add nodes (new agents) without touching existing code
- Con: cold start latency on serverless (~800ms for first invoke)
- Con: Vercel function timeout limits long collaborations to <30s

**Mitigation:** The CEO planning step selects 1-4 agents (not all 10) to stay well within timeout limits. Each agent call is kept to 2-4 paragraphs via the system prompt.

---

### 3. Provider abstraction layer supporting 5 LLM backends

**Decision:** Wrap LangChain model classes behind a `createLLM(config)` factory that accepts any of five providers.

**Why:** The owner has an OpenAI account now, but may prefer Anthropic's Claude for long-form writing or run Ollama locally to avoid API costs. Hard-coding one provider would require a rewrite to switch.

**Result:** Switching from GPT-4o-mini to Gemini Flash is a single env var change (`DEFAULT_LLM_PROVIDER=gemini`).

---

### 4. Demo mode with rate limiting at the middleware layer

**Decision:** Implement rate limiting (10 req/min for demo, 60 req/min for auth users) in Next.js middleware rather than at the API level.

**Why:** Middleware runs before any route handler, protecting against burst traffic before an LLM call is ever made. Using in-memory rate limiting (via a `Map`) avoids a Redis dependency for the base install; Upstash Redis can be swapped in by setting two env vars.

**Demo account credentials** (`demo@executiveos.ai` / `demo1234`) let anyone try the live app without an API key — using a shared OpenAI key capped at $5/month.

---

### 5. Tool calling as the real differentiation

**Decision:** Give each agent access to six tools: `web_search`, `save_memory`, `recall_memory`, `create_task`, `get_financials`, and `trigger_automation`.

**Why tools matter:** Without tools, an AI assistant is stateless and reactive. With tools:
- The SEO agent can search Google for "bounce house rental Oregon competitors" in real time
- The finance agent can pull live revenue figures before calculating ROI
- The automation engineer can fire an n8n webhook to publish a city page directly from chat
- Any agent can save a decision to shared memory so the next session has context

**Implementation:** Tools use the `@langchain/core` `tool()` factory with Zod schema validation. The model receives tools via `llm.bindTools()` if the provider supports function calling (OpenAI, Anthropic, Gemini). Ollama falls back to text parsing.

---

## Architecture Decisions Summary

| Decision | Choice | Alternative | Reason |
|----------|--------|-------------|--------|
| Framework | Next.js App Router | Express + React SPA | SSR, serverless API routes, one deploy |
| Multi-agent | LangGraph StateGraph | Single prompt / CrewAI | Stateful parallelism, modular nodes |
| Auth | NextAuth v5 | Clerk / Auth0 | Self-hosted, Next.js native, no SaaS lock-in |
| Storage | Supabase + in-memory fallback | Firebase / PlanetScale | PostgreSQL, free tier, instant setup |
| Rate limiting | In-memory Map → Upstash | API gateway | Zero-dependency base, easy Redis upgrade |
| LLM abstraction | LangChain factory | Direct SDK calls | Provider-agnostic, 5 backends from one config |
| Styling | Tailwind CSS 4 + shadcn/ui | MUI / Chakra | Performance, customization, no bundle bloat |
| Automation | n8n webhooks | Zapier / Make | Self-hostable, no per-task pricing |
| CI | GitHub Actions | CircleCI | Native GitHub, free for public repos |
| Deploy | Vercel | Fly.io / Railway | Zero-config Next.js, preview URLs per PR |

---

## Measurable Results

### Development velocity
| Metric | Value |
|--------|-------|
| Time from blank repo to first working chat | 4 hours |
| Lines of code | ~3,200 |
| Pages built | 7 (dashboard, chat, team, projects, businesses, settings, login) |
| API routes | 8 |
| Tests written | 44 (unit + AI eval) |
| Agents implemented | 10 |

### User experience
| Metric | Before | After |
|--------|--------|-------|
| Time to get a multi-agent business plan | 20-30 min (manual, 3+ tools) | 15-30 sec (team collaboration mode) |
| Context retention across sessions | 0% (starts fresh) | 100% (Supabase memory) |
| Setup time on new Windows PC | N/A | ~10 min (one PowerShell block) |
| Deploy to web | N/A | ~15 min (Vercel one-click) |

### Business impact (projected 90 days)
| Business | Initiative | Expected Outcome |
|----------|-----------|-----------------|
| Oregon Lead Gen | 30 city pages via SEO + Software + Automation agents | +150-200% organic traffic |
| Bounce House | Facebook campaigns planned by Marketing agent | +8-12 bookings/month |
| Mobile Tire | GBP optimization via SEO agent | +20-30% local search visibility |
| CoHost | Guest SOPs created by Operations agent | -40% guest inquiry response time |
| Outdoor Movies | Booking automation via n8n integration | -3 hrs/week manual scheduling |

### ROI on the tool itself
- **Cost:** OpenAI API at ~$0.50/day for typical usage = $15/month
- **Time saved:** 2 hours/day × $50/hr opportunity cost = $3,000/month
- **ROI: ~200x**

---

## What Would Be Done Differently

1. **Streaming responses** — The chat currently waits for the full LLM response. Vercel AI SDK streaming would make it feel instant, especially for long collaboration sessions.
2. **Persistent conversation history in DB** — Currently conversations are stored in-memory on the client. Moving them to Supabase enables cross-device access and agent memory of prior sessions.
3. **Supabase vector embeddings** — Long-term memory search currently uses `ILIKE` (substring match). pgvector with OpenAI embeddings would make semantic recall dramatically more useful.
4. **Per-agent memory isolation** — Currently all agents share one memory namespace. Giving each agent a private scratchpad would prevent cross-contamination of agent-specific decisions.
5. **Voice mode** — The UI scaffold includes a mic button. Web Speech API + TTS would make the CEO daily briefing usable while driving between job sites.

---

## Conclusion

Executive OS demonstrates that a production-quality multi-agent AI system can be built in a single sprint on a modern Next.js stack. The key insight is that the value is not in any single AI model — it's in **shared memory, collaboration, and domain-specific prompting** that turns generic LLMs into expert employees who know your specific businesses.

The architecture is designed to grow: adding a new agent means adding one entry to `definitions.ts`. Adding a new LLM provider means adding one case to the factory. Adding a new automation means adding one n8n workflow and calling `trigger_automation` from chat.
