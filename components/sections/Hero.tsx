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
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MacBook } from "@/components/ui/MacBook";
import { LogoMark } from "@/components/ui/Logo";

// Instant pacing — no preloader curtain, the laptop lands right away.
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

/** The brand lockup on the MacBook screen: the mark, big, name beneath. */
function MiniSite() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center bg-[radial-gradient(120%_100%_at_50%_0%,#161616_0%,#0A0A0A_55%,#050505_100%)] text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.45 }}
      >
        <LogoMark className="mx-auto h-[clamp(72px,13vw,150px)] w-[clamp(72px,13vw,150px)] text-ivory" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
        dir="ltr"
        className="mt-[4%] font-heebo text-[clamp(15px,2.6vw,30px)] font-light uppercase tracking-[0.38em] text-ivory"
      >
        Solution House
      </motion.div>
    </div>
  );
}

/**
 * The site opens AS the laptop — a realistic MacBook front and centre,
 * screening the brand. A short scroll zooms through the screen: the
 * laptop grows toward the viewer and dissolves while the real page
 * (metallic-cyan gradient type over the ambient-lit black canvas)
 * opens out of it.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });

  // the laptop zooms toward the viewer and slowly dissolves
  const macScale = useTransform(p, [0, 0.5], reduced ? [1, 1] : [1, 2.7]);
  const macOpacity = useTransform(p, reduced ? [0, 0.2] : [0.16, 0.48], [1, 0]);
  const macBlur = useTransform(p, [0.16, 0.48], ["blur(0px)", "blur(6px)"]);
  // the real page opens out of the screen
  const heroOpacity = useTransform(p, reduced ? [0, 0.2] : [0.3, 0.56], [0, 1]);
  const heroScale = useTransform(p, [0.3, 0.62], reduced ? [1, 1] : [0.93, 1]);
  const heroPointer = useTransform(p, (v) => (v > 0.34 ? "auto" : "none"));

  return (
    <section ref={ref} id="top" className="relative h-[135vh] sm:h-[170vh]">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden px-[var(--shell-pad)] pb-12 pt-20 text-center sm:pb-16 sm:pt-28">
        {/* a faint static core glow so the stage never sits on flat black */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-[1] bg-[radial-gradient(52%_44%_at_50%_42%,rgba(125,180,255,0.055)_0%,transparent_100%)]"
        />

        {/* hero copy — opens out of the laptop screen */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, pointerEvents: heroPointer as never }}
          className="relative z-10 w-full"
        >
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

        {/* the MacBook — opening stage, zooms through and dissolves */}
        <motion.div
          style={{ scale: macScale, opacity: macOpacity, filter: macBlur }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, y: 46, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          >
            <MacBook className="w-[min(88vw,940px)]">
              <MiniSite />
            </MacBook>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
