"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends HTMLMotionProps<"a"> {
  href: string;
  children: ReactNode;
  /** Filled bright-platinum CTA vs. ghost outline. */
  variant?: "solid" | "ghost";
  /** Strength of the magnetic pull in px. */
  strength?: number;
}

/**
 * A magnetic, glowing CTA. The button (and its glow halo) lean toward the
 * cursor, then spring back. GPU-only transforms — no layout shift.
 */
export function MagneticButton({
  href,
  children,
  variant = "solid",
  strength = 14,
  className,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    x.set((relX / (r.width / 2)) * strength);
    y.set((relY / (r.height / 2)) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-pill px-8 py-4 text-[15px] font-semibold transition-colors duration-300 will-change-transform",
        variant === "solid"
          ? "bg-bright text-bg"
          : "border border-white/15 bg-white/[0.02] text-bright hover:border-glow/60",
        className
      )}
      {...rest}
    >
      {/* glow halo — only on the solid CTA */}
      {variant === "solid" && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-pill bg-glow opacity-40 blur-xl transition-opacity duration-300 group-hover:opacity-70"
        />
      )}
      {children}
    </motion.a>
  );
}
