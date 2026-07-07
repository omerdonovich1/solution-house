"use client";

import { useEffect, useRef } from "react";

/**
 * Living neural field — a canvas backdrop that actually breathes.
 *
 * Floating nodes drift on their own organic paths; the synapses between
 * them are recomputed every frame from distance, so connections stretch,
 * form and break as the field moves. Signal PULSES hop node-to-node like
 * a firing brain. Three parallax depth layers (near/mid/far — different
 * size, brightness and speed) give real dimensionality, and the whole
 * network wakes up and brightens around the cursor.
 *
 * One rAF loop, additive blending, zero React re-renders. Reduced to a
 * lighter, self-drifting version on touch; off for reduced-motion.
 */

const CYAN = "125,180,255";
const AMBER = "217,161,59";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number; // depth 0.35 (far) → 1 (near)
  amber: boolean;
  phase: number;
}

interface Pulse {
  from: number;
  to: number;
  t: number;
  speed: number;
}

export function CursorGlow() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const NODES = coarse ? 30 : 74;
    const MAX_DIST = coarse ? 118 : 158;
    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 1.75);
    const frameStep = coarse ? 2 : 1; // throttle the mobile field to save battery

    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const nodes: Node[] = Array.from({ length: NODES }, (_, i) => {
      const z = rand(0.35, 1);
      return {
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.14, 0.14) * z,
        vy: rand(-0.14, 0.14) * z,
        z,
        amber: i % 11 === 0,
        phase: rand(0, Math.PI * 2),
      };
    });

    // neighbours cache for pulse routing (rebuilt occasionally)
    const pulses: Pulse[] = [];
    const spawnPulse = () => {
      const from = Math.floor(Math.random() * NODES);
      // nearest-ish node as target
      let to = -1;
      let best = MAX_DIST * MAX_DIST;
      for (let j = 0; j < NODES; j++) {
        if (j === from) continue;
        const dx = nodes[from].x - nodes[j].x;
        const dy = nodes[from].y - nodes[j].y;
        const d = dx * dx + dy * dy;
        if (d < best) {
          best = d;
          to = j;
        }
      }
      if (to >= 0) pulses.push({ from, to, t: 0, speed: rand(0.006, 0.014) });
    };
    for (let i = 0; i < (coarse ? 3 : 6); i++) spawnPulse();

    // pointer (lerped)
    let tmx = w / 2;
    let tmy = h / 2;
    let mx = tmx;
    let my = tmy;
    let hasPointer = false;
    const onMove = (e: PointerEvent) => {
      tmx = e.clientX;
      tmy = e.clientY;
      hasPointer = true;
    };

    // mobile: the field drifts vertically with scroll for parallax
    let scrollY = window.scrollY;
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    let raf = 0;
    let frame = 0;
    let time = 0;
    const CURSOR_R = 190;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      frame++;
      if (frame % frameStep !== 0) return;
      time += 0.016 * frameStep;
      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      // parallax: near nodes shift opposite the pointer more than far ones
      const px = hasPointer ? (mx - w / 2) : 0;
      const py = hasPointer ? (my - h / 2) : 0;
      const scrollShift = coarse ? -(scrollY * 0.06) : 0;

      // advance + wrap nodes; compute their on-screen (parallax) positions
      const sx = new Float32Array(NODES);
      const sy = new Float32Array(NODES);
      for (let i = 0; i < NODES; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        const m = 60;
        if (n.x < -m) n.x = w + m;
        else if (n.x > w + m) n.x = -m;
        if (n.y < -m) n.y = h + m;
        else if (n.y > h + m) n.y = -m;
        sx[i] = n.x - px * n.z * 0.022;
        sy[i] = n.y - py * n.z * 0.022 + scrollShift * n.z;
      }

      // synapses — recomputed every frame (they stretch, form and break)
      for (let i = 0; i < NODES; i++) {
        for (let j = i + 1; j < NODES; j++) {
          const dx = sx[i] - sx[j];
          const dy = sy[i] - sy[j];
          const dist = Math.hypot(dx, dy);
          const reach = MAX_DIST * (0.5 + 0.5 * Math.min(nodes[i].z, nodes[j].z));
          if (dist > reach) continue;
          let a = (1 - dist / reach) * 0.22 * ((nodes[i].z + nodes[j].z) / 2);
          // brighten near the cursor
          if (hasPointer) {
            const cx = (sx[i] + sx[j]) / 2 - mx;
            const cy = (sy[i] + sy[j]) / 2 - my;
            const near = 1 - Math.min(1, Math.hypot(cx, cy) / CURSOR_R);
            a *= 1 + near * 2.4;
          }
          ctx.strokeStyle = `rgba(${CYAN},${a.toFixed(3)})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(sx[i], sy[i]);
          ctx.lineTo(sx[j], sy[j]);
          ctx.stroke();
        }
      }

      // nodes
      for (let i = 0; i < NODES; i++) {
        const n = nodes[i];
        const breathe = 0.7 + 0.3 * Math.sin(time * 1.4 + n.phase);
        let a = 0.5 * n.z * breathe;
        let r = (0.9 + n.z * 1.9) * (0.85 + 0.15 * breathe);
        if (hasPointer) {
          const near = 1 - Math.min(1, Math.hypot(sx[i] - mx, sy[i] - my) / CURSOR_R);
          a *= 1 + near * 1.8;
          r *= 1 + near * 0.6;
        }
        ctx.fillStyle = n.amber
          ? `rgba(${AMBER},${Math.min(1, a * 1.2).toFixed(3)})`
          : `rgba(${CYAN},${Math.min(1, a).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(sx[i], sy[i], r, 0, Math.PI * 2);
        ctx.fill();
      }

      // travelling signal pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.t += pulse.speed;
        const from = pulse.from;
        const to = pulse.to;
        const cx = sx[from] + (sx[to] - sx[from]) * pulse.t;
        const cy = sy[from] + (sy[to] - sy[from]) * pulse.t;
        const glow = 0.9 * (1 - Math.abs(pulse.t - 0.5) * 1.2);
        ctx.fillStyle = `rgba(190,225,255,${Math.max(0, glow).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(cx, cy, 1.7, 0, Math.PI * 2);
        ctx.fill();
        if (pulse.t >= 1) {
          // hop onward to a neighbour of the node we reached
          let next = -1;
          let best = MAX_DIST * MAX_DIST;
          for (let j = 0; j < NODES; j++) {
            if (j === to || j === from) continue;
            const ddx = nodes[to].x - nodes[j].x;
            const ddy = nodes[to].y - nodes[j].y;
            const d = ddx * ddx + ddy * ddy;
            if (d < best) {
              best = d;
              next = j;
            }
          }
          if (next >= 0 && Math.random() < 0.85) {
            pulse.from = to;
            pulse.to = next;
            pulse.t = 0;
          } else {
            pulses.splice(p, 1);
          }
        }
      }
      while (pulses.length < (coarse ? 3 : 6)) spawnPulse();

      // soft ambient glow around the cursor
      if (hasPointer) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, 320);
        g.addColorStop(0, `rgba(${CYAN},0.05)`);
        g.addColorStop(1, `rgba(${CYAN},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(mx - 320, my - 320, 640, 640);
      }

      ctx.globalCompositeOperation = "source-over";
    };

    raf = requestAnimationFrame(draw);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    if (coarse) window.addEventListener("scroll", onScroll, { passive: true });
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[5] h-full w-full"
    />
  );
}
