"use client";

import { useEffect, useRef } from "react";

/**
 * Smoky light trail behind the cursor (apechain-style).
 *
 * A half-resolution canvas runs a feedback loop: every frame the previous
 * image is redrawn slightly scaled, rotated and faded (the "smoke" drifts,
 * curls and dissipates), then a soft radial brush inks the latest cursor
 * movement on top. Rendered with screen blending over the dark canvas so
 * it reads as glowing vapor. The loop self-suspends a few seconds after
 * the pointer rests. Skipped entirely for touch / reduced-motion.
 */
export function CursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const vis = ref.current;
    if (!vis) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }
    const ctx = vis.getContext("2d");
    if (!ctx) return;
    const off = document.createElement("canvas");
    const octx = off.getContext("2d");
    if (!octx) return;

    const SCALE = 0.5; // internal resolution — free softness, cheap frames
    let w = 0;
    let h = 0;

    const resize = () => {
      w = vis.width = Math.round(window.innerWidth * SCALE);
      h = vis.height = Math.round(window.innerHeight * SCALE);
      off.width = w;
      off.height = h;
    };
    resize();

    /** The page can mount before the window has its size — resync per frame. */
    const syncSize = () => {
      if (vis.width !== Math.round(window.innerWidth * SCALE)) resize();
    };

    let tx = -1; // pointer target (canvas space)
    let ty = -1;
    let bx = -1; // brush position, eased toward the target
    let by = -1;
    let lastMove = -1e9;
    let rafId = 0;

    /** Soft glowing dabs along the segment — white core, cool blue halo. */
    function brush(ax: number, ay: number, cx2: number, cy2: number) {
      const dx = cx2 - ax;
      const dy = cy2 - ay;
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.ceil(dist / 4));
      const r = 9 + Math.min(22, dist * 0.6);
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const cx = ax + dx * t;
        const cy = ay + dy * t;
        const g = octx!.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, "rgba(240,248,255,0.30)");
        g.addColorStop(0.45, "rgba(154,200,255,0.14)");
        g.addColorStop(1, "rgba(120,170,255,0)");
        octx!.fillStyle = g;
        octx!.beginPath();
        octx!.arc(cx, cy, r, 0, Math.PI * 2);
        octx!.fill();
      }
    }

    function frame() {
      rafId = 0;
      syncSize();
      const idle = performance.now() - lastMove;

      // feedback pass: last frame, expanded + curled + faded = smoke
      octx!.clearRect(0, 0, w, h);
      octx!.globalAlpha = 0.945;
      octx!.translate(w / 2, h / 2);
      octx!.scale(1.007, 1.007);
      octx!.rotate(0.0016);
      octx!.translate(-w / 2, -h / 2);
      octx!.drawImage(vis, 0, 0);
      octx!.setTransform(1, 0, 0, 1, 0, 0);
      octx!.globalAlpha = 1;

      // ink the newest movement while the pointer is active
      if (tx >= 0 && idle < 120) {
        const nbx = bx + (tx - bx) * 0.32;
        const nby = by + (ty - by) * 0.32;
        brush(bx, by, nbx, nby);
        bx = nbx;
        by = nby;
      } else if (tx >= 0) {
        // pointer resting — keep easing the brush so the tail curls in
        bx += (tx - bx) * 0.1;
        by += (ty - by) * 0.1;
      }

      ctx!.clearRect(0, 0, w, h);
      ctx!.drawImage(off, 0, 0);

      // let the vapor fully dissolve, then park the loop
      if (idle < 4500) {
        rafId = requestAnimationFrame(frame);
      } else {
        ctx!.clearRect(0, 0, w, h);
        octx!.clearRect(0, 0, w, h);
      }
    }

    const onMove = (e: PointerEvent) => {
      tx = e.clientX * SCALE;
      ty = e.clientY * SCALE;
      if (bx < 0) {
        bx = tx;
        by = ty;
      }
      lastMove = performance.now();
      if (!rafId) rafId = requestAnimationFrame(frame);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[4] h-full w-full mix-blend-screen"
    />
  );
}
