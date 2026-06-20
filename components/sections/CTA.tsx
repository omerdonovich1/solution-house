"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

const WHATSAPP = "972500000000";

export function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_70%_at_50%_50%,rgba(91,124,255,0.14),transparent_70%)]" />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative shell py-32 sm:py-48"
      >
        <motion.h2
          variants={fadeUp}
          className="mx-auto max-w-[14ch] text-[clamp(3rem,9vw,7rem)] font-black leading-[0.92] tracking-tightest text-bright"
        >
          בואו <span className="text-steel">נפתור</span> את זה.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-7 max-w-xl text-lg text-steel sm:text-xl"
        >
          שיחת אבחון ללא עלות וללא התחייבות. נראה ביחד מה הדרך הנכונה בשבילכם.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-11 flex flex-wrap items-center justify-center gap-3.5"
        >
          <MagneticButton href="#contact" variant="solid">
            קבעו שיחת אבחון
          </MagneticButton>
          <MagneticButton
            href={`https://wa.me/${WHATSAPP}`}
            variant="ghost"
            strength={8}
          >
            וואטסאפ
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
