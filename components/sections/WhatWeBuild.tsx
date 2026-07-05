"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Section 01 — an asymmetric bento grid of what we build. Every category
 * is its own frosted-glass card (design shells + real, sensitive-data-
 * blurred client work). Cards with several examples crossfade through
 * them on a slow cycle; hover pauses.
 */

const CYCLE_MS = 5200;

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
  /** Bento cell — tailwind col/row spans for the lg grid. */
  readonly cell: string;
  /** Hero cell renders a taller media window. */
  readonly tall?: boolean;
}

const CATEGORIES: readonly Category[] = [
  {
    id: "websites",
    name: "אתרים",
    blurb: "אתר מהיר ומדויק שמספר את הסיפור שלכם — ומניע לפעולה.",
    cell: "md:col-span-6 lg:col-span-7 lg:row-span-2",
    tall: true,
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
    cell: "md:col-span-3 lg:col-span-5",
    examples: [
      { name: "DYNAMICA QC", image: "/mockups/shots/qc-real.jpg", href: "/mockups/shots/qc-real.jpg", real: true },
    ],
  },
  {
    id: "systems",
    name: "מערכות",
    blurb: "מערכת מותאמת שמחליפה אקסלים ותהליכים ידניים.",
    cell: "md:col-span-3 lg:col-span-5",
    examples: [
      { name: "VANGUARD FLEET", image: "/mockups/shots/fleet-real.jpg", href: "/mockups/shots/fleet-real.jpg", real: true },
      { name: "CARMAN S", image: "/proj1.png", href: "https://carman-s.vercel.app", real: true },
    ],
  },
  {
    id: "landing",
    name: "דפי נחיתה",
    blurb: "עמוד אחד עם מטרה אחת: להפוך מבקרים ללקוחות.",
    cell: "md:col-span-2 lg:col-span-4",
    examples: [
      { name: "FLOWLY", image: "/mockups/shots/landing.jpg", href: "/mockups/landing.html" },
    ],
  },
  {
    id: "agents",
    name: "סוכני AI",
    blurb: "עובדים דיגיטליים שעונים, מסכמים ומבצעים. 24/7.",
    cell: "md:col-span-2 lg:col-span-4",
    examples: [
      { name: "נועה", image: "/mockups/shots/agents.jpg", href: "/mockups/agents.html" },
    ],
  },
  {
    id: "automations",
    name: "אוטומציות",
    blurb: "תהליכים שרצים לבד — מהטריגר ועד התוצאה.",
    cell: "md:col-span-2 lg:col-span-4",
    examples: [
      { name: "FLOW BUILDER", image: "/mockups/shots/automations.jpg", href: "/mockups/automations.html" },
    ],
  },
] as const;

/* Liquid Glass card — the material (slab + rim + sheen) lives in the
   .liquid-glass utility; hover adds a cool halo and the 1.01 lift. */
const glassCard =
  "liquid-glass group relative flex flex-col overflow-hidden rounded-3xl transition-[transform,box-shadow] duration-500 ease-out hover:scale-[1.01] hover:shadow-[0_0_0_1px_rgba(96,165,250,0.28),0_0_70px_-18px_rgba(96,165,250,0.3),0_22px_60px_-22px_rgba(0,0,0,0.65)]";

function BentoCard({ cat, index }: { cat: Category; index: number }) {
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

  const external = current.href.startsWith("http") || current.href.startsWith("/mockups");

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay: (index % 3) * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(glassCard, cat.cell)}
    >
      {/* header — the category name, plain and confident */}
      <div className="flex items-center gap-3 px-5 pt-5 sm:px-6">
        <span className="text-[17px] font-bold tracking-tight text-ivory">{cat.name}</span>
        {current.real && (
          <span className="rounded-full border border-dot/40 bg-dot/10 px-2.5 py-0.5 text-[10px] font-medium text-dot">
            מערכת אמיתית
          </span>
        )}
      </div>

      {/* media — the whole window opens the current example */}
      <a
        href={current.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={`פתיחת ${current.name}`}
        className={cn(
          "relative mx-5 mt-4 block overflow-hidden rounded-xl border border-white/[0.08] sm:mx-6",
          cat.tall ? "min-h-[260px] flex-1" : "aspect-[16/10]"
        )}
      >
        <AnimatePresence mode="sync" initial={false}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            key={current.image}
            src={current.image}
            alt={current.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            draggable={false}
          />
        </AnimatePresence>
        {/* hover invite */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-start bg-gradient-to-t from-ink/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-full bg-ivory px-4 py-2 text-[12px] font-bold text-ink">
            {current.name} · צפייה במסך מלא
            <ArrowUpLeft className="h-3.5 w-3.5" />
          </span>
        </div>
      </a>

      {/* footer — blurb + example dots */}
      <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5">
        <p className="text-[13.5px] font-light text-mist sm:text-[14.5px]">{cat.blurb}</p>
        {count > 1 && (
          <div className="flex shrink-0 items-center gap-2">
            {cat.examples.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`דוגמה ${i + 1}`}
                onClick={() => setSlide(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === slide ? "w-5 bg-dot" : "w-1.5 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function WhatWeBuild() {
  return (
    <section id="build" className="py-16 sm:py-24">
      <div className="shell">
        <SectionHeader
          index="01"
          label="מה אנחנו בונים"
          title="פתרון טכנולוגי לכל אתגר עסקי."
          lead="אתר, דף נחיתה, דשבורד, סוכן AI, מערכת או אוטומציה — כל פתרון נבנה בדיוק למידות של העסק שלכם."
        />

        {/* asymmetric bento — one hero cell, two supporting, three compact */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-6 lg:grid-cols-12">
          {CATEGORIES.map((cat, i) => (
            <BentoCard key={cat.id} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
