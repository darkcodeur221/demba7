import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/Emphasis";
import { Kicker } from "@/components/Kicker";
import { sectionIndex, type SectionId } from "@/lib/sections";

/** Outer wrapper: anchor id, vertical rhythm, optional one-step-darker paper. */
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
        "relative scroll-mt-20 pt-20 pb-24 md:pt-28 md:pb-32",
        surface && "bg-surface",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

/**
 * Section header, set like a journal: a hairline rule with a numbered running
 * head, then a large headline whose `*emphasis*` turns serif italic, and the
 * intro pushed to the right column so headers do not all stack the same way.
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
  /** Optional note on the right of the rule, e.g. a count. */
  aside?: string;
}) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <div className="flex items-center justify-between gap-4 border-t border-border-strong pt-4">
        <Kicker index={sectionIndex(id)} label={label} />
        {aside && <span className="tnum text-xs text-muted">{aside}</span>}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h2 className="text-[2.3rem] font-medium leading-[1.02] tracking-[-0.035em] text-foreground sm:text-5xl lg:col-span-8 lg:text-[3.6rem]">
          <Emphasis text={heading} />
        </h2>
        {intro && (
          <p className="max-w-[40ch] text-base leading-relaxed text-muted lg:col-span-4 lg:justify-self-end lg:pb-2">
            {intro}
          </p>
        )}
      </div>
    </Reveal>
  );
}
