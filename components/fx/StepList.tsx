"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { ScrollLine } from "./ScrollLine";

const EASE = [0.16, 1, 0.3, 1] as const;

const dot: Variants = {
  hidden: { scale: 0 },
  show: { scale: 1, transition: { type: "spring", stiffness: 420, damping: 18 } },
};
const body: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

/**
 * Steps hung on a rail that fills with lime as the list scrolls by; each
 * node lights up and its text slides in when it reaches the reading line.
 */
export function StepList({
  items,
  className,
}: {
  items: { id: string; head: React.ReactNode; body: React.ReactNode }[];
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <ol className={cn("relative", className)}>
      <ScrollLine className="bottom-3 left-[7px] top-3" />
      {items.map((it) => (
        <motion.li
          key={it.id}
          className="relative pb-9 pl-10 last:pb-0"
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          <span className="absolute left-0 top-1 grid size-[15px] place-items-center rounded-full border border-brand-2 bg-card">
            <motion.span variants={dot} className="size-[9px] rounded-full bg-brand-2" />
          </span>
          <motion.div variants={body}>
            {it.head}
            {it.body}
          </motion.div>
        </motion.li>
      ))}
    </ol>
  );
}
