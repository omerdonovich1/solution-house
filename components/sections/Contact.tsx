"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { useTx } from "@/lib/i18n";

const EMAIL = "info@solutionhouse.dev";

type Status = "idle" | "loading" | "done" | "error";

/* Sleek minimal fields — faint glass fill, elegant white focus ring. */
const field =
  "w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 text-base text-ivory outline-none transition-[box-shadow,border-color,background-color] duration-300 placeholder:text-mist/40 focus:border-transparent focus:bg-white/[0.04] focus:ring-1 focus:ring-white/30 focus-visible:outline-none";
const label =
  "mb-1 block font-mono text-[11px] uppercase tracking-[0.18em] text-mist";

export function Contact() {
  const tx = useTx();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("bad response");
      form.reset();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const button =
    status === "loading"
      ? tx({ he: "שולח...", en: "Sending…" })
      : status === "done"
      ? tx({ he: "תודה! נחזור אליכם בקרוב", en: "Thanks! We'll be in touch soon" })
      : status === "error"
      ? tx({ he: "משהו השתבש — נסו שוב", en: "Something went wrong — try again" })
      : tx({ he: "שליחה", en: "Send" });

  return (
    <section id="contact" className="mx-auto max-w-3xl py-16 sm:py-24">
      <div className="shell">
        <SectionHeader
          index="03"
          title={tx({ he: "ספרו לנו על האתגר שלכם.", en: "Tell us about your challenge." })}
          lead={tx({
            he: "שיחת אבחון אחת, בלי התחייבות: מבינים את האתגר, מציעים כיוון ונותנים הערכת מחיר הוגנת.",
            en: "One discovery call, no commitment: we understand the challenge, propose a direction and give a fair price estimate.",
          })}
        />

        {/* urgency */}
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-dot/30 bg-dot/10 px-4 py-2 text-[13.5px] text-dot">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-dot/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-dot" />
          </span>
          {tx({
            he: "מוגבל ל-5 שיחות השבוע — שריינו את המקום שלכם עכשיו",
            en: "Limited to 5 calls this week — reserve your spot",
          })}
        </div>

        <form onSubmit={onSubmit} className="mt-10 grid gap-7 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="name">{tx({ he: "שם מלא", en: "Full name" })}</label>
            <input id="name" name="name" required autoComplete="name" placeholder={tx({ he: "השם שלך", en: "Your name" })} className={field} />
          </div>
          <div>
            <label className={label} htmlFor="phone">{tx({ he: "טלפון", en: "Phone" })}</label>
            <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="050-0000000" className={field} />
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="email">{tx({ he: "אימייל", en: "Email" })}</label>
            <input id="email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" className={field} />
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="message">{tx({ he: "ספרו לנו על הפרויקט", en: "Tell us about the project" })}</label>
            <textarea id="message" name="message" rows={5} autoComplete="off" placeholder={tx({ he: "מה האתגר שעומד בפניכם?", en: "What challenge are you facing?" })} className={cn(field, "resize-y")} />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="sm:col-span-2 mt-2 rounded-pill bg-ivory px-6 py-4 text-base font-bold text-ink transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-dot disabled:opacity-60"
          >
            {button}
          </button>
        </form>

        <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/[0.08] pt-8 text-[15px] text-mist">
          <span>{tx({ he: "או ישירות:", en: "Or directly:" })}</span>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-ivory transition-colors duration-300 hover:text-volt">
            {tx({ he: "וואטסאפ ›", en: "WhatsApp ›" })}
          </a>
          <a href={`mailto:${EMAIL}`} className="font-medium text-ivory transition-colors duration-300 hover:text-volt">
            {EMAIL} ›
          </a>
        </div>
      </div>
    </section>
  );
}
