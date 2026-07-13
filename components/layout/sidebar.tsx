"use client";

import {
  Crown,
  Search,
  Megaphone,
  Target,
  Settings,
  BarChart3,
  DollarSign,
  Code,
  Zap,
  Heart,
  LayoutDashboard,
  MessageSquare,
  Users,
  FolderKanban,
  Building2,
  Settings2,
  Moon,
  Sun,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { AGENT_LIST } from "@/lib/agents/definitions";
import type { AgentId } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const ICON_MAP: Record<string, React.ElementType> = {
  Crown,
  Search,
  Megaphone,
  Target,
  Settings,
  BarChart3,
  DollarSign,
  Code,
  Zap,
  Heart,
};

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/team", label: "AI Team", icon: Users },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/businesses", label: "Businesses", icon: Building2 },
  { href: "/settings", label: "Settings", icon: Settings2 },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  selectedAgent?: AgentId;
  onAgentSelect?: (id: AgentId) => void;
}

export function Sidebar({ open, onClose, selectedAgent, onAgentSelect }: SidebarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-sidebar transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span>Executive OS</span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Separator className="my-4" />

          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            AI Team
          </p>
          <div className="space-y-0.5">
            {AGENT_LIST.map((agent) => {
              const Icon = ICON_MAP[agent.icon] ?? Crown;
              const active = selectedAgent === agent.id;
              return (
                <button
                  key={agent.id}
                  onClick={() => onAgentSelect?.(agent.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors text-left",
                    active
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full text-white text-xs font-bold"
                    style={{ backgroundColor: agent.color }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{agent.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{agent.title}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>

        <div className="border-t border-border p-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </Button>
        </div>
      </aside>
    </>
  );
}

export function MobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="flex h-14 items-center gap-3 border-b border-border px-4 lg:hidden">
      <Button variant="ghost" size="icon" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>
      <div className="flex items-center gap-2 font-semibold">
        <Sparkles className="h-5 w-5 text-primary" />
        Executive OS
      </div>
    </header>
  );
}
