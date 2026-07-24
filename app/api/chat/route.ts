import { buildSystemPrompt } from "@/lib/chat-context";

/** DeepSeek is OpenAI-compatible, so this is a plain chat/completions call. */
const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";
/** Flash keeps replies snappy, which suits short answers. Override per env. */
const MODEL = process.env.DEEPSEEK_MODEL ?? "deepseek-v4-flash";

const MAX_CHARS = 800;
/** Only the tail of the conversation is forwarded; the brief carries the rest. */
const MAX_TURNS = 12;

// Simple in-memory throttle. The app runs as a single PM2 fork process, so a
// module-level map is enough to stop one visitor burning the API budget.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 25;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    if (hits.size > 5000) {
      for (const [key, value] of hits) if (now > value.resetAt) hits.delete(key);
    }
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.error("DEEPSEEK_API_KEY is not set; chat is disabled.");
    return Response.json({ error: "not_configured" }, { status: 500 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return Response.json({ error: "invalid_fields" }, { status: 422 });
  }

  const history: Msg[] = (body.messages as Msg[])
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (history.length === 0 || history[history.length - 1].role !== "user") {
    return Response.json({ error: "invalid_fields" }, { status: 422 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(DEEPSEEK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        temperature: 0.3,
        max_tokens: 400,
        messages: [{ role: "system", content: buildSystemPrompt() }, ...history],
      }),
    });
  } catch (err) {
    console.error("DeepSeek request failed:", err);
    return Response.json({ error: "upstream_unreachable" }, { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    console.error("DeepSeek error:", upstream.status, await upstream.text().catch(() => ""));
    return Response.json({ error: "upstream_failed" }, { status: 502 });
  }

  // Unwrap the SSE frames and forward just the text, so the client can append
  // chunks straight to the bubble.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let buffer = "";
      // close() throws if called twice, which would tear the stream down before
      // the last chunk is flushed. Guard it.
      let closed = false;
      const close = () => {
        if (!closed) {
          closed = true;
          controller.close();
        }
      };
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (payload === "[DONE]") {
              close();
              return;
            }
            try {
              const delta = JSON.parse(payload)?.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              // Ignore keep-alives and any partial frame we cannot parse yet.
            }
          }
        }
      } catch (err) {
        console.error("Chat stream error:", err);
      } finally {
        close();
        reader.releaseLock();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
