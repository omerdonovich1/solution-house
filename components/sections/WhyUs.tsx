"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { useTx, type Bi } from "@/lib/i18n";

/**
 * Deliberately NOT a grid of icon-in-a-rounded-square cards — that module is
 * the visual signature of a generated landing page, and the icons were literal
 * (a bolt for "speed", a shield for "transparency"). This is an editorial
 * spec-sheet instead: a numeral, a claim, and the substance behind it, set on
 * the bare canvas with hairlines doing the dividing.
 */

const REASONS: { title: Bi; desc: Bi }[] = [
  {
    title: { he: "מהירות ביצוע", en: "Speed of delivery" },
    desc: {
      he: "רוב הפרויקטים עולים לאוויר תוך 2–6 שבועות. לוח זמנים מדויק אתם מקבלים כבר בשיחה הראשונה.",
      en: "Most projects go live within 2–6 weeks. You get a precise timeline in the very first call.",
    },
  },
  {
    title: { he: "שקיפות מלאה", en: "Full transparency" },
    desc: {
      he: "מחיר סגור מראש, עדכון התקדמות כל שבוע, ואפשרות לעצור בסוף כל שלב. אין עלויות נסתרות.",
      en: "A price agreed up front, a progress update every week, and the option to stop after any stage. No hidden costs.",
    },
  },
  {
    title: { he: "אחריות אחרי העלייה", en: "We stay after launch" },
    desc: {
      he: "תמיכה, תחזוקה והרחבות הן חלק מהחבילה — לא פרויקט נפרד שמתומחר מחדש.",
      en: "Support, maintenance and enhancements are part of the package — not a separate, re-quoted project.",
    },
  },
  {
    title: { he: "פותרים, לא מבצעים", en: "We solve, not just build" },
    desc: {
      he: "קודם מבינים את שורש הבעיה ורק אז בונים. רוב הפרויקטים נכשלים כי פתרו את הבעיה הלא נכונה.",
      en: "We understand the root problem before building. Most projects fail because they solved the wrong problem.",
    },
  },
];

export function WhyUs() {
  const tx = useTx();
  return (
    <section id="why" className="py-20 sm:py-32">
      <div className="shell">
        <SectionHeader center title={tx({ he: "למה דווקא אנחנו?", en: "Why us?" })} />

        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 sm:mt-16"
        >
          {REASONS.map(({ title, desc }, i) => (
            <motion.li
              key={title.en}
              variants={fadeUp}
              className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-2 border-t border-white/[0.08] py-7 transition-colors duration-500 last:border-b hover:border-white/20 sm:grid-cols-[4.5rem_minmax(0,15rem)_1fr] sm:gap-x-10 sm:py-9"
            >
              <span
                dir="ltr"
                aria-hidden
                className="text-[13px] font-medium tabular-nums text-mist/50 transition-colors duration-500 group-hover:text-dot sm:text-[15px]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="text-[1.45rem] font-black leading-tight tracking-tightest text-ivory sm:text-[1.9rem]">
                {tx(title)}
              </h3>

              <p className="col-span-2 max-w-xl text-[15px] font-light leading-relaxed text-mist sm:col-span-1 sm:text-base">
                {tx(desc)}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
