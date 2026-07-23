import { cn } from "@/lib/utils";

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
        "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
        accent
          ? "bg-accent-soft text-brand"
          : "border border-border bg-surface/50 text-muted hover:border-border-strong hover:text-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
