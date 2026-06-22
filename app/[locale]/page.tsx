import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { AIProjects } from "@/components/sections/AIProjects";
import { DataAnalytics } from "@/components/sections/DataAnalytics";
import { Ecommerce } from "@/components/sections/Ecommerce";
import { ClientSites } from "@/components/sections/ClientSites";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      {/* Top sentinel: the nav watches it to know when to show its background. */}
      <div id="top-sentinel" aria-hidden className="absolute top-0 h-px w-full" />

      <Nav
        locale={locale}
        nav={dict.nav}
        switchLabel={dict.common.switchLang}
        themeLabel={dict.common.toggleTheme}
      />

      <main>
        <Hero dict={dict} locale={locale} />
        <About dict={dict} />
        <AIProjects dict={dict} locale={locale} />
        <DataAnalytics dict={dict} locale={locale} />
        <Ecommerce dict={dict} locale={locale} />
        <ClientSites dict={dict} locale={locale} />
        <Services dict={dict} locale={locale} />
        <Skills dict={dict} locale={locale} />
        <Education dict={dict} locale={locale} />
        <Contact dict={dict} locale={locale} />
      </main>

      <Footer
        locale={locale}
        tagline={dict.footer.tagline}
        rights={dict.footer.rights}
        built={dict.footer.built}
        backToTop={dict.common.backToTop}
      />
    </>
  );
}
