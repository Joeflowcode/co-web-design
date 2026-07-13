import { NextRequest, NextResponse } from "next/server";
import { getMemories, addMemory } from "@/lib/memory/store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? undefined;
  const category = searchParams.get("category") ?? undefined;

  const memories = await getMemories({ search, category: category as never });
  return NextResponse.json({ memories });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const memory = await addMemory(body);
  return NextResponse.json({ memory });
}
