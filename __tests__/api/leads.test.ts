/**
 * Tests for the /api/leads endpoint.
 * Uses lightweight fetch mocking — no real HTTP calls.
 */

import { POST } from "@/app/api/leads/route";
import { NextRequest } from "next/server";

function makeRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost:3000/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// Mock n8n to avoid real network calls
jest.mock("@/lib/tools/n8n", () => ({
  sendLeadToN8n: jest.fn().mockResolvedValue({ success: true, executionId: "mock-123" }),
}));

// Mock memory store
jest.mock("@/lib/memory/store", () => ({
  addMemory: jest.fn().mockResolvedValue({ id: "mem-1", title: "Test", category: "customer", tags: [] }),
  getMemories: jest.fn().mockResolvedValue([]),
  buildMemoryContext: jest.fn().mockResolvedValue(""),
}));

describe("POST /api/leads", () => {
  it("accepts a valid lead", async () => {
    const req = makeRequest({
      name: "John Smith",
      email: "john@example.com",
      service: "bounce-house-rental",
      source: "facebook",
      message: "Need a bounce house for July 4th",
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.saved).toBe(true);
  });

  it("rejects a lead with missing required fields", async () => {
    const req = makeRequest({ name: "John" }); // missing email, service
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/invalid/i);
  });

  it("rejects a lead with invalid email", async () => {
    const req = makeRequest({ name: "John", email: "not-an-email", service: "rental" });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("still succeeds if n8n is unavailable", async () => {
    const { sendLeadToN8n } = await import("@/lib/tools/n8n");
    (sendLeadToN8n as jest.Mock).mockResolvedValueOnce({ success: false, message: "connection refused" });

    const req = makeRequest({
      name: "Jane",
      email: "jane@test.com",
      service: "outdoor-movie",
      source: "website",
    });

    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.automated).toBe(false);
  });
});
