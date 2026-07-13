import { getDashboardData } from "@/lib/db/seed";
import { AGENTS } from "@/lib/agents/definitions";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatDate } from "@/lib/utils";

const { projects, tasks } = getDashboardData();

export default function ProjectsPage() {
  return (
    <AppShell>
      <ScrollArea className="h-full">
        <div className="mx-auto max-w-5xl space-y-6 p-6">
          <div>
            <h1 className="text-2xl font-bold">Projects & Tasks</h1>
            <p className="text-muted-foreground">Active work across your business portfolio</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Active Projects</h2>
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{project.title}</CardTitle>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        project.priority === "high" || project.priority === "critical"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {project.priority}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    {project.dueDate && <span>Due {formatDate(project.dueDate)}</span>}
                    {project.assignedAgent && (
                      <span>Assigned to {AGENTS[project.assignedAgent].name}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">All Tasks</h2>
            <div className="space-y-2">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 rounded-lg border border-border p-4">
                  <div
                    className={cn(
                      "h-2.5 w-2.5 rounded-full shrink-0",
                      task.status === "done"
                        ? "bg-emerald-500"
                        : task.status === "in-progress"
                          ? "bg-blue-500"
                          : "bg-muted-foreground"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{task.title}</p>
                    {task.dueDate && (
                      <p className="text-xs text-muted-foreground">Due {formatDate(task.dueDate)}</p>
                    )}
                  </div>
                  <span className="text-xs capitalize text-muted-foreground">{task.status}</span>
                  {task.assignedAgent && (
                    <span className="text-xs text-muted-foreground">{AGENTS[task.assignedAgent].name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </AppShell>
  );
}
