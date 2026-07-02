"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { LogoMark } from "@/components/ui/Logo";

const OUT_EASE = [0.76, 0, 0.24, 1] as const;

/**
 * studio9p-style entry: a framed loader where an amber line stretches from
 * 0% to 100% while a counter climbs; the mark fades up at the centre, then
 * the whole overlay lifts to reveal the hero. Skipped for reduced-motion.
 */
export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    const start = performance.now();
    const DURATION = 1900;
    let raf = requestAnimationFrame(function tick(t) {
      const p = Math.min(1, (t - start) / DURATION);
      // ease-out so it sprints then settles onto 100
      setCount(Math.round((1 - Math.pow(1 - p, 2.2)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 420);
    });
    // watchdog — never trap the user if rAF is throttled (hidden tab)
    const bail = setTimeout(() => setDone(true), DURATION + 1600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(bail);
    };
  }, []);

  const progress = count / 100;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.85, ease: OUT_EASE, delay: 0.05 } }}
        >
          {/* the loader frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative mx-[var(--shell-pad)] h-[42vw] max-h-[280px] w-full max-w-[560px] rounded-lg border border-white/15"
          >
            {/* stretching amber line — dead level */}
            <svg
              viewBox="0 0 560 280"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <line x1="60" y1="140" x2="500" y2="140" stroke="rgba(244,244,242,0.1)" strokeWidth="1" />
              <motion.line
                x1="60"
                y1="140"
                x2="500"
                y2="140"
                className="stroke-dot"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress }}
                transition={{ ease: "linear", duration: 0.08 }}
              />
            </svg>

            {/* counters at each end — one shared baseline */}
            <span
              dir="ltr"
              className="absolute left-[9%] top-[56%] font-mono text-[13px] tracking-[0.1em] text-mist"
            >
              0%
            </span>
            <span
              dir="ltr"
              className="absolute right-[9%] top-[56%] font-mono text-[13px] tracking-[0.1em] text-ivory"
            >
              {String(count).padStart(3, "0")}%
            </span>

            {/* mark fades up at centre */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
              className="absolute inset-0 grid place-items-center"
            >
              <LogoMark className="h-11 w-11 text-ivory" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
