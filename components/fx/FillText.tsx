"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Outlined display text that fills with ink from the bottom up once in
 * view, like a glass being poured. The filled copy is decorative only.
 */
export function FillText({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      className={cn("relative inline-block", className)}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.8 }}
    >
      <span className="text-outline">{text}</span>
      <motion.span
        aria-hidden
        className="absolute inset-0 text-accent"
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          show: {
            clipPath: "inset(0% 0% 0% 0%)",
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
          },
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
}
