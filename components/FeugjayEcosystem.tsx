"use client";

import { cn } from "@/lib/utils";

interface Agent {
  name: string;
  role: string;
  color: string;
  icon: string;
  services: string[];
}

const agents: Agent[] = [
  {
    name: "Pikachu",
    role: "Community Manager",
    color: "from-amber-500 to-yellow-400",
    icon: "⚡",
    services: ["Facebook"],
  },
  {
    name: "Porygon",
    role: "Analytics",
    color: "from-blue-600 to-indigo-500",
    icon: "📊",
    services: ["Telegram"],
  },
  {
    name: "Lugia",
    role: "Strategic Data",
    color: "from-purple-600 to-violet-500",
    icon: "🐉",
    services: ["GA4", "Search Console", "Telegram"],
  },
  {
    name: "Celebi",
    role: "SEO",
    color: "from-emerald-600 to-green-500",
    icon: "🌿",
    services: ["WooCommerce"],
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
    <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 sm:p-8">
      <span className="inline-flex items-center gap-2.5 text-sm font-medium text-brand">
        <span className="h-px w-6 bg-brand" aria-hidden />
        {label}
      </span>
      <h3 className="mt-4 text-xl font-semibold tracking-tight md:text-2xl">{heading}</h3>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{body}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="group relative flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-card p-5 transition-colors hover:border-border-strong"
          >
            {/* Agent icon + name */}
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-lg shadow-sm",
                  agent.color,
                )}
              >
                {agent.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{agent.name}</p>
                <p className="text-xs text-muted">{agent.role}</p>
              </div>
            </div>

            {/* Connected services */}
            <div className="flex flex-wrap gap-1.5">
              {agent.services.map((svc) => (
                <span
                  key={svc}
                  className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-[11px] font-medium text-muted"
                >
                  <ServiceIcon name={svc} />
                  {svc}
                </span>
              ))}
            </div>

            {/* Pulse dot */}
            <span className="absolute right-3 top-3 flex h-2.5 w-2.5">
              <span
                className={cn(
                  "absolute inline-flex h-full w-full animate-ping rounded-full opacity-50",
                  agent.name === "Pikachu"
                    ? "bg-amber-400"
                    : agent.name === "Porygon"
                      ? "bg-blue-400"
                      : agent.name === "Lugia"
                        ? "bg-purple-400"
                        : "bg-emerald-400",
                )}
              />
              <span
                className={cn(
                  "relative inline-flex h-2.5 w-2.5 rounded-full",
                  agent.name === "Pikachu"
                    ? "bg-amber-500"
                    : agent.name === "Porygon"
                      ? "bg-blue-500"
                      : agent.name === "Lugia"
                        ? "bg-purple-500"
                        : "bg-emerald-500",
                )}
              />
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

function ServiceIcon({ name }: { name: string }) {
  const icons: Record<string, string> = {
    Facebook: "🟦",
    Telegram: "✈️",
    GA4: "📈",
    "Search Console": "🔍",
    WooCommerce: "🛍️",
  };
  return <span className="text-[10px]">{icons[name] ?? "•"}</span>;
}
