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
        "relative grid grid-cols-[auto_1fr] gap-8 py-12 transition-opacity duration-700 sm:gap-12",
        active ? "opacity-100" : "opacity-30"
      )}
    >
      {/* oversized ghost numeral + progress spine */}
      <div className="relative flex w-[72px] flex-col items-center sm:w-[110px]">
        <span
          className={cn(
            "font-mono text-[clamp(2.6rem,6vw,4.5rem)] font-bold leading-none transition-all duration-700",
            active ? "text-volt" : "text-stroke"
          )}
        >
          {step.index}
        </span>
        <span className="relative mt-4 w-px flex-1 overflow-hidden bg-white/10">
          <span
            className={cn(
              "absolute inset-x-0 top-0 h-full origin-top bg-volt/70 transition-transform duration-700 ease-out",
              active ? "scale-y-100" : "scale-y-0"
            )}
          />
        </span>
      </div>

      {/* content */}
      <div className="pb-2">
        <h3
          className={cn(
            "text-[clamp(1.8rem,3.6vw,2.8rem)] font-black tracking-tightest transition-colors duration-700",
            active ? "text-ivory" : "text-mist"
          )}
        >
          {step.title}
        </h3>
        <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-mist">
          {step.description}
        </p>
        <div className="mt-7 flex max-w-xl items-start gap-3 border-t border-white/[0.08] pt-5">
          <span className="mt-[2px] shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-volt">
            Insight
          </span>
          <p className="text-[15px] leading-relaxed text-body">{step.insight}</p>
        </div>
      </div>
    </div>
  );
}

export function Process() {
  return (
    <section id="process" className="py-32 sm:py-48">
      <div className="shell">
        <SectionHeader
          index="02"
          label="איך זה עובד"
          title="ארבעה שלבים. בלי הפתעות."
          lead="לא מתחייבים מראש על הכול. מתקדמים שלב אחר שלב — ואחרי כל שלב אתם מחליטים אם ממשיכים."
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 md:mt-20"
        >
          {STEPS.map((s) => (
            <StepBlock key={s.index} step={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
