"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

function CubeMark() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
      className="h-[26px] w-[26px] text-bright [filter:drop-shadow(0_0_6px_rgba(91,124,255,0.6))]"
    >
      <polygon points="14,2 24.4,8 24.4,20 14,26 3.6,20 3.6,8" />
      <path d="M14 14 L3.6 8 M14 14 L24.4 8 M14 14 L14 26" />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
      transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="relative shell flex items-center justify-between py-5">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 border-b transition-all duration-500",
            scrolled
              ? "border-white/10 bg-bg/70 backdrop-blur-xl"
              : "border-transparent"
          )}
        />
        <a href="#top" className="flex items-center gap-3">
          <CubeMark />
          <span className="font-mono text-[13px] font-medium tracking-[0.02em] text-bright">
            SOLUTION.HOUSE
          </span>
        </a>
        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium text-steel transition-colors hover:text-bright"
            >
              {l.label}
              <span className="absolute -bottom-1.5 right-0 block h-px w-0 bg-glow transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
