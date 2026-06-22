/**
 * Locale configuration safe to import from both server and client components
 * (no `server-only` guard here). French is the default.
 */
export const locales = ["fr", "en"] as const;
export const defaultLocale = "fr" as const;

export type Locale = (typeof locales)[number];

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
