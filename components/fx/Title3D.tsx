"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { RevealLines } from "./RevealText";
import { cn } from "@/lib/utils";

/**
 * The hero headline as extruded 3D type (see `.title-3d`). The pointer acts as
 * a light: the lime body swings away from it and the block tilts slightly in
 * perspective. Without a mouse the light drifts on its own. Values ease toward
 * their target on each animation frame and the loop idles once settled. The
 * text stays real HTML, so it is indexed and read like any heading.
 */
export function Title3D({
  lines,
  accent,
  className,
  delay = 0.25,
}: {
  lines: string[];
  accent?: number;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let mx = 0;
    let my = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let running = false;
    let visible = true;

    const tick = (time: number) => {
      if (!finePointer) {
        mx = 0.55 * Math.sin(time / 1700);
        my = 0.35 * Math.cos(time / 2100);
      }
      x += (mx - x) * 0.07;
      y += (my - y) * 0.07;
      // Extrusion runs away from the "light"; a slight perspective tilt follows it.
      el.style.setProperty("--ex", (0.9 - 1.3 * x).toFixed(3));
      el.style.setProperty("--ey", (0.9 - 1.0 * y).toFixed(3));
      el.style.transform = `perspective(1400px) rotateX(${(y * -4).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;

      const settled = finePointer && Math.abs(mx - x) < 0.001 && Math.abs(my - y) < 0.001;
      if (settled || !visible) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running || !visible) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
      start();
    };
    // Off screen, nothing to animate.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });

    io.observe(el);
    window.addEventListener("pointermove", onMove);
    start();
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    <h1 ref={ref} className={cn("title-3d will-change-transform", className)}>
      <RevealLines lines={lines} accent={accent} delay={delay} accentClass="title-accent" />
    </h1>
  );
}
