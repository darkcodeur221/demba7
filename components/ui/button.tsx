import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-on-brand hover:bg-brand-strong shadow-[0_8px_30px_-10px_rgba(31,78,121,0.6)] hover:shadow-[0_8px_36px_-8px_rgba(31,78,121,0.7)]",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:bg-accent-soft/40 hover:border-brand/30",
        ghost: "bg-transparent text-foreground hover:bg-surface",
        link: "bg-transparent text-brand underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-5",
        lg: "h-12 px-7 text-[15px]",
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
