import { cn } from "@/lib/utils";

/** Tech / category tag. Near-square and set in mono, like a spec annotation. */
export function Badge({
  children,
  accent = false,
  className,
}: {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-tag)] px-2 py-0.5 font-mono text-[11px] leading-5 tracking-tight",
        accent ? "bg-accent-soft text-brand" : "border border-border text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
