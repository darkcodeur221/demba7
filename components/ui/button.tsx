import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Shared button styling. Exported as `buttonVariants` so links (`<a>`, Next
 * `<Link>`) can wear the same look without nesting interactive elements.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[transform,background-color,border-color,color] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-on-brand hover:bg-brand-strong shadow-[0_8px_24px_-12px_rgba(31,78,121,0.6)]",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:bg-surface",
        ghost: "bg-transparent text-foreground hover:bg-surface",
        link: "bg-transparent text-brand underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-9 px-3.5",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-[15px]",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
