"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The "Live Solution Architect" — an interactive command interface
 * hovering inside the hero. A terminal types its readiness prompt;
 * three quick-prompt chips describe common business bottlenecks, and
 * clicking one triggers an architectural build: glowing nodes
 * ([מקור נתונים] → [סוכן AI] → [אוטומציה] → [דשבורד חי]) connect one
 * by one in the field AROUND the terminal, pulsing soft cyan. On
 * scroll the field dissolves into the ambient neural background so
 * the hand-off to the page below feels continuous.
 */

const PROMPTS = [
  { id: "data", label: "הזנת נתונים ידנית" },
  { id: "support", label: "עומס בשירות לקוחות" },
  { id: "fleet", label: "ניהול צי רכבים מבולגן" },
] as const;

type Prompt = (typeof PROMPTS)[number];

const STAGES = [
  { id: "source", label: "מקור נתונים" },
  { id: "agent", label: "סוכן AI" },
  { id: "flow", label: "אוטומציה" },
  { id: "dash", label: "דשבורד חי" },
] as const;

const STATUS = ["מנתח את צוואר הבקבוק…", "מחבר רכיבים…", "בודק זרימת נתונים…"];

/* ── tiny typewriter ─────────────────────────────────────────────── */
function useTypewriter(text: string, speed: number, delay: number, instant: boolean) {
  const [n, setN] = useState(instant ? text.length : 0);
  useEffect(() => {
    if (instant) {
      setN(text.length);
      return;
    }
    setN(0);
    let i = 0;
    let iv: ReturnType<typeof setInterval> | undefined;
    const t = setTimeout(() => {
      iv = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length && iv) clearInterval(iv);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(t);
      if (iv) clearInterval(iv);
    };
  }, [text, speed, delay, instant]);
  return text.slice(0, n);
}

