import { NextResponse } from "next/server";
import { getDashboardData } from "@/lib/db/seed";
import { AGENT_LIST } from "@/lib/agents/definitions";

export async function GET() {
  return NextResponse.json({
    ...getDashboardData(),
    agents: AGENT_LIST,
  });
}
