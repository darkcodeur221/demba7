import {
  EnvelopeSimple,
  Phone,
  MapPin,
  LinkedinLogo,
  GithubLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Section } from "./Section";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/ContactForm";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Contact({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const c = dict.contact;

  const directs = [
    { icon: EnvelopeSimple, label: c.emailLabel, value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: c.phoneLabel, value: site.phone, href: site.phoneHref },
    { icon: MapPin, label: c.locationLabel, value: site.location[locale], href: undefined },
  ];

  return (
    <Section id="contact" surface>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-2.5 text-sm font-medium text-brand">
              <span className="h-px w-6 bg-brand" aria-hidden />
              {c.label}
            </span>
            <h2 className="text-3xl font-semibold tracking-tight md:text-[2.5rem] md:leading-[1.1]">
              {c.heading}
            </h2>
            <p className="text-base leading-relaxed text-muted">{c.intro}</p>

            <div className="mt-4 flex flex-col gap-1">
              <p className="mb-1 text-sm font-medium text-foreground">{c.directLabel}</p>
              {directs.map((d) => {
                const Inner = (
                  <span className="flex items-center gap-3 py-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-brand">
                      <d.icon size={18} weight="bold" />
                    </span>
                    <span className="text-sm">
                      <span className="block text-xs text-muted">{d.label}</span>
                      <span className="text-foreground">{d.value}</span>
                    </span>
                  </span>
                );
                return d.href ? (
                  <a key={d.label} href={d.href} className="transition-opacity hover:opacity-80">
                    {Inner}
                  </a>
                ) : (
                  <div key={d.label}>{Inner}</div>
                );
              })}
            </div>

            <div className="mt-2 flex items-center gap-2">
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-background hover:text-brand"
              >
                <LinkedinLogo size={18} weight="bold" />
              </a>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-background hover:text-brand"
              >
                <GithubLogo size={18} weight="bold" />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1} className="rounded-[var(--radius-card)] border border-border bg-card p-6 sm:p-8">
            <ContactForm dict={c.form} locale={locale} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
