import type { Certification, TimelineEntry } from "./types";

/** Certifications, most recent first. */
export const certifications: Certification[] = [
  { title: { fr: "Claude 101", en: "Claude 101" }, issuer: "Anthropic", year: "2026" },
  { title: { fr: "Google Analytics", en: "Google Analytics" }, issuer: "Google", year: "2026" },
  {
    title: { fr: "Google Ads (Réseau Display)", en: "Google Ads (Display Network)" },
    issuer: "Google",
    year: "2025",
  },
  {
    title: { fr: "Salesforce CRM", en: "Salesforce CRM" },
    issuer: "Trailhead",
    year: "2025",
  },
  {
    title: { fr: "Scrum Foundation", en: "Scrum Foundation" },
    issuer: "Certiprof",
    year: "2025",
  },
  {
    title: { fr: "Intelligence Artificielle", en: "Artificial Intelligence" },
    issuer: "FORCE-N / Mastercard Foundation",
    year: "2024",
  },
  {
    title: { fr: "Low Code / No Code", en: "Low Code / No Code" },
    issuer: "FORCE-N",
    year: "2023",
  },
  {
    title: { fr: "Python for Data Science & AI", en: "Python for Data Science & AI" },
    issuer: "IBM / Coursera",
    year: "2023",
  },
];

/** Education and milestones, most recent first. */
export const timeline: TimelineEntry[] = [
  {
    year: "2025",
    title: { fr: "M.Sc. Technologies de l'information", en: "M.Sc. Information Technology" },
    org: "UQAM",
    kind: "education",
  },
  {
    year: "2019",
    title: {
      fr: "Licence gestion de projet numérique",
      en: "Bachelor in digital project management",
    },
    org: "ESMT Dakar",
    kind: "education",
  },
];
