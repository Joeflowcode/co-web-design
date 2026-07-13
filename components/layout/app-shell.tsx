"use client";

import { useState } from "react";
import { Sidebar, MobileHeader } from "@/components/layout/sidebar";
import type { AgentId } from "@/lib/types";

interface AppShellProps {
  children: React.ReactNode;
  selectedAgent?: AgentId;
  onAgentSelect?: (id: AgentId) => void;
}

export function AppShell({ children, selectedAgent, onAgentSelect }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        selectedAgent={selectedAgent}
        onAgentSelect={(id) => {
          onAgentSelect?.(id);
          setSidebarOpen(false);
        }}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
