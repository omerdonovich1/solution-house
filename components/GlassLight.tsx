"use client";

import { useEffect } from "react";

/**
 * One delegated pointer listener that gives every .liquid-glass surface
 * a specular highlight tracking the cursor (via --gx/--gy CSS vars read
 * by the material's ::after layer). rAF-throttled, zero React renders,
 * skipped for touch pointers and reduced motion.
 */
export function GlassLight() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    let prev: HTMLElement | null = null;
    let last: PointerEvent | null = null;
    let rafId = 0;

    const apply = () => {
      rafId = 0;
      if (!last) return;
      const target = (last.target as Element)?.closest?.(
        ".liquid-glass"
      ) as HTMLElement | null;
      if (prev && prev !== target) {
        prev.style.removeProperty("--gx");
        prev.style.removeProperty("--gy");
      }
      if (target) {
        const r = target.getBoundingClientRect();
        target.style.setProperty(
          "--gx",
          `${(((last.clientX - r.left) / Math.max(1, r.width)) * 100).toFixed(1)}%`
        );
        target.style.setProperty(
          "--gy",
          `${(((last.clientY - r.top) / Math.max(1, r.height)) * 100).toFixed(1)}%`
        );
      }
      prev = target;
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
