import { SEED_BUSINESSES, SEED_PROJECTS, SEED_TASKS, getDashboardData } from "@/lib/db/seed";

describe("Seed data", () => {
  it("has 5 businesses", () => {
    expect(SEED_BUSINESSES).toHaveLength(5);
  });

  it("all businesses have positive revenue", () => {
    for (const biz of SEED_BUSINESSES) {
      expect(biz.monthlyRevenue).toBeGreaterThan(0);
    }
  });

  it("net profit is positive for all businesses", () => {
    for (const biz of SEED_BUSINESSES) {
      expect(biz.monthlyRevenue - biz.monthlyExpenses).toBeGreaterThan(0);
    }
  });

  it("has at least 3 projects", () => {
    expect(SEED_PROJECTS.length).toBeGreaterThanOrEqual(3);
  });

  it("has at least 3 tasks", () => {
    expect(SEED_TASKS.length).toBeGreaterThanOrEqual(3);
  });

  it("getDashboardData returns correct total revenue", () => {
    const data = getDashboardData();
    const expected = SEED_BUSINESSES.reduce((s, b) => s + b.monthlyRevenue, 0);
    expect(data.stats.totalRevenue).toBe(expected);
  });

  it("getDashboardData net profit equals revenue minus expenses", () => {
    const data = getDashboardData();
    expect(data.stats.netProfit).toBe(data.stats.totalRevenue - data.stats.totalExpenses);
  });

  it("all businesses have valid status", () => {
    const valid = ["active", "planning", "paused"];
    for (const biz of SEED_BUSINESSES) {
      expect(valid).toContain(biz.status);
    }
  });
});
