"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { ChatInterface } from "@/components/chat/chat-interface";
import type { AgentId } from "@/lib/types";

function ChatPageContent() {
  const searchParams = useSearchParams();
  const [agentId, setAgentId] = useState<AgentId>("ceo");
  const collaborate = searchParams.get("collaborate") === "true";

  useEffect(() => {
    const agent = searchParams.get("agent");
    if (agent) setAgentId(agent as AgentId);
  }, [searchParams]);

  return (
    <AppShell selectedAgent={agentId} onAgentSelect={setAgentId}>
      <ChatInterface agentId={agentId} collaborate={collaborate} />
    </AppShell>
  );
}

export default function ChatPage() {
  return (
    <Suspense>
      <ChatPageContent />
    </Suspense>
  );
}
