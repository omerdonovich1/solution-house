"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { EASE, blurIn, fadeUp, maskRise } from "@/lib/motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

// Instant render: no preloader curtain, no delay — the stagger starts
// the moment the page paints.
const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
} as const;

/** Words rise out of individual overflow masks, staggered across lines. */
function Words({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
            <motion.span variants={maskRise} className={`inline-block ${className ?? ""}`}>
              {word}
            </motion.span>
          </span>{" "}
        </span>
      ))}
    </>
  );
}

/**
 * Code-driven spatial hero — pure typography over the ambient-lit black
 * canvas. Fade-up + slight scale-in on load, animated metallic-cyan
 * gradient on the display type. No canvas, no video, no curtain.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center px-[var(--shell-pad)] pb-16 pt-28 text-center"
    >
      {/* a faint static core glow so the hero never sits on flat black */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1] bg-[radial-gradient(52%_44%_at_50%_42%,rgba(125,180,255,0.055)_0%,transparent_100%)]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="relative z-10 w-full"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className="mx-auto mb-9 flex max-w-shell items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-mist"
        >
          <span className="kicker">Solution House</span>
          <span className="hidden gap-6 sm:flex">
            <span>תל אביב</span>
            <span>—</span>
            <span>2026</span>
          </span>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={heroStagger}
          className="mx-auto max-w-[16ch] font-black leading-[1.02] tracking-tightest text-[clamp(2.7rem,8.5vw,8rem)]"
        >
          <span className="block text-gradient">
            <Words text="בונים את התשתית" />
          </span>
          <span className="block text-gradient">
            <Words text="להצלחה שלכם." />
          </span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          variants={heroStagger}
          className="mx-auto mt-7 max-w-2xl"
        >
          <motion.span
            variants={blurIn}
            className="block text-lg font-light leading-[1.75] text-mist sm:text-xl"
          >
            אנחנו מפתחים מערכות אוטומטיות, סוכני AI ו-SaaS שדוחפים עסקים קדימה.{" "}
            <strong className="font-semibold text-ivory">
              הפתרון הטכנולוגי הישיר לאתגר שלכם.
            </strong>
          </motion.span>
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={heroStagger}
          className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
        >
          <motion.div variants={fadeUp}>
            <MagneticButton href="#contact" variant="solid">
              בואו נדבר
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </MagneticButton>
          </motion.div>
          <motion.div variants={fadeUp}>
            <MagneticButton href="#build" variant="ghost" strength={8}>
              מה אנחנו בונים
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
