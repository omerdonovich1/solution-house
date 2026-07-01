"use client";

import { motion } from "framer-motion";
import { blurIn, fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

const WHATSAPP = "972500000000";

export function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.08] text-center">
      {/* the site's single loud moment — a low volt sunrise behind the closer */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(52%_60%_at_50%_115%,rgba(217,255,63,0.10),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_-10%,rgba(242,241,236,0.06),transparent_70%)]" />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative shell py-36 sm:py-52"
      >
        <motion.h2
          variants={fadeUp}
          className="mx-auto max-w-[14ch] text-[clamp(3rem,9.5vw,7.5rem)] font-black leading-[0.94] tracking-tightest text-ivory"
        >
          בואו <span className="text-mist">נפתור</span> את זה.
        </motion.h2>
        <motion.p
          variants={blurIn}
          className="mx-auto mt-8 max-w-xl text-lg font-light text-mist sm:text-xl"
        >
          שיחה אחת כדי להבין את הבעיה, הדרך קדימה והעלות. ללא הבטחות שלא נוכל להעמיד בהן.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-wrap items-center justify-center gap-3.5"
        >
          <MagneticButton href="#contact" variant="solid">
            בואו נדבר
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
