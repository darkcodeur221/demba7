"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

/**
 * Inertial page scroll. Lenis drives the native scroll position, so sticky
 * sections and scroll-linked Motion values keep working underneath it.
 * Anchor links land just below the fixed nav. Off under reduced motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.085, anchors: { offset: -72 } }}>
      {children}
    </ReactLenis>
  );
}
