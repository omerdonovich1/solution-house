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
  /**
   * solid — the one gold block on the page, the single primary action.
   * ghost — a quiet text link. Deliberately NOT a second button shape:
   *         two competing pills read as "two equal choices", which is the
   *         opposite of hierarchy.
   */
  variant?: "solid" | "ghost";
  /** Strength of the magnetic pull in px. */
  strength?: number;
}

/**
 * The site's CTA pair.
 *
 * Radius is architectural (10px), not a 100px pill — it echoes the gable of
 * the brand mark and matches the panel language, instead of the default
 * template pill. Gold is spent here and almost nowhere else, so the primary
 * action is the only warm thing in the viewport.
 */
export function MagneticButton({
  href,
  children,
  variant = "solid",
  strength = 10,
  className,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  const magnetic = variant === "solid";

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el || !magnetic) return;
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

  if (variant === "ghost") {
    return (
      <motion.a
        ref={ref}
        href={href}
        className={cn(
          "group relative inline-flex min-h-[52px] items-center justify-center text-[15px] font-medium text-body transition-colors duration-300 hover:text-ivory sm:min-h-0",
          className
        )}
        {...rest}
      >
        <span className="relative">
          {children}
          {/* underline draws in from the inline start */}
          <span className="absolute -bottom-1.5 inset-x-0 h-px origin-[right] scale-x-0 bg-ivory/70 transition-transform duration-500 ease-out group-hover:scale-x-100 ltr:origin-[left]" />
        </span>
      </motion.a>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative inline-flex min-h-[54px] items-center justify-center gap-3 overflow-hidden rounded-[10px] bg-dot px-8 text-[15px] font-bold tracking-[-0.01em] text-ink transition-shadow duration-500 will-change-transform hover:shadow-[0_18px_50px_-14px_rgba(217,161,59,0.55)]",
        className
      )}
      {...rest}
    >
      {/* a light sweeps across the face on hover — restrained, not glossy */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span className="relative inline-flex items-center gap-3">{children}</span>
    </motion.a>
  );
}
