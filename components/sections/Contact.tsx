"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

const WHATSAPP = "972500000000";
const EMAIL = "hello@solution.house";

type Status = "idle" | "loading" | "done" | "error";

/* Underline-only fields — gallery-minimal, focus warms to amber. */
const field =
  "w-full border-0 border-b border-white/[0.12] bg-transparent px-2 py-3.5 text-base text-ivory outline-none transition-[border-color,background-color] duration-300 placeholder:text-mist/40 focus:border-dot focus:bg-white/[0.02] focus-visible:outline-none";
const label =
  "mb-1 block font-mono text-[11px] uppercase tracking-[0.18em] text-mist";

export function Contact() {
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
      ? "שולח..."
      : status === "done"
      ? "תודה! נחזור אליכם בקרוב"
      : status === "error"
      ? "משהו השתבש — נסו שוב"
      : "שליחה";

  return (
    <section id="contact" className="mx-auto max-w-3xl py-32 sm:py-48">
      <div className="shell">
        <SectionHeader
          index="03"
          label="בואו נדבר"
          title="ספרו לנו על האתגר שלכם."
          lead="שיחה אחת, בלי התחייבות: מבינים את האתגר, מציעים כיוון ונותנים הערכת מחיר הוגנת. מבטיחים רק מה שנוכל לקיים."
        />

        <form onSubmit={onSubmit} className="mt-14 grid gap-9 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="name">שם מלא</label>
            <input id="name" name="name" required placeholder="השם שלך" className={field} />
          </div>
          <div>
            <label className={label} htmlFor="phone">טלפון</label>
            <input id="phone" name="phone" type="tel" required placeholder="050-0000000" className={field} />
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="email">אימייל</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" className={field} />
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="message">ספרו לנו על הפרויקט</label>
            <textarea id="message" name="message" rows={5} placeholder="מה האתגר שעומד בפניכם?" className={cn(field, "resize-y")} />
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
          <span>או ישירות:</span>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="font-medium text-ivory transition-colors duration-300 hover:text-volt">
            וואטסאפ ›
          </a>
          <a href={`mailto:${EMAIL}`} className="font-medium text-ivory transition-colors duration-300 hover:text-volt">
            {EMAIL} ›
          </a>
        </div>
      </div>
    </section>
  );
}
