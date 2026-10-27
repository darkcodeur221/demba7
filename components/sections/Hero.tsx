import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { RevealLines } from "@/components/fx/RevealText";
import { Magnetic } from "@/components/fx/Magnetic";
import { VelocityMarquee } from "@/components/fx/VelocityMarquee";
import { Reveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const h = dict.hero;
  const base = `/${locale}`;

  return (
    <>
      <section id="hero" className="relative min-h-[100dvh] overflow-hidden">
        <HeroCanvas />
        {/* Fades the scene into the page so the marquee below reads cleanly. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent"
        />

        <div className="container-x relative z-10 flex min-h-[100dvh] flex-col pb-12 pt-28">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="glass tnum inline-flex items-center gap-2.5 rounded-full border border-border px-3.5 py-1.5 text-xs text-foreground">
                <span className="live-dot h-2 w-2 rounded-full bg-live" aria-hidden />
                {h.status}
              </span>
              <span className="tnum text-xs text-muted">{h.place}</span>
            </div>
          </Reveal>

          <div className="mt-auto pt-16">
            <Reveal delay={0.1}>
              <p className="tnum text-xs text-muted">
                <span className="text-brand">{site.name}</span> — {h.eyebrow}
              </p>
            </Reveal>

            <h1 className="display mt-6 text-[clamp(2.25rem,7.2vw,8.4rem)] uppercase">
              <RevealLines lines={h.display} accent={1} delay={0.25} />
            </h1>

            <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
              <Reveal delay={0.55} className="md:col-span-5">
                <p className="max-w-[42ch] text-lg leading-relaxed text-muted">{h.title}</p>
              </Reveal>
              <Reveal delay={0.65} className="md:col-span-7">
                <div className="flex flex-wrap items-center gap-3 md:justify-end">
                  <Magnetic>
                    <Link
                      href={`${base}#projects`}
                      className={cn(buttonVariants({ variant: "accent", size: "lg" }), "group h-14 px-7")}
                    >
                      {h.ctaProjects}
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </Magnetic>
                  <Magnetic>
                    <Link
                      href={`${base}#contact`}
                      className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-14 px-7")}
                    >
                      {h.ctaContact}
                    </Link>
                  </Magnetic>
                  <Link
                    href={`${base}/cv`}
                    className="tnum group ml-2 inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-brand"
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
          </div>
        </div>
      </section>

      <VelocityMarquee
        items={h.marquee}
        className="border-y border-border py-6 text-[clamp(2.6rem,7.5vw,7rem)] md:py-8"
      />
    </>
  );
}
