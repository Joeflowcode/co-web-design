import { getMemories, addMemory, buildMemoryContext } from "@/lib/memory/store";

describe("Memory store (in-memory fallback)", () => {
  it("getMemories returns an array", async () => {
    const mems = await getMemories();
    expect(Array.isArray(mems)).toBe(true);
  });

  it("addMemory persists and retrieves a record", async () => {
    const saved = await addMemory({
      title: "Test business insight",
      content: "Oregon Mobile Tire peak season is May-September",
      category: "business",
      tags: ["roadside", "seasonal"],
    });

    expect(saved.id).toBeTruthy();
    expect(saved.title).toBe("Test business insight");
    expect(saved.category).toBe("business");
    expect(saved.tags).toContain("roadside");

    const results = await getMemories({ search: "Oregon Mobile Tire" });
    expect(results.some((m) => m.id === saved.id)).toBe(true);
  });

  it("filters by category", async () => {
    await addMemory({ title: "Brand colors", content: "Blue and white", category: "brand", tags: [] });
    const brandMems = await getMemories({ category: "brand" });
    expect(brandMems.every((m) => m.category === "brand")).toBe(true);
  });

  it("buildMemoryContext returns a string", async () => {
    const ctx = await buildMemoryContext("ceo");
    expect(typeof ctx).toBe("string");
  });
});
