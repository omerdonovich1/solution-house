"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
  /** Emphasised card — persistent glowing border + lifted depth. */
  highlight?: boolean;
}

/**
 * Premium surface: solid Navy card, 1px border, ambient shadow, and a
 * cursor-following radial glow on hover. The glow position is written to a CSS
 * variable on pointer-move (no React re-render churn, no backdrop-filter → no
 * flicker). Compose inside an <a> for clickable cards.
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
        "group relative h-full overflow-hidden rounded-2xl border bg-card transition-[transform,border-color,box-shadow] duration-300 will-change-transform",
        highlight
          ? "border-glow/40 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9),0_0_60px_-30px_rgba(91,124,255,0.5)]"
          : "border-white/10 shadow-[0_34px_80px_-42px_rgba(0,0,0,0.85)] hover:-translate-y-1 hover:border-white/25",
        className
      )}
    >
      {/* cursor-following radial glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--mx) var(--my), rgba(91,124,255,0.14), transparent 70%)",
        }}
      />
      <div className="relative z-[1] h-full">{children}</div>
    </div>
  );
}
