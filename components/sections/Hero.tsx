import Link from "next/link";
import { ArrowRight, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { FlowPipeline } from "@/components/motion/FlowPipeline";
import { HeroBackground } from "@/components/motion/HeroBackground";
import { Reveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const h = dict.hero;
  const base = `/${locale}`;
  const [before, after] = h.title.split(h.titleAccent);

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24 pb-16">
      <HeroBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-sm font-medium text-brand">
              <span className="h-px w-8 bg-brand" aria-hidden />
              {h.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-5 text-[2rem] font-bold leading-[1.08] tracking-tight text-foreground sm:text-[2.5rem] lg:text-[3.2rem]">
              {before}
              <span className="text-gradient">{h.titleAccent}</span>
              {after}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{h.subtitle}</p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href={`${base}#projects`}
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  "group relative overflow-hidden"
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {h.ctaProjects}
                  <ArrowRight
                    size={18}
                    weight="bold"
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
              <Link
                href={`${base}#contact`}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                {h.ctaContact}
              </Link>
              <Link
                href={`${base}/cv`}
                className="inline-flex items-center gap-1.5 px-2 text-sm font-medium text-muted transition-colors hover:text-brand"
              >
                <DownloadSimple size={16} weight="bold" />
                {h.ctaCv}
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <FlowPipeline
            raw={h.flow.raw}
            rawDetail={h.flow.rawDetail}
            system={h.flow.system}
            systemDetail={h.flow.systemDetail}
            decision={h.flow.decision}
            decisionDetail={h.flow.decisionDetail}
          />
        </div>
      </div>
    </section>
  );
}
