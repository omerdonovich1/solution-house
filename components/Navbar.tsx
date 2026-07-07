"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { LayoutGrid, Workflow, MessageSquare, ChevronLeft, type LucideIcon } from "lucide-react";
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
 * A vertical command rail pinned to the right edge. It tucks itself off the
 * side and only slides out when the pointer approaches the edge (or when a
 * child is focused, for keyboard users). A slim amber handle peeks out so the
 * rail is discoverable. On touch devices — where there's no hover — it stays
 * fully visible.
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

  const [open, setOpen] = useState(false);
  const [coarse, setCoarse] = useState(false); // touch / no-hover → always open
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // detect hover capability; on hover devices, briefly reveal then tuck away
  // so first-time visitors notice the rail is there.
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setCoarse(!canHover);
    if (canHover) {
      setOpen(true);
      const t = setTimeout(() => setOpen(false), 1600);
      return () => clearTimeout(t);
    }
  }, []);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  const show = open || coarse;

  return (
    <>
      {/* reading progress — amber hairline pinned to the top edge */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-px origin-right bg-dot/90"
      />

      {/* full-height, click-through layer; only the strip + rail are interactive */}
      <div className="pointer-events-none fixed inset-y-0 right-0 z-50">
        {/* edge hover zone + peek handle. Opens on hover (desktop) and on
            tap/click (touch, or if hover-detection is wrong) so the rail is
            never unreachable. Hidden once the rail is out. */}
        {!coarse && (
          <button
            type="button"
            onMouseEnter={openNow}
            onMouseLeave={closeSoon}
            onClick={() => (show ? setOpen(false) : openNow())}
            aria-label={tx({ he: "פתיחת תפריט ניווט", en: "Open navigation menu" })}
            aria-expanded={show}
            className="pointer-events-auto absolute right-0 top-1/2 flex h-60 w-10 -translate-y-1/2 items-center justify-end"
          >
            <motion.span
              aria-hidden
              initial={false}
              animate={{ opacity: show ? 0 : 1 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex items-center gap-0.5 pe-1"
            >
              {/* chevron gently nudging inward — "pull me out" */}
              <motion.span
                animate={{ x: [0, -3.5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="text-dot"
              >
                <ChevronLeft className="h-[18px] w-[18px]" strokeWidth={2.4} />
              </motion.span>
              {/* glowing pill on the very edge, softly breathing to catch the eye */}
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5], scaleY: [0.9, 1, 0.9] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="h-16 w-1.5 rounded-full bg-gradient-to-b from-dot/80 via-dot/50 to-dot/80 shadow-[0_0_14px_2px_rgba(217,161,59,0.45)]"
              />
            </motion.span>
          </button>
        )}

        <motion.nav
          onMouseEnter={openNow}
          onMouseLeave={closeSoon}
          onFocusCapture={openNow}
          onBlurCapture={closeSoon}
          initial={false}
          animate={{ x: show ? "0%" : "115%", y: "-50%" }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          aria-label={tx({ he: "ניווט ראשי", en: "Main navigation" })}
          className="pointer-events-auto absolute right-3 top-1/2 sm:right-5"
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
      </div>
    </>
  );
}
