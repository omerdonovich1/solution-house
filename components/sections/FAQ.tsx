"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const FAQS: readonly { q: string; a: string }[] = [
  {
    q: "כמה זמן לוקח פרויקט טיפוסי?",
    a: "תלוי בגודל, רוב הפרויקטים עולים לאוויר תוך 2-6 שבועות. נותנים לכם לוח זמנים מדויק כבר בשיחה הראשונה.",
  },
  {
    q: "האם אתם עובדים עם עסקים קטנים בלבד?",
    a: "לא! אנחנו עובדים עם סטארטאפים ועם חברות גדולות. הפתרון מותאם לצרכים שלכם, לא לגודל.",
  },
  {
    q: "מה קורה אחרי שהפרויקט עולה לאוויר?",
    a: "אנחנו נשארים. תמיכה טכנית, תחזוקה, והרחבות — הכל חלק מהחבילה.",
  },
  {
    q: "איך אני יודע שאני צריך סוכן AI?",
    a: "נבדוק יחד. בשיחת האבחון נבין אם AI יכול לחסוך לכם זמן וכסף — ואם כן, איפה.",
  },
  {
    q: "המחיר כולל הכל?",
    a: "כן. אין עלויות נסתרות, אין הפתעות. מה שמוסכם בשיחה הראשונה — זה מה שתשלמו.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl py-16 sm:py-24">
      <div className="shell">
        <SectionHeader center title="שאלות נפוצות" />

        <div className="mt-10 space-y-3 sm:mt-14">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={cn(
                  "liquid-glass overflow-hidden rounded-2xl border-r-2 transition-colors duration-300",
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
                    {f.q}
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
                        {f.a}
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
