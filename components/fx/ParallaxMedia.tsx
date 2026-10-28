"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Frame whose content drifts slower than the page as it scrolls past, so the
 * picture seems to sit behind a window. The content is oversized by `range`
 * on each side so the drift never shows an edge.
 */
export function ParallaxMedia({
  children,
  className,
  range = 60,
}: {
  children: React.ReactNode;
  className?: string;
  /** Total vertical travel, in px. */
  range?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-range / 2, range / 2]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-x-0"
        style={{ top: -range / 2, bottom: -range / 2, y: reduce ? 0 : y }}
      >
        {children}
      </motion.div>
    </div>
  );
}
