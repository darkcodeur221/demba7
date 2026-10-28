"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";

export type ProjectPanel = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  facts: { label: string; value: string }[];
  stack: string[];
  url?: string;
  linkLabel: string;
  image?: string;
};

function Panel({ p, cursorLabel }: { p: ProjectPanel; cursorLabel: string }) {
  const media = (
    <div className="img-zoom relative h-full min-h-[14rem] overflow-hidden rounded-[var(--radius-media)] border border-border bg-surface">
      {p.image && (
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover object-top"
        />
      )}
      <span className="display text-outline pointer-events-none absolute bottom-3 left-4 text-[4.5rem] leading-none [--outline:rgba(236,238,241,0.55)]">
        {p.index.split(".")[1]?.padStart(2, "0")}
      </span>
    </div>
  );

  return (
    <article className="group grid w-full gap-6 rounded-[var(--radius-card)] border border-border bg-card p-5 sm:p-7 lg:h-[min(76vh,44rem)] lg:w-[min(68rem,74vw)] lg:shrink-0 lg:grid-cols-12 lg:gap-8">
      <div className="aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:h-full">
        {p.url ? (
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor={cursorLabel}
            className="block h-full"
            aria-label={`${p.title} — ${p.linkLabel}`}
          >
            {media}
          </a>
        ) : (
          media
        )}
      </div>

      <div className="flex flex-col lg:col-span-5">
        <div className="flex items-baseline justify-between gap-4">
          <p className="tnum text-xs text-accent">{p.tagline}</p>
          <span className="tnum text-xs text-muted">{p.index}</span>
        </div>
        <h3 className="mt-3 text-[clamp(1.7rem,2.6vw,2.6rem)] font-bold leading-[1.02] tracking-[-0.035em] [font-stretch:112%]">
          {p.title}
        </h3>

        <dl className="mt-6 border-t border-border">
          {p.facts.map((f) => (
            <div key={f.label} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-border py-3">
              <dt className="tnum pt-0.5 text-[11px] text-muted">{f.label}</dt>
              <dd className="text-[15px] leading-relaxed text-foreground/90">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-6">
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          {p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link tnum inline-flex shrink-0 items-center gap-1 text-xs text-foreground"
            >
              <span className="link-draw">{p.linkLabel}</span>
              <ArrowUpRight
                size={13}
                className="text-accent transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * On wide screens the section pins and its panels travel sideways while the
 * page scrolls down: the section is made as tall as the horizontal distance,
 * and scroll progress through it drives the track's x. Phones, tablets and
 * reduced motion get the same panels stacked vertically.
 */
export function HorizontalProjects({
  panels,
  cursorLabel,
  hint,
}: {
  panels: ProjectPanel[];
  cursorLabel: string;
  hint: string;
}) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  const [distance, setDistance] = useState(0);
  const [viewport, setViewport] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setWide(mq.matches && !reduce);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduce]);

  useEffect(() => {
    if (!wide || !track.current) return;
    const measure = () => {
      if (!track.current) return;
      setViewport(window.innerHeight);
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [wide]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const counter = useTransform(scrollYProgress, (v) =>
    String(Math.min(panels.length, Math.floor(v * panels.length) + 1)).padStart(2, "0")
  );

  return (
    <div ref={section} style={wide ? { height: distance + viewport } : undefined} className="relative">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-[100dvh] lg:flex-col lg:justify-center lg:overflow-hidden">
        <motion.div
          ref={track}
          style={wide ? { x } : undefined}
          className="container-x flex flex-col gap-10 lg:w-max lg:max-w-none lg:flex-row lg:gap-8 lg:pr-[10vw]"
        >
          {panels.map((p) => (
            <Panel key={p.slug} p={p} cursorLabel={cursorLabel} />
          ))}
        </motion.div>

        {wide && (
          <div className="container-x mt-8 flex items-center gap-5">
            <span className="tnum text-xs text-muted">
              <motion.span className="text-foreground">{counter}</motion.span> /{" "}
              {String(panels.length).padStart(2, "0")}
            </span>
            <div className="relative h-px flex-1 bg-border">
              <motion.div
                className="absolute inset-y-0 left-0 w-full origin-left bg-brand"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
            <span className="tnum text-xs text-muted">{hint} →</span>
          </div>
        )}
      </div>
    </div>
  );
}
