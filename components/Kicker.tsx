import { cn } from "@/lib/utils";

/** Small mono running head, "02 — Label", used above every headline. */
export function Kicker({
  index,
  label,
  className,
}: {
  index?: string;
  label: string;
  className?: string;
}) {
  return (
    <span className={cn("tnum inline-flex items-center gap-2 text-xs text-muted", className)}>
      {index && <span className="text-accent">{index}</span>}
      {index && <span aria-hidden>—</span>}
      {label}
    </span>
  );
}
