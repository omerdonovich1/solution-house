"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { LogoMark } from "@/components/ui/Logo";

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Entry sequence: the mark draws in over a counter climbing to 100,
 * then a two-layer curtain (ink, chased by volt) lifts into the hero.
 * Skipped entirely for prefers-reduced-motion users.
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
    const DURATION = 1100;
    let raf = requestAnimationFrame(function tick(t) {
      const p = Math.min(1, (t - start) / DURATION);
      // ease the count so it sprints early and lands softly
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 180);
    });
    // watchdog: never trap the user if rAF is throttled (hidden tab, etc.)
    const watchdog = setTimeout(() => setDone(true), 2600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(watchdog);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[100]"
          exit={{ pointerEvents: "none" }}
        >
          {/* white chaser — revealed for a beat as the ink curtain lifts */}
          <motion.div
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: CURTAIN_EASE, delay: 0.14 }}
            className="absolute inset-0 bg-ivory"
          />
          {/* ink curtain with the mark + counter */}
          <motion.div
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: CURTAIN_EASE }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-ink"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <LogoMark className="h-20 w-20 text-ivory sm:h-24 sm:w-24" />
            </motion.div>
            <div className="absolute bottom-10 inset-x-0 flex flex-col items-center gap-3">
              <span className="kicker animate-blink">בית פתרונות טכנולוגיים</span>
              <span dir="ltr" className="font-mono text-[12px] tracking-[0.3em] text-mist">
                <span className="text-dot">{String(count).padStart(3, "0")}</span>
                <span className="text-mist/50"> // </span>100
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
