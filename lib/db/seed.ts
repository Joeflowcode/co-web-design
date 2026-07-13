import type {
  Business,
  Project,
  Task,
  KPI,
  Notification,
  CalendarEvent,
  Conversation,
} from "@/lib/types";

export const SEED_BUSINESSES: Business[] = [
  {
    id: "biz-leadgen",
    name: "Oregon Lead Gen Sites",
    slug: "oregon-lead-gen",
    description: "Local SEO lead generation websites across Oregon cities",
    industry: "Digital Marketing / SEO",
    status: "active",
    monthlyRevenue: 4200,
    monthlyExpenses: 800,
    website: "https://example.com",
    location: "Oregon",
    createdAt: "2025-01-15T00:00:00Z",
  },
  {
    id: "biz-outdoor-movies",
    name: "Outdoor Movie Rentals",
    slug: "outdoor-movies",
    description: "Inflatable screen and outdoor cinema rental service",
    industry: "Event Rentals",
    status: "active",
    monthlyRevenue: 6800,
    monthlyExpenses: 2200,
    location: "Detroit Lake, OR",
    createdAt: "2025-02-01T00:00:00Z",
  },
  {
    id: "biz-bounce",
    name: "Bounce House Rentals",
    slug: "bounce-houses",
    description: "Party inflatable rentals in Lyons and Santiam Canyon",
    industry: "Party Rentals",
    status: "active",
    monthlyRevenue: 5400,
    monthlyExpenses: 1800,
    location: "Lyons, OR",
    createdAt: "2025-02-15T00:00:00Z",
  },
  {
    id: "biz-cohost",
    name: "Oregon CoHost",
    slug: "oregon-cohost",
    description: "Short-term rental co-hosting and property management",
    industry: "Property Management",
    status: "active",
    monthlyRevenue: 3200,
    monthlyExpenses: 600,
    location: "Oregon",
    createdAt: "2025-03-01T00:00:00Z",
  },
  {
    id: "biz-roadside",
    name: "Oregon Mobile Tire",
    slug: "mobile-roadside",
    description: "24/7 mobile tire and roadside assistance",
    industry: "Automotive Services",
    status: "active",
    monthlyRevenue: 12500,
    monthlyExpenses: 4500,
    website: "https://oregonmobiletire.com",
    location: "Oregon",
    createdAt: "2024-11-01T00:00:00Z",
  },
];

export const SEED_PROJECTS: Project[] = [
  {
    id: "proj-city-pages",
    businessId: "biz-leadgen",
    title: "30 City Pages for Oregon Lead Gen",
    description: "Create SEO-optimized city pages for top Oregon markets",
    status: "active",
    priority: "high",
    dueDate: "2026-08-01",
    assignedAgent: "seo",
    createdAt: "2026-06-01T00:00:00Z",
  },
  {
    id: "proj-fb-campaigns",
    businessId: "biz-bounce",
    title: "Facebook Marketplace Campaigns",
    description: "Launch summer bounce house rental campaigns",
    status: "active",
    priority: "high",
    dueDate: "2026-07-20",
    assignedAgent: "marketing",
    createdAt: "2026-06-15T00:00:00Z",
  },
  {
    id: "proj-booking-automation",
    businessId: "biz-outdoor-movies",
    title: "Booking Automation Workflow",
    description: "n8n workflow for inquiry → booking → confirmation",
    status: "active",
    priority: "medium",
    dueDate: "2026-07-30",
    assignedAgent: "automation",
    createdAt: "2026-06-20T00:00:00Z",
  },
];

