"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { CardStack } from "@/components/ui/CardStack";
import { STEPS, type ProcessStep } from "@/lib/data";

function StepBlock({ step }: { step: ProcessStep }) {
  return (
    <div className="liquid-glass relative grid grid-cols-[auto_1fr] gap-5 overflow-hidden rounded-3xl px-4 py-6 sm:gap-12 sm:px-7 sm:py-8">
      {/* oversized numeral + amber spine */}
      <div className="relative flex w-[58px] flex-col items-center sm:w-[110px]">
        <span className="font-mono text-[clamp(2.6rem,6vw,4.5rem)] font-bold leading-none text-volt">
          {step.index}
        </span>
        <span className="relative mt-4 w-px flex-1 overflow-hidden bg-white/10">
          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0 h-full origin-top bg-volt/70"
          />
        </span>
      </div>

      {/* content */}
      <div className="pb-2">
        <h3 className="text-[clamp(1.8rem,3.6vw,2.8rem)] font-black tracking-tightest text-ivory">
          {step.title}
        </h3>
        <p className="mt-3 max-w-xl text-[15px] font-light leading-relaxed text-mist sm:mt-4 sm:text-base">
          {step.description}
        </p>
        <div className="mt-5 max-w-xl border-t border-white/[0.08] pt-4 sm:mt-7 sm:pt-5">
          <p className="text-[15px] leading-relaxed text-body">{step.insight}</p>
        </div>
      </div>
    </div>
  );
}

export function Process() {
  return (
    <section id="process" className="py-16 sm:py-24">
      <div className="shell">
        <SectionHeader
          center
          index="02"
          label="איך זה עובד"
          title="ארבעה שלבים. בלי הפתעות."
          lead="לא מתחייבים מראש על הכול. מתקדמים שלב אחר שלב — ואחרי כל שלב אתם מחליטים אם ממשיכים."
        />

        <div className="mt-10 sm:mt-14">
          <CardStack
            topOffset={96}
            items={STEPS.map((s) => (
              <StepBlock key={s.index} step={s} />
            ))}
          />
        </div>
      </div>
    </section>
  );
}
