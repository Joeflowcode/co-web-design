"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Send, Loader2, Users, Mic, Paperclip, Sparkles } from "lucide-react";
import { AGENTS } from "@/lib/agents/definitions";
import type { AgentId, AgentMessage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  agentId?: AgentId;
  agentMessages?: AgentMessage[];
}

interface ChatInterfaceProps {
  agentId: AgentId;
  collaborate?: boolean;
}

export function ChatInterface({ agentId, collaborate = false }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const agent = AGENTS[agentId];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const endpoint = collaborate ? "/api/collaborate" : "/api/chat";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          agentId,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (collaborate && data.agentMessages) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: data.orchestratorSummary,
            agentId: "ceo",
            agentMessages: data.agentMessages,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: data.content,
            agentId,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Sorry, I encountered an error. Please check your API configuration in Settings.",
          agentId,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <Avatar className="h-9 w-9">
          <AvatarFallback style={{ backgroundColor: agent.color }} className="text-white text-sm font-bold">
            {agent.name[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{agent.name}</h2>
          <p className="text-xs text-muted-foreground">{agent.title}</p>
        </div>
        {collaborate && (
          <div className="ml-auto flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Users className="h-3.5 w-3.5" />
            Team Collaboration
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="mx-auto max-w-3xl space-y-6 py-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-white"
                style={{ backgroundColor: agent.color }}
              >
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Chat with {agent.name}</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">{agent.description}</p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {[
                  "What should I focus on today?",
                  "Give me a weekly business review",
                  "Which business needs attention?",
                  "Create an action plan for this week",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setInput(suggestion);
                    }}
                    className="rounded-lg border border-border px-4 py-2.5 text-left text-sm hover:bg-accent transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}>
              {msg.role === "assistant" && (
                <Avatar className="h-8 w-8 mt-1 shrink-0">
                  <AvatarFallback
                    style={{ backgroundColor: msg.agentId ? AGENTS[msg.agentId].color : agent.color }}
                    className="text-white text-xs font-bold"
                  >
                    {msg.agentId ? AGENTS[msg.agentId].name[0] : "A"}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className={cn("max-w-[85%] space-y-3", msg.role === "user" ? "order-first" : "")}>
                {msg.agentMessages && (
                  <div className="space-y-3">
                    {msg.agentMessages.map((am) => (
                      <div key={am.agentId} className="rounded-xl border border-border bg-card p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <div
                            className="flex h-6 w-6 items-center justify-center rounded-full text-white text-xs font-bold"
                            style={{ backgroundColor: AGENTS[am.agentId].color }}
                          >
                            {am.agentName[0]}
                          </div>
                          <span className="text-sm font-medium">{am.agentName}</span>
                          <span className="text-xs text-muted-foreground">{AGENTS[am.agentId].title}</span>
                        </div>
                        <div className="prose prose-sm dark:prose-invert max-w-none text-sm">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{am.content}</ReactMarkdown>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {msg.role === "assistant" && msg.agentMessages && (
                    <p className="mb-2 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      Executive Summary
                    </p>
                  )}
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              {collaborate ? "Team is collaborating..." : `${agent.name} is thinking...`}
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="border-t border-border p-4">
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl items-end gap-2">
          <div className="relative flex-1">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${agent.name}...`}
              className="min-h-[52px] max-h-32 resize-none pr-20"
              rows={1}
            />
            <div className="absolute bottom-2 right-2 flex gap-1">
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8" title="Attach file">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8" title="Voice mode">
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button type="submit" size="icon" className="h-[52px] w-[52px] shrink-0" disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
