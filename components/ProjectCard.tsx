import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import type { Project } from "@/data/types";

export type CardLabels = {
  problem: string;
  solution: string;
  result: string;
  viewLive: string;
};

/**
 * Real screenshot when `project.image` is set, otherwise a branded design tile
 * (monogram + domain). The tile is an intentional placeholder, not a faked UI.
 */
function Cover({ project, className }: { project: Project; className?: string }) {
  const initial = project.tagline.fr.charAt(0).toUpperCase();

  if (project.image) {
    return (
      <div className={cn("relative overflow-hidden bg-surface", className)}>
        <Image
          src={project.image}
          alt={project.title.fr}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-end overflow-hidden bg-accent-soft",
        className
      )}
      aria-hidden
    >
      <span className="pointer-events-none absolute -right-4 -top-8 select-none text-[8rem] font-semibold leading-none text-brand/15">
        {initial}
      </span>
      <span className="relative m-4 rounded-md bg-background/70 px-2.5 py-1 text-xs font-medium text-brand backdrop-blur-sm">
        {project.tagline.fr}
      </span>
    </div>
  );
}

export function ProjectCard({
  project,
  locale,
  labels,
  variant = "compact",
}: {
  project: Project;
  locale: Locale;
  labels: CardLabels;
  variant?: "detailed" | "compact" | "logo";
}) {
  const title = project.title[locale];
  const tagline = project.tagline[locale];

  const LinkOut = project.url ? (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm font-medium text-brand transition-colors hover:text-brand-strong"
    >
      {project.linkLabel ?? labels.viewLive}
      <ArrowUpRight size={15} weight="bold" />
    </a>
  ) : null;

  if (variant === "logo") {
    return (
      <a
        href={project.url ?? "#"}
        target={project.url ? "_blank" : undefined}
        rel={project.url ? "noopener noreferrer" : undefined}
        className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-card transition-colors hover:border-border-strong"
      >
        <Cover project={project} className="aspect-[16/10]" />
        <div className="flex items-center justify-between gap-2 px-4 py-3.5">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{title}</p>
            <p className="truncate text-xs text-muted">{tagline}</p>
          </div>
          <ArrowUpRight
            size={16}
            weight="bold"
            className="shrink-0 text-muted transition-colors group-hover:text-brand"
          />
        </div>
      </a>
    );
  }

  if (variant === "detailed") {
    const facts = [
      { label: labels.problem, value: project.problem?.[locale] },
      { label: labels.solution, value: project.solution?.[locale] },
      { label: labels.result, value: project.result?.[locale] },
    ].filter((f) => f.value);

    return (
      <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-card transition-colors hover:border-border-strong">
        <Cover project={project} className="aspect-[16/9]" />
        <div className="flex flex-1 flex-col gap-5 p-6">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
            <p className="mt-1 text-sm text-brand">{tagline}</p>
          </div>

          <dl className="flex flex-1 flex-col gap-3.5">
            {facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[5.5rem_1fr] gap-3">
                <dt className="pt-px text-xs font-medium uppercase tracking-wide text-muted">
                  {f.label}
                </dt>
                <dd className="text-sm leading-relaxed text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          {LinkOut && <div className="pt-1">{LinkOut}</div>}
        </div>
      </article>
    );
  }

  // compact
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-card transition-colors hover:border-border-strong">
      <Cover project={project} className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-base font-semibold tracking-tight">{title}</h3>
          <p className="mt-0.5 text-xs text-muted">{tagline}</p>
        </div>
        {project.result?.[locale] && (
          <p className="text-sm leading-relaxed text-foreground">{project.result[locale]}</p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 2).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
          {LinkOut}
        </div>
      </div>
    </article>
  );
}