/* ── the node field around the terminal (desktop) ────────────────── */
function ArchField({ stage, runKey }: { stage: number; runKey: number }) {
  // nodes flow RTL: source (right) → … → dashboard (left)
  const N = [
    { x: 1310, y: 120 },
    { x: 1070, y: 396 },
    { x: 330, y: 396 },
    { x: 96, y: 128 },
  ];
  const paths = [
    `M ${N[0].x} ${N[0].y} C ${N[0].x - 40} ${N[0].y + 170}, ${N[1].x + 150} ${N[1].y - 90}, ${N[1].x} ${N[1].y}`,
    `M ${N[1].x} ${N[1].y} C ${N[1].x - 260} ${N[1].y + 46}, ${N[2].x + 260} ${N[2].y + 46}, ${N[2].x} ${N[2].y}`,
    `M ${N[2].x} ${N[2].y} C ${N[2].x - 150} ${N[2].y - 90}, ${N[3].x + 40} ${N[3].y + 170}, ${N[3].x} ${N[3].y}`,
  ];
  const live = stage >= STAGES.length - 1;

  return (
    <svg
      viewBox="0 0 1400 500"
      className="absolute -inset-x-40 top-1/2 hidden h-[500px] w-[calc(100%+320px)] -translate-y-1/2 lg:block"
      aria-hidden
    >
      <defs>
        <filter id="arch-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* connections */}
      {paths.map((d, i) => {
        const on = stage >= i + 1;
        return (
          <g key={`p${runKey}-${i}`}>
            {/* faint idle hint */}
            <path d={d} fill="none" stroke="rgba(125,180,255,0.10)" strokeWidth="1" strokeDasharray="3 9" />
            {/* the drawn, glowing link */}
            <motion.path
              d={d}
              fill="none"
              stroke="rgba(154,216,245,0.75)"
              strokeWidth="1.6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={on ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              style={{ filter: "drop-shadow(0 0 6px rgba(125,180,255,0.55))" }}
            />
            {/* travelling packets once live */}
            {on && (
              <path
                d={d}
                fill="none"
                stroke="rgba(233,233,229,0.85)"
                strokeWidth="1.6"
                strokeDasharray="4 26"
                style={{ animation: `dash-flow ${4 + i}s linear infinite` }}
              />
            )}
          </g>
        );
      })}

      {/* nodes */}
      {STAGES.map((s, i) => {
        const on = stage >= i;
        return (
          <g key={`n${runKey}-${i}`}>
            <motion.circle
              cx={N[i].x}
              cy={N[i].y}
              r="26"
              fill="rgba(125,180,255,0.55)"
              filter="url(#arch-glow)"
              initial={false}
              animate={
                on
                  ? live
                    ? { opacity: [0.35, 0.75, 0.35], scale: [1, 1.12, 1] }
                    : { opacity: 0.7, scale: [0.6, 1.25, 1] }
                  : { opacity: 0.08, scale: 1 }
              }
              transition={
                on && live
                  ? { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }
                  : { duration: 0.5, ease: EASE }
              }
              style={{ transformOrigin: `${N[i].x}px ${N[i].y}px` }}
            />
            <motion.circle
              cx={N[i].x}
              cy={N[i].y}
              r="12"
              fill="none"
              stroke={on ? "rgba(154,216,245,0.9)" : "rgba(139,139,137,0.35)"}
              strokeWidth="1.2"
              initial={false}
              animate={on ? { scale: [0.5, 1.3, 1], opacity: 1 } : { scale: 1, opacity: 0.4 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ transformOrigin: `${N[i].x}px ${N[i].y}px` }}
            />
            <circle cx={N[i].x} cy={N[i].y} r="4.5" fill={on ? "#9AD8F5" : "rgba(139,139,137,0.5)"} />
            <text
              x={N[i].x}
              y={N[i].y + (N[i].y > 250 ? 44 : -32)}
              textAnchor="middle"
              fill={on ? "#E9E9E5" : "rgba(139,139,137,0.55)"}
              fontSize="15"
              fontWeight={on ? 600 : 400}
            >
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── compact pipeline for phones ─────────────────────────────────── */
function MobilePipeline({ stage }: { stage: number }) {
  return (
    <div dir="rtl" className="mt-5 flex items-start justify-center gap-0 lg:hidden">
      {STAGES.map((s, i) => {
        const on = stage >= i;
        return (
          <div key={s.id} className="flex items-start">
            {i > 0 && (
              <div className="relative mx-1 mt-[7px] h-px w-7 overflow-hidden rounded-full bg-white/10 sm:w-12">
                <motion.div
                  className="absolute inset-0 origin-right bg-[#9AD8F5]/80"
                  initial={false}
                  animate={{ scaleX: on ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                />
              </div>
            )}
            <div className="flex w-[64px] flex-col items-center gap-1.5 sm:w-[76px]">
              <motion.span
                className="block h-[14px] w-[14px] rounded-full border"
                initial={false}
                animate={
                  on
                    ? {
                        scale: [0.6, 1.25, 1],
                        borderColor: "rgba(154,216,245,0.9)",
                        backgroundColor: "rgba(154,216,245,0.35)",
                        boxShadow: "0 0 14px rgba(125,180,255,0.7)",
                      }
                    : {
                        scale: 1,
                        borderColor: "rgba(255,255,255,0.18)",
                        backgroundColor: "rgba(255,255,255,0.04)",
                        boxShadow: "0 0 0 rgba(0,0,0,0)",
                      }
                }
                transition={{ duration: 0.45, ease: EASE }}
              />
              <span
                className={cn(
                  "text-center text-[10.5px] leading-tight transition-colors duration-300",
                  on ? "font-medium text-ivory" : "text-mist/70"
                )}
              >
                {s.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── the command interface ───────────────────────────────────────── */
export function SolutionArchitect({ leave }: { leave: MotionValue<number> }) {
  const reduced = useReducedMotion();
  const [run, setRun] = useState<{ prompt: Prompt; key: number } | null>(null);
  const [stage, setStage] = useState(-1);

  // the node field dissolves into the ambient neural background as the
  // hero scrolls off — the terminal itself rides out with the section
  const fieldOpacity = useTransform(leave, [0, 1], [1, 0]);
  const fieldY = useTransform(leave, [0, 1], [0, -36]);

  const line1 = useTypewriter("> SYSTEM READY.", 26, 900, !!reduced);
  const line1Done = line1.length >= 15;
  const line2 = useTypewriter(
    "תארו את צוואר הבקבוק בעסק שלכם…",
    30,
    1420,
    !!reduced
  );

  // staged architectural build
  useEffect(() => {
    if (!run) return;
    setStage(-1);
    const ids = STAGES.map((_, i) =>
      setTimeout(() => setStage(i), 380 + i * (reduced ? 60 : 620))
    );
    return () => ids.forEach(clearTimeout);
  }, [run, reduced]);

  const fire = (prompt: Prompt) => setRun({ prompt, key: (run?.key ?? 0) + 1 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE, delay: 0.55 }}
      className="relative mx-auto mt-8 w-full max-w-2xl sm:mt-10"
    >
      {/* the architecture field, behind + around the glass terminal */}
      <motion.div
        aria-hidden
        style={{ opacity: fieldOpacity, y: fieldY }}
        className="pointer-events-none absolute inset-0"
      >
        <ArchField stage={stage} runKey={run?.key ?? 0} />
      </motion.div>

      {/* terminal */}
      <div className="liquid-glass relative z-10 overflow-hidden rounded-2xl text-start shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8),0_0_50px_-18px_rgba(96,165,250,0.22)]">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5">
          <div className="flex gap-1.5" dir="ltr">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/80" />
          </div>
          <span dir="ltr" className="text-[11px] tracking-[0.18em] text-mist/80">
            solution-architect
          </span>
        </div>

        {/* feed — console-style: newest lines push the history up */}
        <div className="flex h-[150px] flex-col justify-end overflow-hidden px-4 py-3.5 text-[13.5px] leading-[1.7] sm:h-[158px] sm:px-5">
          <p dir="ltr" className="text-start font-medium tracking-[0.08em] text-[#9AD8F5]">
            {line1}
          </p>
          {line1Done && (
            <p className="text-body">
              {line2}
              {!run && (
                <span className="ms-1 inline-block h-[1.05em] w-[7px] translate-y-[3px] animate-blink bg-ivory/90" />
              )}
            </p>
          )}
          {run && (
            <div key={run.key}>
              <p className="text-ivory">
                <span className="text-[#9AD8F5]">‹</span> {run.prompt.label}
              </p>
              {STATUS.map(
                (s, i) =>
                  stage >= i && (
                    <motion.p
                      key={s}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="text-mist"
                    >
                      {s}
                    </motion.p>
                  )
              )}
              {stage >= STAGES.length - 1 && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="font-semibold text-[#9AD8F5]"
                >
                  ✓ הארכיטקטורה חיה — ככה זה עובד אצלנו.
                </motion.p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* the build, made phone-sized */}
      {run && <MobilePipeline stage={stage} />}

      {/* quick prompts */}
      <div className="relative z-10 mt-4 flex flex-wrap items-center justify-center gap-2.5">
        {PROMPTS.map((pr) => {
          const active = run?.prompt.id === pr.id;
          return (
            <motion.button
              key={pr.id}
              type="button"
              onClick={() => fire(pr)}
              whileHover={{ scale: 1.045, y: -1 }}
              whileTap={{ scale: 0.96 }}
              className={cn(
                "liquid-glass rounded-pill px-4 py-2 text-[13px] font-medium transition-[color,box-shadow] duration-300",
                active
                  ? "text-ivory shadow-[0_0_0_1px_rgba(96,165,250,0.45),0_0_30px_-6px_rgba(96,165,250,0.5)]"
                  : "text-body hover:text-ivory hover:shadow-[0_0_0_1px_rgba(96,165,250,0.3),0_0_26px_-8px_rgba(96,165,250,0.4)]"
              )}
            >
              {pr.label}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
