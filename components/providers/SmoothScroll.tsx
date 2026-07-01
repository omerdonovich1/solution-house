"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis-powered inertial scrolling — the backbone of the site's feel.
 * Anchor links are intercepted and eased to their target. Disabled
 * entirely for prefers-reduced-motion users.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    function onAnchorClick(e: MouseEvent) {
      const link = (e.target as Element).closest?.('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href")!;
      if (hash.length < 2) return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.4 });
    }
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
