"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { GlowingCard } from "@/components/ui/GlowingCard";
import { APPROACH } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Approach() {
  return (
    <section id="approach" className="py-32 sm:py-44">
      <div className="shell">
        <SectionHeader
          index="(01)"
          label="הגישה שלנו"
          title="ההבדל — תמיד מתחילים מהבעיה, לא מהפתרון."
          lead={
            <>
              אנחנו לא עוקבים אחרי רשימה קנייה –{" "}
              <strong className="font-semibold text-bright">
                אנחנו פותרים את הבעיה הספציפית שלכם
              </strong>
              . אנחנו שואלים קודם, בונים שנית. כל דבר שאנחנו עושים{" "}
              <strong className="font-semibold text-bright">
                עובד לעסק שלכם, וזה ניתן למדידה
              </strong>
              .
            </>
          }
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid gap-5 md:grid-cols-2"
        >
          {APPROACH.map((c) => (
            <motion.div key={c.label} variants={fadeUp}>
              <GlowingCard highlight={c.winner} className={cn(!c.winner && "opacity-70")}>
                <div className="flex min-h-[260px] flex-col p-9 sm:p-11">
                  <span
                    className={cn(
                      "font-mono text-[11px] uppercase tracking-[0.14em]",
                      c.winner ? "text-glow" : "text-steel/70"
                    )}
                  >
                    {c.label}
                  </span>
                  <h3
                    className={cn(
                      "mt-auto pt-12 text-2xl font-bold tracking-tightest sm:text-3xl",
                      c.winner
                        ? "text-bright"
                        : "text-steel line-through decoration-steel/40 decoration-1"
                    )}
                  >
                    {c.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-steel">
                    {c.body}
                  </p>
                </div>
              </GlowingCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
