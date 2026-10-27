import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { Kicker } from "@/components/Kicker";
import { RevealText } from "@/components/fx/RevealText";
import { sectionIndex, type SectionId } from "@/lib/sections";

/** Outer wrapper: anchor id, vertical rhythm, optional one-step-lighter space. */
export function Section({
  id,
  children,
  surface = false,
  className,
}: {
  id: SectionId;
  children: React.ReactNode;
  surface?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        // Bottom padding a touch larger than the top reads as optically even.
        "relative scroll-mt-20 pt-24 pb-28 md:pt-36 md:pb-40",
        surface && "bg-surface",
        className
      )}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}

/**
 * Section header: a hairline with a numbered running head, then a poster-size
 * headline that rises word by word (its `*emphasis*` turns lime), and the
 * intro set off to the right.
 */
export function SectionHeader({
  id,
  label,
  heading,
  intro,
  aside,
}: {
  id: SectionId;
  label: string;
  heading: string;
  intro?: string;
  aside?: string;
}) {
  return (
    <div className="mb-16 md:mb-24">
      <Reveal>
        <div className="flex items-center justify-between gap-4 border-t border-border-strong pt-5">
          <Kicker index={sectionIndex(id)} label={label} />
          {aside && <span className="tnum text-xs text-muted">{aside}</span>}
        </div>
      </Reveal>
      <h2 className="mt-8 max-w-[18ch] text-[clamp(2.3rem,6vw,6.2rem)] font-bold leading-[0.95] tracking-[-0.045em] hyphens-auto sm:[font-stretch:115%]">
        <RevealText text={heading} />
      </h2>
      {intro && (
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-[40ch] text-lg leading-relaxed text-muted md:ml-auto">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
