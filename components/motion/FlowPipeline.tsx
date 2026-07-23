"use client";

import { motion, useReducedMotion } from "motion/react";
import { Database, Cpu, Target } from "@phosphor-icons/react";

type Node = { key: string; label: string; detail: string };

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
  const icons = { raw: Database, system: Cpu, decision: Target } as const;

  return (
    <div className="relative w-full max-w-sm">
      {/* Glow behind the card */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-brand/[0.08] blur-2xl" />

      <div className="glass rounded-2xl border border-border-strong/60 p-6 shadow-[0_24px_80px_-20px_rgba(31,78,121,0.4)]">
        <div className="relative flex flex-col gap-0">
          {nodes.map((node, i) => {
            const Icon = icons[node.key as keyof typeof icons];
            const isSystem = node.key === "system";
            return (
              <div key={node.key}>
                <motion.div
                  className="flex items-center gap-4 py-3"
                  initial={reduce ? false : { opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-shadow ${
                      isSystem
                        ? "bg-brand text-on-brand shadow-[0_4px_20px_-4px_rgba(31,78,121,0.5)]"
                        : "bg-accent-soft text-brand-2"
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
                  <div className="relative ml-[1.5rem] h-6 w-px bg-gradient-to-b from-border-strong to-border">
                    {!reduce && (
                      <motion.span
                        className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-2 shadow-[0_0_8px_2px_rgba(46,117,182,0.4)]"
                        initial={{ y: -2, opacity: 0 }}
                        animate={{ y: [0, 24], opacity: [0, 1, 0] }}
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
    </div>
  );
}
