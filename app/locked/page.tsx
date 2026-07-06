"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { LogoMark } from "@/components/ui/Logo";

const LEN = 4;

export default function Locked() {
  const [digits, setDigits] = useState<string[]>(Array(LEN).fill(""));
  const [status, setStatus] = useState<"idle" | "checking" | "error">("idle");
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  async function attempt(code: string) {
    setStatus("checking");
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: code }),
      });
      if (!res.ok) throw new Error();
      // full navigation so the middleware re-reads the fresh cookie
      window.location.href = "/";
    } catch {
      setStatus("error");
      setDigits(Array(LEN).fill(""));
      refs.current[0]?.focus();
    }
  }

  function setAt(i: number, v: string) {
    const clean = v.replace(/\D/g, "");
    if (!clean) {
      setDigits((d) => d.map((x, k) => (k === i ? "" : x)));
      return;
    }
    setDigits((d) => {
      const next = [...d];
      // support paste of the whole code into one box
      clean.split("").forEach((ch, k) => {
        if (i + k < LEN) next[i + k] = ch;
      });
      const filledTo = Math.min(LEN - 1, i + clean.length);
      refs.current[filledTo]?.focus();
      if (next.every((x) => x)) attempt(next.join(""));
      return next;
    });
    if (status === "error") setStatus("idle");
  }

  function onKey(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  }

  const checking = status === "checking";

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden px-6 py-16">
      {/* soft glow so the card doesn't float in pure black */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(125,180,255,0.12),transparent_68%)]"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="liquid-glass relative w-full max-w-md rounded-3xl px-7 py-10 text-center !bg-[#0F0F13]/85 sm:px-10 sm:py-12"
      >
        <LogoMark className="mx-auto h-16 w-16 text-ivory sm:h-20 sm:w-20" />
        <div
          dir="ltr"
          className="mt-4 font-heebo text-[13px] font-light uppercase tracking-[0.36em] text-mist"
        >
          Solution House
        </div>

        <h1 className="mt-8 text-2xl font-black tracking-tight text-ivory sm:text-3xl">
          האתר בהכנות אחרונות
        </h1>
        <p className="mt-3 text-[14.5px] font-light leading-relaxed text-mist">
          כמעט מוכן. הזינו את הקוד כדי להיכנס לתצוגה מוקדמת.
        </p>

        <motion.div
          animate={status === "error" ? { x: [0, -9, 9, -6, 6, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          dir="ltr"
          className="mt-8 flex justify-center gap-3"
        >
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              onChange={(e) => setAt(i, e.target.value)}
              onKeyDown={(e) => onKey(i, e)}
              inputMode="numeric"
              autoComplete="off"
              maxLength={LEN}
              disabled={checking}
              aria-label={`ספרה ${i + 1}`}
              autoFocus={i === 0}
              className="h-14 w-12 rounded-xl border border-white/[0.14] bg-white/[0.05] text-center text-2xl font-bold text-ivory shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] outline-none transition-[border-color,box-shadow] duration-200 focus:border-transparent focus:ring-2 focus:ring-dot/70 sm:h-16 sm:w-14"
            />
          ))}
        </motion.div>

        <div className="mt-5 h-5 text-[13px]">
          {status === "error" && <span className="text-rose">קוד שגוי — נסו שוב</span>}
          {checking && <span className="text-mist">בודק…</span>}
        </div>
      </motion.div>
    </main>
  );
}
