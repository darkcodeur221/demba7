"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type Token = { word: string; accent: boolean };

/** Splits "plain *accent words* plain" into words, keeping the accent flag. */
function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  for (const part of text.split(/(\*[^*]+\*)/g)) {
    if (!part) continue;
    const accent = part.length > 2 && part.startsWith("*") && part.endsWith("*");
    const body = accent ? part.slice(1, -1) : part;
    for (const word of body.split(/\s+/)) if (word) tokens.push({ word, accent });
  }
  return tokens;
}

/**
 * Word-by-word masked reveal: each word rises out of its own clipping box.
 * Accepts the same `*emphasis*` markup as <Emphasis/>.
 *
 * The trigger lives on the outer span and cascades to the words through
 * variants. Watching the words themselves would never fire: a word pushed
 * out of its overflow-hidden box is fully clipped, which IntersectionObserver
 * reports as not intersecting.
 */
export function RevealText({
  text,
  className,
  delay = 0,
  onMount = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  onMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const tokens = tokenize(text);

  if (reduce) {
    return (
      <span className={className}>
        {tokens.map((t, i) => (
          <span key={i}>
            <span className={cn(t.accent && "em-accent")}>{t.word}</span>
            {i < tokens.length - 1 && " "}
          </span>
        ))}
      </span>
    );
  }

  const word: Variants = {
    hidden: { y: "110%" },
    show: (i: number) => ({ y: "0%", transition: { duration: 0.95, ease: EASE, delay: delay + i * 0.045 } }),
  };

  return (
    <motion.span
      className={className}
      initial="hidden"
      {...(onMount ? { animate: "show" } : { whileInView: "show" })}
      viewport={{ once: true, amount: 0.25 }}
    >
      {tokens.map((t, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
            <motion.span custom={i} variants={word} className={cn("inline-block", t.accent && "em-accent")}>
              {t.word}
            </motion.span>
          </span>
          {/* A real space between boxes, so lines can still break normally. */}
          {i < tokens.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}

/** Whole-line masked reveal for the hero's poster lines (plays on mount). */
export function RevealLines({
  lines,
  accent,
  className,
  delay = 0,
}: {
  lines: string[];
  /** Index of the line drawn in the accent colour. */
  accent?: number;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: "105%", rotate: 2 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.12 }}
          >
            {/* Inline, so the highlighter hugs the words, not the whole line box. */}
            <span className={cn(i === accent && "em-accent")}>{line}</span>
          </motion.span>
          {/* Keeps a word gap between lines in the text content (SEO, readers). */}{" "}
        </span>
      ))}
    </span>
  );
}
