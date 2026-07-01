"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
  /** Emphasised card — inverted ivory panel, the system's loudest statement. */
  highlight?: boolean;
}

/**
 * Minimal premium surface: hairline border, quiet lift on hover, and a
 * cursor-following spotlight written to CSS variables on pointer-move
 * (no React re-render churn). `highlight` inverts the panel to ivory —
 * pair it with ink-toned content.
 */
export function GlowingCard({
  children,
  className,
  highlight = false,
}: GlowingCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border transition-[transform,border-color,box-shadow] duration-500 will-change-transform",
        highlight
          ? "border-transparent bg-ivory shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)]"
          : "border-white/[0.08] bg-surface shadow-[0_40px_90px_-48px_rgba(0,0,0,0.9)] hover:-translate-y-1.5 hover:border-white/20",
        className
      )}
    >
      {/* cursor-following spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: highlight
            ? "radial-gradient(320px circle at var(--mx) var(--my), rgba(10,10,11,0.05), transparent 70%)"
            : "radial-gradient(320px circle at var(--mx) var(--my), rgba(242,241,236,0.06), transparent 70%)",
        }}
      />
      <div className="relative z-[1] h-full">{children}</div>
    </div>
  );
}
