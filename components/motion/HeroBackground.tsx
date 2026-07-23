"use client";

import { useReducedMotion } from "motion/react";

export function HeroBackground() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Mesh gradient blobs */}
      <div
        className={`absolute -top-[30%] -right-[20%] h-[70vh] w-[70vh] rounded-full bg-brand/[0.07] blur-[120px] ${
          reduce ? "" : "animate-float"
        }`}
      />
      <div
        className={`absolute -bottom-[20%] -left-[15%] h-[50vh] w-[50vh] rounded-full bg-brand-2/[0.06] blur-[100px] ${
          reduce ? "" : "animate-float"
        }`}
        style={{ animationDelay: "-3s" }}
      />
      <div
        className={`absolute top-[20%] left-[40%] h-[30vh] w-[30vh] rounded-full bg-brand/[0.04] blur-[80px] ${
          reduce ? "" : "animate-float"
        }`}
        style={{ animationDelay: "-5s" }}
      />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Floating geometric accents */}
      <svg
        className={`absolute top-[15%] right-[12%] h-16 w-16 text-brand/10 ${
          reduce ? "" : "animate-float"
        }`}
        style={{ animationDelay: "-2s" }}
        viewBox="0 0 64 64"
        fill="none"
      >
        <rect
          x="8"
          y="8"
          width="48"
          height="48"
          rx="12"
          stroke="currentColor"
          strokeWidth="1.5"
          transform="rotate(12 32 32)"
        />
      </svg>
      <svg
        className={`absolute bottom-[25%] left-[8%] h-12 w-12 text-brand-2/10 ${
          reduce ? "" : "animate-float"
        }`}
        style={{ animationDelay: "-4s" }}
        viewBox="0 0 48 48"
        fill="none"
      >
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg
        className={`absolute top-[55%] right-[30%] h-10 w-10 text-brand/8 ${
          reduce ? "" : "animate-float"
        }`}
        style={{ animationDelay: "-6s" }}
        viewBox="0 0 40 40"
        fill="none"
      >
        <polygon
          points="20,4 36,36 4,36"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Bottom fade to background */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
