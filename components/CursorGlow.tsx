"use client";

import { useEffect, useRef } from "react";

/**
 * Spatial lighting — a soft ambient spotlight that trails the cursor,
 * giving the flat black canvas physical depth (Linear/Vercel-style).
 *
 * Zero React re-renders: pointer coordinates are lerped inside a single
 * requestAnimationFrame loop and written straight to the element's style.
 * Disabled for touch pointers and reduced-motion users.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.35;
    let x = targetX;
    let y = targetY;
    let rafId = 0;

    const paint = () => {
      el.style.background = `radial-gradient(560px circle at ${x}px ${y}px, rgba(125,180,255,0.06), rgba(125,180,255,0.022) 42%, transparent 72%)`;
    };

    const step = () => {
      rafId = 0;
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      paint();
      if (Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5) {
        rafId = requestAnimationFrame(step);
      }
    };

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(step);
    };

    paint();
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-[5]" />
  );
}
