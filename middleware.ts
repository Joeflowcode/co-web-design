import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public paths that don't require auth
const PUBLIC_PATHS = ["/login", "/api/auth", "/demo"];

// Rate limiting via in-memory store (use Upstash Redis in production)
const rateLimitMap = new Map<string, { count: number; reset: number }>();

function rateLimit(key: string, limit: number, windowMs: number): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.reset) {
    rateLimitMap.set(key, { count: 1, reset: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: limit - record.count };
}

export default auth(async function middleware(req: NextRequest & { auth?: unknown }) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Auth check (skip if AUTH_DISABLED for dev/demo)
  if (process.env.AUTH_DISABLED !== "true") {
    const session = (req as { auth?: { user?: unknown } }).auth;
    if (!session?.user && !pathname.startsWith("/api/")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Rate limit API routes
  if (pathname.startsWith("/api/chat") || pathname.startsWith("/api/collaborate")) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const isDemo = pathname.includes("demo") || req.headers.get("x-demo-mode") === "true";

    // Demo: 10 req/min, authenticated: 60 req/min
    const limit = isDemo ? 10 : 60;
    const { allowed, remaining } = rateLimit(`${ip}:${pathname}`, limit, 60_000);

    if (!allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait a moment before sending another message." },
        {
          status: 429,
          headers: { "X-RateLimit-Remaining": "0", "Retry-After": "60" },
        }
      );
    }

    const res = NextResponse.next();
    res.headers.set("X-RateLimit-Remaining", String(remaining));
    return res;
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
