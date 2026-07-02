"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;
const WORDMARK = "SOLUTION HOUSE";

/**
 * Hyper-fast brand pacing: the wordmark letters rise out of a mask
 * (~550ms), then the curtain lifts. No fake percentages, no artificial
 * delays — total time on screen is well under a second.
 */
export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setDone(true), 780);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[100]"
          exit={{ pointerEvents: "none" }}
        >
          <motion.div
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: CURTAIN_EASE }}
            className="absolute inset-0 flex items-center justify-center bg-ink"
          >
            <div
              dir="ltr"
              className="flex overflow-hidden font-heebo text-[clamp(19px,3.2vw,38px)] font-light uppercase tracking-[0.38em] text-ivory"
            >
              {WORDMARK.split("").map((ch, i) => (
                <motion.span
                  key={`${ch}-${i}`}
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.04 + i * 0.02, duration: 0.5, ease: EASE }}
                  className="inline-block"
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
