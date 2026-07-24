"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { CardStack } from "@/components/ui/CardStack";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useTx, type Bi } from "@/lib/i18n";

/**
 * Section 01 — a scroll-stacking deck of what we build. Every category
 * is a full-width panel card (design shells + real, sensitive-
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
  readonly name: Bi;
  readonly blurb: Bi;
  readonly examples: readonly Example[];
}

const CATEGORIES: readonly Category[] = [
  {
    id: "websites",
    name: { he: "אתרים", en: "Websites" },
    blurb: {
      he: "אתר מהיר ומדויק שמספר את הסיפור שלכם — ומניע לפעולה.",
      en: "A fast, precise site that tells your story — and drives action.",
    },
    examples: [
      { name: "SHADIEZ", image: "/proj2.png", href: "https://shadiez-seven.vercel.app", real: true },
      { name: "SPINZ", image: "/proj3.png", href: "https://www.spinzbikes.com", real: true },
      { name: "ATELIER", image: "/mockups/shots/websites.jpg", href: "/mockups/websites.html" },
    ],
  },
  {
    id: "dashboards",
    name: { he: "דשבורדים", en: "Dashboards" },
    blurb: {
      he: "נתונים חיים, החלטות מהירות — כל העסק במסך אחד.",
      en: "Live data, fast decisions — your whole business on one screen.",
    },
    examples: [
      { name: "DYNAMICA QC", image: "/mockups/shots/qc-real.jpg", href: "/mockups/shots/qc-real.jpg", real: true },
    ],
  },
  {
    id: "systems",
    name: { he: "מערכות", en: "Systems" },
    blurb: {
      he: "מערכת מותאמת שמחליפה אקסלים ותהליכים ידניים.",
      en: "A tailored system that replaces spreadsheets and manual processes.",
    },
    examples: [
      { name: "VANGUARD FLEET", image: "/mockups/shots/fleet-real.jpg", href: "/mockups/shots/fleet-real.jpg", real: true },
      { name: "CARMAN S", image: "/proj1.png", href: "https://carman-s.vercel.app", real: true },
    ],
  },
  {
    id: "landing",
    name: { he: "דפי נחיתה", en: "Landing pages" },
    blurb: {
      he: "עמוד אחד עם מטרה אחת: להפוך מבקרים ללקוחות.",
      en: "One page with one goal: turning visitors into customers.",
    },
    examples: [
      { name: "FLOWLY", image: "/mockups/shots/landing.jpg", href: "/mockups/landing.html" },
    ],
  },
  {
    id: "agents",
    name: { he: "סוכני AI", en: "AI agents" },
    blurb: {
      he: "עובדים דיגיטליים שעונים, מסכמים ומבצעים. 24/7.",
      en: "Digital workers that answer, summarize and act. 24/7.",
    },
    examples: [
      { name: "נועה", image: "/mockups/shots/agents.jpg", href: "/mockups/agents.html" },
    ],
  },
  {
    id: "automations",
    name: { he: "אוטומציות", en: "Automations" },
    blurb: {
      he: "תהליכים שרצים לבד — מהטריגר ועד התוצאה.",
      en: "Processes that run on their own — from trigger to result.",
    },
    examples: [
      { name: "FLOW BUILDER", image: "/mockups/shots/automations.jpg", href: "/mockups/automations.html" },
    ],
  },
] as const;

function CategoryCard({ cat, index }: { cat: Category; index: number }) {
  const tx = useTx();
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
      className="panel group relative overflow-hidden rounded-3xl p-5 sm:p-7 lg:p-8"
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.35fr] lg:items-center lg:gap-10">
        {/* words */}
        <div className="flex h-full flex-col">
          <span dir="ltr" className="mb-3 hidden text-[12px] tracking-[0.2em] text-mist/70 lg:block">
            {String(index + 1).padStart(2, "0")} / {String(CATEGORIES.length).padStart(2, "0")}
          </span>
          <h3 className="text-ivory text-3xl font-black tracking-tightest sm:text-4xl">
            {tx(cat.name)}
          </h3>
          <p className="mt-3 max-w-md text-[15px] font-light leading-relaxed text-body sm:text-base">
            {tx(cat.blurb)}
          </p>
          {count > 1 && (
            <div className="mt-5 flex items-center gap-2 lg:mt-auto lg:pt-6">
              {cat.examples.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={tx({ he: `דוגמה ${i + 1}`, en: `Example ${i + 1}` })}
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

/** Mobile-only: a horizontal swipe carousel (native snap, RTL). */
function MobileServicesCarousel() {
  const tx = useTx();
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // active = the card whose centre is nearest the rail centre (RTL-safe)
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const mid = rail.getBoundingClientRect().left + rail.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        rail.querySelectorAll<HTMLElement>("[data-card]").forEach((el, i) => {
          const r = el.getBoundingClientRect();
          const d = Math.abs(r.left + r.width / 2 - mid);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setActive(best);
      });
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => rail.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const card = railRef.current?.querySelectorAll<HTMLElement>("[data-card]")[i];
    card?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  };

  return (
    <div className="md:hidden">
      {/* swipe hint */}
      <div className="mb-3 flex items-center justify-center gap-1.5 text-[12px] text-mist/70">
        <span>{tx({ he: "החליקו לצדדים", en: "Swipe to browse" })}</span>
        <motion.span animate={{ x: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronLeft className="h-3.5 w-3.5" />
        </motion.span>
      </div>

      {/* rail */}
      <div
        ref={railRef}
        dir="rtl"
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        style={{
          scrollPaddingInline: "var(--shell-pad)",
          paddingInline: "var(--shell-pad)",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {CATEGORIES.map((cat, i) => {
          const ex = cat.examples[0];
          return (
            <article
              key={cat.id}
              data-card
              className="panel w-[82vw] max-w-[340px] shrink-0 snap-center overflow-hidden rounded-3xl"
            >
              <div className="relative h-[185px] border-b border-white/[0.08]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ex.image}
                  alt={ex.name}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  loading="lazy"
                  draggable={false}
                />
                <span
                  dir="ltr"
                  className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-medium text-dot backdrop-blur"
                >
                  {String(i + 1).padStart(2, "0")} / {String(CATEGORIES.length).padStart(2, "0")}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-ivory text-2xl font-black tracking-tightest">{tx(cat.name)}</h3>
                <p className="mt-2 text-[14px] font-light leading-relaxed text-body">{tx(cat.blurb)}</p>
              </div>
            </article>
          );
        })}
      </div>

      {/* progress dots */}
      <div className="mt-5 flex justify-center gap-1.5">
        {CATEGORIES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={tx({ he: `שירות ${i + 1}`, en: `Service ${i + 1}` })}
            onClick={() => goTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === active ? "w-5 bg-dot" : "w-1.5 bg-white/20"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function WhatWeBuild() {
  const tx = useTx();
  return (
    <section id="build" className="py-16 sm:py-24">
      <div className="shell">
        <SectionHeader
          index="01"
          title={tx({ he: "פתרון טכנולוגי לכל אתגר עסקי.", en: "A technological solution for every business challenge." })}
          lead={tx({
            he: "אתר, דף נחיתה, דשבורד, סוכן AI, מערכת או אוטומציה — כל פתרון נבנה בדיוק למידות של העסק שלכם.",
            en: "A website, landing page, dashboard, AI agent, system or automation — every solution is built to the exact measure of your business.",
          })}
        />
      </div>

      {/* desktop: scroll-stacking deck */}
      <div className="hidden md:block">
        <div className="shell">
          <div className="mt-10 sm:mt-14">
            <CardStack
              items={CATEGORIES.map((cat, i) => (
                <CategoryCard key={cat.id} cat={cat} index={i} />
              ))}
            />
          </div>
        </div>
      </div>

      {/* mobile: horizontal swipe carousel */}
      <div className="mt-10">
        <MobileServicesCarousel />
      </div>
    </section>
  );
}
