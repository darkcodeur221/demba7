import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Shared button styling. Exported as `buttonVariants` so links (`<a>`, Next
 * `<Link>`) can wear the same look without nesting interactive elements.
 * The primary button is ink; the accent only arrives on hover, which keeps the
 * cobalt rare enough to mean something.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[background-color,color,border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-ink text-on-ink hover:bg-brand hover:text-on-brand",
        accent: "bg-brand text-on-brand hover:bg-brand-strong",
        outline: "border border-border-strong bg-transparent text-foreground hover:border-foreground",
        ghost: "bg-transparent text-foreground hover:bg-surface",
        link: "bg-transparent px-0 text-brand underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4",
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
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
