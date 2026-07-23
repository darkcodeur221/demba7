import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

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
        "relative scroll-mt-20 py-20 md:py-28",
        surface && "bg-surface",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

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
        "mb-14 flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center"
      )}
    >
      <span className="inline-flex items-center gap-2.5 text-sm font-medium text-brand">
        <span className="h-px w-8 bg-gradient-to-r from-brand to-brand-2" aria-hidden />
        {label}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-[2.5rem] md:leading-[1.08]">
        {heading}
      </h2>
      {intro && (
        <p className="max-w-xl text-base leading-relaxed text-muted">{intro}</p>
      )}
    </Reveal>
  );
}
