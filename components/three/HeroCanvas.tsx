"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

// three.js stays out of the server bundle and off the critical path.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => null });

/**
 * Hosts the WebGL scene behind the hero copy. Picks a lighter layout on
 * phones and tells the scene to stop rendering once the hero leaves view.
 * The lime glow underneath doubles as the placeholder while three.js loads
 * and as the fallback where WebGL is unavailable.
 */
export function HeroCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(true);
  const [compact, setCompact] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: "100px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -right-[12%] top-[2%] h-[85vh] w-[85vh] rounded-full bg-[radial-gradient(closest-side,rgba(198,242,74,0.09),transparent)]" />
      {compact !== null && (
        // Remount on breakpoint change so the layout and quality reset cleanly.
        <HeroScene key={compact ? "c" : "w"} active={active} compact={compact} reduced={!!reduce} />
      )}
    </div>
  );
}
