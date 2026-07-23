import Image from "next/image";
import { Database, Cpu, Target } from "@phosphor-icons/react/dist/ssr";

/**
 * The hero illustration: raw data -> AI system -> decision.
 *
 * The rendered background was keyed out, so it sits directly on the page with
 * no frame, glow or motion. Its baked-in labels were painted out as well and
 * are re-rendered here as real text, which keeps them localised and correctly
 * accented. Percentages below are the positions those labels occupied in the
 * source image.
 */
export function HeroVisual({
  alt,
  raw,
  system,
  decision,
}: {
  alt: string;
  raw: string;
  system: string;
  decision: string;
}) {
  const labels = [
    { key: "system", text: system, Icon: Cpu, x: "47.5%", y: "11.4%" },
    { key: "raw", text: raw, Icon: Database, x: "16.4%", y: "53.2%" },
    { key: "decision", text: decision, Icon: Target, x: "83%", y: "53.2%" },
  ];

  return (
    <div className="relative w-full max-w-[620px]">
      <Image
        src="/images/hero-illustration.webp"
        alt={alt}
        width={1536}
        height={1024}
        priority
        sizes="(max-width: 1024px) 92vw, 620px"
        className="h-auto w-full"
      />

      {labels.map(({ key, text, Icon, x, y }) => (
        <span
          key={key}
          style={{ left: x, top: y }}
          className="absolute inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 text-[11px] font-semibold text-foreground sm:text-xs"
        >
          <Icon size={13} weight="fill" className="text-brand" />
          {text}
        </span>
      ))}
    </div>
  );
}
