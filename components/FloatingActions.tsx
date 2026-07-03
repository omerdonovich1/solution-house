"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X } from "lucide-react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const WHATSAPP = "972500000000";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "היי! אני סול, העוזר של Solution House 👋 אפשר לשאול אותי הכול — מה אנחנו בונים, איך התהליך עובד, או פשוט לספר לי על האתגר שלכם.",
};

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35zM12.05 21.79h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.72.98.99-3.63-.23-.37a9.8 9.8 0 0 1-1.5-5.21c0-5.42 4.41-9.83 9.84-9.83a9.77 9.77 0 0 1 6.95 2.88 9.77 9.77 0 0 1 2.88 6.96c0 5.42-4.42 9.8-9.84 9.8zm8.37-18.17A11.72 11.72 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.87 11.87 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.52-8.28z" />
    </svg>
  );
}

/**
 * Always-on floating actions: WhatsApp for a direct line, and Sol — the
 * Claude-powered assistant — in a compact chat panel.
 */
export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // the greeting is client-side flavor — the API needs user-first history
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply || "…" }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "אופס, התקשורת נפלה לרגע. נסו שוב 🙏" },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed bottom-[140px] left-4 sm:bottom-[152px] z-[85] flex h-[min(500px,calc(100svh-190px))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0C0C0E] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-ivory">
                <Bot className="h-5 w-5 text-ink" strokeWidth={1.8} />
                <span className="absolute -bottom-0.5 -left-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0C0C0E] bg-dot" />
              </span>
              <div className="flex-1">
                <div className="text-[13.5px] font-bold text-ivory">סול · העוזר של Solution House</div>
                <div className="font-mono text-[10px] tracking-[0.14em] text-mist">מופעל על ידי Claude · עונה מיד</div>
              </div>
              <button
                type="button"
                aria-label="סגירת הצ'אט"
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-mist transition-colors hover:bg-white/[0.06] hover:text-ivory"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed",
                    m.role === "assistant"
                      ? "rounded-tr-md bg-white/[0.06] text-body"
                      : "ms-auto rounded-tl-md bg-ivory text-ink"
                  )}
                >
                  {m.content}
                </div>
              ))}
              {busy && (
                <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-tr-md bg-white/[0.06] px-4 py-3">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{ repeat: Infinity, duration: 1.1, delay: d * 0.2 }}
                      className="h-1.5 w-1.5 rounded-full bg-dot"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t border-white/[0.07] p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="כתבו לי כל דבר…"
                maxLength={1000}
                className="flex-1 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2.5 text-[13.5px] text-ivory outline-none transition-colors placeholder:text-mist/50 focus:border-dot/60"
              />
              <button
                type="submit"
                aria-label="שליחה"
                disabled={busy || !input.trim()}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ivory text-ink transition-all duration-300 hover:bg-dot disabled:opacity-40"
              >
                <Send className="h-4 w-4 -scale-x-100" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* floating buttons */}
      <div className="fixed bottom-5 left-4 z-[80] flex flex-col gap-3">
        <motion.button
          type="button"
          aria-label={open ? "סגירת הצ'אט" : "פתיחת צ'אט עם סול"}
          onClick={() => setOpen((v) => !v)}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.5, ease: EASE }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="relative grid h-12 w-12 place-items-center rounded-full bg-ivory text-ink shadow-[0_16px_40px_-12px_rgba(233,233,229,0.45)] sm:h-14 sm:w-14"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={open ? "x" : "bot"}
              initial={{ opacity: 0, rotate: -40 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 40 }}
              transition={{ duration: 0.2 }}
            >
              {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" strokeWidth={1.8} />}
            </motion.span>
          </AnimatePresence>
          {!open && (
            <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink bg-dot" />
          )}
        </motion.button>

        <motion.a
          href={`https://wa.me/${WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="כתבו לנו בוואטסאפ"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.45, duration: 0.5, ease: EASE }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_16px_40px_-12px_rgba(37,211,102,0.55)] sm:h-14 sm:w-14"
        >
          <WhatsAppIcon />
        </motion.a>
      </div>
    </>
  );
}
