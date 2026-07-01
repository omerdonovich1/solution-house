"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { EASE } from "@/lib/motion";
import { NAV_LINKS } from "@/lib/data";
import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const menuStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
} as const;

const menuItem = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.8, ease: EASE } },
} as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  // Hide on scroll-down, resurface on scroll-up — keeps the canvas clean.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 160 && !open);
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
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden ? "-100%" : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="relative shell flex items-center justify-between py-4">
          <div
            className={cn(
              "pointer-events-none absolute inset-0 -z-10 border-b transition-all duration-500",
              scrolled && !open
                ? "border-white/[0.08] bg-ink/75 backdrop-blur-xl"
                : "border-transparent"
            )}
          />
          <a href="#top" className="group flex items-center gap-3">
            <LogoMark className="h-9 w-9 text-ivory transition-transform duration-500 group-hover:scale-105" />
            <span className="font-mono text-[13px] font-medium tracking-[0.04em] text-ivory">
              SOLUTION.HOUSE
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-sm font-medium text-mist transition-colors duration-300 hover:text-ivory"
              >
                {l.label}
                <span className="absolute -bottom-1.5 right-0 block h-px w-0 bg-volt transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* hamburger — mobile only */}
          <button
            type="button"
            aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-[95] flex h-10 w-10 flex-col items-center justify-center gap-[7px] md:hidden"
          >
            <span
              className={cn(
                "h-px w-6 bg-ivory transition-transform duration-300",
                open && "translate-y-[4px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-px w-6 bg-ivory transition-transform duration-300",
                open && "-translate-y-[4px] -rotate-45"
              )}
            />
          </button>
        </div>
        {/* reading progress — hairline volt */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="h-px origin-right bg-volt/80"
        />
      </motion.header>

      {/* fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink md:hidden"
          >
            <motion.nav
              variants={menuStagger}
              initial="hidden"
              animate="show"
              className="shell flex flex-col gap-2"
            >
              {NAV_LINKS.map((l, i) => (
                <span key={l.href} className="overflow-hidden">
                  <motion.a
                    variants={menuItem}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-5 py-2 text-5xl font-black tracking-tightest text-ivory active:text-volt"
                  >
                    <span className="font-mono text-xs font-normal tracking-[0.22em] text-volt">
                      0{i + 1}
                    </span>
                    {l.label}
                  </motion.a>
                </span>
              ))}
            </motion.nav>
            <div className="shell absolute bottom-10 flex w-full items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-mist">
              <span>Solution House</span>
              <span>תל אביב — 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
