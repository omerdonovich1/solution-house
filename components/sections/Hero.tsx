"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { EASE, blurIn, fadeUp, maskRise, stagger } from "@/lib/motion";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { MagneticButton } from "@/components/ui/MagneticButton";

const TOOLS = [
  "מערכות מתקדמות",
  "אוטומציות חכמות",
  "אתרים",
  "סוכני AI",
  "אינטגרציות",
  "דאשבורדים",
] as const;

function HeadlineLine({ children }: { children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span variants={maskRise} className="block">
        {children}
      </motion.span>
    </span>
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

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pb-12 pt-36"
    >
      <MeshGradient />

      <motion.div style={{ y, opacity: fade }} className="relative z-10 shell">
        {/* meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="mb-14 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-mist"
        >
          <span className="kicker">Solution House</span>
          <span className="hidden gap-6 sm:flex">
            <span>תל אביב</span>
            <span>—</span>
            <span>2026</span>
          </span>
        </motion.div>

        {/* staggered, masked headline */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={stagger}
          className="font-black leading-[0.92] tracking-tightest text-[clamp(3.2rem,11.5vw,10.5rem)] text-ivory"
        >
          <HeadlineLine>בונים את התשתית</HeadlineLine>
          <HeadlineLine>
            להצלחה <span className="text-mist">שלכם.</span>
          </HeadlineLine>
        </motion.h1>

        {/* sub + magnetic CTA */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="mt-14 grid items-end gap-10 md:grid-cols-[1fr_auto]"
        >
          <motion.p
            variants={blurIn}
            className="max-w-xl text-lg font-light leading-relaxed text-mist sm:text-xl"
          >
            יש לך אתגר עסקי. אנחנו בונים את הפתרון המדויק עבורו.{" "}
            <strong className="font-semibold text-ivory">
              אנחנו תמיד נבחר את הטכנולוגיה והדרך שיעבדו הכי טוב עבור העסק שלך.
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

      {/* tools marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 1.3 }}
        className="relative z-10 mt-24 select-none overflow-hidden border-y border-white/[0.08] py-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      >
        <div className="flex w-max animate-marquee">
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
        </div>
      </motion.div>
    </section>
  );
}
