"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { GlowingCard } from "@/components/ui/GlowingCard";
import { TEAM } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function Team() {
  return (
    <section id="team" className="py-32 sm:py-44">
      <div className="shell">
        <SectionHeader
          index="(04)"
          label="הצוות"
          title="שלושה אנשים. בעיניים על הפרויקט שלכם."
          lead="אתם לא מספר תיק. שלוש תפקידים שולטים בכל דבר, מההתחלה ועד היום שבו זה משתלם."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid gap-5 md:grid-cols-3"
        >
          {TEAM.map((m) => (
            <motion.div key={m.num} variants={fadeUp}>
              <GlowingCard>
                <div className="p-9">
                  <div className="font-mono text-[11px] tracking-[0.12em] text-steel/70">
                    {m.num}
                  </div>
                  <h3 className="mt-6 text-2xl font-bold tracking-tightest text-bright">
                    {m.role}
                  </h3>
                  <div className="mt-2 font-mono text-[11px] tracking-[0.1em] text-glow">
                    {m.tag}
                  </div>
                  {/* value: always visible on mobile, hover-revealed on desktop */}
                  <div className="mt-5 grid grid-rows-[1fr] transition-all duration-500 md:mt-0 md:grid-rows-[0fr] md:group-hover:mt-5 md:group-hover:grid-rows-[1fr]">
                    <p className="overflow-hidden text-[15px] leading-relaxed text-steel transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
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
