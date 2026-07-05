"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { CardStack } from "@/components/ui/CardStack";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Section 01 — a scroll-stacking deck of what we build. Every category
 * is a full-width liquid-glass card (design shells + real, sensitive-
 * data-blurred client work) that pins and gets covered by the next.
 * Cards with several examples crossfade through them; hover pauses.
 */

const CYCLE_MS = 3200;

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
    id: "dashboards",
    name: "דשבורדים",
    blurb: "נתונים חיים, החלטות מהירות — כל העסק במסך אחד.",
    examples: [
      { name: "DYNAMICA QC", image: "/mockups/shots/qc-real.jpg", href: "/mockups/shots/qc-real.jpg", real: true },
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
    id: "landing",
    name: "דפי נחיתה",
    blurb: "עמוד אחד עם מטרה אחת: להפוך מבקרים ללקוחות.",
    examples: [
      { name: "FLOWLY", image: "/mockups/shots/landing.jpg", href: "/mockups/landing.html" },
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
    id: "automations",
    name: "אוטומציות",
    blurb: "תהליכים שרצים לבד — מהטריגר ועד התוצאה.",
    examples: [
      { name: "FLOW BUILDER", image: "/mockups/shots/automations.jpg", href: "/mockups/automations.html" },
    ],
  },
] as const;

function CategoryCard({ cat, index }: { cat: Category; index: number }) {
  const [slide, setSlide] = useState(0);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const count = cat.examples.length;
  const current = cat.examples[slide];

  // slow crossfade through this card's examples; hover pauses
  useEffect(() => {
    if (count < 2 || hovered || reduced) return;
    const id = setInterval(() => setSlide((i) => (i + 1) % count), CYCLE_MS);
    return () => clearInterval(id);
  }, [count, hovered, reduced]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="liquid-glass group relative overflow-hidden rounded-3xl p-5 sm:p-7 lg:p-8"
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.35fr] lg:items-center lg:gap-10">
        {/* words */}
        <div className="flex h-full flex-col">
          <span dir="ltr" className="mb-3 hidden text-[12px] tracking-[0.2em] text-mist/70 lg:block">
            {String(index + 1).padStart(2, "0")} / {String(CATEGORIES.length).padStart(2, "0")}
          </span>
          <h3 className="text-gradient text-3xl font-black tracking-tightest sm:text-4xl">
            {cat.name}
          </h3>
          <p className="mt-3 max-w-md text-[15px] font-light leading-relaxed text-body sm:text-base">
            {cat.blurb}
          </p>
          {count > 1 && (
            <div className="mt-5 flex items-center gap-2 lg:mt-auto lg:pt-6">
              {cat.examples.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`דוגמה ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === slide ? "w-6 bg-dot" : "w-1.5 bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* media — display only; visitors stay on the page */}
        <div className="relative h-[210px] overflow-hidden rounded-2xl border border-white/[0.08] sm:h-[300px] lg:h-[360px]">
          <AnimatePresence mode="sync" initial={false}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              key={current.image}
              src={current.image}
              alt={current.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              loading="lazy"
              draggable={false}
            />
          </AnimatePresence>
          {/* project name, revealed on hover — no link out */}
          <div className="pointer-events-none absolute inset-0 flex items-end justify-start bg-gradient-to-t from-ink/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="rounded-full bg-ivory px-4 py-2 text-[12px] font-bold text-ink">
              {current.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhatWeBuild() {
  return (
    <section id="build" className="py-16 sm:py-24">
      <div className="shell">
        <SectionHeader
          center
          index="01"
          label="מה אנחנו בונים"
          title="פתרון טכנולוגי לכל אתגר עסקי."
          lead="אתר, דף נחיתה, דשבורד, סוכן AI, מערכת או אוטומציה — כל פתרון נבנה בדיוק למידות של העסק שלכם."
        />

        <div className="mt-10 sm:mt-14">
          <CardStack
            items={CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.id} cat={cat} index={i} />
            ))}
          />
        </div>
      </div>
    </section>
  );
}
