import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  EnvelopeSimple,
  Phone,
  MapPin,
  LinkedinLogo,
  GithubLogo,
  ArrowUpRight,
  GraduationCap,
  SealCheck,
  Translate,
} from "@phosphor-icons/react/dist/ssr";
import { getDictionary, isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { certifications, timeline } from "@/data/certifications";
import { Reveal } from "@/components/motion/Reveal";
import { GrowLine } from "@/components/cv/GrowLine";
import { PrintButton } from "@/components/cv/PrintButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.cv.metaTitle,
    alternates: {
      canonical: `${site.url}/${locale}/cv`,
      languages: { fr: `${site.url}/fr/cv`, en: `${site.url}/en/cv` },
    },
  };
}

function CvTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h2 className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
        {children}
      </h2>
      <GrowLine className="flex-1" />
    </div>
  );
}

export default async function CvPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const c = dict.cv;

  const work = projects.filter((p) => p.featured);

  const contacts = [
    { icon: EnvelopeSimple, value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, value: site.phone, href: site.phoneHref },
    { icon: MapPin, value: site.location[locale], href: undefined },
    { icon: LinkedinLogo, value: "LinkedIn", href: site.socials.linkedin },
    { icon: GithubLogo, value: "GitHub", href: site.socials.github },
  ];

  return (
    <div className="cv-screen-bg min-h-[100dvh] bg-surface pb-16">
      <PrintButton backHref={`/${locale}`} backLabel={c.back} printLabel={c.print} />

      <article className="cv-doc mx-auto mt-6 w-full max-w-[880px] overflow-hidden rounded-[var(--radius-card)] border border-border bg-card shadow-[0_30px_80px_-40px_rgba(31,78,121,0.4)] print:mt-0">
        {/* Header */}
        <header className="border-b border-border px-8 py-9 sm:px-11">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
            <Reveal className="min-w-0">
              <p className="text-sm font-medium text-brand">{c.role}</p>
              <h1 className="mt-1.5 text-[2.1rem] font-semibold leading-tight tracking-tight sm:text-[2.5rem]">
                Ngagne Demba Beye
              </h1>
              <GrowLine className="mt-3 w-24" />
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
                <span className="rounded-md bg-accent-soft px-2 py-0.5 text-brand">{dict.hero.flow.raw}</span>
                <ArrowUpRight size={13} weight="bold" className="rotate-45 text-brand" />
                <span className="rounded-md bg-accent-soft px-2 py-0.5 text-brand">{dict.hero.flow.system}</span>
                <ArrowUpRight size={13} weight="bold" className="rotate-45 text-brand" />
                <span className="rounded-md bg-accent-soft px-2 py-0.5 text-brand">{dict.hero.flow.decision}</span>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="flex shrink-0 flex-col gap-1.5 text-sm sm:items-end">
              {contacts.map((item) => {
                const Inner = (
                  <span className="inline-flex items-center gap-2 text-muted">
                    <item.icon size={15} weight="bold" className="text-brand" />
                    <span className="tnum">{item.value}</span>
                  </span>
                );
                return item.href ? (
                  <a
                    key={item.value}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    {Inner}
                  </a>
                ) : (
                  <span key={item.value}>{Inner}</span>
                );
              })}
            </Reveal>
          </div>
        </header>

        {/* Body */}
        <div className="grid gap-x-11 gap-y-10 px-8 py-9 sm:px-11 lg:grid-cols-12">
          {/* Main column */}
          <div className="flex flex-col gap-10 lg:col-span-7">
            <section>
              <CvTitle>{c.summaryLabel}</CvTitle>
              <Reveal>
                <p className="text-[15px] leading-relaxed text-foreground">{c.summary}</p>
              </Reveal>
            </section>

            <section>
              <CvTitle>{c.workLabel}</CvTitle>
              <div className="flex flex-col">
                {work.map((p, i) => (
                  <Reveal
                    key={p.slug}
                    delay={i * 0.05}
                    className={`flex flex-col gap-1.5 py-3.5 ${i > 0 ? "border-t border-border" : "pt-0"}`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[15px] font-semibold tracking-tight">{p.title[locale]}</h3>
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex shrink-0 items-center gap-0.5 text-xs font-medium text-brand hover:text-brand-strong"
                        >
                          {p.linkLabel ?? p.tagline[locale]}
                          <ArrowUpRight size={12} weight="bold" />
                        </a>
                      ) : (
                        <span className="shrink-0 text-xs text-brand">{p.tagline[locale]}</span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-muted">
                      {p.result?.[locale] ?? p.solution?.[locale]}
                    </p>
                    <p className="tnum text-xs text-muted/80">{p.stack.join(" · ")}</p>
                  </Reveal>
                ))}
              </div>
            </section>

            <section>
              <CvTitle>{c.educationLabel}</CvTitle>
              <div className="flex flex-col gap-4">
                {timeline.map((entry, i) => (
                  <Reveal key={entry.year} delay={i * 0.05} className="flex gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-brand">
                      <GraduationCap size={15} weight="bold" />
                    </span>
                    <div>
                      <p className="text-[15px] font-semibold tracking-tight">{entry.title[locale]}</p>
                      <p className="text-sm text-muted">
                        {entry.org} <span className="tnum text-brand">· {entry.year}</span>
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-10 lg:col-span-5">
            <section>
              <CvTitle>{c.skillsLabel}</CvTitle>
              <div className="flex flex-col gap-4">
                {skillGroups.map((group, i) => (
                  <Reveal key={group.id} delay={i * 0.04}>
                    <p className="mb-1.5 text-xs font-semibold text-foreground">{group.title[locale]}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-border bg-surface px-2 py-0.5 text-xs text-muted"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            <section>
              <CvTitle>{c.certificationsLabel}</CvTitle>
              <ul className="flex flex-col gap-2.5">
                {certifications.map((cert) => (
                  <Reveal key={`${cert.title.fr}-${cert.year}`} className="flex gap-2.5">
                    <SealCheck size={16} weight="bold" className="mt-0.5 shrink-0 text-brand" />
                    <div>
                      <p className="text-[13px] font-medium leading-snug">{cert.title[locale]}</p>
                      <p className="tnum text-xs text-muted">
                        {cert.issuer}, {cert.year}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </section>

            <section>
              <CvTitle>{c.languagesLabel}</CvTitle>
              <ul className="flex flex-col gap-2">
                {c.languages.map((lang) => (
                  <li key={lang.name} className="flex items-center gap-2.5 text-sm">
                    <Translate size={16} weight="bold" className="shrink-0 text-brand" />
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-muted">· {lang.level}</span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>

        <footer className="border-t border-border px-8 py-4 text-center text-xs text-muted sm:px-11">
          {c.available}
        </footer>
      </article>
    </div>
  );
}
