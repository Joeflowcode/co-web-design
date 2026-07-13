import { getDashboardData } from "@/lib/db/seed";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/utils";

const { businesses } = getDashboardData();

export default function BusinessesPage() {
  return (
    <AppShell>
      <ScrollArea className="h-full">
        <div className="mx-auto max-w-5xl space-y-6 p-6">
          <div>
            <h1 className="text-2xl font-bold">Businesses</h1>
            <p className="text-muted-foreground">Your portfolio of ventures</p>
          </div>
          <div className="grid gap-4">
            {businesses.map((biz) => (
              <Card key={biz.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{biz.name}</CardTitle>
                      <CardDescription>{biz.industry}</CardDescription>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500 capitalize">
                      {biz.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{biz.description}</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                      <p className="text-lg font-semibold text-emerald-500">{formatCurrency(biz.monthlyRevenue)}/mo</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Expenses</p>
                      <p className="text-lg font-semibold">{formatCurrency(biz.monthlyExpenses)}/mo</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Net Profit</p>
                      <p className="text-lg font-semibold">{formatCurrency(biz.monthlyRevenue - biz.monthlyExpenses)}/mo</p>
                    </div>
                  </div>
                  {(biz.website || biz.location) && (
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      {biz.location && <span>{biz.location}</span>}
                      {biz.website && (
                        <a href={biz.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {biz.website}
                        </a>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>
    </AppShell>
  );
}
