"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { EASE, fadeUp, maskRise, stagger } from "@/lib/motion";
import { MeshGradient } from "@/components/ui/MeshGradient";
import { MagneticButton } from "@/components/ui/MagneticButton";

const TOOLS = [
  "אתרים",
  "אפליקציות",
  "מערכות ניהול",
  "אוטומציות",
  "סוכני AI",
  "אינטגרציות",
  "דאשבורדים",
] as const;

function HeadlineLine({ children }: { children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.05em]">
      <motion.span variants={maskRise} className="block">
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pb-12 pt-36"
    >
      <MeshGradient />

      <div className="relative z-10 shell">
        {/* meta row */}
        <div className="mb-12 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
          <span>שותפות לפתרון</span>
          <span className="hidden gap-6 sm:flex">
            <span>תל אביב</span>
            <span>—</span>
            <span>2026</span>
          </span>
        </div>

        {/* staggered, masked headline */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={stagger}
          className="font-black leading-[0.9] tracking-tightest text-[clamp(3.2rem,12vw,11rem)] text-bright"
        >
          <HeadlineLine>יש לך בעיה עסקית.</HeadlineLine>
          <HeadlineLine>
            אנחנו מוצאים את <span className="text-steel">הדרך</span>{" "}
            <span className="relative inline-block">
              הנכונה.
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: EASE, delay: 0.9 }}
                className="absolute bottom-[0.04em] right-0 h-[0.05em] w-full origin-right bg-bright shadow-[0_0_20px_2px_rgba(238,242,255,0.5)]"
              />
            </span>
          </HeadlineLine>
        </motion.h1>

        {/* sub + magnetic CTA */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="mt-12 grid items-end gap-10 md:grid-cols-[1fr_auto]"
        >
          <motion.p
            variants={fadeUp}
            className="max-w-xl text-lg leading-relaxed text-steel sm:text-xl"
          >
            מערכות חדשות, אוטומציה חכמה, אתרים, AI —{" "}
            <strong className="font-semibold text-bright">
              תמיד בוחרים את הדרך שתעבוד הכי טוב. לא את מה שנוח לנו למכור.
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
      </div>

      {/* tools marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.2 }}
        className="relative z-10 mt-20 select-none overflow-hidden border-y border-white/10 py-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      >
        <div className="flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} aria-hidden={dup === 1} className="flex shrink-0">
              {TOOLS.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-10 ps-10 font-mono text-sm uppercase tracking-[0.05em] text-steel"
                >
                  {t}
                  <span className="text-glow">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
