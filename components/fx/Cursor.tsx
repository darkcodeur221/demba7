"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type Mode = "idle" | "link" | "label";

/**
 * A lime dot that tracks the pointer exactly, and a ring that trails it on a
 * spring. Over links the ring swells; over anything carrying `data-cursor`
 * it turns into a filled disc showing that label ("Voir", "Ouvrir"...).
 * Only on fine pointers and never under reduced motion.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("idle");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setMode("label");
        setLabel(labelled.dataset.cursor ?? "");
        return;
      }
      setMode(target?.closest("a, button, [role='button'], input, textarea, label") ? "link" : "idle");
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  const size = mode === "label" ? 92 : mode === "link" ? 54 : 34;

  return (
    <div aria-hidden className="no-print pointer-events-none fixed inset-0 z-[80]">
      <motion.div
        className={cn(
          "absolute left-0 top-0 flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          mode === "label"
            ? "border-brand bg-brand"
            : mode === "link"
              ? "border-accent/60 bg-brand/25"
              : "border-foreground/30 bg-transparent",
          visible ? "opacity-100" : "opacity-0"
        )}
        style={{ x: ringX, y: ringY, width: size, height: size, translateX: "-50%", translateY: "-50%" }}
      >
        {mode === "label" && (
          <span className="tnum text-[11px] font-medium uppercase tracking-wider text-on-brand">{label}</span>
        )}
      </motion.div>
      <motion.div
        className={cn(
          "absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-foreground transition-opacity duration-200",
          visible && mode !== "label" ? "opacity-100" : "opacity-0"
        )}
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </div>
  );
}
