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
 * Real screenshot when `project.image` is set, otherwise a typographic tile
 * (serif initial + domain). The tile is an intentional placeholder, not a
 * faked UI.
 */
function Cover({
  project,
  locale,
  className,
}: {
  project: Project;
  locale: Locale;
  className?: string;
}) {
  const frame = "relative overflow-hidden rounded-[var(--radius-media)] border border-border bg-surface";

  if (project.image) {
    return (
      <div className={cn("img-zoom", frame, className)}>
        <Image
          src={project.image}
          alt={project.title[locale]}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div className={cn(frame, "flex items-end", className)} aria-hidden>
      <span className="pointer-events-none absolute -right-3 -top-10 select-none font-serif text-[10rem] italic leading-none text-brand/15">
        {project.tagline.fr.charAt(0).toUpperCase()}
      </span>
      <span className="tnum relative m-4 text-xs text-muted">{project.linkLabel ?? project.tagline.fr}</span>
    </div>
  );
}

function LinkOut({ project, fallback }: { project: Project; fallback: string }) {
  if (!project.url) return null;
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link tnum inline-flex shrink-0 items-center gap-1 text-xs text-foreground"
    >
      <span className="link-draw">{project.linkLabel ?? fallback}</span>
      <ArrowUpRight
        size={13}
        className="text-brand transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
      />
    </a>
  );
}

export function ProjectCard({
  project,
  locale,
  labels,
  variant = "compact",
  index,
}: {
  project: Project;
  locale: Locale;
  labels: CardLabels;
  variant?: "detailed" | "compact" | "logo";
  /** Running number shown in mono, e.g. "02.3". */
  index?: string;
}) {
  const title = project.title[locale];
  const tagline = project.tagline[locale];

  if (variant === "logo") {
    return (
      <a
        href={project.url ?? undefined}
        target={project.url ? "_blank" : undefined}
        rel={project.url ? "noopener noreferrer" : undefined}
        className="group flex flex-col"
      >
        <Cover project={project} locale={locale} className="aspect-[4/3]" />
        <div className="flex items-start justify-between gap-2 pt-3">
          <div className="min-w-0">
            <p className="truncate text-[15px] font-medium tracking-tight">{title}</p>
            <p className="tnum truncate text-xs text-muted">{tagline}</p>
          </div>
          <ArrowUpRight
            size={15}
            className="mt-1 shrink-0 text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
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
      <article className="group flex h-full flex-col">
        <Cover project={project} locale={locale} className="aspect-[16/10]" />

        <div className="flex flex-1 flex-col pt-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-2xl font-medium tracking-[-0.02em]">{title}</h3>
            {index && <span className="tnum shrink-0 text-xs text-muted">{index}</span>}
          </div>
          <p className="tnum mt-1.5 text-xs text-brand">{tagline}</p>

          <dl className="mt-5 border-t border-border">
            {facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-border py-3.5">
                <dt className="tnum pt-0.5 text-[11px] text-muted">{f.label}</dt>
                <dd className="text-[15px] leading-relaxed text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>

          {/* mt-auto pins this row to the bottom so it lines up across a grid row. */}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-5">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
            <LinkOut project={project} fallback={labels.viewLive} />
          </div>
        </div>
      </article>
    );
  }

  // compact
  return (
    <article className="group flex h-full flex-col">
      <Cover project={project} locale={locale} className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-medium tracking-tight">{title}</h3>
          {index && <span className="tnum shrink-0 text-xs text-muted">{index}</span>}
        </div>
        <p className="tnum mt-1 text-xs text-muted">{tagline}</p>
        {project.result?.[locale] && (
          <p className="mt-3 text-[15px] leading-relaxed text-foreground">{project.result[locale]}</p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 2).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
          <LinkOut project={project} fallback={labels.viewLive} />
        </div>
      </div>
    </article>
  );
}
