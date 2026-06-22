"use client";

import { motion, useReducedMotion } from "motion/react";
import { Database, Cpu, Target } from "@phosphor-icons/react";

type Node = { key: string; label: string; detail: string };

/**
 * The signature visual: a three-stage flow (raw data -> AI system -> decision)
 * that mirrors how the work actually runs. A pulse travels the connector to
 * suggest a live pipeline. Goes fully static under reduced motion.
 */
export function FlowPipeline({
  raw,
  rawDetail,
  system,
  systemDetail,
  decision,
  decisionDetail,
}: {
  raw: string;
  rawDetail: string;
  system: string;
  systemDetail: string;
  decision: string;
  decisionDetail: string;
}) {
  const reduce = useReducedMotion();

  const nodes: Node[] = [
    { key: "raw", label: raw, detail: rawDetail },
    { key: "system", label: system, detail: systemDetail },
    { key: "decision", label: decision, detail: decisionDetail },
  ];
  const icons = {
    raw: Database,
    system: Cpu,
    decision: Target,
  } as const;
  const accent = {
    raw: "text-brand-2",
    system: "text-on-brand bg-brand",
    decision: "text-brand-2",
  } as const;

  return (
    <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-[0_24px_60px_-32px_rgba(31,78,121,0.45)]">
      <div className="relative flex flex-col gap-0">
        {nodes.map((node, i) => {
          const Icon = icons[node.key as keyof typeof icons];
          const isSystem = node.key === "system";
          return (
            <div key={node.key}>
              <motion.div
                className="flex items-center gap-3.5 py-3"
                initial={reduce ? false : { opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    isSystem ? accent.system : "bg-accent-soft " + accent[node.key as keyof typeof accent]
                  }`}
                >
                  <Icon size={22} weight={isSystem ? "fill" : "bold"} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{node.label}</p>
                  <p className="tnum truncate text-xs text-muted">{node.detail}</p>
                </div>
              </motion.div>

              {i < nodes.length - 1 && (
                <div className="relative ml-[1.4rem] h-5 w-px bg-border">
                  {!reduce && (
                    <motion.span
                      className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-2"
                      initial={{ y: -2, opacity: 0 }}
                      animate={{ y: [0, 20], opacity: [0, 1, 0] }}
                      transition={{
                        duration: 1.6,
                        delay: 0.8 + i * 0.4,
                        repeat: Infinity,
                        repeatDelay: 1.2,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
