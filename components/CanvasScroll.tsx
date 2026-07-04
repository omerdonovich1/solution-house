"use client";

import { useEffect, useRef } from "react";

/**
 * Apple-style scroll-scrubbed cinematic background. A fixed full-viewport
 * canvas plays a pre-extracted frame sequence (laptop → tablet → television
 * → black) mapped 1:1 to page scroll progress.
 *
 * Every frame is strictly preloaded into Image objects before scrubbing
 * begins — no network fetches during scroll, no flicker. Drawing happens
 * inside requestAnimationFrame and only when the target frame changes.
 */

const FRAME_COUNT = 121;
const framePath = (i: number) =>
  `/frames/f${String(i + 1).padStart(3, "0")}.jpg`;

export function CanvasScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── strict preloading ────────────────────────────────────────────────
    const frames: HTMLImageElement[] = [];
    let loadedCount = 0;
    let currentFrame = -1;
    let pendingFrame = 0;
    let rafId = 0;
    let disposed = false;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    /**
     * Match the canvas bitmap to the viewport. Runs on every tick (not just
     * the resize event) because the page can mount before the window has its
     * final size — an event listener alone would leave a 0×0 bitmap.
     */
    function syncSize() {
      if (!canvas) return;
      const w = Math.round(window.innerWidth * dpr);
      const h = Math.round(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        currentFrame = -1; // force redraw at the new size
      }
    }

    function resize() {
      syncSize();
      schedule();
    }

    /** drawImage with CSS `object-fit: cover` semantics. */
    function draw(index: number) {
      const img = frames[index];
      if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      currentFrame = index;
    }

    function progressToFrame(): number {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      return Math.min(FRAME_COUNT - 1, Math.round(p * (FRAME_COUNT - 1)));
    }

    function tick() {
      rafId = 0;
      if (disposed) return;
      syncSize();
      if (pendingFrame !== currentFrame) {
        // if the exact frame isn't loaded yet, fall back to the nearest loaded one
        let f = pendingFrame;
        while (f > 0 && !(frames[f]?.complete && frames[f].naturalWidth > 0)) f--;
        draw(f);
        currentFrame = pendingFrame; // avoid re-draw loops while loading
      }
    }

    function schedule() {
      pendingFrame = reduced ? 0 : progressToFrame();
      if (!rafId) rafId = requestAnimationFrame(tick);
    }

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i);
      img.onload = () => {
        loadedCount++;
        // paint the very first available frame immediately,
        // then refresh once everything is in memory
        if (loadedCount === 1 || loadedCount === FRAME_COUNT) {
          currentFrame = -1;
          schedule();
        }
      };
      frames.push(img);
    }

    resize();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[5]">
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* readability scrim over the moving footage */}
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}
