"use client";

import Image from "next/image";
import { Database, Cpu, Target } from "@phosphor-icons/react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Labels sit where the illustration's baked-in text used to be (it was painted
 * out), so they can be localised and keep proper accents. Coordinates are
 * percentages of the source image, which is why they carry odd decimals.
 */
type Label = { key: string; text: string; icon: typeof Database; x: string; y: string };

/**
 * The hero illustration: raw data -> AI system -> decision. Floats free (the
 * background was dissolved into a soft falloff), tilts toward the cursor and
 * breathes. Fully static under prefers-reduced-motion.
 */
export function HeroVisual({
  alt,
  raw,
  system,
  decision,
}: {
  alt: string;
  raw: string;
  system: string;
  decision: string;
}) {
  const reduce = useReducedMotion();

  const labels: Label[] = [
    { key: "system", text: system, icon: Cpu, x: "47.5%", y: "11.4%" },
    { key: "raw", text: raw, icon: Database, x: "16.4%", y: "53.2%" },
    { key: "decision", text: decision, icon: Target, x: "83%", y: "53.2%" },
  ];

  // Cursor-follow tilt, normalised to [-0.5, 0.5] then damped by a spring.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 140, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), spring);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <div
      className="relative w-full max-w-[620px]"
      onMouseMove={onMove}
      onMouseLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      {/* Pulsing glow behind the illustration */}
      <motion.div
        aria-hidden
        className="absolute inset-[8%] -z-10 rounded-full bg-brand/20 blur-3xl"
        animate={reduce ? undefined : { opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative"
        style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <Image
            src="/images/hero-visual.webp"
            alt={alt}
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 1024px) 92vw, 620px"
            className="h-auto w-full"
          />

          {/*
            Labels are pinned onto the illustration, whose backdrop stays light
            in both themes, so their colours are fixed rather than themed.
          */}
          {labels.map((label, i) => {
            const Icon = label.icon;
            return (
              <motion.span
                key={label.key}
                className="absolute z-10 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-[#0e1726] shadow-[0_6px_20px_-8px_rgba(15,40,70,0.5)] ring-1 ring-black/5 backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-xs"
                style={{ left: label.x, top: label.y }}
                initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.75 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
              >
                <Icon size={13} weight="fill" className="text-[#1f4e79]" />
                {label.text}
              </motion.span>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
