"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Counts up to `target` once it is half in view, easing out like a needle
 * settling. With `locale`, thousands get the locale's separator (fr: 2 500).
 */
export function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  locale,
  duration = 1600,
  className,
}: {
  target: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  locale?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? target : 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      setCount(target);
      return;
    }
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t); // easeOutExpo
          setCount(Math.round(target * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduce, target, duration]);

  const shown = locale ? count.toLocaleString(locale === "fr" ? "fr-FR" : "en-US") : String(count);

  return (
    <p ref={ref} className={className}>
      {prefix}
      {shown}
      {suffix}
    </p>
  );
}
