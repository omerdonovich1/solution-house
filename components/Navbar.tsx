"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { EASE } from "@/lib/motion";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

function CubeMark() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
      className="h-[24px] w-[24px] text-ivory transition-colors duration-300 group-hover:text-volt"
    >
      <polygon points="14,2 24.4,8 24.4,20 14,26 3.6,20 3.6,8" />
      <path d="M14 14 L3.6 8 M14 14 L24.4 8 M14 14 L14 26" />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="relative shell flex items-center justify-between py-5">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 border-b transition-all duration-500",
            scrolled
              ? "border-white/[0.08] bg-ink/75 backdrop-blur-xl"
              : "border-transparent"
          )}
        />
        <a href="#top" className="group flex items-center gap-3">
          <CubeMark />
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
      </div>
      {/* reading progress — hairline volt */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="h-px origin-right bg-volt/80"
      />
    </motion.header>
  );
}
