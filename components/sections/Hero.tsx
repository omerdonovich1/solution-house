"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { EASE, blurIn, fadeUp, maskRise } from "@/lib/motion";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LogoMark } from "@/components/ui/Logo";

const TOOLS = [
  "מערכות מתקדמות",
  "אוטומציות חכמות",
  "אתרים",
  "סוכני AI",
  "אינטגרציות",
  "דאשבורדים",
] as const;

// Choreographed to land as the preloader curtain clears.
const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 1.15 } },
} as const;

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** Words rise out of individual overflow masks, staggered across lines. */
function Words({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.09em] -mb-[0.09em] align-top">
            <motion.span variants={maskRise} className={`inline-block ${className ?? ""}`}>
              {word}
            </motion.span>
          </span>{" "}
        </span>
      ))}
    </>
  );
}

/** Tools strip whose speed and skew react to scroll velocity. */
function VelocityMarquee() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-2500, 0, 2500], [4, 0, 4]);
  const skew = useTransform(smooth, [-2500, 2500], [3.5, -3.5]);
  const reduced = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const speed = 2.6 * (1 + factor.get());
    baseX.set(wrap(-50, 0, baseX.get() - speed * (delta / 1000)));
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: EASE, delay: 2 }}
      className="relative z-10 mt-24 select-none overflow-hidden border-y border-white/[0.08] py-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
    >
      <motion.div style={{ x, skewX: skew }} className="flex w-max">
        {[0, 1].map((dup) => (
          <div key={dup} aria-hidden={dup === 1} className="flex shrink-0">
            {TOOLS.map((t) => (
              <span
                key={t}
                className="flex items-center gap-10 ps-10 font-mono text-sm uppercase tracking-[0.06em] text-mist"
              >
                {t}
                <span className="text-volt">/</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Slow editorial parallax — the headline recedes as you scroll past.
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const markY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pb-12 pt-36"
    >
      <MeshGradient />

      {/* the mark, monumental — an outline watermark anchoring the composition */}
      <motion.div
        aria-hidden
        style={{ y: markY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay: 1.6 }}
        className="pointer-events-none absolute -left-[8%] top-1/2 -translate-y-1/2 text-ivory/[0.16]"
      >
        <LogoMark outline className="h-[78vh] w-[78vh]" />
      </motion.div>

      <motion.div style={{ y, opacity: fade }} className="relative z-10 shell">
        {/* meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 1.2 }}
          className="mb-14 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-mist"
        >
          <span className="kicker">Solution House</span>
          <span className="hidden gap-6 sm:flex">
            <span>תל אביב</span>
            <span>—</span>
            <span>2026</span>
          </span>
        </motion.div>

        {/* word-staggered, masked headline */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={heroStagger}
          className="font-black leading-[0.98] tracking-tightest text-[clamp(3rem,9.8vw,9.5rem)] text-ivory"
        >
          <span className="block">
            <Words text="בונים את התשתית" />
          </span>
          <span className="block">
            <Words text="להצלחה" />
            <Words text="שלכם." className="text-mist" />
          </span>
        </motion.h1>

        {/* sub + magnetic CTA */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={heroStagger}
          className="mt-14 grid items-end gap-10 md:grid-cols-[1fr_auto]"
        >
          <motion.p
            variants={blurIn}
            className="max-w-xl text-lg font-light leading-relaxed text-mist sm:text-xl"
          >
            יש לכם אתגר עסקי? אנחנו בונים את הפתרון המדויק עבורו.{" "}
            <strong className="font-semibold text-ivory">
              תמיד נבחר את הטכנולוגיה ואת הדרך שיעבדו הכי טוב עבור העסק שלכם.
            </strong>
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3.5">
            <MagneticButton href="#contact" variant="solid">
              בואו נדבר
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </MagneticButton>
            <MagneticButton href="#process" variant="ghost" strength={8}>
              איך זה עובד
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      <VelocityMarquee />
    </section>
  );
}
