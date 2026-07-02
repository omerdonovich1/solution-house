"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

/**
 * Section 01 — a live gallery of what we build. Every category screens a
 * real mockup (two of them are actual client systems, sensitive data
 * blurred); the side cards steer the cycle and burn an amber fuse.
 */

const CYCLE_MS = 6000;

interface Category {
  readonly id: string;
  readonly name: string;
  readonly blurb: string;
  readonly image: string;
  readonly href: string;
  /** Screenshot of a real client system (vs. a design shell). */
  readonly real?: boolean;
}

const CATEGORIES: readonly Category[] = [
  {
    id: "websites",
    name: "אתרים",
    blurb: "אתר מהיר ומדויק שמספר את הסיפור שלכם — ומניע לפעולה.",
    image: "/mockups/shots/websites.jpg",
    href: "/mockups/websites.html",
  },
  {
    id: "landing",
    name: "דפי נחיתה",
    blurb: "עמוד אחד עם מטרה אחת: להפוך מבקרים ללקוחות.",
    image: "/mockups/shots/landing.jpg",
    href: "/mockups/landing.html",
  },
  {
    id: "dashboards",
    name: "דשבורדים",
    blurb: "נתונים חיים, החלטות מהירות — כל העסק במסך אחד. מתוך מערכת בקרת הייצור שבנינו ל-Dynamica.",
    image: "/mockups/shots/qc-real.jpg",
    href: "/mockups/shots/qc-real.jpg",
    real: true,
  },
  {
    id: "agents",
    name: "סוכני AI",
    blurb: "עובדים דיגיטליים שעונים, מסכמים ומבצעים. 24/7.",
    image: "/mockups/shots/agents.jpg",
    href: "/mockups/agents.html",
  },
  {
    id: "systems",
    name: "מערכות",
    blurb: "מערכת מותאמת שמחליפה אקסלים ותהליכים ידניים. מתוך מערכת ניהול הצי Vanguard Fleet.",
    image: "/mockups/shots/fleet-real.jpg",
    href: "/mockups/shots/fleet-real.jpg",
    real: true,
  },
  {
    id: "automations",
    name: "אוטומציות",
    blurb: "תהליכים שרצים לבד — מהטריגר ועד התוצאה.",
    image: "/mockups/shots/automations.jpg",
    href: "/mockups/automations.html",
  },
] as const;

export function WhatWeBuild() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => setActive((i) => (i + 1) % CATEGORIES.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [paused, reduced, active]);

  const cat = CATEGORIES[active];

  return (
    <section id="build" className="py-32 sm:py-48">
      <div className="shell">
        <SectionHeader
          index="01"
          label="מה אנחנו בונים"
          title="פתרון חי לכל צורך עסקי."
          lead="אתר, דף נחיתה, דשבורד, סוכן AI, מערכת או אוטומציה — כל פתרון נבנה בדיוק למידות של העסק שלכם."
        />

        <div
          className="mt-16 grid gap-5 lg:grid-cols-[1fr_320px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* live mockup panel */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-surface">
            <div className="flex items-center justify-between px-7 pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-mist">
              <AnimatePresence mode="wait">
                <motion.span
                  key={cat.id}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-3"
                >
                  <span className="kicker">{cat.name}</span>
                  {cat.real && (
                    <span className="rounded-full border border-dot/40 bg-dot/10 px-2.5 py-0.5 text-[9px] tracking-[0.18em] text-dot">
                      מערכת אמיתית
                    </span>
                  )}
                </motion.span>
              </AnimatePresence>
              <span dir="ltr">
                <span className="text-dot">{String(active + 1).padStart(2, "0")}</span>
                <span className="text-mist/50"> // </span>
                {String(CATEGORIES.length).padStart(2, "0")}
              </span>
            </div>

            <a
              href={cat.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 block px-5 sm:px-7"
              aria-label={`פתיחת הדוגמה של ${cat.name}`}
            >
              <div className="relative overflow-hidden rounded-t-xl border border-b-0 border-white/[0.1]">
                <AnimatePresence mode="wait">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <motion.img
                    key={cat.id}
                    src={cat.image}
                    alt={`מוקאפ ${cat.name}`}
                    initial={{ opacity: 0, scale: 1.03, y: 14 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="block w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                    loading="lazy"
                    draggable={false}
                  />
                </AnimatePresence>
                {/* hover invite */}
                <div className="pointer-events-none absolute inset-0 flex items-end justify-start bg-gradient-to-t from-ink/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="flex items-center gap-2 rounded-full bg-ivory px-4 py-2 text-[12px] font-bold text-ink">
                    צפייה במסך מלא
                    <ArrowUpLeft className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </a>

            <AnimatePresence mode="wait">
              <motion.p
                key={cat.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="border-t border-white/[0.06] px-7 py-5 text-[15px] font-light text-mist"
              >
                {cat.blurb}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* category selectors */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {CATEGORIES.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border px-5 py-4 text-start transition-colors duration-500",
                    isActive
                      ? "border-white/25 bg-surface"
                      : "border-white/[0.08] hover:border-white/20"
                  )}
                >
                  <span
                    className={cn(
                      "flex items-center gap-3 text-lg font-black tracking-tightest transition-colors duration-300 sm:text-xl",
                      isActive ? "text-ivory" : "text-mist group-hover:text-ivory"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300",
                        isActive ? "bg-dot" : "bg-white/15"
                      )}
                    />
                    {c.name}
                    <span dir="ltr" className="ms-auto font-mono text-[10px] font-normal tracking-[0.22em] text-mist/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  {/* amber fuse — burns down while this card is live */}
                  {isActive && !reduced && (
                    <motion.span
                      key={`fuse-${active}-${paused}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: paused ? 0 : 1 }}
                      transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                      className="absolute bottom-0 right-0 h-px w-full origin-right bg-dot/80"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
