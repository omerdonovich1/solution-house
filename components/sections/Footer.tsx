"use client";

import { WHATSAPP_URL } from "@/lib/whatsapp";
import { useTx } from "@/lib/i18n";

const EMAIL = "info@solutionhouse.dev";

export function Footer() {
  const tx = useTx();
  return (
    <footer className="border-t border-white/[0.08]">
      <div className="shell flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        <span className="font-mono text-xs tracking-[0.12em] text-mist">
          {tx({ he: "SOLUTION.HOUSE · פתרונות טכנולוגיים", en: "SOLUTION.HOUSE · Technology solutions" })}
        </span>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13.5px] text-mist">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-ivory"
          >
            {tx({ he: "וואטסאפ", en: "WhatsApp" })}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="transition-colors duration-300 hover:text-ivory"
          >
            {EMAIL}
          </a>
          <a href="/privacy" className="transition-colors duration-300 hover:text-ivory">
            {tx({ he: "מדיניות פרטיות", en: "Privacy" })}
          </a>
          <a href="/terms" className="transition-colors duration-300 hover:text-ivory">
            {tx({ he: "תנאי שימוש", en: "Terms" })}
          </a>
          <a href="/cookies" className="transition-colors duration-300 hover:text-ivory">
            {tx({ he: "מדיניות עוגיות", en: "Cookies" })}
          </a>
          <a href="/accessibility" className="transition-colors duration-300 hover:text-ivory">
            {tx({ he: "הצהרת נגישות", en: "Accessibility" })}
          </a>
        </div>

        <span className="font-mono text-xs tracking-[0.12em] text-mist">
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
