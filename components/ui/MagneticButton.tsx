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
  /** Volt-filled primary CTA vs. hairline ghost. */
  variant?: "solid" | "ghost";
  /** Strength of the magnetic pull in px. */
  strength?: number;
}

/**
 * A magnetic CTA. The button leans toward the cursor, then springs back.
 * GPU-only transforms — no layout shift. Solid = the single volt accent;
 * ghost = hairline outline that warms to ivory.
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
        "group relative inline-flex min-h-[52px] items-center justify-center gap-2 rounded-pill px-8 py-4 text-base font-semibold transition-[background-color,border-color,color,box-shadow] duration-500 will-change-transform sm:min-h-0 sm:text-[15px]",
        variant === "solid"
          ? "bg-ivory text-ink hover:bg-dot hover:shadow-[0_10px_44px_-10px_rgba(217,161,59,0.45)]"
          : "liquid-glass text-ivory hover:shadow-[0_0_0_1px_rgba(233,233,229,0.3),0_8px_40px_-12px_rgba(233,233,229,0.3)]",
        className
      )}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
