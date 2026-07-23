"use client";

import { cn } from "@/lib/utils";

interface Agent {
  name: string;
  role: string;
  gradient: string;
  glow: string;
  dot: string;
  icon: string;
  services: { name: string; emoji: string }[];
}

const agents: Agent[] = [
  {
    name: "Pikachu",
    role: "Community Manager",
    gradient: "from-amber-500 to-yellow-400",
    glow: "shadow-[0_0_24px_-4px_rgba(245,158,11,0.3)]",
    dot: "bg-amber-500",
    icon: "⚡",
    services: [{ name: "Facebook", emoji: "📘" }],
  },
  {
    name: "Porygon",
    role: "Analytics",
    gradient: "from-blue-600 to-indigo-500",
    glow: "shadow-[0_0_24px_-4px_rgba(79,70,229,0.3)]",
    dot: "bg-blue-500",
    icon: "📊",
    services: [{ name: "Telegram", emoji: "✈️" }],
  },
  {
    name: "Lugia",
    role: "Strategic Data",
    gradient: "from-purple-600 to-violet-500",
    glow: "shadow-[0_0_24px_-4px_rgba(139,92,246,0.3)]",
    dot: "bg-purple-500",
    icon: "🐉",
    services: [
      { name: "GA4", emoji: "📈" },
      { name: "Search Console", emoji: "🔍" },
      { name: "Telegram", emoji: "✈️" },
    ],
  },
  {
    name: "Celebi",
    role: "SEO",
    gradient: "from-emerald-600 to-green-500",
    glow: "shadow-[0_0_24px_-4px_rgba(16,185,129,0.3)]",
    dot: "bg-emerald-500",
    icon: "🌿",
    services: [{ name: "WooCommerce", emoji: "🛍️" }],
  },
];

export function FeugjayEcosystem({
  label,
  heading,
  body,
}: {
  label: string;
  heading: string;
  body: string;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-surface/50 p-6 sm:p-8">
      <span className="inline-flex items-center gap-2.5 text-sm font-medium text-brand">
        <span className="h-px w-8 bg-gradient-to-r from-brand to-brand-2" aria-hidden />
        {label}
      </span>
      <h3 className="mt-4 text-xl font-bold tracking-tight md:text-2xl">{heading}</h3>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{body}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className={cn(
              "card-glow group relative flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-card p-5",
              "hover:" + agent.glow
            )}
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-lg shadow-sm transition-shadow",
                  agent.gradient,
                )}
              >
                {agent.icon}
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">{agent.name}</p>
                <p className="text-xs text-muted">{agent.role}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {agent.services.map((svc) => (
                <span
                  key={svc.name}
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface/50 px-2 py-0.5 text-[11px] font-medium text-muted"
                >
                  <span className="text-[10px]">{svc.emoji}</span>
                  {svc.name}
                </span>
              ))}
            </div>

            {/* Pulse dot */}
            <span className="absolute right-3 top-3 flex h-2.5 w-2.5">
              <span
                className={cn(
                  "absolute inline-flex h-full w-full animate-ping rounded-full opacity-40",
                  agent.dot
                )}
              />
              <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", agent.dot)} />
            </span>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs text-muted">
        Feugjay — Intelligence en Ecosysteme. 4 agents autonomes, orchestres par n8n.
      </p>
    </div>
  );
}
