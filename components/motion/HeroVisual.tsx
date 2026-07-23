"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Database,
  ChartLineUp,
  ShoppingCartSimple,
  PaperPlaneTilt,
  Sparkle,
  Target,
  Lightning,
} from "@phosphor-icons/react";

const ICONS = [Database, ChartLineUp, ShoppingCartSimple, PaperPlaneTilt, Sparkle, Target] as const;

// One coordinate space shared by the spokes and the nodes pinned onto them.
const VB = 400;
const CENTER = VB / 2;
const RADIUS = 126;
/** Seconds between two spokes firing; the wave circles the hub. */
const STAGGER = 0.26;
/** How long a pulse takes to reach its node. */
const TRAVEL = 1.6;

const pct = (v: number) => `${(v / VB) * 100}%`;

const seat = (i: number) => {
  const angle = ((-90 + i * 60) * Math.PI) / 180;
  return { x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) };
};

/**
 * The hero visual: an orchestrator firing work out to the services it drives.
 * A pulse runs down each spoke in turn, and the node it reaches lights up as it
 * lands, so the whole thing reads as a workflow actually executing. Collapses to
 * a still diagram under reduced motion.
 */
export function HeroVisual({
  hub,
  hubDetail,
  nodes,
}: {
  hub: string;
  hubDetail: string;
  nodes: string[];
}) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const gradId = `${uid}-pulse`;

  return (
    <div className="relative aspect-square w-full max-w-[470px]">
      <svg viewBox={`0 0 ${VB} ${VB}`} className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--brand-2)" stopOpacity="0" />
            <stop offset="55%" stopColor="var(--brand-2)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--brand-2)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Slowly turning orbit the services sit on */}
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="3 9"
          style={{ transformOrigin: "center" }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        />

        {ICONS.map((_, i) => {
          const { x, y } = seat(i);
          const d = `M ${CENTER} ${CENTER} L ${x} ${y}`;
          return (
            <g key={i}>
              <path d={d} stroke="var(--border-strong)" strokeWidth="1.25" strokeDasharray="3 6" />
              {!reduce && (
                <path
                  d={d}
                  fill="none"
                  stroke={`url(#${gradId})`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray="22 78"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="100"
                    to="0"
                    dur={`${TRAVEL}s`}
                    begin={`${i * STAGGER}s`}
                    repeatCount="indefinite"
                  />
                </path>
              )}
            </g>
          );
        })}
      </svg>

      {/* Services */}
      {ICONS.map((Icon, i) => {
        const { x, y } = seat(i);
        const land = i * STAGGER + TRAVEL * 0.85;
        return (
          <motion.div
            key={i}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: pct(x), top: pct(y) }}
            initial={reduce ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="flex h-[3.4rem] w-[3.4rem] items-center justify-center rounded-2xl border border-border bg-card text-brand shadow-sm"
              animate={
                reduce
                  ? undefined
                  : {
                      scale: [1, 1.14, 1],
                      borderColor: ["var(--border)", "var(--brand-2)", "var(--border)"],
                      boxShadow: [
                        "0 0 0 0 rgba(46,117,182,0)",
                        "0 0 18px 2px rgba(46,117,182,0.35)",
                        "0 0 0 0 rgba(46,117,182,0)",
                      ],
                    }
              }
              transition={{
                duration: 0.75,
                repeat: Infinity,
                repeatDelay: TRAVEL - 0.75,
                delay: land,
                ease: "easeInOut",
              }}
            >
              <Icon size={27} weight="duotone" />
            </motion.span>
            <span className="mt-2 whitespace-nowrap text-[11px] font-medium text-muted">
              {nodes[i]}
            </span>
          </motion.div>
        );
      })}

      {/* Orchestrator */}
      <motion.div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        initial={reduce ? false : { opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative">
          {!reduce &&
            [0, 1].map((r) => (
              <motion.span
                key={r}
                className="absolute inset-0 rounded-[1.35rem] border-2 border-brand/40"
                animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: r * 1.3, ease: "easeOut" }}
              />
            ))}
          <motion.span
            className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1.35rem] bg-brand text-on-brand shadow-[0_16px_40px_-12px_rgba(31,78,121,0.75)]"
            animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Lightning size={32} weight="fill" />
          </motion.span>
        </div>
        {/* Boxed so the spokes running underneath stay out of the words. */}
        <span className="mt-3 rounded-lg bg-background px-2 py-1 text-center">
          <span className="block text-sm font-semibold text-foreground">{hub}</span>
          <span className="tnum block text-[11px] text-muted">{hubDetail}</span>
        </span>
      </motion.div>
    </div>
  );
}
