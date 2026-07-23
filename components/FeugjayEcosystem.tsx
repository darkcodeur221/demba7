"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Megaphone,
  ChartLineUp,
  Compass,
  MagnifyingGlass,
  MagnifyingGlassPlus,
  X,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type Agent = {
  name: string;
  role: string;
  icon: typeof Megaphone;
  integrations: string[];
};

const agents: Agent[] = [
  { name: "Pikachu", role: "Community Manager", icon: Megaphone, integrations: ["Facebook"] },
  { name: "Porygon", role: "Analytics", icon: ChartLineUp, integrations: ["Telegram"] },
  {
    name: "Lugia",
    role: "Strategic Data",
    icon: Compass,
    integrations: ["GA4", "Search Console", "Google Trends", "WooCommerce"],
  },
  { name: "Celebi", role: "SEO", icon: MagnifyingGlass, integrations: ["WooCommerce"] },
];

type Shot = { src: string; caption: string };

export function FeugjayEcosystem({
  label,
  heading,
  body,
  proofLabel,
  zoomHint,
  openLabel,
  lugiaCaption,
  celebiCaption,
  architectureCaption,
}: {
  label: string;
  heading: string;
  body: string;
  proofLabel: string;
  zoomHint: string;
  openLabel: string;
  lugiaCaption: string;
  celebiCaption: string;
  architectureCaption: string;
}) {
  const [open, setOpen] = useState<Shot | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const proofs: Shot[] = [
    { src: "/images/lugia-bot.jpg", caption: lugiaCaption },
    { src: "/images/celebi-bot.jpg", caption: celebiCaption },
  ];
  const architecture: Shot = {
    src: "/images/feugjay-organigramme.jpg",
    caption: architectureCaption,
  };

  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-surface/50 p-6 sm:p-8">
      <span className="inline-flex items-center gap-2.5 text-sm font-medium text-brand">
        <span className="h-px w-8 bg-gradient-to-r from-brand to-brand-2" aria-hidden />
        {label}
      </span>
      <h3 className="mt-4 text-xl font-bold tracking-tight md:text-2xl">{heading}</h3>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{body}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-10">
        {/* Agent roster */}
        <div className="flex flex-col gap-3">
          {agents.map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.name}
                className="flex items-start gap-4 rounded-[var(--radius-card)] border border-border bg-card p-4 transition-colors hover:border-border-strong"
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-brand">
                  <Icon size={20} weight="bold" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="font-semibold text-foreground">{agent.name}</p>
                    <p className="text-xs font-medium text-brand">{agent.role}</p>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {agent.integrations.map((it) => (
                      <span
                        key={it}
                        className="inline-flex items-center rounded-md border border-border bg-surface/60 px-2 py-0.5 text-[11px] font-medium text-muted"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architecture diagram */}
        <button
          type="button"
          onClick={() => setOpen(architecture)}
          aria-label={`${architectureCaption} — ${zoomHint}`}
          className="group relative block overflow-hidden rounded-[var(--radius-card)] border border-border bg-[#0a0e1a]"
        >
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={architecture.src}
              alt={architectureCaption}
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-3"
            />
          </div>
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              <MagnifyingGlassPlus size={15} weight="bold" />
              {zoomHint}
            </span>
          </span>
        </button>
      </div>

      {/* Proof in production */}
      <div className="mt-8">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-brand">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {proofLabel}
        </span>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {proofs.map((shot) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => setOpen(shot)}
              aria-label={`${shot.caption} — ${zoomHint}`}
              className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-card text-left transition-colors hover:border-border-strong"
            >
              <div className="img-zoom relative aspect-[16/11] w-full overflow-hidden bg-surface">
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-top"
                />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/15">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                    <MagnifyingGlassPlus size={15} weight="bold" />
                    {zoomHint}
                  </span>
                </span>
              </div>
              <p className="border-t border-border px-4 py-2.5 text-xs text-muted">{shot.caption}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.caption}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-foreground/80 p-4 backdrop-blur-sm sm:p-8"
        >
          <div className="flex w-full max-w-[1100px] items-center justify-between gap-3">
            <span className="text-sm font-medium text-background">{open.caption}</span>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Fermer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-background/90 text-foreground transition-colors hover:bg-background"
            >
              <X size={18} weight="bold" />
            </button>
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[78vh] w-full max-w-[1100px] items-center justify-center overflow-auto rounded-lg bg-background p-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={open.src} alt={open.caption} className="h-auto w-full object-contain" />
          </div>
          <a
            href={open.src}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-background/90 transition-colors hover:text-background"
          >
            <ArrowSquareOut size={15} weight="bold" />
            {openLabel}
          </a>
        </div>
      )}
    </div>
  );
}
