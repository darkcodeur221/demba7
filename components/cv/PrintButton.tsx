"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "@phosphor-icons/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Top toolbar for the CV page. Hidden when printing (`.no-print`). */
export function PrintButton({
  backHref,
  backLabel,
  printLabel,
}: {
  backHref: string;
  backLabel: string;
  printLabel: string;
}) {
  return (
    <div className="no-print mx-auto flex w-full max-w-[880px] items-center justify-between px-5 pt-8 sm:px-0">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} weight="bold" />
        {backLabel}
      </Link>
      <button
        type="button"
        onClick={() => window.print()}
        className={cn(buttonVariants({ variant: "primary", size: "sm" }))}
      >
        <Printer size={16} weight="bold" />
        {printLabel}
      </button>
    </div>
  );
}
