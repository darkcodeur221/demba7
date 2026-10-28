"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Curtain reveal for media: the content is uncovered by a clip-path wipe
 * while it settles from a slight zoom. The trigger sits on the outer box and
 * cascades through variants, because a fully clipped element can report as
 * not intersecting and would never fire on its own.
 */
export function ClipReveal({
  children,
  className,
  delay = 0,
  from = "bottom",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left";
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const hidden = from === "left" ? "inset(0% 100% 0% 0%)" : "inset(100% 0% 0% 0%)";
  const wipe: Variants = {
    hidden: { clipPath: hidden },
    show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.15, ease: EASE, delay } },
  };
  const settle: Variants = {
    hidden: { scale: 1.14 },
    show: { scale: 1, transition: { duration: 1.5, ease: EASE, delay } },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Both layers are positioned so `fill` images size against them. */}
      <motion.div variants={wipe} className="relative h-full w-full">
        <motion.div variants={settle} className="relative h-full w-full origin-center">
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
