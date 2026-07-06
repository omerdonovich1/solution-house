"use client";

import { motion } from "framer-motion";
import { blurIn, fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LogoMark } from "@/components/ui/Logo";

const WHATSAPP = "972523794801";

/**
 * The closer: full white inversion — the monochrome system flipped for
 * the final ask, nudot-style. Ink typography, outlined key word, and the
 * mark bleeding off the corner.
 */
export function CTA() {
  return (
    <section className="relative overflow-hidden bg-ivory text-center">
      {/* monumental outline mark bleeding off the edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[24%] -right-[6%] text-ink/[0.10]"
      >
        <LogoMark outline className="h-[60vh] w-[60vh]" />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative shell py-36 sm:py-52"
      >
        <motion.div
          variants={fadeUp}
          dir="ltr"
          className="mb-10 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/50"
        >
          ( Solution House )
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="mx-auto max-w-[14ch] text-[clamp(3rem,9.5vw,7.5rem)] font-black leading-[0.94] tracking-tightest text-ink"
        >
          בואו <span className="text-stroke-ink">נפתור</span> את זה.
        </motion.h2>
        <motion.p
          variants={blurIn}
          className="mx-auto mt-8 max-w-xl text-lg font-medium text-ink/60 sm:text-xl"
        >
          שיחה אחת כדי להבין את הבעיה, את הדרך קדימה ואת העלות. בלי הבטחות שלא נוכל לעמוד בהן.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-wrap items-center justify-center gap-3.5"
        >
          <MagneticButton
            href="#contact"
            variant="solid"
            className="bg-ink text-ivory hover:bg-ink/85"
          >
            בואו נדבר
          </MagneticButton>
          <MagneticButton
            href={`https://wa.me/${WHATSAPP}`}
            variant="ghost"
            strength={8}
            className="border-ink/25 text-ink hover:border-ink"
          >
            וואטסאפ
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
