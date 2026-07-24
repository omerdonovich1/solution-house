"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import { EASE } from "@/lib/motion";
import { useTx } from "@/lib/i18n";

const ACK_KEY = "sh_cookie_ack";

/**
 * First-visit cookie/storage notice. The site stores functional data only
 * (language, accessibility preferences, and — when the preview lock is on —
 * the gate cookie), which doesn't legally require consent, only transparency.
 * So this is an informational notice, not a blocking consent wall: one
 * acknowledge button plus a link to the full policy. The acknowledgement
 * itself is remembered in localStorage (documented in /cookies).
 */
export function CookieNotice() {
  const tx = useTx();
  const [visible, setVisible] = useState(false);

  // read after mount to avoid a hydration mismatch
  useEffect(() => {
    try {
      if (!localStorage.getItem(ACK_KEY)) setVisible(true);
    } catch {
      /* storage unavailable → stay hidden rather than nag every visit */
    }
  }, []);

  const acknowledge = () => {
    try {
      localStorage.setItem(ACK_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          role="region"
          aria-label={tx({ he: "הודעה על שימוש בעוגיות", en: "Cookie usage notice" })}
          initial={{ opacity: 0, y: 28 }}
          // the entrance delay lives on `animate` only — a shared transition
          // would delay the exit too, making dismissal feel unresponsive
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE, delay: 1.2 } }}
          exit={{ opacity: 0, y: 28, transition: { duration: 0.3, ease: EASE } }}
          className="liquid-glass fixed inset-x-3 bottom-[calc(12px+env(safe-area-inset-bottom))] z-[100] mx-auto max-w-xl rounded-2xl !bg-[#101013]/95 p-4 sm:inset-x-6 sm:p-5"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-dot/10 text-dot">
              <Cookie className="h-[17px] w-[17px]" strokeWidth={1.8} />
            </span>
            <div className="flex-1">
              <p className="text-[13.5px] leading-relaxed text-body">
                {tx({
                  he: "האתר שומר בדפדפן העדפות תפעוליות בלבד — שפה ונגישות. בלי עוגיות מעקב, בלי אנליטיקה ובלי צד שלישי.",
                  en: "This site stores functional preferences only — language and accessibility. No tracking cookies, no analytics, no third parties.",
                })}{" "}
                <a
                  href="/cookies"
                  className="font-medium text-dot underline-offset-2 hover:underline"
                >
                  {tx({ he: "למדיניות העוגיות המלאה", en: "Read the full cookie policy" })}
                </a>
              </p>
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={acknowledge}
                  className="rounded-pill bg-ivory px-5 py-2 text-[13px] font-bold text-ink transition-colors duration-300 hover:bg-dot"
                >
                  {tx({ he: "הבנתי, תודה", en: "Got it, thanks" })}
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
