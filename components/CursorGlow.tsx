"use client";

import { useEffect, useRef } from "react";

/**
 * Spatial lighting + neural reveal.
 *
 * Two fixed layers trail the cursor on one lerped rAF loop:
 * 1. a soft ambient spotlight (radial gradient), and
 * 2. a hidden NEURAL NETWORK — deterministic constellation of synapses
 *    and pulsing nodes — revealed only inside a radial mask around the
 *    cursor, as if the site's "brain" lights up under the flashlight.
 *
 * Zero React re-renders: styles are written straight to the elements.
 * Disabled for touch pointers and reduced-motion users.
 */

/** Seeded LCG — same node field on server and client (hydration-safe). */
function lcg(seed: number) {
  let s = seed;
  return () => (s = (s * 48271) % 2147483647) / 2147483647;
}

const rand = lcg(7);
const NODES = Array.from({ length: 64 }, (_, i) => ({
  x: Math.round(rand() * 1600),
  y: Math.round(rand() * 900),
  r: +(1.3 + rand() * 1.7).toFixed(1),
  amber: i % 9 === 0,
  dur: +(2.6 + rand() * 3).toFixed(1),
  delay: +(-rand() * 4).toFixed(1),
}));

const EDGES: { x1: number; y1: number; x2: number; y2: number; flow: boolean }[] = [];
for (let i = 0; i < NODES.length; i++) {
  for (let j = i + 1; j < NODES.length; j++) {
    const dx = NODES[i].x - NODES[j].x;
    const dy = NODES[i].y - NODES[j].y;
    if (Math.hypot(dx, dy) < 185) {
      EDGES.push({
        x1: NODES[i].x,
        y1: NODES[i].y,
        x2: NODES[j].x,
        y2: NODES[j].y,
        flow: EDGES.length % 3 === 0,
      });
    }
  }
}

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const mesh = meshRef.current;
    if (!glow || !mesh) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const rGlow = coarse ? 420 : 560;
    const rMask = coarse ? 250 : 340;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.35;
    let x = targetX;
    let y = targetY;
    let rafId = 0;

    const paint = () => {
      glow.style.background = `radial-gradient(${rGlow}px circle at ${x}px ${y}px, rgba(125,180,255,0.06), rgba(125,180,255,0.022) 42%, transparent 72%)`;
      const mask = `radial-gradient(${rMask}px circle at ${x}px ${y}px, rgba(0,0,0,1) 22%, rgba(0,0,0,0.35) 55%, transparent 78%)`;
      mesh.style.webkitMaskImage = mask;
      mesh.style.maskImage = mask;
    };

    // ── touch devices: no cursor — the spotlight wanders on its own ──
    if (coarse) {
      const drift = (t: number) => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        targetX = w * (0.5 + 0.34 * Math.sin(t * 0.00019));
        targetY = h * (0.42 + 0.3 * Math.sin(t * 0.00031 + 1.2));
        x += (targetX - x) * 0.04;
        y += (targetY - y) * 0.04;
        paint();
        rafId = requestAnimationFrame(drift);
      };
      paint();
      rafId = requestAnimationFrame(drift);
      return () => cancelAnimationFrame(rafId);
    }

    // ── fine pointers: trail the cursor ──────────────────────────────
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
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[5]">
      {/* the hidden neural field — visible only through the cursor mask */}
      <div
        ref={meshRef}
        className="absolute inset-0 opacity-80"
        style={{ maskImage: "radial-gradient(0px circle at 50% 40%, black, transparent)" }}
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
        >
          {EDGES.map((e, i) => (
            <line
              key={`e${i}`}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke={e.flow ? "rgba(154,216,245,0.62)" : "rgba(125,180,255,0.32)"}
              strokeWidth={e.flow ? 1.2 : 0.9}
              strokeDasharray={e.flow ? "5 16" : undefined}
              style={
                e.flow
                  ? { animation: `dash-flow ${5 + (i % 4)}s linear infinite` }
                  : undefined
              }
            />
          ))}
          {NODES.map((n, i) => (
            <circle
              key={`n${i}`}
              cx={n.x}
              cy={n.y}
              r={n.amber ? n.r + 0.8 : n.r}
              fill={n.amber ? "#D9A13B" : "#9AD8F5"}
              style={{
                animation: `node-pulse ${n.dur}s ease-in-out ${n.delay}s infinite`,
              }}
            />
          ))}
        </svg>
      </div>
      {/* the ambient spotlight itself */}
      <div ref={glowRef} className="absolute inset-0" />
    </div>
  );
}
