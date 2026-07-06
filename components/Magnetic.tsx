"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, type MotionValue } from "framer-motion";

/**
 * Proximity-based magnetism. Clickable elements lean toward the cursor as
 * it approaches — before it even arrives — for a tactile, premium feel.
 *
 * Performance: ONE global pointer/scroll listener feeds every registered
 * element from a single rAF pass (batched getBoundingClientRect reads →
 * spring writes). Transforms are written to framer motion values, so
 * there are zero React re-renders. Disabled for touch + reduced-motion.
 */

interface Entry {
  el: HTMLElement;
  x: MotionValue<number>;
  y: MotionValue<number>;
  strength: number;
  radius: number;
}

const entries = new Set<Entry>();
const pointer = { x: -99999, y: -99999 };
let started = false;
let enabled = false;
let rafId = 0;

function update() {
  rafId = 0;
  entries.forEach((e) => {
    const r = e.el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = pointer.x - cx;
    const dy = pointer.y - cy;
    const dist = Math.hypot(dx, dy);
    // the field extends a fixed radius beyond the element's own footprint
    const field = e.radius + Math.max(r.width, r.height) / 2;
    if (dist < field) {
      const falloff = 1 - dist / field; // stronger the closer you get
      e.x.set(dx * e.strength * falloff);
      e.y.set(dy * e.strength * falloff);
    } else {
      e.x.set(0);
      e.y.set(0);
    }
  });
}

function schedule() {
  if (!rafId) rafId = requestAnimationFrame(update);
}

function ensureListener() {
  if (started || typeof window === "undefined") return;
  started = true;
  if (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return; // registrations become no-ops
  }
  enabled = true;
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      schedule();
    },
    { passive: true }
  );
  window.addEventListener("scroll", schedule, { passive: true });
}

interface MagneticProps {
  children: ReactNode;
  /** fraction of the cursor offset applied as pull (0–1). */
  strength?: number;
  /** how far beyond the element the field reaches, in px. */
  radius?: number;
  className?: string;
}

export function Magnetic({
  children,
  strength = 0.3,
  radius = 80,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.35 });

  useEffect(() => {
    ensureListener();
    const el = ref.current;
    if (!el || !enabled) return;
    const entry: Entry = { el, x, y, strength, radius };
    entries.add(entry);
    return () => {
      entries.delete(entry);
      x.set(0);
      y.set(0);
    };
  }, [strength, radius, x, y]);

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} className={className}>
      {children}
    </motion.div>
  );
}
