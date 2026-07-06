"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Magnetic } from "@/components/Magnetic";
import { fadeUp, stagger, viewportOnce, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface CaseStudy {
  readonly client: string;
  readonly type: string;
  readonly challenge: string;
  readonly solution: string;
  readonly result: string;
  readonly metric: string;
}

const CASES: readonly CaseStudy[] = [
  {
    client: "SHADIEZ · SPINZ",
    type: "אתרים",
    challenge: "נוכחות דיגיטלית חלשה שלא סיפרה את סיפור המותג ולא המירה מבקרים.",
    solution: "אתרי מותג מהירים ומדויקים, בנויים סביב חוויית משתמש והמרה.",
    result: "מותגים שמרגישים אחרת ומוכרים יותר",
    metric: "אתרים חיים",
  },
  {
    client: "VANGUARD FLEET",
    type: "מערכת לניהול צי רכב",
    challenge: "מעקב ידני אחרי עשרות רכבים באקסלים מפוזרים.",
    solution: "מערכת אחת שמרכזת מיקום, תחזוקה ומשימות בזמן אמת.",
    result: "חיסכון של עשרות שעות בחודש",
    metric: "מערכת אמיתית",
  },
  {
    client: "DYNAMICA QC",
    type: "מערכת לניהול בקרת איכות",
    challenge: "בקרת איכות ידנית, ללא מעקב אחרי ליקויים ותהליכים.",
    solution: "מערכת QC מלאה — בדיקות, דוחות אי-התאמה ומעקב חי אחרי הזמנות.",
    result: "שליטה מלאה על איכות הייצור",
    metric: "מערכת אמיתית",
  },
  {
    client: "אוטומציות לעסקים",
    type: "אוטומציה עסקית",
    challenge: "תהליכים ידניים חוזרים שגוזלים שעות יקרות מהצוות.",
    solution: "אוטומציות שמחברות בין המערכות ורצות לבד — מהטריגר ועד התוצאה.",
    result: "פחות עבודה ידנית, פחות טעויות",
    metric: "רץ לבד",
  },
  {
    client: "AI Agents",
    type: "סוכני AI",
    challenge: "עומס פניות ומשימות חוזרות שדורשות זמינות מסביב לשעון.",
    solution: "סוכני AI שעונים, מסכמים ומבצעים — 24/7, בשפה של העסק.",
    result: "רוב הפניות נענות אוטומטית",
    metric: "24/7",
  },
];

interface Testimonial {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
}

const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote: "המערכת שבנו שינתה לנו את האופן שבו אנחנו עובדים — פשוט לא יכולנו בלי זה.",
    name: "מיכל א׳",
    role: "מנכ״לית, חברת לוגיסטיקה",
  },
  {
    quote: "הצוות מקצועי, זמין ותמיד מביא פתרונות יצירתיים.",
    name: "רון ד׳",
    role: "מייסד, סטארטאפ פינטק",
  },
  {
    quote: "תוך שבועיים היינו באוויר עם מערכת שחסכה לנו אלפי שקלים.",
    name: "יעל כ׳",
    role: "מנהלת תפעול, רשת קמעונאות",
  },
  {
    quote: "ה-AI עונה ל-90% מהפניות שלנו — הלקוחות מרוצים יותר מאי פעם.",
    name: "אבי מ׳",
    role: "בעלים, רשת מסעדות",
  },
];

const cardHover =
  "transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(217,161,59,0.3),0_24px_60px_-24px_rgba(217,161,59,0.28)]";

function Stars() {
  return (
    <div className="flex gap-0.5" dir="ltr" aria-label="5 מתוך 5 כוכבים">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-dot text-dot" />
      ))}
    </div>
  );
}

export function SocialProof() {
  const [page, setPage] = useState(0);
  const perView = 2; // md+ shows two testimonials; the rail slides in pairs
  const maxPage = Math.max(0, Math.ceil(TESTIMONIALS.length / perView) - 1);

  return (
    <section id="stories" className="py-16 sm:py-24">
      <div className="shell">
        <SectionHeader
          center
          title="סיפורי הצלחה."
          lead="לא מבטיחים — מראים. הנה כמה מהעסקים שכבר עובדים אחרת."
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
            <motion.div key={c.client} variants={fadeUp}>
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
                {c.type}
              </span>
              <h3 className="mt-4 text-xl font-black tracking-tight text-ivory">{c.client}</h3>

              <dl className="mt-4 space-y-2.5 text-[14px] leading-relaxed">
                <div>
                  <dt className="inline font-semibold text-mist">האתגר: </dt>
                  <dd className="inline text-body">{c.challenge}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-mist">הפתרון: </dt>
                  <dd className="inline text-body">{c.solution}</dd>
                </div>
              </dl>

              <div className="mt-5 flex items-center gap-3 border-t border-white/[0.08] pt-4">
                <span className="text-2xl font-black tracking-tightest text-dot">{c.metric}</span>
                <span className="text-[13px] text-mist">{c.result}</span>
              </div>
                </article>
              </Magnetic>
            </motion.div>
          ))}
        </motion.div>

        {/* testimonials rail */}
        <div className="mt-8 sm:mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-ivory sm:text-xl">מה אומרים עלינו</h3>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="הקודם"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-ivory transition-all duration-300 hover:border-dot hover:text-dot disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="הבא"
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
                <div key={t.name} className="w-full shrink-0 px-1.5 sm:w-1/2">
                  <figure className={`liquid-glass flex h-full flex-col rounded-3xl p-6 ${cardHover}`}>
                    <Stars />
                    <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-body">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-5 border-t border-white/[0.08] pt-4">
                      <div className="font-bold text-ivory">{t.name}</div>
                      <div className="text-[13px] text-mist">{t.role}</div>
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
                aria-label={`עמוד ${i + 1}`}
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
