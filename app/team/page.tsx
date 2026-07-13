import { AGENT_LIST } from "@/lib/agents/definitions";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeamPage() {
  return (
    <AppShell>
      <ScrollArea className="h-full">
        <div className="mx-auto max-w-5xl space-y-6 p-6">
          <div>
            <h1 className="text-2xl font-bold">AI Executive Team</h1>
            <p className="text-muted-foreground">10 specialized agents working together for your businesses</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {AGENT_LIST.map((agent) => (
              <Card key={agent.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-white text-lg font-bold"
                      style={{ backgroundColor: agent.color }}
                    >
                      {agent.name[0]}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <CardDescription>{agent.title}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{agent.description}</p>
                  <ul className="space-y-1">
                    {agent.responsibilities.slice(0, 4).map((r) => (
                      <li key={r} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/chat?agent=${agent.id}`}>
                      <MessageSquare className="h-4 w-4" />
                      Chat with {agent.name}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>
    </AppShell>
  );
}
