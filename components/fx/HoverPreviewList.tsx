"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export type PreviewItem = {
  slug: string;
  name: string;
  kind: string;
  url?: string;
  image?: string;
};

/**
 * An index of client sites set in big type. On desktop a screenshot of the
 * hovered site follows the pointer on a spring and tilts with its speed; on
 * touch screens each row shows its thumbnail inline instead.
 *
 * The preview is `position: fixed`, so this must not sit inside a transformed
 * ancestor (no <Reveal> wrapper), or it would be positioned against that.
 */
export function HoverPreviewList({ items, cursorLabel }: { items: PreviewItem[]; cursorLabel: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 170, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 170, damping: 22, mass: 0.5 });
  const rotate = useTransform(useVelocity(sx), [-1800, 1800], [-10, 10]);

  return (
    <div
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setActive(null)}
      className="relative border-t border-border-strong"
    >
      {items.map((it, i) => (
        <a
          key={it.slug}
          href={it.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor={cursorLabel}
          onPointerEnter={() => setActive(i)}
          className="group flex items-center gap-4 border-b border-border py-5 sm:gap-6 md:py-7"
        >
          <span className="tnum w-8 shrink-0 text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
          <span
            className={cn(
              "min-w-0 flex-1 truncate text-[clamp(1.35rem,4.2vw,3.6rem)] font-bold leading-none tracking-[-0.035em] [font-stretch:112%]",
              "transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:text-brand"
            )}
          >
            {it.name}
          </span>
          <span className="tnum hidden shrink-0 text-xs text-muted md:block">{it.kind}</span>
          {it.image && (
            <span className="relative h-12 w-[4.5rem] shrink-0 overflow-hidden rounded-md border border-border md:hidden">
              <Image src={it.image} alt="" fill sizes="72px" className="object-cover object-top" />
            </span>
          )}
          <ArrowUpRight
            size={20}
            className="hidden shrink-0 text-muted transition-[transform,color] duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand md:block"
          />
        </a>
      ))}

      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[55] hidden h-[15rem] w-[23rem] overflow-hidden rounded-[var(--radius-media)] border border-border-strong shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] md:block"
          style={{ x: sx, y: sy, rotate, translateX: "-50%", translateY: "-50%" }}
          initial={false}
          animate={{ opacity: active === null ? 0 : 1, scale: active === null ? 0.8 : 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {items.map(
            (it, i) =>
              it.image && (
                <Image
                  key={it.slug}
                  src={it.image}
                  alt=""
                  fill
                  sizes="368px"
                  className={cn(
                    "object-cover object-top transition-opacity duration-300",
                    active === i ? "opacity-100" : "opacity-0"
                  )}
                />
              )
          )}
        </motion.div>
      )}
    </div>
  );
}
