import { cn, formatCurrency, formatDate } from "@/lib/utils";

describe("cn (classname merge)", () => {
  it("merges class strings", () => {
    expect(cn("a", "b")).toBe("a b");
  });
  it("deduplicates tailwind classes", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
  it("handles conditionals", () => {
    expect(cn("base", false && "skip", "include")).toBe("base include");
  });
});

describe("formatCurrency", () => {
  it("formats positive dollars", () => {
    expect(formatCurrency(32100)).toBe("$32,100");
  });
  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0");
  });
  it("handles large numbers", () => {
    expect(formatCurrency(1000000)).toBe("$1,000,000");
  });
});

describe("formatDate", () => {
  it("formats an ISO date string", () => {
    const result = formatDate("2026-07-13T00:00:00Z");
    expect(result).toMatch(/Jul 13, 2026/);
  });
  it("accepts a Date object", () => {
    const result = formatDate(new Date("2026-01-01"));
    expect(result).toMatch(/Jan/);
  });
});
