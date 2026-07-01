"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

/**
 * Section 01 — roqpoint-style live line-art showcase. A framed panel where
 * hand-drawn scenes of what we build draw themselves in, cycling between
 * categories; the side cards steer it and show an amber progress fuse.
 */

const CYCLE_MS = 5200;

interface Category {
  readonly id: string;
  readonly name: string;
  readonly blurb: string;
}

const CATEGORIES: readonly Category[] = [
  {
    id: "dashboards",
    name: "דשבורדים",
    blurb: "נתונים חיים, החלטות מהירות — כל העסק במסך אחד.",
  },
  {
    id: "agents",
    name: "סוכני AI",
    blurb: "עובדים דיגיטליים שעונים, מסכמים ומבצעים. 24/7.",
  },
  {
    id: "systems",
    name: "מערכות",
    blurb: "מערכת מותאמת שמחליפה אקסלים ותהליכים ידניים.",
  },
  {
    id: "automations",
    name: "אוטומציות",
    blurb: "תהליכים שרצים לבד — מהטריגר ועד התוצאה.",
  },
] as const;

/* ---------- shared draw-in motion ---------- */

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.14, duration: 0.9, ease: "easeInOut" },
      opacity: { delay: i * 0.14, duration: 0.01 },
    },
  }),
} as const;

const pop = {
  hidden: { scale: 0, opacity: 0 },
  show: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: 0.3 + i * 0.14, type: "spring", stiffness: 300, damping: 18 },
  }),
} as const;

const rise = {
  hidden: { scaleY: 0, opacity: 0 },
  show: (i: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: { delay: 0.4 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
} as const;

function Flow({ d, delay = 0 }: { d: string; delay?: number }) {
  return (
    <motion.path
      d={d}
      strokeDasharray="4 8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, strokeDashoffset: [0, -48] }}
      transition={{
        opacity: { delay, duration: 0.3 },
        strokeDashoffset: { repeat: Infinity, ease: "linear", duration: 1.6 },
      }}
      className="stroke-dot"
      strokeWidth={1.5}
    />
  );
}

/* ---------- the four scenes ---------- */

function SceneDashboards() {
  return (
    <>
      {/* browser frame */}
      <motion.rect x="16" y="18" width="448" height="264" rx="12" variants={draw} custom={0} />
      <motion.line x1="16" y1="54" x2="464" y2="54" variants={draw} custom={1} />
      {[36, 54, 72].map((cx, i) => (
        <motion.circle key={cx} cx={cx} cy="36" r="3.5" variants={pop} custom={i} />
      ))}
      {/* KPI cards */}
      {[318, 214, 110].map((x, i) => (
        <motion.rect key={x} x={x} y="72" width="92" height="38" rx="7" variants={draw} custom={2 + i} />
      ))}
      <motion.rect x="36" y="72" width="60" height="38" rx="7" variants={draw} custom={5} className="stroke-dot" />
      {/* bars */}
      {[
        { x: 300, h: 60 },
        { x: 336, h: 92 },
        { x: 372, h: 74 },
        { x: 408, h: 118 },
      ].map((b, i) => (
        <motion.rect
          key={b.x}
          x={b.x}
          y={252 - b.h}
          width="22"
          height={b.h}
          rx="4"
          variants={rise}
          custom={i}
          style={{ originY: "252px" }}
        />
      ))}
      {/* trend line */}
      <motion.path
        d="M40 236 L96 208 L148 220 L204 170 L256 142"
        variants={draw}
        custom={6}
        className="stroke-dot"
        strokeWidth={2}
      />
      {[
        [40, 236],
        [96, 208],
        [148, 220],
        [204, 170],
        [256, 142],
      ].map(([cx, cy], i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="3.5" variants={pop} custom={4 + i} className="fill-dot stroke-none" />
      ))}
    </>
  );
}

function SceneAgents() {
  return (
    <>
      {/* agent core */}
      <motion.circle cx="404" cy="76" r="22" variants={draw} custom={0} />
      <motion.circle cx="404" cy="76" r="5" variants={pop} custom={0} className="fill-dot stroke-none" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 404 + Math.cos(rad) * 28;
        const y1 = 76 + Math.sin(rad) * 28;
        const x2 = 404 + Math.cos(rad) * 38;
        const y2 = 76 + Math.sin(rad) * 38;
        return <motion.line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} variants={draw} custom={1 + i * 0.3} />;
      })}
      {/* incoming messages */}
      <motion.rect x="60" y="52" width="196" height="46" rx="12" variants={draw} custom={2} />
      <motion.line x1="84" y1="70" x2="220" y2="70" variants={draw} custom={3} className="opacity-50" />
      <motion.line x1="104" y1="82" x2="220" y2="82" variants={draw} custom={3.5} className="opacity-30" />
      <motion.rect x="60" y="116" width="152" height="42" rx="12" variants={draw} custom={4} />
      <motion.line x1="84" y1="137" x2="184" y2="137" variants={draw} custom={5} className="opacity-40" />
      {/* agent reply — amber */}
      <motion.rect x="204" y="188" width="220" height="56" rx="12" variants={draw} custom={6} className="stroke-dot" />
      {[240, 262, 284].map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy="216"
          r="4"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 1.1, delay: i * 0.22 }}
          className="fill-dot stroke-none"
        />
      ))}
      {/* flow from agent to reply */}
      <Flow d="M404 100 C404 150 380 170 340 186" delay={1.2} />
    </>
  );
}

