import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";

  const title = isFr
    ? "Ngagne Demba Beye · Spécialiste IA & E-commerce"
    : "Ngagne Demba Beye · AI & E-commerce Specialist";
  const description = isFr
    ? "Spécialiste en IA appliquée, automatisation et analytique. Je transforme des besoins d'affaires en systèmes IA concrets, en production, et je fais parler les données."
    : "Specialist in applied AI, automation and analytics. I turn business needs into real AI systems in production, and make data speak.";

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    keywords: [
      "Ngagne Demba Beye",
      "spécialiste IA",
      "AI specialist",
      "automatisation",
      "n8n",
      "Claude API",
      "analytique",
      "Tableau",
      "e-commerce",
      "Québec",
    ],
    authors: [{ name: site.name }],
    alternates: {
      canonical: `${site.url}/${locale}`,
      languages: { fr: `${site.url}/fr`, en: `${site.url}/en` },
    },
    openGraph: {
      type: "profile",
      url: `${site.url}/${locale}`,
      siteName: site.name,
      title,
      description,
      locale: isFr ? "fr_CA" : "en_CA",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

function PersonJsonLd({ locale }: { locale: Locale }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: "2026-06-22",
    mainEntity: {
      "@type": "Person",
      name: site.name,
      jobTitle:
        locale === "fr"
          ? "Spécialiste IA & E-commerce"
          : "AI & E-commerce Specialist",
      email: `mailto:${site.email}`,
      telephone: site.phone,
      url: site.url,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Longueuil",
        addressRegion: "QC",
        addressCountry: "CA",
      },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "UQAM" },
        { "@type": "CollegeOrUniversity", name: "ESMT Dakar" },
      ],
      knowsAbout: [
        "Applied AI",
        "Automation",
        "Claude API",
        "n8n",
        "Predictive analytics",
        "Tableau",
        "E-commerce",
        "WooCommerce",
      ],
      sameAs: [site.socials.linkedin, site.socials.github],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <PersonJsonLd locale={locale} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
