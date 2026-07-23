"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface Agent {
  name: string;
  role: string;
  sprite: string;
  ring: string;
  glow: string;
  services: { name: string; icon: string }[];
}

const agents: Agent[] = [
  {
    name: "Pikachu",
    role: "Community Manager",
    sprite: "/images/pokemon-pikachu.png",
    ring: "ring-amber-400/60",
    glow: "drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]",
    services: [{ name: "Facebook", icon: "f" }],
  },
  {
    name: "Porygon",
    role: "Analytics",
    sprite: "/images/pokemon-porygon.png",
    ring: "ring-blue-400/60",
    glow: "drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]",
    services: [{ name: "Telegram", icon: "t" }],
  },
  {
    name: "Lugia",
    role: "Strategic Data",
    sprite: "/images/pokemon-lugia.png",
    ring: "ring-purple-400/60",
    glow: "drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]",
    services: [
      { name: "GA4", icon: "g" },
      { name: "Search Console", icon: "s" },
      { name: "Telegram", icon: "t" },
    ],
  },
  {
    name: "Celebi",
    role: "SEO",
    sprite: "/images/pokemon-celebi.png",
    ring: "ring-emerald-400/60",
    glow: "drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]",
    services: [{ name: "WooCommerce", icon: "w" }],
  },
];

const serviceColors: Record<string, string> = {
  f: "bg-blue-600",
  t: "bg-sky-500",
  g: "bg-orange-500",
  s: "bg-green-600",
  w: "bg-purple-600",
};

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
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-[#0a0e1a] p-6 sm:p-8 lg:p-10">
      <span className="inline-flex items-center gap-2.5 text-sm font-medium text-blue-400">
        <span className="h-px w-8 bg-gradient-to-r from-blue-400 to-purple-400" aria-hidden />
        {label}
      </span>
      <h3 className="mt-4 text-xl font-bold tracking-tight text-white md:text-2xl">{heading}</h3>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-400">{body}</p>

      {/* Agent network */}
      <div className="relative mt-10">
        {/* Connection lines (SVG behind cards) */}
        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          aria-hidden
        >
          <line
            x1="25%" y1="50%" x2="50%" y2="30%"
            className="stroke-blue-500/20" strokeWidth="1" strokeDasharray="6 4"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3s" repeatCount="indefinite" />
          </line>
          <line
            x1="75%" y1="50%" x2="50%" y2="30%"
            className="stroke-purple-500/20" strokeWidth="1" strokeDasharray="6 4"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3s" repeatCount="indefinite" />
          </line>
          <line
            x1="25%" y1="50%" x2="75%" y2="50%"
            className="stroke-white/5" strokeWidth="1" strokeDasharray="6 4"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="4s" repeatCount="indefinite" />
          </line>
        </svg>

        {/* Central hub */}
        <div className="relative mx-auto mb-8 flex w-fit flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 shadow-[0_0_30px_-5px_rgba(249,115,22,0.4)]">
            <span className="text-lg font-black text-white">n8n</span>
          </div>
          <span className="text-xs font-medium text-gray-500">Orchestrateur</span>
        </div>

        {/* Agent grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((agent, i) => (
            <div
              key={agent.name}
              className="group relative flex flex-col items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06]"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Sprite */}
              <div className={cn("relative h-20 w-20 transition-all duration-500 group-hover:scale-110", agent.glow)}>
                <div className={cn("absolute inset-0 rounded-full ring-2", agent.ring)} />
                <Image
                  src={agent.sprite}
                  alt={agent.name}
                  width={80}
                  height={80}
                  className="relative z-10 object-contain drop-shadow-lg"
                />
              </div>

              {/* Name + role */}
              <div className="text-center">
                <p className="text-sm font-bold text-white">{agent.name}</p>
                <p className="text-xs text-gray-500">{agent.role}</p>
              </div>

              {/* Service badges */}
              <div className="flex flex-wrap justify-center gap-1.5">
                {agent.services.map((svc) => (
                  <span
                    key={svc.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-gray-400"
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full", serviceColors[svc.icon])} />
                    {svc.name}
                  </span>
                ))}
              </div>

              {/* Pulse indicator */}
              <span className="absolute right-3 top-3 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-gray-600">
        Feugjay — Intelligence en Ecosysteme. 4 agents autonomes, orchestres par n8n.
      </p>
    </div>
  );
}
