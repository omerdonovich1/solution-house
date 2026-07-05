"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Mail } from "lucide-react";
import { EASE } from "@/lib/motion";
import { NAV_LINKS } from "@/lib/data";
import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const EMAIL = "hello@solution.house";

const menuStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
} as const;

const menuItem = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.8, ease: EASE } },
} as const;

/**
 * nudot-style floating command pill: mail · mark · menu. All navigation
 * lives behind the fullscreen overlay, on every viewport. The pill dives
 * away on scroll-down and resurfaces on scroll-up.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  // Lock page scroll behind the fullscreen menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* reading progress — amber hairline pinned to the top edge */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-px origin-right bg-dot/90"
      />

      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-5 z-50 flex justify-center"
      >
        <div className="liquid-glass relative z-[95] flex items-center gap-2 rounded-2xl p-2">
          <a
            href={`mailto:${EMAIL}`}
            aria-label="אימייל"
            className="grid h-11 w-14 place-items-center rounded-xl text-mist transition-colors duration-300 hover:bg-white/[0.06] hover:text-ivory"
          >
            <Mail className="h-[18px] w-[18px]" strokeWidth={1.6} />
          </a>
          <a
            href="#top"
            aria-label="לראש הדף"
            onClick={() => setOpen(false)}
            className="grid h-11 w-16 place-items-center rounded-xl transition-colors duration-300 hover:bg-white/[0.06]"
          >
            <LogoMark className="h-8 w-8 text-ivory" />
          </a>
          <button
            type="button"
            aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-14 place-items-center rounded-xl transition-colors duration-300 hover:bg-white/[0.06]"
          >
            <span className="relative flex h-4 w-6 flex-col items-center justify-center gap-[6px]">
              <span
                className={cn(
                  "h-px w-6 bg-ivory transition-transform duration-300",
                  open && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-6 bg-ivory transition-transform duration-300",
                  open && "-translate-y-[3.5px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </motion.header>

      {/* fullscreen menu — every viewport */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink"
          >
            <motion.nav
              variants={menuStagger}
              initial="hidden"
              animate="show"
              className="shell flex flex-col gap-1"
            >
              {NAV_LINKS.map((l) => (
                <span key={l.href} className="overflow-hidden">
                  <motion.a
                    variants={menuItem}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-6 py-2 text-5xl font-black tracking-tightest text-ivory transition-colors duration-300 hover:text-mist active:text-dot sm:text-7xl"
                  >
                    {l.label}
                  </motion.a>
                </span>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
