import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

/** Consistent outer wrapper: anchor id, vertical rhythm, optional tinted bg. */
export function Section({
  id,
  children,
  surface = false,
  className,
}: {
  id: string;
  children: React.ReactNode;
  surface?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 py-20 md:py-28",
        surface && "bg-surface",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

/**
 * Section header. The kicker is a sentence-case brand label with a short rule,
 * deliberately not the uppercase wide-tracking eyebrow that templates overuse.
 */
export function SectionHeader({
  label,
  heading,
  intro,
  align = "left",
}: {
  label: string;
  heading: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center"
      )}
    >
      <span className="inline-flex items-center gap-2.5 text-sm font-medium text-brand">
        <span className="h-px w-6 bg-brand" aria-hidden />
        {label}
      </span>
      <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-[2.5rem] md:leading-[1.1]">
        {heading}
      </h2>
      {intro && (
        <p className="max-w-xl text-base leading-relaxed text-muted">{intro}</p>
      )}
    </Reveal>
  );
}
