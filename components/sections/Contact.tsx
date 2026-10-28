import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Section, SectionHeader } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { Kicker } from "@/components/Kicker";
import { Magnetic } from "@/components/fx/Magnetic";
import { ContactForm } from "@/components/ContactForm";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/** A disc with a line of text running round its edge, turning slowly. */
function OrbitBadge({ text, label }: { text: string; label: string }) {
  return (
    <Magnetic strength={0.4}>
      <a
        href={`mailto:${site.email}`}
        className="group relative flex h-48 w-48 items-center justify-center md:h-56 md:w-56"
      >
        <svg
          viewBox="0 0 200 200"
          aria-hidden
          className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite] motion-reduce:animate-none"
        >
          <defs>
            <path id="orbit-path" d="M100,100 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0" />
          </defs>
          <text className="fill-muted font-mono text-[10.5px] uppercase tracking-[0.32em]">
            <textPath href="#orbit-path">{text}</textPath>
          </text>
        </svg>
        <span className="relative flex h-[62%] w-[62%] items-center justify-center rounded-full bg-brand text-on-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
          <span className="display text-lg uppercase">{label}</span>
          <ArrowUpRight
            size={18}
            className="absolute right-[22%] top-[22%] transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </span>
      </a>
    </Magnetic>
  );
}

export function Contact({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const c = dict.contact;
  const ring = `${dict.hero.status} · ${site.location[locale]} · ${dict.hero.status} · ${site.location[locale]} · `;

  const directs = [
    { label: c.emailLabel, value: site.email, href: `mailto:${site.email}` },
    { label: c.phoneLabel, value: site.phone, href: site.phoneHref },
    { label: c.locationLabel, value: site.location[locale], href: undefined },
  ];
  const socials = [
    { label: "LinkedIn", href: site.socials.linkedin },
    { label: "GitHub", href: site.socials.github },
  ];

  return (
    <Section id="contact" surface>
      <SectionHeader id="contact" label={c.label} heading={c.heading} intro={c.intro} />

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <Reveal className="flex flex-col gap-12 lg:col-span-5">
          <OrbitBadge text={ring} label={c.write} />

          <div>
            <Kicker label={c.directLabel} className="mb-4" />
            <dl className="border-t border-border-strong">
              {directs.map((d) => (
                <div key={d.label} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-border py-5">
                  <dt className="tnum pt-1 text-[11px] text-muted">{d.label}</dt>
                  <dd className="text-lg tracking-tight text-foreground">
                    {d.href ? (
                      <a href={d.href} className="link-draw">
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex gap-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group tnum inline-flex items-center gap-1 text-xs text-foreground"
                >
                  <span className="link-draw">{s.label}</span>
                  <ArrowUpRight
                    size={13}
                    className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="rounded-[var(--radius-card)] border border-border bg-card p-6 sm:p-9">
            <ContactForm dict={c.form} locale={locale} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
