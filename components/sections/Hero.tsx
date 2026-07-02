"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { EASE, blurIn, fadeUp, maskRise } from "@/lib/motion";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { MagneticButton } from "@/components/ui/MagneticButton";

// Choreographed to land as the preloader curtain clears.
const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 1.15 } },
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

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Slow editorial parallax — the composition recedes as you scroll past.
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-[var(--shell-pad)] pb-20 pt-32 text-center"
    >
      <MeshGradient />

      <motion.div style={{ y, opacity: fade }} className="relative z-10 w-full">
        {/* meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 1.1 }}
          className="mx-auto mb-10 flex max-w-shell items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-mist"
        >
          <span className="kicker">Solution House</span>
          <span className="hidden gap-6 sm:flex">
            <span>תל אביב</span>
            <span>—</span>
            <span>2026</span>
          </span>
        </motion.div>

        {/* monumental, centered, gradient headline */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={heroStagger}
          className="mx-auto max-w-[16ch] font-black leading-[0.94] tracking-tightest text-[clamp(3rem,10vw,9.5rem)]"
        >
          <span className="block text-gradient">
            <Words text="בונים את התשתית" />
          </span>
          <span className="block text-gradient">
            <Words text="להצלחה שלכם." />
          </span>
        </motion.h1>

        {/* subtitle */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={heroStagger}
          className="mx-auto mt-9 max-w-2xl"
        >
          <motion.span
            variants={blurIn}
            className="block text-lg font-light leading-relaxed text-mist sm:text-xl"
          >
            יש לכם אתגר עסקי? אנחנו בונים את הפתרון המדויק עבורו —{" "}
            <strong className="font-semibold text-ivory">
              בדיוק למידות של העסק שלכם.
            </strong>
          </motion.span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={heroStagger}
          className="mt-11 flex flex-wrap items-center justify-center gap-3.5"
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

      {/* scroll indicator — double chevron, gently bobbing */}
      <motion.a
        href="#build"
        aria-label="גלול למטה"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 2 }}
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-mist transition-colors duration-300 hover:text-dot"
      >
        <motion.svg
          width="26"
          height="34"
          viewBox="0 0 26 34"
          fill="none"
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <path d="M4 8 L13 16 L22 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 18 L13 26 L22 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.a>
    </section>
  );
}
