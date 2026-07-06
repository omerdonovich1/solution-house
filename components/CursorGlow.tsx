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

/**
 * Easter eggs: faint line-art hardware hiding between the constellations —
 * a server rack, a chip, a database, a terminal, a laptop, a little robot.
 * Only the attentive, flashlight in hand, will ever meet them.
 */
function Devices() {
  const stroke = "rgba(154,216,245,0.34)";
  const led = (x: number, y: number, delay = 0) => (
    <circle
      cx={x}
      cy={y}
      r="1.6"
      fill="#D9A13B"
      stroke="none"
      style={{ animation: `node-pulse 2.8s ease-in-out ${delay}s infinite` }}
    />
  );
  return (
    <g fill="none" stroke={stroke} strokeWidth="1.1" opacity="0.9">
      {/* server rack */}
      <g transform="translate(196, 168)">
        <rect x="0" y="0" width="38" height="48" rx="4" />
        <line x1="0" y1="16" x2="38" y2="16" />
        <line x1="0" y1="32" x2="38" y2="32" />
        <line x1="6" y1="8" x2="20" y2="8" />
        <line x1="6" y1="24" x2="20" y2="24" />
        <line x1="6" y1="40" x2="20" y2="40" />
        {led(31, 8, 0)}
        {led(31, 24, 0.9)}
        {led(31, 40, 1.7)}
      </g>
      {/* chip / CPU */}
      <g transform="translate(1372, 214)">
        <rect x="0" y="0" width="32" height="32" rx="5" />
        <rect x="9" y="9" width="14" height="14" rx="2" />
        <line x1="8" y1="-6" x2="8" y2="0" />
        <line x1="16" y1="-6" x2="16" y2="0" />
        <line x1="24" y1="-6" x2="24" y2="0" />
        <line x1="8" y1="32" x2="8" y2="38" />
        <line x1="16" y1="32" x2="16" y2="38" />
        <line x1="24" y1="32" x2="24" y2="38" />
        <line x1="-6" y1="8" x2="0" y2="8" />
        <line x1="-6" y1="24" x2="0" y2="24" />
        <line x1="32" y1="8" x2="38" y2="8" />
        <line x1="32" y1="24" x2="38" y2="24" />
      </g>
      {/* database */}
      <g transform="translate(492, 668)">
        <ellipse cx="18" cy="6" rx="18" ry="6" />
        <path d="M 0 6 V 34 C 0 37.3 8 40 18 40 C 28 40 36 37.3 36 34 V 6" />
        <path d="M 0 20 C 0 23.3 8 26 18 26 C 28 26 36 23.3 36 20" />
        {led(30, 33, 0.4)}
      </g>
      {/* terminal window */}
      <g transform="translate(1150, 682)">
        <rect x="0" y="0" width="46" height="34" rx="4" />
        <line x1="0" y1="10" x2="46" y2="10" />
        <path d="M 7 17 L 12 21 L 7 25" />
        <line x1="16" y1="25" x2="24" y2="25" />
      </g>
      {/* laptop */}
      <g transform="translate(292, 452)">
        <rect x="4" y="0" width="36" height="24" rx="2" />
        <path d="M 0 28 H 44 L 40 24 H 4 Z" />
      </g>
      {/* little robot */}
      <g transform="translate(1452, 528)">
        <rect x="0" y="10" width="30" height="24" rx="7" />
        <circle cx="10" cy="22" r="2.4" />
        <circle cx="20" cy="22" r="2.4" />
        <line x1="15" y1="10" x2="15" y2="3" />
        {led(15, 2, 1.2)}
      </g>
    </g>
  );
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
    const rMask = coarse ? 250 : 375;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.35;
    let x = targetX;
    let y = targetY;
    let rafId = 0;

    const paint = () => {
      glow.style.background = `radial-gradient(${rGlow}px circle at ${x}px ${y}px, rgba(125,180,255,0.06), rgba(125,180,255,0.022) 42%, transparent 72%)`;
      const mask = `radial-gradient(${rMask}px circle at ${x}px ${y}px, rgba(0,0,0,1) 26%, rgba(0,0,0,0.5) 58%, transparent 80%)`;
      mesh.style.webkitMaskImage = mask;
      mesh.style.maskImage = mask;
    };

    // ── touch devices: no cursor — the field is driven by SCROLL ──────
    // Instead of a spotlight (which, cropped to a narrow phone, looked
    // like one stuck cluster), the whole mesh is softly visible and
    // parallaxes as the page scrolls: it drifts upward while you scroll
    // down, so fresh constellations emerge from the bottom fade.
    if (coarse) {
      const svg = mesh.querySelector("svg") as SVGElement | null;
      // oversize the mesh so there's headroom to travel without exposing
      // edges, and fade it top & bottom instead of a hard rectangle
      if (svg) {
        svg.style.position = "absolute";
        svg.style.left = "0";
        svg.style.top = "-50%";
        svg.style.width = "100%";
        svg.style.height = "200%";
      }
      mesh.style.opacity = "0.55";
      const softMask =
        "linear-gradient(to bottom, transparent 0%, #000 15%, #000 85%, transparent 100%)";
      mesh.style.webkitMaskImage = softMask;
      mesh.style.maskImage = softMask;
      // a faint, still ambient wash — the parallax mesh is the star
      glow.style.background = `radial-gradient(${rGlow}px circle at 50% 32%, rgba(125,180,255,0.05), transparent 70%)`;

      let targetTY = 0;
      let ty = 0;
      const readScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const sp = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        // svg spans -50%…150% of the viewport; travel ±40% keeps it covering
        targetTY = (0.4 - sp * 0.8) * window.innerHeight;
      };
      const loop = (t: number) => {
        ty += (targetTY - ty) * 0.08;
        const swayX = Math.sin(t * 0.0004) * 10;
        if (svg) {
          svg.style.transform = `translate3d(${swayX.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`;
        }
        rafId = requestAnimationFrame(loop);
      };
      readScroll();
      window.addEventListener("scroll", readScroll, { passive: true });
      window.addEventListener("resize", readScroll);
      rafId = requestAnimationFrame(loop);
      return () => {
        window.removeEventListener("scroll", readScroll);
        window.removeEventListener("resize", readScroll);
        cancelAnimationFrame(rafId);
      };
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
        className="absolute inset-0 opacity-90"
        style={{ maskImage: "radial-gradient(0px circle at 50% 40%, black, transparent)" }}
      >
        <svg
          className="neural-mesh h-full w-full"
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
          {/* the hidden hardware — for whoever looks closely */}
          <Devices />
        </svg>
      </div>
      {/* the ambient spotlight itself */}
      <div ref={glowRef} className="absolute inset-0" />
    </div>
  );
}
