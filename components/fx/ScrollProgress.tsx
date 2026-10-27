"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** A hairline across the top that fills as the page is read. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="no-print fixed inset-x-0 top-0 z-[65] h-[2px] origin-left bg-brand"
      style={{ scaleX }}
    />
  );
}
