"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Clock, Code2, type LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Magnetic } from "@/components/Magnetic";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const REASONS: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: Zap,
    title: "מהירות ביצוע",
    desc: "פרויקטים באוויר תוך שבועות, לא חודשים. אנחנו מאמינים במהירות בלי פשרות.",
  },
  {
    Icon: ShieldCheck,
    title: "שקיפות מלאה",
    desc: "מחיר ברור מראש, עדכונים שבועיים, אין הפתעות. אתם יודעים בדיוק מה קורה.",
  },
  {
    Icon: Clock,
    title: "תמיכה 24/7",
    desc: "משהו נשבר? אנחנו כאן. לא משנה מתי — הפתרון שלכם תמיד מוגן.",
  },
  {
    Icon: Code2,
    title: "בנייה גמישה",
    desc: "נשארים גמישים ולא מקובעים כדי להגיע לתוצאה מצוינת.",
  },
];

const cardHover =
  "transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(217,161,59,0.3),0_24px_60px_-24px_rgba(217,161,59,0.28)]";

export function WhyUs() {
  return (
    <section id="why" className="py-16 sm:py-24">
      <div className="shell">
        <SectionHeader center title="למה דווקא אנחנו?" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2"
        >
          {REASONS.map(({ Icon, title, desc }) => (
            <motion.div key={title} variants={fadeUp}>
              <Magnetic strength={0.14} radius={26}>
                <div
                  className={`liquid-glass group relative overflow-hidden rounded-3xl p-6 sm:p-8 ${cardHover}`}
                >
                  <div className="flex items-start gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-dot/10 text-dot transition-colors duration-500 group-hover:bg-dot/20">
                  <Icon className="h-6 w-6" strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="text-xl font-black tracking-tight text-ivory sm:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-2 text-[15px] font-light leading-relaxed text-mist sm:text-base">
                    {desc}
                  </p>
                </div>
                  </div>
                </div>
              </Magnetic>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
