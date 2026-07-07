"use client";

import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { useLang, useTx, type Bi } from "@/lib/i18n";

/**
 * Shared shell for the legal / compliance pages (privacy, terms,
 * accessibility). Renders a max-w-3xl article on the dark canvas, a
 * bilingual heading, a "back to site" link, and body sections whose
 * copy is chosen by the active language.
 */

export interface LegalSection {
  readonly heading: Bi;
  /** Paragraphs and/or bullet lists; each entry is one <p> (Bi) or a
   *  bullet group (Bi[]). */
  readonly body: readonly (Bi | readonly Bi[])[];
}

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: Bi;
  updated?: Bi;
  sections: readonly LegalSection[];
}) {
  const tx = useTx();
  const { lang } = useLang();

  return (
    <main id="main-content" className="min-h-svh py-20 sm:py-28">
      <article className="shell mx-auto max-w-3xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-[13.5px] text-mist transition-colors duration-300 hover:text-ivory"
        >
          <ArrowLeft className="h-4 w-4 ltr:-scale-x-100" />
          {tx({ he: "חזרה לאתר", en: "Back to site" })}
          <span className="text-mist/50">/ {lang === "he" ? "Back to site" : "חזרה לאתר"}</span>
        </a>

        <h1 className="mt-8 text-[clamp(2.2rem,5vw,3.4rem)] font-black leading-tight tracking-tightest text-ivory">
          {tx(title)}
        </h1>

        {updated ? (
          <p className="mt-3 text-[13.5px] text-mist">{tx(updated)}</p>
        ) : null}

        <div className="mt-10 space-y-9">
          {sections.map((s) => (
            <Section key={s.heading.en} section={s} />
          ))}
        </div>

        <div className="mt-14 border-t border-white/[0.08] pt-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[13.5px] font-medium text-ivory transition-colors duration-300 hover:text-dot"
          >
            <ArrowLeft className="h-4 w-4 ltr:-scale-x-100" />
            {tx({ he: "חזרה לאתר / Back to site", en: "Back to site / חזרה לאתר" })}
          </a>
        </div>
      </article>
    </main>
  );
}

function Section({ section }: { section: LegalSection }): ReactNode {
  const tx = useTx();
  return (
    <section>
      <h2 className="text-xl font-black tracking-tight text-ivory sm:text-2xl">
        {tx(section.heading)}
      </h2>
      <div className="mt-3 space-y-3">
        {section.body.map((block, i) =>
          Array.isArray(block) ? (
            <ul key={i} className="list-disc space-y-1.5 ps-6 text-[15px] leading-relaxed text-body">
              {block.map((item, j) => (
                <li key={j}>{tx(item as Bi)}</li>
              ))}
            </ul>
          ) : (
            <p key={i} className="text-[15px] leading-relaxed text-body">
              {tx(block as Bi)}
            </p>
          )
        )}
      </div>
    </section>
  );
}
