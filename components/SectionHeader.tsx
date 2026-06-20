"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}

/** Editorial section header: glow divider · mono index/label · oversized title · lead. */
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
      <motion.div variants={fadeUp} className="glow-divider" />
      <motion.div
        variants={fadeUp}
        className="mb-10 mt-5 flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.16em] text-steel"
      >
        <span className="text-text">{index}</span>
        <span>{label}</span>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="max-w-[20ch] text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-tightest text-bright"
      >
        {title}
      </motion.h2>
      {lead ? (
        <motion.p
          variants={fadeUp}
          className="ms-auto mt-8 max-w-2xl text-lg leading-relaxed text-steel"
        >
          {lead}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
