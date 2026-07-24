"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useTx, type Bi } from "@/lib/i18n";

const FAQS: readonly { q: Bi; a: Bi }[] = [
  {
    q: { he: "כמה זמן לוקח פרויקט טיפוסי?", en: "How long does a typical project take?" },
    a: {
      he: "תלוי בגודל, רוב הפרויקטים עולים לאוויר תוך 2-6 שבועות. נותנים לכם לוח זמנים מדויק כבר בשיחה הראשונה.",
      en: "It depends on scope, but most projects go live within 2–6 weeks. We give you a precise timeline in the very first call.",
    },
  },
  {
    q: { he: "האם אתם עובדים עם עסקים קטנים בלבד?", en: "Do you only work with small businesses?" },
    a: {
      he: "לא! אנחנו עובדים עם סטארטאפים ועם חברות גדולות. הפתרון מותאם לצרכים שלכם, לא לגודל.",
      en: "Not at all. We work with startups and large companies alike. The solution is tailored to your needs, not your size.",
    },
  },
  {
    q: { he: "מה קורה אחרי שהפרויקט עולה לאוויר?", en: "What happens after the project goes live?" },
    a: {
      he: "אנחנו נשארים. תמיכה טכנית, תחזוקה, והרחבות — הכל חלק מהחבילה.",
      en: "We stick around. Technical support, maintenance and enhancements are all part of the package.",
    },
  },
  {
    q: { he: "איך אני יודע שאני צריך סוכן AI?", en: "How do I know if I need an AI agent?" },
    a: {
      he: "נבדוק יחד. בשיחת האבחון נבין אם AI יכול לחסוך לכם זמן וכסף — ואם כן, איפה.",
      en: "We'll figure it out together. In the discovery call we'll see whether AI can save you time and money — and if so, where.",
    },
  },
  {
    q: { he: "המחיר כולל הכל?", en: "Does the price include everything?" },
    a: {
      he: "כן. אין עלויות נסתרות, אין הפתעות. מה שסוכם — זה מה שתשלמו.",
      en: "Yes. No hidden costs, no surprises. What we agree on is what you pay.",
    },
  },
];

export function FAQ() {
  const tx = useTx();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl py-14 sm:py-20">
      <div className="shell">
        <SectionHeader title={tx({ he: "שאלות נפוצות", en: "FAQ" })} />

        <div className="mt-10 space-y-3 sm:mt-14">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q.en}
                className={cn(
                  "panel overflow-hidden rounded-2xl border-r-2 transition-colors duration-300",
                  isOpen ? "border-r-dot" : "border-r-transparent"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right sm:px-6 sm:py-5"
                >
                  <span
                    className={cn(
                      "text-[15px] font-bold transition-colors duration-300 sm:text-[17px]",
                      isOpen ? "text-ivory" : "text-body"
                    )}
                  >
                    {tx(f.q)}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 transition-transform duration-300",
                      isOpen ? "rotate-180 text-dot" : "text-mist"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-mist sm:px-6">
                        {tx(f.a)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
