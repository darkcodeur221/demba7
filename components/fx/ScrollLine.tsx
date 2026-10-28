"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A vertical rail that fills with lime as it scrolls through the viewport,
 * for timelines and step lists. Place it absolutely inside a relative parent.
 */
export function ScrollLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute w-px bg-border-strong", className)}>
      <motion.div
        className="absolute inset-0 origin-top bg-brand-2"
        style={{ scaleY: reduce ? 1 : scaleY }}
      />
    </div>
  );
}
