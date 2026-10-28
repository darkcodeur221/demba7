"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";

export type ProjectPanel = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  problem?: string;
  result?: string;
  stack: string[];
  url?: string;
  linkLabel: string;
  image?: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

function Panel({ p, cursorLabel, reduce }: { p: ProjectPanel; cursorLabel: string; reduce: boolean }) {
  const media = (
    <div className="img-zoom relative aspect-[16/9] overflow-hidden rounded-[var(--radius-media)] border border-border bg-surface">
      {p.image && (
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="(max-width: 1024px) 100vw, 30vw"
          className="object-cover object-top"
        />
      )}
      <span className="display text-outline pointer-events-none absolute bottom-2 left-3 text-[3rem] leading-none [--outline:rgba(236,238,241,0.6)]">
        {p.index.split(".")[1]?.padStart(2, "0")}
      </span>
    </div>
  );

  return (
    // Cards rise as they slide in from the right: the pinned frame clips
    // them, so each one only counts as in view once it is on screen.
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 48, rotate: 1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="group flex w-full flex-col rounded-[var(--radius-card)] border border-border bg-card p-4 transition-[border-color,box-shadow] duration-500 hover:border-brand-2 hover:shadow-[0_28px_60px_-32px_rgba(12,13,16,0.4)] sm:p-5 lg:w-[min(27rem,31vw)] lg:shrink-0"
    >
      {p.url ? (
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor={cursorLabel}
          className="block"
          aria-label={`${p.title} — ${p.linkLabel}`}
        >
          {media}
        </a>
      ) : (
        media
      )}

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <p className="tnum text-xs text-accent">{p.tagline}</p>
          <span className="tnum text-xs text-muted">{p.index}</span>
        </div>
        <h3 className="mt-2 text-[clamp(1.3rem,1.7vw,1.65rem)] font-bold leading-[1.05] tracking-[-0.03em] [font-stretch:110%]">
          {p.title}
        </h3>
        {p.problem && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{p.problem}</p>}
        {p.result && (
          <p className="mt-3 border-l-2 border-brand pl-3 text-[15px] leading-snug text-foreground">{p.result}</p>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-5">
          <div className="flex flex-wrap gap-1.5">
            {p.stack.slice(0, 3).map((t) => (
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
    </motion.article>
  );
}

/**
 * On wide screens the section pins and its cards travel sideways while the
 * page scrolls down: the section is made as tall as the horizontal distance,
 * and scroll progress through it drives the track's x. Scrolling fast leans
 * the track a little, like a reel pulled by its edge. Phones, tablets and
 * reduced motion get the same cards stacked vertically.
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
  const reduce = !!useReducedMotion();
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
  const { scrollY } = useScroll();
  const skewX = useSpring(useTransform(useVelocity(scrollY), [-2500, 0, 2500], [3, 0, -3]), {
    stiffness: 220,
    damping: 40,
  });
  const counter = useTransform(scrollYProgress, (v) =>
    String(Math.min(panels.length, Math.floor(v * panels.length) + 1)).padStart(2, "0")
  );

  return (
    <div ref={section} style={wide ? { height: distance + viewport } : undefined} className="relative">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-[100dvh] lg:flex-col lg:justify-center lg:overflow-hidden">
        <motion.div
          ref={track}
          style={wide ? { x, skewX } : undefined}
          className="container-x flex flex-col gap-8 lg:w-max lg:max-w-none lg:flex-row lg:items-stretch lg:gap-6 lg:pr-[8vw]"
        >
          {panels.map((p) => (
            <Panel key={p.slug} p={p} cursorLabel={cursorLabel} reduce={reduce} />
          ))}
        </motion.div>

        {wide && (
          <div className="container-x mt-10 flex items-center gap-5">
            <span className="tnum text-xs text-muted">
              <motion.span className="text-foreground">{counter}</motion.span> /{" "}
              {String(panels.length).padStart(2, "0")}
            </span>
            <div className="relative h-px flex-1 bg-border">
              <motion.div
                className="absolute inset-y-0 left-0 w-full origin-left bg-brand-2"
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
