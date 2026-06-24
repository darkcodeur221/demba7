"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MagnifyingGlassPlus, X, ArrowSquareOut } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type Panel = { tag: string; desc: string; src: string; accent: boolean };

/**
 * Before/after BPMN comparison with a click-to-zoom lightbox. The diagrams are
 * dense, so thumbnails only tease the shape; the modal shows them large and
 * links to the raw file for pixel-level reading. Thumbnails lazy-load.
 */
export function BpmnCompare({
  label,
  heading,
  body,
  caption,
  zoomHint,
  openLabel,
  asIs,
  toBe,
}: {
  label: string;
  heading: string;
  body: string;
  caption: string;
  zoomHint: string;
  openLabel: string;
  asIs: { tag: string; desc: string };
  toBe: { tag: string; desc: string };
}) {
  const [open, setOpen] = useState<Panel | null>(null);

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

  const panels: Panel[] = [
    { ...asIs, src: "/images/processus-reservation-as-is.jpg", accent: false },
    { ...toBe, src: "/images/processus-reservation-to-be.jpg", accent: true },
  ];

  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 sm:p-8">
      <span className="inline-flex items-center gap-2.5 text-sm font-medium text-brand">
        <span className="h-px w-6 bg-brand" aria-hidden />
        {label}
      </span>
      <h3 className="mt-4 text-xl font-semibold tracking-tight md:text-2xl">{heading}</h3>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{body}</p>

      {/* AS-IS / TO-BE: side by side on desktop, stacked on mobile */}
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {panels.map((panel) => (
          <figure key={panel.src} className="flex flex-col gap-3">
            <figcaption className="flex items-center gap-2.5">
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-xs font-semibold tracking-wide",
                  panel.accent
                    ? "bg-brand text-on-brand"
                    : "border border-border-strong bg-card text-muted"
                )}
              >
                {panel.tag}
              </span>
              <span className="text-sm font-medium text-foreground">{panel.desc}</span>
            </figcaption>

            <button
              type="button"
              onClick={() => setOpen(panel)}
              aria-label={`${panel.tag} ${panel.desc} — ${zoomHint}`}
              className="group relative block overflow-hidden rounded-[var(--radius-card)] border border-border bg-card"
            >
              <div className="relative aspect-[2/1] w-full">
                <Image
                  src={panel.src}
                  alt={`${panel.tag} ${panel.desc}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-2"
                />
              </div>
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors group-hover:bg-foreground/5">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                  <MagnifyingGlassPlus size={15} weight="bold" />
                  {zoomHint}
                </span>
              </span>
            </button>
          </figure>
        ))}
      </div>

      <p className="mt-5 text-xs text-muted">{caption}</p>

      {/* Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${open.tag} ${open.desc}`}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-foreground/80 p-4 backdrop-blur-sm sm:p-8"
        >
          <div className="flex w-full max-w-[1400px] items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2.5">
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-xs font-semibold tracking-wide",
                  open.accent ? "bg-brand text-on-brand" : "bg-background/90 text-foreground"
                )}
              >
                {open.tag}
              </span>
              <span className="text-sm font-medium text-background">{open.desc}</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Fermer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-background/90 text-foreground transition-colors hover:bg-background"
            >
              <X size={18} weight="bold" />
            </button>
          </div>

          {/* Stop propagation so clicking the image doesn't close the modal. */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[78vh] w-full max-w-[1400px] items-center justify-center overflow-auto rounded-lg bg-background p-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={open.src}
              alt={`${open.tag} ${open.desc}`}
              className="h-auto w-full object-contain"
            />
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
