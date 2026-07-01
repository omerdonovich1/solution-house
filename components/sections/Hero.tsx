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
import { DotMatrix } from "@/components/ui/DotMatrix";

const TOOLS = [
  "מערכות מתקדמות",
  "אוטומציות חכמות",
  "אתרים",
  "סוכני AI",
  "אינטגרציות",
  "דאשבורדים",
] as const;

// Ghost word-cascades flanking the composition (nudot's ambient type).
const CASCADE_A = TOOLS.slice(0, 3);
const CASCADE_B = TOOLS.slice(3);

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

/** Drifting stack of ghost service-words, indented diagonally. */
function Cascade({
  words,
  className,
  slow = false,
}: {
  words: readonly string[];
  className?: string;
  slow?: boolean;
}) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: EASE, delay: 2.2 }}
      className={className}
    >
      <div className={slow ? "animate-drift-slow" : "animate-drift"}>
        {words.map((w, i) => (
          <div
            key={w}
            className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-mist/40"
            style={{ paddingInlineStart: i * 18, paddingBlock: 7 }}
          >
            {w}
          </div>
        ))}
      </div>
    </motion.div>
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
      dir="ltr"
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
                <span className="text-dot">/</span>
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
  // Slow editorial parallax — the composition recedes as you scroll past.
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  // Headline rows shear apart in opposite directions on scroll.
  const rowShift = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);
  const rowShiftBack = useTransform(rowShift, (v) => -v);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pb-10 pt-36"
    >
      <MeshGradient />

      {/* ambient ghost cascades */}
      <Cascade
        words={CASCADE_A}
        className="absolute right-[4%] top-[24%] z-0 hidden lg:block"
      />
      <Cascade
        words={CASCADE_B}
        slow
        className="absolute bottom-[30%] left-[4%] z-0 hidden lg:block"
      />

      <motion.div style={{ y, opacity: fade }} className="relative z-10 shell">
        {/* meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 1.2 }}
          className="mb-12 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-mist"
        >
          <span className="kicker">Solution House</span>
          <span className="hidden gap-6 sm:flex">
            <span>תל אביב</span>
            <span>—</span>
            <span>2026</span>
          </span>
        </motion.div>

        {/* monumental, word-staggered headline — nudot edge-bleed scale */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={heroStagger}
          className="font-black leading-[0.94] tracking-tightest text-[clamp(3.2rem,11.5vw,11rem)] text-ivory"
        >
          <motion.span style={{ x: rowShift }} className="block">
            <Words text="בונים את" />
          </motion.span>
          <span className="flex flex-wrap items-center gap-x-8">
            <Words text="התשתית" />
            <motion.span
              variants={blurIn}
              className="kicker hidden pb-[0.5em] md:inline-flex"
            >
              בית פתרונות טכנולוגיים
            </motion.span>
          </span>
          <motion.span style={{ x: rowShiftBack }} className="block">
            <Words text="להצלחה" />
            <Words text="שלכם." className="text-mist" />
          </motion.span>
        </motion.h1>

        {/* sub + magnetic CTA + dot-matrix anchor */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={heroStagger}
          className="mt-14 grid items-end gap-10 md:grid-cols-[auto_1fr_auto]"
        >
          <motion.div variants={blurIn} className="hidden md:block">
            <DotMatrix size={10} gap={5} />
          </motion.div>

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
