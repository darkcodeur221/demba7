import type { Locale } from "./i18n";

/**
 * Central site configuration. Edit contact details and URLs here once.
 * Used by metadata, JSON-LD, the nav, the footer and the contact section.
 */
export const site = {
  url: "https://demba.deejitcorp.com",
  name: "Ngagne Demba Beye",
  email: "demba@deejitcorp.com",
  phone: "+1 514-573-9843",
  phoneHref: "tel:+15145739843",
  location: {
    fr: "Longueuil, QC",
    en: "Longueuil, QC",
  },
  cv: "/cv-ngagne-demba-beye.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/ngagne-demba-beye",
    github: "https://github.com/darkcodeur221",
  },
} as const;

/** Localized helper to pick a string from a `{ fr, en }` map. */
export function pick<T>(value: Record<Locale, T>, locale: Locale): T {
  return value[locale];
}
