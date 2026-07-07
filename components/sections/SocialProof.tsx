"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Magnetic } from "@/components/Magnetic";
import { fadeUp, stagger, viewportOnce, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
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

interface Testimonial {
  readonly quote: Bi;
  readonly name: Bi;
  readonly role: Bi;
}

const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote: {
      he: "מערכת ניהול צי הרכב שינתה לנו את היום-יום — מעקב ידני באקסלים הפך למסך אחד. חסכנו עשרות שעות בחודש.",
      en: "The fleet management system changed our day-to-day — manual spreadsheet tracking became a single screen. We save dozens of hours a month.",
    },
    name: { he: "מיכל א׳", en: "Michal A." },
    role: { he: "מנהלת תפעול, ניהול צי רכב", en: "Operations Manager, Fleet Management" },
  },
  {
    quote: {
      he: "מערכת בקרת האיכות נתנה לנו שליטה מלאה על הייצור — בלי אקסלים ובלי ניחושים.",
      en: "The quality control system gave us full control over production — no spreadsheets, no guesswork.",
    },
    name: { he: "רון ד׳", en: "Ron D." },
    role: { he: "מנהל איכות, חברת ייצור", en: "Quality Manager, Manufacturing Company" },
  },
  {
    quote: {
      he: "האתר החדש מרגיש בדיוק כמו המותג שלנו — מהיר, נקי וממיר הרבה יותר.",
      en: "The new site feels exactly like our brand — fast, clean, and converting far better.",
    },
    name: { he: "יעל כ׳", en: "Yael C." },
    role: { he: "בעלים, מותג איקומרס", en: "Owner, E-commerce Brand" },
  },
  {
    quote: {
      he: "סוכן ה-AI עונה לרוב הפניות לבד, מסביב לשעון — הלקוחות מרוצים יותר מאי פעם.",
      en: "The AI agent handles most inquiries on its own, around the clock — customers are happier than ever.",
    },
    name: { he: "אבי מ׳", en: "Avi M." },
    role: { he: "מנהל שירות לקוחות", en: "Customer Service Manager" },
  },
];

const cardHover =
  "transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(217,161,59,0.3),0_24px_60px_-24px_rgba(217,161,59,0.28)]";

function Stars() {
  const tx = useTx();
  return (
    <div className="flex gap-0.5" dir="ltr" aria-label={tx({ he: "5 מתוך 5 כוכבים", en: "5 out of 5 stars" })}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-dot text-dot" />
      ))}
    </div>
  );
}

export function SocialProof() {
  const tx = useTx();
  const [page, setPage] = useState(0);
  const perView = 2; // md+ shows two testimonials; the rail slides in pairs
  const maxPage = Math.max(0, Math.ceil(TESTIMONIALS.length / perView) - 1);

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
                className="absolute left-6 top-5 font-black text-[2.4rem] leading-none text-dot/25 transition-colors duration-500 group-hover:text-dot/45"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="w-fit rounded-full border border-dot/30 bg-dot/10 px-3 py-1 text-[11px] font-medium text-dot">
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

        {/* testimonials rail */}
        <div className="mt-8 sm:mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-ivory sm:text-xl">{tx({ he: "מה אומרים עלינו", en: "What clients say" })}</h3>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label={tx({ he: "הקודם", en: "Previous" })}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-ivory transition-all duration-300 hover:border-dot hover:text-dot disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label={tx({ he: "הבא", en: "Next" })}
                onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
                disabled={page === maxPage}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-ivory transition-all duration-300 hover:border-dot hover:text-dot disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(${page * 100}%)` }}
            >
              {TESTIMONIALS.map((t) => (
                <div key={t.name.en} className="w-full shrink-0 px-1.5 sm:w-1/2">
                  <figure className={`liquid-glass flex h-full flex-col rounded-3xl p-6 ${cardHover}`}>
                    <Stars />
                    <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-body">
                      “{tx(t.quote)}”
                    </blockquote>
                    <figcaption className="mt-5 border-t border-white/[0.08] pt-4">
                      <div className="font-bold text-ivory">{tx(t.name)}</div>
                      <div className="text-[13px] text-mist">{tx(t.role)}</div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          {/* page dots */}
          <div className="mt-5 flex justify-center gap-2">
            {Array.from({ length: maxPage + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={tx({ he: `עמוד ${i + 1}`, en: `Page ${i + 1}` })}
                onClick={() => setPage(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === page ? "w-6 bg-dot" : "w-1.5 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
