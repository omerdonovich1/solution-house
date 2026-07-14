"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Magnetic } from "@/components/Magnetic";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { useTx, type Bi } from "@/lib/i18n";

interface CaseStudy {
  readonly client: Bi;
  readonly type: Bi;
  readonly challenge: Bi;
  readonly solution: Bi;
  readonly result: Bi;
  readonly metric: Bi;
}

const CASES: readonly CaseStudy[] = [
  {
    client: { he: "SHADIEZ · SPINZ", en: "SHADIEZ · SPINZ" },
    type: { he: "אתרים", en: "Websites" },
    challenge: {
      he: "נוכחות דיגיטלית חלשה שלא סיפרה את סיפור המותג ולא המירה מבקרים.",
      en: "A weak digital presence that didn't tell the brand story or convert visitors.",
    },
    solution: {
      he: "אתרי מותג מהירים ומדויקים, בנויים סביב חוויית משתמש והמרה.",
      en: "Fast, precise brand sites built around user experience and conversion.",
    },
    result: {
      he: "מותגים שמרגישים אחרת ומוכרים יותר",
      en: "Brands that feel different and sell more",
    },
    metric: { he: "אתרים חיים", en: "Sites live" },
  },
  {
    client: { he: "VANGUARD FLEET", en: "VANGUARD FLEET" },
    type: { he: "מערכת לניהול צי רכב", en: "Fleet management system" },
    challenge: {
      he: "מעקב ידני אחרי עשרות רכבים באקסלים מפוזרים.",
      en: "Tracking dozens of vehicles by hand across scattered spreadsheets.",
    },
    solution: {
      he: "מערכת אחת שמרכזת מיקום, תחזוקה ומשימות בזמן אמת.",
      en: "One system that centralizes location, maintenance and tasks in real time.",
    },
    result: {
      he: "חיסכון של עשרות שעות בחודש",
      en: "Dozens of hours saved every month",
    },
    metric: { he: "מערכת אמיתית", en: "Real system" },
  },
  {
    client: { he: "DYNAMICA QC", en: "DYNAMICA QC" },
    type: { he: "מערכת לניהול בקרת איכות", en: "Quality control system" },
    challenge: {
      he: "בקרת איכות ידנית, ללא מעקב אחרי ליקויים ותהליכים.",
      en: "Manual quality control, with no tracking of defects or processes.",
    },
    solution: {
      he: "מערכת QC מלאה — בדיקות, דוחות אי-התאמה ומעקב חי אחרי הזמנות.",
      en: "A full QC system — inspections, non-conformance reports and live order tracking.",
    },
    result: {
      he: "שליטה מלאה על איכות הייצור",
      en: "Full control over production quality",
    },
    metric: { he: "מערכת אמיתית", en: "Real system" },
  },
  {
    client: { he: "אוטומציות לעסקים", en: "Business Automations" },
    type: { he: "אוטומציה עסקית", en: "Business automation" },
    challenge: {
      he: "תהליכים ידניים חוזרים שגוזלים שעות יקרות מהצוות.",
      en: "Repetitive manual processes eating up the team's valuable hours.",
    },
    solution: {
      he: "אוטומציות שמחברות בין המערכות ורצות לבד — מהטריגר ועד התוצאה.",
      en: "Automations that connect your systems and run on their own — from trigger to result.",
    },
    result: {
      he: "פחות עבודה ידנית, פחות טעויות",
      en: "Less manual work, fewer errors",
    },
    metric: { he: "רץ לבד", en: "Runs itself" },
  },
  {
    client: { he: "AI Agents", en: "AI Agents" },
    type: { he: "סוכני AI", en: "AI agents" },
    challenge: {
      he: "עומס פניות ומשימות חוזרות שדורשות זמינות מסביב לשעון.",
      en: "A flood of inquiries and repetitive tasks demanding round-the-clock availability.",
    },
    solution: {
      he: "סוכני AI שעונים, מסכמים ומבצעים — 24/7, בשפה של העסק.",
      en: "AI agents that answer, summarize and act — 24/7, in your business's voice.",
    },
    result: {
      he: "רוב הפניות נענות אוטומטית",
      en: "Most inquiries answered automatically",
    },
    metric: { he: "24/7", en: "24/7" },
  },
];

const cardHover =
  "transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(217,161,59,0.3),0_24px_60px_-24px_rgba(217,161,59,0.28)]";

export function SocialProof() {
  const tx = useTx();

  return (
    <section id="stories" className="py-16 sm:py-24">
      <div className="shell">
        <SectionHeader
          center
          title={tx({ he: "סיפורי הצלחה.", en: "Success stories." })}
          lead={tx({
            he: "לא מבטיחים — מראים. הנה כמה מהעסקים שכבר עובדים אחרת.",
            en: "We don't promise — we show. Here are a few businesses already working differently.",
          })}
        />

        {/* case studies */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-3"
        >
          {CASES.map((c, i) => (
            <motion.div key={c.client.en} variants={fadeUp}>
              <Magnetic strength={0.12} radius={26} className="h-full">
                <article
                  className={`liquid-glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 sm:p-7 ${cardHover}`}
                >
              <span
                dir="ltr"
                aria-hidden
                className="pointer-events-none absolute top-5 font-black text-[2.4rem] leading-none text-dot/25 transition-colors duration-500 group-hover:text-dot/45 ltr:right-6 rtl:left-6"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="w-fit max-w-[calc(100%-3.5rem)] rounded-full border border-dot/30 bg-dot/10 px-3 py-1 text-[11px] font-medium text-dot">
                {tx(c.type)}
              </span>
              <h3 className="mt-4 text-xl font-black tracking-tight text-ivory">{tx(c.client)}</h3>

              <dl className="mt-4 space-y-2.5 text-[14px] leading-relaxed">
                <div>
                  <dt className="inline font-semibold text-mist">{tx({ he: "האתגר: ", en: "Challenge: " })}</dt>
                  <dd className="inline text-body">{tx(c.challenge)}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-mist">{tx({ he: "הפתרון: ", en: "Solution: " })}</dt>
                  <dd className="inline text-body">{tx(c.solution)}</dd>
                </div>
              </dl>

              <div className="mt-5 flex items-center gap-3 border-t border-white/[0.08] pt-4">
                <span className="text-2xl font-black tracking-tightest text-dot">{tx(c.metric)}</span>
                <span className="text-[13px] text-mist">{tx(c.result)}</span>
              </div>
                </article>
              </Magnetic>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
