"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A panel lit from under the pointer: a soft lime glow follows the cursor
 * inside, and the border brightens around it. Pure CSS variables, no React
 * re-render per mouse move.
 */
export function Spotlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-card",
        className
      )}
    >
      {/* inner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--x, 50%) var(--y, 50%), rgba(198,242,74,0.28), transparent 55%)",
        }}
      />
      {/* border glow: same gradient, masked down to the 1px edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--x, 50%) var(--y, 50%), rgba(140,190,25,0.95), transparent 60%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
