/**
 * AI Evaluation harness — tests agent response quality WITHOUT making real LLM calls.
 * Uses mock LLM responses that represent typical outputs, then evaluates:
 *   - Response completeness
 *   - Presence of actionable items
 *   - Correct agent persona
 *   - Business context references
 */

interface EvalResult {
  passed: boolean;
  score: number; // 0-100
  issues: string[];
}

function evaluateAgentResponse(
  agentId: string,
  userMessage: string,
  response: string
): EvalResult {
  const issues: string[] = [];
  let score = 100;

  // 1. Minimum length check (300+ chars for a useful response)
  if (response.length < 300) {
    issues.push("Response too short (< 300 chars)");
    score -= 20;
  }

  // 2. No error messages leaked
  if (/error|exception|traceback|undefined|null/i.test(response)) {
    issues.push("Possible error content in response");
    score -= 15;
  }

  // 3. Actionable content — must have bullet points, numbered lists, or action words
  const hasActions = /^[-•*]|\d\./m.test(response) ||
    /recommend|should|will|create|build|launch|implement/i.test(response);
  if (!hasActions) {
    issues.push("No actionable recommendations detected");
    score -= 20;
  }

  // 4. Not generic filler — must mention something specific
  const hasSpecifics = /Oregon|business|revenue|SEO|marketing|lead|customer|\$\d|%/i.test(response);
  if (!hasSpecifics) {
    issues.push("Response appears generic, missing business context");
    score -= 20;
  }

  // 5. Agent-specific quality checks
  if (agentId === "seo") {
    const hasSeoTerms = /keyword|ranking|backlink|schema|traffic|search|page/i.test(response);
    if (!hasSeoTerms) { issues.push("SEO agent missing SEO terminology"); score -= 15; }
  }
  if (agentId === "finance") {
    const hasFinanceTerms = /revenue|profit|ROI|cost|expense|\$|cash|margin/i.test(response);
    if (!hasFinanceTerms) { issues.push("Finance agent missing financial terminology"); score -= 15; }
  }
  if (agentId === "marketing") {
    const hasMarketingTerms = /campaign|ad|audience|conversion|brand|content|email/i.test(response);
    if (!hasMarketingTerms) { issues.push("Marketing agent missing marketing terminology"); score -= 15; }
  }

  return { passed: score >= 70, score: Math.max(0, score), issues };
}

// --- Mock responses representing typical LLM outputs ---

const MOCK_RESPONSES: Record<string, string> = {
  ceo: `Based on your portfolio review, here are today's top 3 priorities:

1. **Oregon Mobile Tire** — Your highest revenue business ($12,500/mo) has a task overdue: updating Google Business Profile photos. This directly impacts local search ranking and conversions. Assign to Morgan today.

2. **Bounce House Rentals** — Summer is peak season. 3 leads need follow-up within 24 hours or they go cold. Taylor should send the follow-up sequence now.

3. **Lead Gen Sites** — The 30 city pages project has the highest ROI potential (420% projected). Unblock Morgan and Dev to start keyword research for Salem and Eugene.

**Recommendation:** Focus first on Mobile Tire GBP (30 min) then Bounce House lead follow-up (15 min) before any new tasks.`,

  seo: `For Oregon Lead Gen Sites, here's a 30-day SEO plan:

**Week 1-2: Keyword Research & Architecture**
- Research 150+ keywords across Salem, Eugene, Bend, Medford, Corvallis, Grants Pass
- Target: 3-5 transactional keywords per city page (e.g. "plumber in Salem Oregon")
- Build internal linking structure connecting city pages to service pages

**Week 3-4: Content & Schema**
- Create 10 city pages with LocalBusiness schema markup
- Add FAQ schema targeting "People Also Ask" boxes
- Submit URLs to Google Search Console for fast indexing

**Expected results:** 150-200% organic traffic increase within 6 months, 30-50 qualified leads/mo at $0 marginal cost.`,

  finance: `Q3 financial snapshot across your portfolio:

| Business | Revenue | Expenses | Net Profit | Margin |
|---|---|---|---|---|
| Mobile Tire | $12,500 | $4,500 | $8,000 | 64% |
| Outdoor Movies | $6,800 | $2,200 | $4,600 | 68% |
| Bounce Houses | $5,400 | $1,800 | $3,600 | 67% |
| Lead Gen | $4,200 | $800 | $3,400 | 81% |
| CoHost | $3,200 | $600 | $2,600 | 81% |

**Total: $32,100 revenue | $22,200 net profit | 69% avg margin**

ROI on 30 city pages: Investment ~$2,400 → Projected $8,400/mo additional revenue = **350% ROI in 6 months**.`,

  marketing: `Summer campaign plan for Bounce House Rentals:

**Facebook Marketplace (primary)**
- Post: "Bounce House Rentals — Lyons & Santiam Canyon — Book Now for Summer!"
- Include pricing ($150-300/day), availability calendar, and photos
- Budget: $200/mo for boosted posts targeting 25-45 year olds in Marion/Linn counties

**Google Ads (secondary)**
- Campaign: "bounce house rental near me" + "inflatable rental oregon"
- Budget: $150/mo, target 3-5 mile radius
- Expected: 20-30 clicks/day at $1.50 CPC, 15% conversion = 3-4 bookings/day

**Email sequence** for past customers: re-engagement + early booking discount`,
};

