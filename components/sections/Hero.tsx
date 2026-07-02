"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { EASE, blurIn, fadeUp, maskRise } from "@/lib/motion";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MacBook } from "@/components/ui/MacBook";
import { LogoMark } from "@/components/ui/Logo";

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

/** The first page of the site itself, replicated on the MacBook screen. */
function MiniSite() {
  return (
    <div dir="rtl" className="relative flex h-full flex-col items-center justify-center bg-ink text-center">
      {/* mini pill navbar */}
      <div className="absolute left-1/2 top-[4%] flex -translate-x-1/2 items-center gap-2 rounded-md border border-white/[0.1] bg-white/[0.05] px-2 py-1">
        <span className="flex h-2 w-3 flex-col justify-center gap-[2px]">
          <span className="h-px w-3 bg-ivory/80" />
          <span className="h-px w-3 bg-ivory/80" />
        </span>
        <LogoMark className="h-3.5 w-3.5 text-ivory" />
        <span className="h-2 w-3 rounded-[2px] border border-white/25" />
      </div>

      <div dir="ltr" className="mb-[3%] font-mono text-[max(5px,0.9vw)] uppercase tracking-[0.2em] text-mist">
        ( Solution House )
      </div>
      <div className="text-gradient font-black leading-[0.96] tracking-tightest text-[max(14px,3.1vw)]">
        בונים את התשתית
        <br />
        להצלחה שלכם.
      </div>
      <div className="mt-[2.5%] max-w-[70%] text-[max(5px,0.95vw)] font-light leading-relaxed text-mist">
        יש לכם אתגר עסקי? אנחנו בונים את הפתרון המדויק עבורו.
      </div>
      <div className="mt-[3%] flex items-center gap-[6px]">
        <span className="rounded-full bg-ivory px-[1.6em] py-[0.55em] text-[max(5px,0.85vw)] font-bold text-ink">
          בואו נדבר
        </span>
        <span className="rounded-full border border-white/20 px-[1.6em] py-[0.55em] text-[max(5px,0.85vw)] font-semibold text-ivory">
          מה אנחנו בונים
        </span>
      </div>
    </div>
  );
}

/**
 * premiercs-style opening sequence: the hero holds centre stage while a
 * MacBook — screening the site's own first page — peeks from the bottom
 * edge; scrolling lifts the headline away and raises the laptop to a full
 * centred presentation before releasing to the next section.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });

  // phase 1 → 2: hero content lifts away
  const heroY = useTransform(p, [0, 0.38], [0, reduced ? 0 : -170]);
  const heroOpacity = useTransform(p, [0.08, 0.34], [1, 0]);
  // the laptop rises from its bottom peek to a full centred reveal
  const macY = useTransform(p, [0, 0.62], reduced ? ["0%", "0%"] : ["66%", "-2%"]);
  const macScale = useTransform(p, [0.1, 0.62], reduced ? [1, 1] : [0.96, 1.04]);

  return (
    <section ref={ref} id="top" className="relative h-[280vh]">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden px-[var(--shell-pad)] pb-16 pt-28 text-center">
        <MeshGradient />

        {/* hero copy */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 1.1 }}
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
            className="mx-auto max-w-[16ch] font-black leading-[0.94] tracking-tightest text-[clamp(2.7rem,8.5vw,8rem)]"
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
              className="block text-lg font-light leading-relaxed text-mist sm:text-xl"
            >
              יש לכם אתגר עסקי? אנחנו בונים את הפתרון המדויק עבורו —{" "}
              <strong className="font-semibold text-ivory">
                בדיוק למידות של העסק שלכם.
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

        {/* the MacBook — peeks from the bottom, rises on scroll */}
        <motion.div
          style={{ y: macY, scale: macScale }}
          className="absolute inset-x-0 bottom-0 z-20 flex justify-center will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.7 }}
          >
            <MacBook>
              <MiniSite />
            </MacBook>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
