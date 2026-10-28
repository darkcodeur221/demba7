"use client";

import { useEffect, useRef, useState } from "react";
import { ChatCircleDots, PaperPlaneRight, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export type ChatDict = {
  name: string;
  role: string;
  status: string;
  open: string;
  close: string;
  greeting: string;
  placeholder: string;
  send: string;
  error: string;
  suggestions: string[];
  poweredBy: string;
};

type Message = { role: "user" | "assistant"; content: string };

/** The model occasionally emphasises a term; render that rather than the stars. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

export function ChatWidget({ dict }: { dict: ChatDict }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    inputRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;

    setFailed(false);
    setInput("");
    const next: Message[] = [...messages, { role: "user", content: question }];
    // Append an empty assistant bubble that the stream fills in.
    setMessages([...next, { role: "assistant", content: "" }]);
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok || !res.body) throw new Error(String(res.status));

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "assistant",
            content: copy[copy.length - 1].content + chunk,
          };
          return copy;
        });
      }
    } catch {
      setFailed(true);
      // Drop the empty bubble so the error stands alone.
      setMessages((prev) => prev.filter((m, i) => !(i === prev.length - 1 && !m.content)));
    } finally {
      setBusy(false);
    }
  }

  const showSuggestions = messages.length === 0 && !busy;

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? dict.close : dict.open}
        aria-expanded={open}
        className={cn(
          "no-print fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full",
          // The white ring keeps the lime button visible over the lime footer.
          "bg-brand text-on-brand ring-4 ring-white/90 shadow-[0_14px_36px_-12px_rgba(110,150,20,0.7)]",
          "transition-[transform,background-color] duration-300 hover:scale-105 hover:bg-brand-strong active:scale-95",
          open && "scale-0 opacity-0"
        )}
      >
        <ChatCircleDots size={26} weight="fill" />
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label={dict.name}
          className={cn(
            "no-print fixed z-[60] flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_80px_-24px_rgba(12,13,16,0.28)]",
            "inset-x-3 bottom-3 max-h-[min(34rem,calc(100dvh-1.5rem))]",
            "sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[24rem]"
          )}
        >
          <header className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3">
            <span className="display flex h-9 w-9 items-center justify-center rounded-[10px] bg-brand text-lg text-on-brand">
              N
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">{dict.name}</p>
              <p className="flex items-center gap-1.5 text-xs text-muted">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-live" aria-hidden />
                {dict.status}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={dict.close}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-background hover:text-foreground"
            >
              <X size={17} weight="bold" />
            </button>
          </header>

          {/* data-lenis-prevent: let this list scroll natively under smooth scroll */}
          <div ref={scrollRef} data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <p className="max-w-[85%] rounded-2xl rounded-tl-md bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
              {dict.greeting}
            </p>

            {messages.map((m, i) => (
              <p
                key={i}
                className={cn(
                  "max-w-[85%] whitespace-pre-wrap px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "ml-auto rounded-2xl rounded-br-md bg-brand text-on-brand"
                    : "rounded-2xl rounded-tl-md bg-surface text-foreground"
                )}
              >
                {m.content ? (
                  <RichText text={m.content} />
                ) : (
                  <span className="inline-flex gap-1 py-1" aria-label="…">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </span>
                )}
              </p>
            ))}

            {failed && (
              <p className="rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-muted">
                {dict.error}
              </p>
            )}

            {showSuggestions && (
              <div className="flex flex-wrap gap-2 pt-1">
                {dict.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-left text-xs font-medium text-accent transition-colors hover:border-brand/40 hover:bg-accent-soft"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border px-3 py-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={dict.placeholder}
              maxLength={800}
              aria-label={dict.placeholder}
              className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted focus:border-brand/50"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label={dict.send}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-on-brand transition-[opacity,background-color] duration-300 hover:bg-brand-strong disabled:opacity-40"
            >
              <PaperPlaneRight size={17} weight="fill" />
            </button>
          </form>

          <p className="border-t border-border px-4 py-1.5 text-center text-[10px] text-muted">
            {dict.poweredBy}
          </p>
        </div>
      )}
    </>
  );
}
