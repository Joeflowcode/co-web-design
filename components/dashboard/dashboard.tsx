"use client";

import {
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  Bell,
  Calendar,
  DollarSign,
  Building2,
  FolderKanban,
  CheckSquare,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { getDashboardData } from "@/lib/db/seed";
import { AGENTS } from "@/lib/agents/definitions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

const data = getDashboardData();

const TREND_ICON = {
  up: TrendingUp,
  down: TrendingDown,
  flat: Minus,
};

const TREND_COLOR = {
  up: "text-emerald-500",
  down: "text-red-500",
  flat: "text-muted-foreground",
};

export function Dashboard() {
  return (
    <ScrollArea className="h-full">
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Executive Dashboard</h1>
            <p className="text-muted-foreground">Your AI team at a glance</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/chat?collaborate=true">
                <Sparkles className="h-4 w-4" />
                Team Collaboration
              </Link>
            </Button>
            <Button asChild>
              <Link href="/chat">
                Chat with Alex
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(data.stats.totalRevenue)}</p>
              <p className="text-xs text-emerald-500">Net: {formatCurrency(data.stats.netProfit)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Businesses</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{data.stats.activeBusinesses}</p>
              <p className="text-xs text-muted-foreground">Across Oregon portfolio</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
              <FolderKanban className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{data.stats.activeProjects}</p>
              <p className="text-xs text-muted-foreground">{data.stats.pendingTasks} pending tasks</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Notifications</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{data.notifications.length}</p>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Businesses */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Businesses</CardTitle>
              <CardDescription>Portfolio performance overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.businesses.map((biz) => (
                <div key={biz.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{biz.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{biz.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-emerald-500">{formatCurrency(biz.monthlyRevenue)}</p>
                    <p className="text-xs text-muted-foreground">/month</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.notifications.map((n) => (
                <div key={n.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-start gap-2">
                    {n.agentId && (
                      <div
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold"
                        style={{ backgroundColor: AGENTS[n.agentId].color }}
                      >
                        {AGENTS[n.agentId].name[0]}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* High Priority Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                High-Priority Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full shrink-0",
                      task.priority === "critical" ? "bg-red-500" : "bg-amber-500"
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{task.title}</p>
                    {task.dueDate && (
                      <p className="text-xs text-muted-foreground">Due {formatDate(task.dueDate)}</p>
                    )}
                  </div>
                  {task.assignedAgent && (
                    <span className="text-xs text-muted-foreground shrink-0">
                      {AGENTS[task.assignedAgent].name}
                    </span>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* KPIs */}
          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.kpis.map((kpi) => {
                const TrendIcon = TREND_ICON[kpi.trend];
                const pct = Math.min(100, (kpi.value / kpi.target) * 100);
                return (
                  <div key={kpi.id}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-medium">{kpi.label}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">
                          {kpi.value} / {kpi.target} {kpi.unit}
                        </span>
                        <TrendIcon className={cn("h-3.5 w-3.5", TREND_COLOR[kpi.trend])} />
                      </div>
                    </div>
                    <Progress value={pct} />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.calendar.map((event) => (
                <div key={event.id} className="flex gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <span className="text-xs font-bold">{new Date(event.start).getDate()}</span>
                    <span className="text-[10px] uppercase">
                      {new Date(event.start).toLocaleString("en", { month: "short" })}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    {event.description && (
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Conversations */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Conversations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {data.conversations.map((conv) => (
                <Link
                  key={conv.id}
                  href={`/chat?agent=${conv.agentId}`}
                  className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-accent transition-colors"
                >
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white text-xs font-bold"
                    style={{ backgroundColor: AGENTS[conv.agentId].color }}
                  >
                    {AGENTS[conv.agentId].name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{conv.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {AGENTS[conv.agentId].name} · {formatDate(conv.updatedAt)}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
