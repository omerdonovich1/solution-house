"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { blurIn, fadeUp, stagger, viewportOnce } from "@/lib/motion";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}

/** Editorial section header: hairline rule · mono index/label · oversized title · lead. */
export function SectionHeader({
  index,
  label,
  title,
  lead,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={className}
    >
      <motion.div variants={fadeUp} className="hairline" />
      <motion.div
        variants={fadeUp}
        className="mb-12 mt-6 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-mist"
      >
        <span className="text-volt">{index}</span>
        <span>{label}</span>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="max-w-[20ch] text-[clamp(2.6rem,6.5vw,5.5rem)] font-black leading-[0.98] tracking-tightest text-ivory"
      >
        {title}
      </motion.h2>
      {lead ? (
        <motion.p
          variants={blurIn}
          className="ms-auto mt-9 max-w-2xl text-lg font-light leading-relaxed text-mist sm:text-xl"
        >
          {lead}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
