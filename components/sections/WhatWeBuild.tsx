"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

/**
 * Section 01 — a live gallery of what we build. Each category holds one or
 * more examples (design shells + real, sensitive-data-blurred client work);
 * scroll between examples within a category, while the side cards auto-cycle
 * between categories on an amber fuse.
 */

const CYCLE_MS = 6500;

interface Example {
  readonly name: string;
  readonly image: string;
  readonly href: string;
  /** Screenshot of a real client system (vs. a design shell). */
  readonly real?: boolean;
}

interface Category {
  readonly id: string;
  readonly name: string;
  readonly blurb: string;
  readonly examples: readonly Example[];
}

const CATEGORIES: readonly Category[] = [
  {
    id: "websites",
    name: "אתרים",
    blurb: "אתר מהיר ומדויק שמספר את הסיפור שלכם — ומניע לפעולה.",
    examples: [
      { name: "SHADIEZ", image: "/proj2.png", href: "https://shadiez-seven.vercel.app", real: true },
      { name: "SPINZ", image: "/proj3.png", href: "https://www.spinzbikes.com", real: true },
      { name: "ATELIER", image: "/mockups/shots/websites.jpg", href: "/mockups/websites.html" },
    ],
  },
  {
    id: "landing",
    name: "דפי נחיתה",
    blurb: "עמוד אחד עם מטרה אחת: להפוך מבקרים ללקוחות.",
    examples: [
      { name: "FLOWLY", image: "/mockups/shots/landing.jpg", href: "/mockups/landing.html" },
    ],
  },
  {
    id: "dashboards",
    name: "דשבורדים",
    blurb: "נתונים חיים, החלטות מהירות — כל העסק במסך אחד.",
    examples: [
      { name: "DYNAMICA QC", image: "/mockups/shots/qc-real.jpg", href: "/mockups/shots/qc-real.jpg", real: true },
    ],
  },
  {
    id: "agents",
    name: "סוכני AI",
    blurb: "עובדים דיגיטליים שעונים, מסכמים ומבצעים. 24/7.",
    examples: [
      { name: "נועה", image: "/mockups/shots/agents.jpg", href: "/mockups/agents.html" },
    ],
  },
  {
    id: "systems",
    name: "מערכות",
    blurb: "מערכת מותאמת שמחליפה אקסלים ותהליכים ידניים.",
    examples: [
      { name: "VANGUARD FLEET", image: "/mockups/shots/fleet-real.jpg", href: "/mockups/shots/fleet-real.jpg", real: true },
      { name: "CARMAN S", image: "/proj1.png", href: "https://carman-s.vercel.app", real: true },
    ],
  },
  {
    id: "automations",
    name: "אוטומציות",
    blurb: "תהליכים שרצים לבד — מהטריגר ועד התוצאה.",
    examples: [
      { name: "FLOW BUILDER", image: "/mockups/shots/automations.jpg", href: "/mockups/automations.html" },
    ],
  },
] as const;

function ExampleSlide({ example }: { example: Example }) {
  const external = example.href.startsWith("http") || example.href.startsWith("/mockups");
  return (
    <a
      href={example.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group relative block flex-[0_0_100%]"
      aria-label={`פתיחת ${example.name}`}
    >
      <div className="relative overflow-hidden rounded-t-xl border border-b-0 border-white/[0.1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={example.image}
          alt={example.name}
          className="block w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          loading="lazy"
          draggable={false}
        />
        {/* hover invite */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-start bg-gradient-to-t from-ink/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-full bg-ivory px-4 py-2 text-[12px] font-bold text-ink">
            {example.name} · צפייה במסך מלא
            <ArrowUpLeft className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </a>
  );
}

export function WhatWeBuild() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slide, setSlide] = useState(0);
  const reduced = useReducedMotion();

  const cat = CATEGORIES[active];
  const count = cat.examples.length;

  // category auto-cycle
  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => setActive((i) => (i + 1) % CATEGORIES.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [paused, reduced, active]);

  // reset the example rail whenever the category changes
  useEffect(() => {
    setSlide(0);
  }, [active]);

  function goToSlide(i: number) {
    setSlide(Math.max(0, Math.min(count - 1, i)));
  }

  return (
    <section id="build" className="py-16 sm:py-24">
      <div className="shell">
        <SectionHeader
          index="01"
          label="מה אנחנו בונים"
          title="פתרון טכנולוגי לכל אתגר עסקי."
          lead="אתר, דף נחיתה, דשבורד, סוכן AI, מערכת או אוטומציה — כל פתרון נבנה בדיוק למידות של העסק שלכם."
        />

        <div
          className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-[1fr_320px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* live example panel */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-surface">
            <div className="flex items-center justify-between px-5 pt-5 font-mono sm:px-7 sm:pt-6 text-[11px] uppercase tracking-[0.22em] text-mist">
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
                  {cat.examples[slide]?.real && (
                    <span className="rounded-full border border-dot/40 bg-dot/10 px-2.5 py-0.5 text-[9px] tracking-[0.18em] text-dot">
                      מערכת אמיתית
                    </span>
                  )}
                </motion.span>
              </AnimatePresence>
              <span dir="ltr">
                <span className="text-dot">{String(slide + 1).padStart(2, "0")}</span>
                <span className="text-mist/50"> // </span>
                {String(count).padStart(2, "0")}
              </span>
            </div>

            {/* horizontal example rail for this category */}
            <div className="relative mt-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="px-5 sm:px-7"
                >
                  {/* transform carousel — CSS translateX, immune to scroll-snap */}
                  <div className="overflow-hidden">
                    <div
                      dir="ltr"
                      className="flex"
                      style={{
                        transform: `translateX(-${slide * 100}%)`,
                        transition: reduced
                          ? "none"
                          : "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    >
                      {cat.examples.map((ex) => (
                        <ExampleSlide key={ex.name} example={ex} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* per-category slide controls — only when >1 example */}
              {count > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="הדוגמה הקודמת"
                    onClick={() => goToSlide(slide - 1)}
                    disabled={slide === 0}
                    className="absolute right-7 top-1/2 grid h-8 w-8 -translate-y-1/2 sm:right-9 sm:h-9 sm:w-9 place-items-center rounded-full border border-white/15 bg-ink/70 text-ivory backdrop-blur transition-all duration-300 hover:border-dot hover:text-dot disabled:opacity-30"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="הדוגמה הבאה"
                    onClick={() => goToSlide(slide + 1)}
                    disabled={slide === count - 1}
                    className="absolute left-7 top-1/2 grid h-8 w-8 -translate-y-1/2 sm:left-9 sm:h-9 sm:w-9 place-items-center rounded-full border border-white/15 bg-ink/70 text-ivory backdrop-blur transition-all duration-300 hover:border-dot hover:text-dot disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-white/[0.06] px-5 py-4 sm:px-7 sm:py-5">
              <AnimatePresence mode="wait">
                <motion.p
                  key={cat.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-[13.5px] font-light text-mist sm:text-[15px]"
                >
                  {cat.blurb}
                </motion.p>
              </AnimatePresence>
              {/* dots */}
              {count > 1 && (
                <div className="flex shrink-0 items-center gap-2">
                  {cat.examples.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`דוגמה ${i + 1}`}
                      onClick={() => goToSlide(i)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        i === slide ? "w-5 bg-dot" : "w-1.5 bg-white/20 hover:bg-white/40"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
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
                    "group relative overflow-hidden rounded-xl border px-4 py-3 text-start transition-colors duration-500 sm:px-5 sm:py-4",
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
                      {String(c.examples.length).padStart(2, "0")}
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
