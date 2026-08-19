"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative flex items-center justify-center gap-2 bg-primary px-4 py-2 text-sm text-primary-foreground">
      <Sparkles className="h-4 w-4 shrink-0" />
      <span>
        <strong>Live Demo</strong> — Read-only mode with sample data. Responses are AI-generated
        using shared credits (10 req/min).{" "}
        <a href="/login" className="underline font-medium">
          Sign in
        </a>{" "}
        for full access.
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