export const SEED_TASKS: Task[] = [
  {
    id: "task-1",
    businessId: "biz-leadgen",
    projectId: "proj-city-pages",
    title: "Research keywords for Salem, Eugene, Portland",
    status: "in-progress",
    priority: "high",
    assignedAgent: "seo",
    dueDate: "2026-07-15",
    createdAt: "2026-07-01T00:00:00Z",
  },
  {
    id: "task-2",
    businessId: "biz-bounce",
    title: "Create summer pricing sheet",
    status: "todo",
    priority: "medium",
    assignedAgent: "finance",
    dueDate: "2026-07-18",
    createdAt: "2026-07-05T00:00:00Z",
  },
  {
    id: "task-3",
    businessId: "biz-roadside",
    title: "Update Google Business Profile photos",
    status: "todo",
    priority: "high",
    assignedAgent: "seo",
    dueDate: "2026-07-14",
    createdAt: "2026-07-10T00:00:00Z",
  },
  {
    id: "task-4",
    businessId: "biz-cohost",
    title: "Draft guest welcome SOP",
    status: "todo",
    priority: "medium",
    assignedAgent: "operations",
    dueDate: "2026-07-22",
    createdAt: "2026-07-08T00:00:00Z",
  },
];

export const SEED_KPIS: KPI[] = [
  { id: "kpi-1", businessId: "biz-leadgen", label: "Organic Traffic", value: 2400, target: 5000, unit: "visits/mo", trend: "up" },
  { id: "kpi-2", businessId: "biz-bounce", label: "Bookings", value: 18, target: 30, unit: "bookings/mo", trend: "up" },
  { id: "kpi-3", businessId: "biz-roadside", label: "Service Calls", value: 85, target: 100, unit: "calls/mo", trend: "flat" },
  { id: "kpi-4", businessId: "biz-outdoor-movies", label: "Events Booked", value: 12, target: 20, unit: "events/mo", trend: "up" },
];

export const SEED_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    title: "SEO Opportunity",
    message: "Morgan recommends creating 30 city pages — projected 420% ROI",
    type: "action",
    read: false,
    agentId: "seo",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "notif-2",
    title: "Follow-up Due",
    message: "3 leads from bounce house inquiries need follow-up today",
    type: "warning",
    read: false,
    agentId: "sales",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "notif-3",
    title: "Weekly Review",
    message: "Alex scheduled your weekly business review for tomorrow at 9 AM",
    type: "info",
    read: true,
    agentId: "ceo",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const SEED_CALENDAR: CalendarEvent[] = [
  {
    id: "cal-1",
    title: "Weekly Business Review",
    description: "Review all 5 businesses with CEO Assistant",
    start: new Date(Date.now() + 86400000).toISOString(),
    end: new Date(Date.now() + 86400000 + 3600000).toISOString(),
    agentId: "ceo",
  },
  {
    id: "cal-2",
    title: "Bounce House Delivery - Smith Party",
    start: new Date(Date.now() + 172800000).toISOString(),
    end: new Date(Date.now() + 172800000 + 7200000).toISOString(),
    businessId: "biz-bounce",
  },
  {
    id: "cal-3",
    title: "Outdoor Movie Setup - Detroit Lake",
    start: new Date(Date.now() + 259200000).toISOString(),
    end: new Date(Date.now() + 259200000 + 14400000).toISOString(),
    businessId: "biz-outdoor-movies",
  },
];

export const SEED_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    title: "Lead gen city page strategy",
    agentId: "ceo",
    businessId: "biz-leadgen",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "conv-2",
    title: "Summer marketing campaigns",
    agentId: "marketing",
    businessId: "biz-bounce",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

export function getDashboardData() {
  const totalRevenue = SEED_BUSINESSES.reduce((s, b) => s + b.monthlyRevenue, 0);
  const totalExpenses = SEED_BUSINESSES.reduce((s, b) => s + b.monthlyExpenses, 0);
  const activeProjects = SEED_PROJECTS.filter((p) => p.status === "active");
  const highPriorityTasks = SEED_TASKS.filter(
    (t) => t.status !== "done" && (t.priority === "high" || t.priority === "critical")
  );

  return {
    businesses: SEED_BUSINESSES,
    projects: activeProjects,
    tasks: highPriorityTasks,
    kpis: SEED_KPIS,
    notifications: SEED_NOTIFICATIONS.filter((n) => !n.read),
    calendar: SEED_CALENDAR,
    conversations: SEED_CONVERSATIONS,
    stats: {
      totalRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses,
      activeBusinesses: SEED_BUSINESSES.filter((b) => b.status === "active").length,
      activeProjects: activeProjects.length,
      pendingTasks: SEED_TASKS.filter((t) => t.status !== "done").length,
    },
  };
}
