"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { cn } from "@/lib/utils";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Giant ticker that drifts on its own, speeds up with scroll velocity, flips
 * direction with the scroll direction and leans into the motion (skew).
 * The words alternate solid and hollow. The track holds four copies and
 * wraps over one of them, so the loop is seamless.
 */
export function VelocityMarquee({
  items,
  baseVelocity = 2.5,
  className,
}: {
  items: string[];
  baseVelocity?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(smooth, [-2000, 2000], [-9, 9]);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  const copy = (k: number) => (
    <span key={k} aria-hidden={k > 0 || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className={cn("px-[0.35em]", i % 2 === 1 && "text-outline")}>{item}</span>
          <span className="px-[0.2em] text-[0.45em] text-brand">✦</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <motion.div className="display flex w-max uppercase" style={{ x, skewX: reduce ? 0 : skewX }}>
        {[0, 1, 2, 3].map(copy)}
      </motion.div>
    </div>
  );
}
