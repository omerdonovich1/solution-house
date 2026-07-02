"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { PROJECTS } from "@/lib/data";

/**
 * Immersive nudot-style scene: a monitor floating in black space showing
 * the work, with word clusters hanging at different depths (blur =
 * distance). The whole space is scrubbed by scroll and steered by the mouse.
 */

// Floating word clusters — existing site vocabulary, hung in z-space.
// depth: 1 = close (sharp, bold), 0 = far (small, blurred).
const CLUSTERS = [
  { text: "מיפוי הכאב", x: "8%", y: "18%", depth: 0.85 },
  { text: "STRATEGY", x: "78%", y: "12%", depth: 0.35 },
  { text: "הגדרת יעדים", x: "84%", y: "30%", depth: 0.7 },
  { text: "EXECUTION", x: "6%", y: "62%", depth: 0.5 },
  { text: "פיתוח ממוקד", x: "12%", y: "38%", depth: 0.3 },
  { text: "DELIVERY", x: "72%", y: "74%", depth: 0.8 },
  { text: "הוכחת ביצועים", x: "82%", y: "56%", depth: 0.45 },
  { text: "SaaS", x: "20%", y: "78%", depth: 0.6 },
  { text: "E-COMMERCE", x: "30%", y: "10%", depth: 0.5 },
] as const;

/** A single word hanging in z-space: far = small + blurred, near = sharp. */
function Cluster({
  text,
  x,
  y,
  depth,
  p,
  smx,
}: (typeof CLUSTERS)[number] & {
  p: MotionValue<number>;
  smx: MotionValue<number>;
}) {
  const drift = (depth - 0.5) * 220;
  const driftY = useTransform(p, [0, 1], [drift, -drift]);
  const parallaxX = useTransform(smx, (v) => v * depth * -46);

  return (
    <motion.div
      aria-hidden
      style={{
        left: x,
        top: y,
        y: driftY,
        x: parallaxX,
        filter: `blur(${(1 - depth) * 3.2}px)`,
        opacity: 0.2 + depth * 0.5,
        scale: 0.75 + depth * 0.45,
      }}
      className="absolute z-[5] hidden font-mono text-[12px] uppercase tracking-[0.22em] text-ivory md:block"
    >
      {text}
    </motion.div>
  );
}

export function ShowcaseScene() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.6 });

  // the monitor swings through the space as you scrub
  const rotYScroll = useTransform(p, [0, 1], reduced ? [0, 0] : [-16, 16]);
  const rotX = useTransform(p, [0, 1], reduced ? [0, 0] : [7, -5]);
  const monY = useTransform(p, [0, 1], reduced ? [0, 0] : [70, -70]);
  const scale = useTransform(p, [0, 0.5, 1], reduced ? [1, 1, 1] : [0.9, 1, 0.94]);

  // mouse steering
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 16 });
  const smy = useSpring(my, { stiffness: 60, damping: 16 });
  const rotY = useTransform<number, number>(
    [rotYScroll, smx],
    ([a, b]) => (a as number) + (b as number) * 9
  );
  const rotXTotal = useTransform<number, number>(
    [rotX, smy],
    ([a, b]) => (a as number) - (b as number) * 7
  );

  // screen content follows scroll thirds
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIdx(Math.min(PROJECTS.length - 1, Math.floor(v * PROJECTS.length)));
  });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const project = PROJECTS[idx];

  return (
    <section ref={ref} aria-label="עבודות נבחרות" className="relative h-[240vh]">
      <div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="sticky top-0 flex h-svh items-center justify-center overflow-hidden [perspective:1300px]"
      >
        {/* word clusters hanging in z-space */}
        {CLUSTERS.map((c) => (
          <Cluster key={c.text} {...c} p={p} smx={smx} />
        ))}

        {/* the floating monitor */}
        <motion.div
          style={{ rotateY: rotY, rotateX: rotXTotal, y: monY, scale }}
          className="relative z-10 [transform-style:preserve-3d]"
        >
          <div className="relative rounded-xl border border-white/[0.12] bg-[#0B0B0B] p-2 shadow-[0_80px_140px_-40px_rgba(0,0,0,0.95)]">
            <div className="relative aspect-[16/10] w-[80vw] overflow-hidden rounded-lg bg-ink sm:w-[520px] lg:w-[640px]">
              <AnimatePresence mode="popLayout">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  key={project.id}
                  src={project.image}
                  alt={project.name}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full object-cover grayscale"
                  draggable={false}
                />
              </AnimatePresence>
              {/* scanlines */}
              <div className="pointer-events-none absolute inset-0 [background:repeating-linear-gradient(0deg,rgba(0,0,0,0.22)_0px,rgba(0,0,0,0.22)_1px,transparent_1px,transparent_3px)]" />
              {/* glass reflection */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.12),transparent_38%)]" />
              {/* standby dot */}
              <span className="absolute bottom-2.5 left-3.5 h-1.5 w-1.5 rounded-full bg-dot animate-blink" />
              {/* project name chip */}
              <span className="absolute right-4 top-3 font-mono text-[10px] tracking-[0.22em] text-ivory/80">
                {project.name}
              </span>
            </div>
          </div>
          {/* stand */}
          <div className="mx-auto h-12 w-24 bg-gradient-to-b from-white/[0.09] to-transparent [clip-path:polygon(40%_0,60%_0,74%_100%,26%_100%)]" />
          <div className="mx-auto h-1 w-36 rounded-full bg-white/[0.08]" />
          {/* floor glow */}
          <div
            aria-hidden
            className="absolute -bottom-8 left-1/2 h-10 w-[120%] -translate-x-1/2 rounded-[100%] bg-white/[0.05] blur-2xl"
          />
        </motion.div>

        {/* scene meta */}
        <div className="absolute inset-x-0 bottom-8 z-20">
          <div className="shell flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-mist">
            <span className="kicker">פרויקטים</span>
            <span dir="ltr">
              <span className="text-dot">{String(idx + 1).padStart(2, "0")}</span>
              <span className="text-mist/50"> // </span>
              {String(PROJECTS.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
