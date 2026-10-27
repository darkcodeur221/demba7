import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { HeroVisual } from "@/components/motion/HeroVisual";
import { StackMarquee } from "@/components/motion/StackMarquee";
import { Reveal } from "@/components/motion/Reveal";
import { Kicker } from "@/components/Kicker";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const h = dict.hero;
  const base = `/${locale}`;
  // Split the headline so the brand phrase can be set in the serif italic.
  const [before, after] = h.title.split(h.titleAccent);

  return (
    <section id="hero" className="relative flex min-h-[100dvh] flex-col overflow-hidden pt-24">
      {/* A faint cobalt wash behind the diagram; the grain does the rest. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[12%] top-[8%] h-[75vh] w-[75vh] rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border pb-4">
            <span className="tnum inline-flex items-center gap-2.5 text-xs text-foreground">
              <span className="live-dot h-2 w-2 rounded-full bg-live" aria-hidden />
              {h.status}
            </span>
            <span className="tnum text-xs text-muted">{h.place}</span>
          </div>
        </Reveal>

        <div className="grid items-center gap-14 py-12 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <Kicker label={h.eyebrow} />
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-6 text-[2.55rem] font-medium leading-[0.98] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[4rem] xl:text-[4.4rem]">
                {before}
                <em className="em-serif">{h.titleAccent}</em>
                {after}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-muted">{h.subtitle}</p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link
                  href={`${base}#projects`}
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}
                >
                  {h.ctaProjects}
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href={`${base}#contact`}
                  className="link-draw text-[15px] font-medium text-foreground"
                >
                  {h.ctaContact}
                </Link>
                <Link
                  href={`${base}/cv`}
                  className="tnum group inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-brand"
                >
                  {h.ctaCv}
                  <ArrowUpRight
                    size={13}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <HeroVisual
              hub={h.orchestration.hub}
              hubDetail={h.orchestration.hubDetail}
              nodes={h.orchestration.nodes}
            />
          </div>
        </div>
      </div>

      <StackMarquee />
    </section>
  );
}
