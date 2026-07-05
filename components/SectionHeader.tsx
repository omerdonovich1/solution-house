"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { blurIn, fadeUp, maskRise, viewportOnce } from "@/lib/motion";

interface SectionHeaderProps {
  /** Retained in the API for callers; no longer rendered. */
  index?: string;
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}

const headStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
} as const;

/** String titles rise word-by-word out of overflow masks. */
function TitleWords({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-top">
            <motion.span variants={maskRise} className="inline-block">
              {word}
            </motion.span>
          </span>{" "}
        </span>
      ))}
    </>
  );
}

/** Editorial section header: hairline rule · word-reveal title · lead. */
export function SectionHeader({ title, lead, className }: SectionHeaderProps) {
  return (
    <motion.div
      variants={headStagger}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={className}
    >
      <motion.div variants={fadeUp} className="hairline mb-8" />
      <h2 className="max-w-[20ch] text-[clamp(2.6rem,6.5vw,5.5rem)] font-black leading-[1.02] tracking-tightest text-ivory">
        {typeof title === "string" ? (
          <TitleWords text={title} />
        ) : (
          <motion.span variants={fadeUp} className="block">
            {title}
          </motion.span>
        )}
      </h2>
      {lead ? (
        <motion.p
          variants={blurIn}
          className="ms-auto mt-5 max-w-2xl text-base font-light leading-relaxed text-mist sm:mt-7 sm:text-xl"
        >
          {lead}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
