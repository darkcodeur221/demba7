import Link from "next/link";
import { ArrowRight, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { FlowPipeline } from "@/components/motion/FlowPipeline";
import { Reveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const h = dict.hero;
  const base = `/${locale}`;
  // Split the headline so the brand phrase can be highlighted inline.
  const [before, after] = h.title.split(h.titleAccent);

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24 pb-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-sm font-medium text-brand">
              <span className="h-px w-6 bg-brand" aria-hidden />
              {h.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-5 text-[2rem] font-semibold leading-[1.12] tracking-tight text-foreground sm:text-[2.4rem] lg:text-[2.9rem]">
              {before}
              <span className="text-brand">{h.titleAccent}</span>
              {after}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{h.subtitle}</p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href={`${base}#projects`} className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
                {h.ctaProjects}
                <ArrowRight size={18} weight="bold" />
              </Link>
              <Link href={`${base}#contact`} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
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
