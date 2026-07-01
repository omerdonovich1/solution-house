"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { GlowingCard } from "@/components/ui/GlowingCard";
import { APPROACH } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Approach() {
  return (
    <section id="approach" className="py-32 sm:py-48">
      <div className="shell">
        <SectionHeader
          index="(01)"
          label="הגישה שלנו"
          title="ההבדל — תמיד מתחילים מהבעיה, לא מהפתרון."
          lead={
            <>
              אנחנו לא עוקבים אחרי רשימה קנייה –{" "}
              <strong className="font-semibold text-ivory">
                אנחנו פותרים את הבעיה הספציפית שלכם
              </strong>
              . אנחנו שואלים קודם, בונים שנית. כל דבר שאנחנו עושים{" "}
              <strong className="font-semibold text-ivory">
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
          className="mt-20 grid gap-5 md:grid-cols-2"
        >
          {APPROACH.map((c) => (
            <motion.div key={c.label} variants={fadeUp}>
              <GlowingCard highlight={c.winner}>
                <div className="flex min-h-[300px] flex-col p-9 sm:p-12">
                  <span
                    className={cn(
                      "inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]",
                      c.winner ? "text-ink/60" : "text-mist/70"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5",
                        c.winner ? "bg-ink" : "bg-mist/40"
                      )}
                    />
                    {c.label}
                  </span>
                  <h3
                    className={cn(
                      "mt-auto pt-14 text-3xl font-black tracking-tightest sm:text-4xl",
                      c.winner
                        ? "text-ink"
                        : "text-mist line-through decoration-mist/40 decoration-1"
                    )}
                  >
                    {c.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-5 text-[15px] leading-relaxed",
                      c.winner ? "text-ink/70" : "text-mist"
                    )}
                  >
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