function SceneSystems() {
  return (
    <>
      {/* hub */}
      <motion.rect x="196" y="118" width="88" height="64" rx="10" variants={draw} custom={0} />
      <motion.circle
        cx="240"
        cy="150"
        r="6"
        initial={{ opacity: 0.3, scale: 0.8 }}
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.15, 0.8] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="fill-dot stroke-none"
      />
      {/* satellites */}
      <motion.rect x="44" y="36" width="92" height="52" rx="9" variants={draw} custom={1} />
      <motion.rect x="344" y="36" width="92" height="52" rx="9" variants={draw} custom={2} />
      <motion.rect x="44" y="212" width="92" height="52" rx="9" variants={draw} custom={3} />
      <motion.rect x="344" y="212" width="92" height="52" rx="9" variants={draw} custom={4} />
      {/* inner detail lines */}
      {[
        [64, 56, 116, 56],
        [64, 68, 100, 68],
        [364, 56, 416, 56],
        [364, 68, 400, 68],
        [64, 232, 116, 232],
        [64, 244, 100, 244],
        [364, 232, 416, 232],
        [364, 244, 400, 244],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} variants={draw} custom={5 + i * 0.2} className="opacity-40" />
      ))}
      {/* data flows */}
      <Flow d="M136 62 C180 62 200 100 214 118" delay={1} />
      <Flow d="M344 62 C300 62 280 100 266 118" delay={1.2} />
      <Flow d="M136 238 C180 238 200 200 214 182" delay={1.4} />
      <Flow d="M344 238 C300 238 280 200 266 182" delay={1.6} />
    </>
  );
}

function SceneAutomations() {
  return (
    <>
      {/* trigger */}
      <motion.circle cx="64" cy="150" r="20" variants={draw} custom={0} />
      <motion.path d="M60 140 L72 150 L60 160" variants={draw} custom={1} className="stroke-dot" />
      {/* rotating gear */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{ opacity: { delay: 0.5, duration: 0.4 }, rotate: { repeat: Infinity, ease: "linear", duration: 9 } }}
        style={{ originX: "190px", originY: "150px" }}
      >
        <circle cx="190" cy="150" r="26" fill="none" strokeWidth="1.5" stroke="currentColor" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={190 + Math.cos(rad) * 26}
              y1={150 + Math.sin(rad) * 26}
              x2={190 + Math.cos(rad) * 34}
              y2={150 + Math.sin(rad) * 34}
              stroke="currentColor"
              strokeWidth="1.5"
            />
          );
        })}
      </motion.g>
      <motion.circle cx="190" cy="150" r="8" variants={draw} custom={2} />
      {/* process box */}
      <motion.rect x="268" y="124" width="84" height="52" rx="9" variants={draw} custom={3} />
      <motion.line x1="286" y1="144" x2="334" y2="144" variants={draw} custom={4} className="opacity-40" />
      <motion.line x1="286" y1="156" x2="320" y2="156" variants={draw} custom={4.4} className="opacity-30" />
      {/* result check — amber */}
      <motion.circle cx="418" cy="150" r="22" variants={draw} custom={5} className="stroke-dot" />
      <motion.path d="M408 150 L415 158 L429 142" variants={draw} custom={6} className="stroke-dot" strokeWidth={2} />
      {/* conveyor flows */}
      <Flow d="M84 150 L164 150" delay={0.9} />
      <Flow d="M216 150 L268 150" delay={1.1} />
      <Flow d="M352 150 L396 150" delay={1.3} />
    </>
  );
}

const SCENES: Record<string, () => JSX.Element> = {
  dashboards: SceneDashboards,
  agents: SceneAgents,
  systems: SceneSystems,
  automations: SceneAutomations,
};

/* ---------- section ---------- */

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
  const Scene = SCENES[cat.id];

  return (
    <section id="build" className="py-32 sm:py-48">
      <div className="shell">
        <SectionHeader
          index="01"
          label="מה אנחנו בונים"
          title="פתרון חי לכל צורך עסקי."
          lead="דשבורד, סוכן AI, מערכת או אוטומציה — כל פתרון נבנה בדיוק למידות של העסק שלכם."
        />

        <div
          className="mt-16 grid gap-5 lg:grid-cols-[1fr_340px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* live panel */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-surface">
            <div className="flex items-center justify-between px-7 pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-mist">
              <AnimatePresence mode="wait">
                <motion.span
                  key={cat.id}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="kicker"
                >
                  {cat.name}
                </motion.span>
              </AnimatePresence>
              <span dir="ltr">
                <span className="text-dot">{String(active + 1).padStart(2, "0")}</span>
                <span className="text-mist/50"> // </span>
                {String(CATEGORIES.length).padStart(2, "0")}
              </span>
            </div>

            <div className="px-4 sm:px-8">
              <AnimatePresence mode="wait">
                <motion.svg
                  key={cat.id}
                  viewBox="0 0 480 300"
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.25 } }}
                  className="mx-auto block w-full max-w-[640px] fill-none stroke-ivory text-ivory [stroke-linecap:round] [stroke-linejoin:round]"
                  strokeWidth={1.5}
                  aria-label={cat.name}
                >
                  <Scene />
                </motion.svg>
              </AnimatePresence>
            </div>

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
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-4">
            {CATEGORIES.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border p-5 text-start transition-colors duration-500 sm:p-6",
                    isActive
                      ? "border-white/25 bg-surface"
                      : "border-white/[0.08] hover:border-white/20"
                  )}
                >
                  <span dir="ltr" className="font-mono text-[10px] tracking-[0.22em] text-mist">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "mt-2 flex items-center gap-3 text-xl font-black tracking-tightest transition-colors duration-300 sm:text-2xl",
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
