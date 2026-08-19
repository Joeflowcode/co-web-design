import { AGENTS, AGENT_LIST, getAgent, getAgentIds } from "@/lib/agents/definitions";

describe("Agent definitions", () => {
  it("exports exactly 10 agents", () => {
    expect(AGENT_LIST).toHaveLength(10);
  });

  it("every agent has required fields", () => {
    for (const agent of AGENT_LIST) {
      expect(agent.id).toBeTruthy();
      expect(agent.name).toBeTruthy();
      expect(agent.title).toBeTruthy();
      expect(agent.systemPrompt.length).toBeGreaterThan(100);
      expect(agent.color).toMatch(/^#[0-9a-f]{6}$/i);
      expect(agent.responsibilities.length).toBeGreaterThan(0);
    }
  });

  it("getAgent returns correct agent by id", () => {
    const ceo = getAgent("ceo");
    expect(ceo.id).toBe("ceo");
    expect(ceo.name).toBe("Alex");
  });

  it("CEO system prompt mentions orchestration", () => {
    expect(AGENTS.ceo.systemPrompt.toLowerCase()).toMatch(/orchestrat|prioriti|plan/);
  });

  it("SEO agent system prompt mentions keywords", () => {
    expect(AGENTS.seo.systemPrompt.toLowerCase()).toMatch(/keyword|seo|organic/);
  });

  it("getAgentIds returns all 10 IDs", () => {
    const ids = getAgentIds();
    expect(ids).toHaveLength(10);
    expect(ids).toContain("ceo");
    expect(ids).toContain("seo");
    expect(ids).toContain("finance");
  });

  it("all agent colors are unique", () => {
    const colors = AGENT_LIST.map((a) => a.color);
    const unique = new Set(colors);
    expect(unique.size).toBe(colors.length);
  });
});
