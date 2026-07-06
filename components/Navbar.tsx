"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Home, LayoutGrid, Workflow, MessageSquare, type LucideIcon } from "lucide-react";
import { EASE } from "@/lib/motion";
import { LogoMark } from "@/components/ui/Logo";

/** The nav, spelled out — icon + label, no cryptic hamburger. */
const ITEMS: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: "#build", label: "מה אנחנו בונים", Icon: LayoutGrid },
  { href: "#process", label: "איך זה עובד", Icon: Workflow },
  { href: "#contact", label: "צור קשר", Icon: MessageSquare },
];

/**
 * A vertical command rail pinned to the right edge, centred. Each row
 * carries an icon AND its label so it's always clear what every button
 * does. Frozen in place — never hides on scroll. On phones the labels
 * shrink but stay visible.
 */
export function Navbar() {
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
        aria-label="ניווט ראשי"
        className="fixed right-3 top-1/2 z-50 sm:right-5"
      >
        <div className="liquid-glass flex flex-col gap-1 rounded-3xl p-2">
          {/* brand mark caps the rail */}
          <a
            href="#top"
            aria-label="לראש הדף"
            className="mb-1 grid h-11 place-items-center rounded-2xl transition-colors duration-300 hover:bg-white/[0.06]"
          >
            <LogoMark className="h-7 w-7 text-ivory" />
          </a>

          <span aria-hidden className="mx-auto h-px w-7 bg-white/10" />

          {ITEMS.map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              aria-label={label}
              title={label}
              className="group flex items-center gap-2.5 rounded-2xl p-1.5 text-mist transition-colors duration-300 hover:bg-white/[0.06] hover:text-ivory sm:py-2.5 sm:pe-2.5 sm:ps-3.5"
            >
              {/* label — always shown on desktop; icon-only on phones */}
              <span className="hidden whitespace-nowrap text-[13.5px] font-medium sm:inline">
                {label}
              </span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/[0.05] transition-colors duration-300 group-hover:bg-dot/15 group-hover:text-dot">
                <Icon className="h-[17px] w-[17px]" strokeWidth={1.7} />
              </span>
            </a>
          ))}
        </div>
      </motion.nav>
    </>
  );
}
