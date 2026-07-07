"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { LayoutGrid, Workflow, MessageSquare, Languages, type LucideIcon } from "lucide-react";
import { EASE } from "@/lib/motion";
import { LogoMark } from "@/components/ui/Logo";
import { Magnetic } from "@/components/Magnetic";
import { useLang, useTx, type Bi } from "@/lib/i18n";

/** The nav, spelled out — icon + label, no cryptic hamburger. */
const ITEMS: { href: string; label: Bi; Icon: LucideIcon }[] = [
  { href: "#build", label: { he: "מה אנחנו בונים", en: "What we build" }, Icon: LayoutGrid },
  { href: "#process", label: { he: "איך זה עובד", en: "How it works" }, Icon: Workflow },
  { href: "#contact", label: { he: "צור קשר", en: "Contact" }, Icon: MessageSquare },
];

/**
 * A vertical command rail pinned to the right edge, centred. Each row
 * carries an icon AND its label so it's always clear what every button
 * does. Frozen in place — never hides on scroll. On phones the labels
 * shrink but stay visible.
 */
export function Navbar() {
  const tx = useTx();
  const { lang, toggle } = useLang();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <>
      {/* reading progress — amber hairline pinned to the top edge */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-px origin-right bg-dot/90"
      />

      <motion.nav
        initial={{ x: 28, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{ y: "-50%" }}
        transition={{ duration: 0.6, ease: EASE }}
        aria-label={tx({ he: "ניווט ראשי", en: "Main navigation" })}
        className="fixed right-3 top-1/2 z-50 sm:right-5"
      >
        <div className="liquid-glass flex flex-col gap-1 rounded-3xl p-2">
          {/* brand mark caps the rail */}
          <Magnetic strength={0.4} radius={44}>
            <a
              href="#top"
              aria-label={tx({ he: "לראש הדף", en: "Top of page" })}
              className="mb-1 grid h-11 place-items-center rounded-2xl transition-colors duration-300 hover:bg-white/[0.06]"
            >
              <LogoMark className="h-7 w-7 text-ivory" />
            </a>
          </Magnetic>

          <span aria-hidden className="mx-auto h-px w-7 bg-white/10" />

          {ITEMS.map(({ href, label, Icon }) => (
            <Magnetic key={href} strength={0.4} radius={44}>
              <a
                href={href}
                aria-label={tx(label)}
                title={tx(label)}
                className="group flex items-center gap-2.5 rounded-2xl p-1.5 text-mist transition-colors duration-300 hover:bg-white/[0.06] hover:text-ivory sm:py-2.5 sm:pe-2.5 sm:ps-3.5"
              >
                {/* label — always shown on desktop; icon-only on phones */}
                <span className="hidden whitespace-nowrap text-[13.5px] font-medium sm:inline">
                  {tx(label)}
                </span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/[0.05] transition-colors duration-300 group-hover:bg-dot/15 group-hover:text-dot">
                  <Icon className="h-[17px] w-[17px]" strokeWidth={1.7} />
                </span>
              </a>
            </Magnetic>
          ))}

          <span aria-hidden className="mx-auto h-px w-7 bg-white/10" />

          {/* language toggle — HE ⇄ EN, flips the whole site to LTR */}
          <Magnetic strength={0.4} radius={44}>
            <button
              type="button"
              onClick={toggle}
              aria-label={tx({ he: "Switch to English", en: "מעבר לעברית" })}
              title={tx({ he: "English", en: "עברית" })}
              className="group flex items-center gap-2.5 rounded-2xl p-1.5 text-mist transition-colors duration-300 hover:bg-white/[0.06] hover:text-ivory sm:py-2.5 sm:pe-2.5 sm:ps-3.5"
            >
              <span className="hidden whitespace-nowrap text-[13.5px] font-bold sm:inline">
                {lang === "he" ? "English" : "עברית"}
              </span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/[0.05] text-[11px] font-black transition-colors duration-300 group-hover:bg-dot/15 group-hover:text-dot">
                {lang === "he" ? "EN" : "עב"}
              </span>
            </button>
          </Magnetic>
        </div>
      </motion.nav>
    </>
  );
}