describe("Agent response quality evaluations", () => {
  it("CEO response scores ≥ 70 on quality rubric", () => {
    const result = evaluateAgentResponse("ceo", "What should I focus on today?", MOCK_RESPONSES.ceo);
    expect(result.issues).toHaveLength(0);
    expect(result.score).toBeGreaterThanOrEqual(70);
    expect(result.passed).toBe(true);
  });

  it("SEO response contains SEO-specific terminology", () => {
    const result = evaluateAgentResponse("seo", "Give me a 30-day SEO plan", MOCK_RESPONSES.seo);
    expect(result.passed).toBe(true);
    expect(result.score).toBeGreaterThanOrEqual(70);
  });

  it("Finance response contains financial data", () => {
    const result = evaluateAgentResponse("finance", "Show me Q3 financials", MOCK_RESPONSES.finance);
    expect(result.passed).toBe(true);
    expect(result.score).toBeGreaterThanOrEqual(80);
  });

  it("Marketing response includes campaign specifics", () => {
    const result = evaluateAgentResponse("marketing", "Create a summer campaign plan", MOCK_RESPONSES.marketing);
    expect(result.passed).toBe(true);
  });

  it("fails a generic non-actionable response", () => {
    const bad = "I understand your question. There are many things to consider.";
    const result = evaluateAgentResponse("ceo", "Help me", bad);
    expect(result.passed).toBe(false);
    expect(result.score).toBeLessThan(70);
  });

  it("fails a response that leaks error content", () => {
    const error = "An error occurred: TypeError undefined is not a function at line 42";
    const result = evaluateAgentResponse("ceo", "Plan my day", error);
    expect(result.passed).toBe(false);
  });

  it("evaluator score is bounded 0-100", () => {
    const result = evaluateAgentResponse("ceo", "test", "x");
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });
});

describe("Collaboration output quality", () => {
  const collabOutput = Object.values(MOCK_RESPONSES).join("\n\n");

  it("combined team output covers all major business areas", () => {
    expect(collabOutput).toMatch(/SEO|organic|keyword/i);
    expect(collabOutput).toMatch(/revenue|profit|\$/i);
    expect(collabOutput).toMatch(/campaign|marketing|ad/i);
    expect(collabOutput).toMatch(/focus|priorit|today/i);
  });

  it("combined output mentions Oregon businesses", () => {
    expect(collabOutput).toMatch(/Oregon|Bounce|Mobile Tire|CoHost/i);
  });
});
