import { cn } from "@/lib/utils";

/** Small tech / category tag. Quiet by default, brand tint on `accent`. */
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
        "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium",
        accent
          ? "bg-accent-soft text-brand"
          : "border border-border bg-surface text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
