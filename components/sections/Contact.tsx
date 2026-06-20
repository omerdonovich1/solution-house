"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

// TODO: replace placeholders before launch.
const WHATSAPP = "972500000000";
const EMAIL = "hello@solution.house";

type Status = "idle" | "loading" | "done" | "error";

const field =
  "w-full rounded-xl border border-white/10 bg-card px-4 py-3.5 text-[15px] text-bright outline-none transition-[border-color,box-shadow] placeholder:text-steel/50 focus:border-glow/60 focus:shadow-[0_0_0_3px_rgba(91,124,255,0.12)]";
const label =
  "mb-2 block font-mono text-[11px] uppercase tracking-[0.1em] text-steel";

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
    <section id="contact" className="mx-auto max-w-3xl py-32 sm:py-44">
      <div className="shell">
        <SectionHeader
          index="(05)"
          label="בואו נדבר"
          title="ספרו לנו על הבעיה."
          lead="השאירו פרטים ונחזור אליכם לשיחת אבחון ללא עלות — נבין מה אתם צריכים ונציע את הדרך הנכונה."
        />

        <form onSubmit={onSubmit} className="mt-12 grid gap-5 sm:grid-cols-2">
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
            <label className={label} htmlFor="message">מה הבעיה שתרצו לפתור?</label>
            <textarea id="message" name="message" rows={5} placeholder="כמה מילים..." className={cn(field, "resize-y")} />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="sm:col-span-2 rounded-pill bg-bright px-6 py-4 text-base font-semibold text-bg transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
          >
            {button}
          </button>
        </form>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px] text-steel">
          <span>או ישירות:</span>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="font-medium text-bright hover:text-glow">
            וואטסאפ ›
          </a>
          <a href={`mailto:${EMAIL}`} className="font-medium text-bright hover:text-glow">
            {EMAIL} ›
          </a>
        </div>
      </div>
    </section>
  );
}
