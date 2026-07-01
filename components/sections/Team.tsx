"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { GlowingCard } from "@/components/ui/GlowingCard";
import { TEAM } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function Team() {
  return (
    <section id="team" className="py-32 sm:py-48">
      <div className="shell">
        <SectionHeader
          index="(04)"
          label="הצוות"
          title="שלושה אנשים. שש עיניים על הפרויקט שלכם."
          lead="אתם לא עוד מספר תיק. שלושה תפקידים, שליטה מלאה בכל פרט — מההתחלה ועד היום שבו זה משתלם."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-20 grid gap-5 md:grid-cols-3"
        >
          {TEAM.map((m) => (
            <motion.div key={m.num} variants={fadeUp}>
              <GlowingCard>
                <div className="p-9 sm:p-10">
                  <div className="font-mono text-[clamp(2.2rem,4vw,3.2rem)] font-bold leading-none text-stroke transition-colors duration-500">
                    {m.num}
                  </div>
                  <h3 className="mt-10 text-2xl font-black tracking-tightest text-ivory sm:text-3xl">
                    {m.role}
                  </h3>
                  <div className="mt-2.5 font-mono text-[11px] tracking-[0.22em] text-volt">
                    {m.tag}
                  </div>
                  {/* value: always visible on mobile, hover-revealed on desktop */}
                  <div className="mt-5 grid grid-rows-[1fr] transition-all duration-500 md:mt-0 md:grid-rows-[0fr] md:group-hover:mt-5 md:group-hover:grid-rows-[1fr]">
                    <p className="overflow-hidden text-[15px] font-light leading-relaxed text-mist transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
                      {m.value}
                    </p>
                  </div>
                </div>
              </GlowingCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
