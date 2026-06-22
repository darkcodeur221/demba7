"use client";

import { useState } from "react";
import { PaperPlaneTilt, CircleNotch, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

type FormDict = {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  invalid: string;
};

type Status = "idle" | "sending" | "success" | "error" | "invalid";

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted transition-colors focus:border-brand focus-visible:outline-none";

export function ContactForm({ dict, locale }: { dict: FormDict; locale: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !message || !emailOk) {
      setStatus("invalid");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, locale }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const disabled = status === "sending";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            {dict.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={dict.namePlaceholder}
            className={inputClass}
            disabled={disabled}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            {dict.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={dict.emailPlaceholder}
            className={inputClass}
            disabled={disabled}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          {dict.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={dict.messagePlaceholder}
          className={cn(inputClass, "resize-y")}
          disabled={disabled}
          required
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={disabled}
          className={cn(buttonVariants({ variant: "primary", size: "md" }))}
        >
          {status === "sending" ? (
            <>
              <CircleNotch size={18} weight="bold" className="animate-spin" />
              {dict.sending}
            </>
          ) : (
            <>
              <PaperPlaneTilt size={18} weight="bold" />
              {dict.submit}
            </>
          )}
        </button>

        {status === "success" && (
          <p role="status" className="inline-flex items-center gap-1.5 text-sm text-brand">
            <CheckCircle size={17} weight="fill" />
            {dict.success}
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="inline-flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
            <WarningCircle size={17} weight="fill" />
            {dict.error}
          </p>
        )}
        {status === "invalid" && (
          <p role="alert" className="inline-flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
            <WarningCircle size={17} weight="fill" />
            {dict.invalid}
          </p>
        )}
      </div>
    </form>
  );
}
