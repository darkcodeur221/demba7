"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { PAGE, SURFACE } from "./palette";
import type { SectionKind } from "./SectionScene";

const SectionScene = dynamic(() => import("./SectionScene"), { ssr: false, loading: () => null });

/**
 * Hosts a section's WebGL object behind its header. The scene is only
 * loaded once the section comes near, and stops rendering when it leaves.
 * Sits at z -10, so the section needs `isolate` to keep it above its own
 * background and under its text.
 */
export function SectionObject({
  kind,
  surface = false,
  className,
}: {
  kind: SectionKind;
  surface?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [seen, setSeen] = useState(false);
  const [active, setActive] = useState(false);
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
    const io = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute -z-10", className)}>
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgba(198,242,74,0.14),transparent)]" />
      {seen && compact !== null && (
        <SectionScene
          key={compact ? "c" : "w"}
          kind={kind}
          active={active}
          compact={compact}
          reduced={!!reduce}
          background={surface ? SURFACE : PAGE}
          anchor={ref}
        />
      )}
    </div>
  );
}
