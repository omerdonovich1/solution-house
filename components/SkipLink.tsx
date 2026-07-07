"use client";

import { useTx } from "@/lib/i18n";

/** Keyboard skip-to-content link — visible only when focused. */
export function SkipLink() {
  const tx = useTx();
  return (
    <a href="#main-content" className="skip-link">
      {tx({ he: "דלג לתוכן הראשי", en: "Skip to main content" })}
    </a>
  );
}
