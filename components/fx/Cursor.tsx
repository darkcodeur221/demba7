"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const SEGMENTS = 26; // body points, head first
const SPACING = 6; // px kept between consecutive points
const BODY = 6.5; // thickest half-width of the body, px
const LIME = "#c6f24a";
const LIME_DARK = "#8fbf1c";
const INK = "#0c0d10";
const TONGUE = "#e2453c";

/** Half-width of the body at point i: slim neck, full middle, needle tail. */
function halfWidth(i: number) {
  if (i < 4) return BODY * (0.82 + 0.045 * i);
  const t = (i - 4) / (SEGMENTS - 4);
  return BODY * (1 - 0.84 * Math.pow(t, 1.3));
}

/**
 * The cursor is a small lime python. Its snout sits on the pointer and the
 * body trails behind as a follow-the-leader chain (each point keeps a fixed
 * gap to the one ahead), with a travelling sideways wave so it slithers even
 * at rest. It swells over links, lunges on click, and shows the
 * `data-cursor` label ("Voir", "Ouvrir") in a pill beside its head.
 * Drawn on a 2D canvas; fine pointers only, never under reduced motion.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    return () => document.documentElement.classList.remove("has-cursor");
  }, [reduce]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!enabled || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const pts = Array.from({ length: SEGMENTS }, () => ({ x: -100, y: -100 }));
    const drawn = pts.map(() => ({ x: 0, y: 0 }));
    let px = -100;
    let py = -100;
    let visible = false;
    let hover = 0;
    let hoverTarget = 0;
    let strike = 0;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!visible) {
        visible = true;
        for (const p of pts) {
          p.x = px;
          p.y = py;
        }
      }
    };
    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? "");
      hoverTarget = labelled || target?.closest("a, button, [role='button'], input, textarea, label") ? 1 : 0;
    };
    const onDown = () => {
      strike = 1;
    };
    const onLeave = () => {
      visible = false;
    };

    const tick = (time: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const t = time / 1000;
      hover += (hoverTarget - hover) * 0.15;
      strike *= 0.86;

      // Head chases the pointer; each following point keeps its distance.
      pts[0].x += (px - pts[0].x) * 0.38;
      pts[0].y += (py - pts[0].y) * 0.38;
      for (let i = 1; i < SEGMENTS; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d > SPACING) {
          b.x = a.x + (dx / d) * SPACING;
          b.y = a.y + (dy / d) * SPACING;
        }
      }

      if (visible) {
        // Sideways wave travelling down the body, damped at the head.
        for (let i = 0; i < SEGMENTS; i++) {
          const ahead = pts[Math.max(0, i - 1)];
          const behind = pts[Math.min(SEGMENTS - 1, i + 1)];
          const dx = ahead.x - behind.x;
          const dy = ahead.y - behind.y;
          const len = Math.hypot(dx, dy) || 1;
          const amp = 2.4 * Math.min(1, i / 4);
          const off = Math.sin(t * 7 - i * 0.55) * amp;
          drawn[i].x = pts[i].x + (-dy / len) * off;
          drawn[i].y = pts[i].y + (dx / len) * off;
        }

        const grow = 1 + hover * 0.25;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        // Outline first, then the lime fill on top, so joints stay seamless.
        for (const pass of [0, 1]) {
          ctx.strokeStyle = pass === 0 ? INK : LIME;
          for (let i = SEGMENTS - 1; i > 0; i--) {
            const w = halfWidth(i) * grow * 2;
            ctx.lineWidth = pass === 0 ? w + 2.6 : w;
            ctx.beginPath();
            ctx.moveTo(drawn[i].x, drawn[i].y);
            ctx.lineTo(drawn[i - 1].x, drawn[i - 1].y);
            ctx.stroke();
          }
        }
        // Python markings: a darker blotch every third ring.
        ctx.fillStyle = LIME_DARK;
        for (let i = 3; i < SEGMENTS - 4; i += 3) {
          ctx.beginPath();
          ctx.arc(drawn[i].x, drawn[i].y, halfWidth(i) * grow * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }

        // Head, aimed along the neck, snout tip on the pointer.
        const angle = Math.atan2(drawn[0].y - drawn[2].y, drawn[0].x - drawn[2].x);
        const s = grow * (1 + strike * 0.3);
        ctx.save();
        ctx.translate(drawn[0].x, drawn[0].y);
        ctx.rotate(angle);
        ctx.scale(s, s);
        ctx.translate(strike * 4, 0);

        // Tongue: flicks every couple of seconds, or keeps tasting the air over links.
        const cycle = t % 1.9;
        const flick = hover > 0.5 ? 0.6 + 0.4 * Math.sin(t * 22) : cycle < 0.3 ? Math.sin((cycle / 0.3) * Math.PI) : 0;
        if (flick > 0.02) {
          const L = 9 * flick;
          ctx.strokeStyle = TONGUE;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(1, 0);
          ctx.lineTo(1 + L, 0);
          ctx.lineTo(4 + L, -2.5);
          ctx.moveTo(1 + L, 0);
          ctx.lineTo(4 + L, 2.5);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.ellipse(-8, 0, 10, 7.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = LIME;
        ctx.strokeStyle = INK;
        ctx.lineWidth = 1.6;
        ctx.fill();
        ctx.stroke();
        for (const side of [-1, 1]) {
          ctx.beginPath();
          ctx.arc(-6, side * 3.8, 1.7, 0, Math.PI * 2);
          ctx.fillStyle = INK;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(-5.5, side * 3.8 - 0.6, 0.55, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
        }
        ctx.restore();

        headPos.current.x = drawn[0].x;
        headPos.current.y = drawn[0].y;
        if (labelRef.current) {
          labelRef.current.style.transform = `translate(${drawn[0].x + 18}px, ${drawn[0].y + 16}px)`;
        }
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  // Above every layer, lightboxes included (z-100), or no pointer shows there.
  return (
    <>
      <canvas ref={canvasRef} aria-hidden className="no-print pointer-events-none fixed left-0 top-0 z-[110]" />
      {label && (
        <div
          ref={labelRef}
          aria-hidden
          className="tnum no-print pointer-events-none fixed left-0 top-0 z-[111] rounded-full bg-brand px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-on-brand shadow-[0_6px_18px_-6px_rgba(12,13,16,0.35)]"
          style={{ transform: `translate(${headPos.current.x + 18}px, ${headPos.current.y + 16}px)` }}
        >
          {label}
        </div>
      )}
    </>
  );
}
