"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { STEPS, type ProcessStep } from "@/lib/data";
import { cn } from "@/lib/utils";

function StepBlock({ step }: { step: ProcessStep }) {
  const ref = useRef<HTMLDivElement>(null);
  // Active while the block sits near the vertical centre of the viewport.
  const active = useInView(ref, { margin: "-45% 0px -45% 0px" });

  return (
    <div
      ref={ref}
      className={cn(
        "relative grid grid-cols-[auto_1fr] gap-7 py-10 transition-all duration-500",
        active ? "opacity-100" : "opacity-35"
      )}
    >
      {/* index + progress node */}
      <div className="relative flex flex-col items-center">
        <span
          className={cn(
            "grid h-12 w-12 shrink-0 place-items-center rounded-full border font-mono text-sm transition-all duration-500",
            active
              ? "border-glow/60 bg-glow/10 text-bright shadow-[0_0_30px_-6px_rgba(91,124,255,0.7)]"
              : "border-white/12 text-steel"
          )}
        >
          {step.index}
        </span>
        <span className="mt-2 w-px flex-1 bg-white/10" />
      </div>

      {/* content */}
      <div className="pb-2">
        <h3
          className={cn(
            "text-[clamp(1.7rem,3.4vw,2.6rem)] font-extrabold tracking-tightest transition-colors duration-500",
            active ? "text-bright" : "text-steel"
          )}
        >
          {step.title}
        </h3>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-steel">
          {step.description}
        </p>
        <div className="mt-6 flex max-w-xl items-start gap-3 border-t border-white/10 pt-5">
          <span className="mt-[2px] shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-glow">
            Insight
          </span>
          <p className="text-[15px] leading-relaxed text-text">{step.insight}</p>
        </div>
      </div>
    </div>
  );
}

export function Process() {
  return (
    <section id="process" className="py-32 sm:py-44">
      <div className="shell">
        <SectionHeader
          index="(03)"
          label="איך זה עובד"
          title="ארבעה שלבים. בלי הפתעות."
          lead="אתם לא מתחייבים להר — אתם מתקדמים צעד אחרי צעד. כל שלב עומד בפני עצמו, וממשיכים הלאה רק אם זה משתלם."
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16"
        >
          {STEPS.map((s) => (
            <StepBlock key={s.index} step={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
