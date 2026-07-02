"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

/**
 * Section 01 — roqpoint-style live line-art showcase. A framed panel where
 * hand-drawn scenes of what we build draw themselves in, cycling between
 * categories; the side cards steer it and show an amber progress fuse.
 * Scene accents (amber / aqua / iris / rose) live only inside the panel.
 */

const CYCLE_MS = 6000;

interface Category {
  readonly id: string;
  readonly name: string;
  readonly blurb: string;
}

const CATEGORIES: readonly Category[] = [
  {
    id: "websites",
    name: "אתרים",
    blurb: "אתר מהיר ומדויק שמספר את הסיפור שלכם — ומניע לפעולה.",
  },
  {
    id: "landing",
    name: "דפי נחיתה",
    blurb: "עמוד אחד עם מטרה אחת: להפוך מבקרים ללקוחות.",
  },
  {
    id: "dashboards",
    name: "דשבורדים",
    blurb: "נתונים חיים, החלטות מהירות — כל העסק במסך אחד.",
  },
  {
    id: "agents",
    name: "סוכני AI",
    blurb: "עובדים דיגיטליים שעונים, מסכמים ומבצעים. 24/7.",
  },
  {
    id: "systems",
    name: "מערכות",
    blurb: "מערכת מותאמת שמחליפה אקסלים ותהליכים ידניים.",
  },
  {
    id: "automations",
    name: "אוטומציות",
    blurb: "תהליכים שרצים לבד — מהטריגר ועד התוצאה.",
  },
] as const;

/* ---------- shared motion vocabulary ---------- */

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.13, duration: 0.85, ease: "easeInOut" },
      opacity: { delay: i * 0.13, duration: 0.01 },
    },
  }),
} as const;

const pop = {
  hidden: { scale: 0, opacity: 0 },
  show: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: 0.25 + i * 0.13, type: "spring", stiffness: 320, damping: 17 },
  }),
} as const;

const rise = {
  hidden: { scaleY: 0, opacity: 0 },
  show: (i: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: { delay: 0.4 + i * 0.11, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
} as const;

/** A text line that types itself in (grows from the start edge). */
const write = {
  hidden: { scaleX: 0, opacity: 0 },
  show: (i: number) => ({
    scaleX: 1,
    opacity: 1,
    transition: { delay: 0.5 + i * 0.16, duration: 0.45, ease: "easeOut" },
  }),
} as const;

/** Static dashed guide line. */
function Guide({ d, delay = 0 }: { d: string; delay?: number }) {
  return (
    <motion.path
      d={d}
      strokeDasharray="3 7"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.35 }}
      transition={{ delay, duration: 0.4 }}
      strokeWidth={1.2}
    />
  );
}

/** A data packet traveling along a path, looping forever. */
function Packet({
  d,
  className,
  dur = 2.6,
  delay = 0,
  r = 3.5,
  reverse = false,
}: {
  d: string;
  className: string;
  dur?: number;
  delay?: number;
  r?: number;
  reverse?: boolean;
}) {
  // Native SVG motion — no DOM-attribute leak, hardware-smooth, all browsers.
  const begin = `${delay}s`;
  const dr = `${dur}s`;
  return (
    <circle r={r} className={cn("stroke-none", className)} opacity={0}>
      <animateMotion
        dur={dr}
        begin={begin}
        repeatCount="indefinite"
        path={d}
        keyPoints={reverse ? "1;0" : "0;1"}
        keyTimes="0;1"
        calcMode="linear"
      />
      <animate
        attributeName="opacity"
        dur={dr}
        begin={begin}
        repeatCount="indefinite"
        values="0;1;1;0"
        keyTimes="0;0.12;0.85;1"
      />
    </circle>
  );
}

/** Sonar ripple ring. */
function Ripple({
  cx,
  cy,
  className,
  delay = 0,
}: {
  cx: number;
  cy: number;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      initial={{ r: 6, opacity: 0 }}
      animate={{ r: [6, 34], opacity: [0.5, 0] }}
      transition={{ repeat: Infinity, duration: 2.4, delay, ease: "easeOut" }}
      className={className}
      strokeWidth={1.2}
    />
  );
}

/* ---------- macOS traffic lights — the colored constant ---------- */

function TrafficLights() {
  return (
    <>
      <motion.circle cx="36" cy="35" r="4" variants={pop} custom={0} className="fill-rose stroke-none" />
      <motion.circle cx="52" cy="35" r="4" variants={pop} custom={0.5} className="fill-dot stroke-none" />
      <motion.circle cx="68" cy="35" r="4" variants={pop} custom={1} className="fill-aqua stroke-none" />
    </>
  );
}

/* ---------- the six scenes ---------- */

function SceneWebsites() {
  return (
    <>
      {/* desktop browser */}
      <motion.rect x="16" y="16" width="330" height="268" rx="12" variants={draw} custom={0} />
      <motion.line x1="16" y1="52" x2="346" y2="52" variants={draw} custom={1} />
      <TrafficLights />
      <motion.rect x="100" y="27" width="150" height="16" rx="8" variants={draw} custom={1.5} className="opacity-40" />
      {/* nav */}
      <motion.circle cx="320" cy="70" r="6" variants={pop} custom={2} className="fill-dot stroke-none" />
      {[248, 208, 168].map((x, i) => (
        <motion.line key={x} x1={x} y1="70" x2={x + 26} y2="70" variants={write} custom={i} style={{ originX: `${x + 26}px` }} className="opacity-60" />
      ))}
      {/* hero headline + copy */}
      <motion.line x1="196" y1="106" x2="326" y2="106" variants={write} custom={2} style={{ originX: "326px" }} strokeWidth={5} />
      <motion.line x1="236" y1="122" x2="326" y2="122" variants={write} custom={2.6} style={{ originX: "326px" }} strokeWidth={5} />
      <motion.line x1="256" y1="142" x2="326" y2="142" variants={write} custom={3.2} style={{ originX: "326px" }} className="opacity-40" />
      {/* CTA button gets clicked */}
      <motion.rect x="252" y="158" width="74" height="26" rx="13" variants={draw} custom={4} className="stroke-dot" />
      <motion.rect
        x="252"
        y="158"
        width="74"
        height="26"
        rx="13"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.35, 0.15] }}
        transition={{ delay: 2.3, duration: 0.6, times: [0, 0.4, 0.6, 1] }}
        className="fill-dot stroke-none"
      />
      <Ripple cx={289} cy={171} className="stroke-dot" delay={2.5} />
      {/* cursor flies to the button */}
      <motion.path
        d="M0 0 L11 4 L6 6 L9 11 L6 13 L3 7 L0 10 Z"
        initial={{ x: 60, y: 250, opacity: 0 }}
        animate={{ x: [60, 240, 282], y: [250, 210, 165], opacity: [0, 1, 1] }}
        transition={{ delay: 1.3, duration: 1.1, ease: "easeInOut" }}
        className="fill-ivory stroke-none"
      />
      {/* hero media block */}
      <motion.rect x="36" y="96" width="140" height="88" rx="8" variants={draw} custom={3} />
      <motion.path d="M44 168 L84 128 L108 150 L128 132 L168 168" variants={draw} custom={4.2} className="stroke-aqua" />
      <motion.circle cx="150" cy="116" r="9" variants={pop} custom={5} className="stroke-aqua" />
      {/* card row */}
      {[36, 144, 252].map((x, i) => (
        <motion.rect key={x} x={x} y="204" width="74" height="56" rx="8" variants={rise} custom={i} style={{ originY: "260px" }} className={i === 1 ? "stroke-iris" : ""} />
      ))}
      {/* responsive phone mirror */}
      <motion.rect x="376" y="60" width="72" height="180" rx="12" variants={draw} custom={5} />
      <motion.line x1="398" y1="72" x2="426" y2="72" variants={draw} custom={5.5} className="opacity-50" />
      <motion.line x1="388" y1="96" x2="436" y2="96" variants={write} custom={4} style={{ originX: "436px" }} strokeWidth={3} />
      <motion.rect x="388" y="110" width="48" height="36" rx="5" variants={draw} custom={6} className="stroke-aqua" />
      <motion.rect x="394" y="160" width="36" height="14" rx="7" variants={draw} custom={6.5} className="stroke-dot" />
      <motion.line x1="392" y1="226" x2="432" y2="226" variants={draw} custom={7} className="opacity-40" />
      <Guide d="M346 150 C362 150 362 150 376 150" delay={1.6} />
    </>
  );
}

function SceneLanding() {
  return (
    <>
      {/* the page */}
      <motion.rect x="30" y="16" width="230" height="268" rx="12" variants={draw} custom={0} />
      {/* headline */}
      <motion.line x1="130" y1="52" x2="240" y2="52" variants={write} custom={0} style={{ originX: "240px" }} strokeWidth={6} />
      <motion.line x1="160" y1="70" x2="240" y2="70" variants={write} custom={0.7} style={{ originX: "240px" }} strokeWidth={6} />
      <motion.line x1="146" y1="90" x2="240" y2="90" variants={write} custom={1.4} style={{ originX: "240px" }} className="opacity-40" />
      {/* bullets */}
      {[118, 140, 162].map((y, i) => (
        <g key={y}>
          <motion.circle cx="234" cy={y} r="3.5" variants={pop} custom={2 + i} className="fill-aqua stroke-none" />
          <motion.line x1="148" y1={y} x2="222" y2={y} variants={write} custom={2.2 + i} style={{ originX: "222px" }} className="opacity-50" />
        </g>
      ))}
      {/* form fields + pulsing CTA */}
      <motion.rect x="50" y="186" width="190" height="22" rx="6" variants={draw} custom={4} />
      <motion.rect x="50" y="216" width="190" height="22" rx="6" variants={draw} custom={4.5} />
      <motion.rect x="50" y="248" width="190" height="24" rx="12" variants={draw} custom={5} className="stroke-dot" />
      <motion.rect
        x="50"
        y="248"
        width="190"
        height="24"
        rx="12"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.06, 0.25, 0.06] }}
        transition={{ repeat: Infinity, duration: 1.8, delay: 1.8 }}
        className="fill-dot stroke-none"
      />
      {/* funnel */}
      <motion.path d="M300 44 L452 44 L424 108 L328 108 Z" variants={draw} custom={2} />
      <motion.path d="M336 122 L416 122 L404 176 L348 176 Z" variants={draw} custom={3} />
      <motion.path d="M356 190 L396 190 L390 234 L362 234 Z" variants={draw} custom={4} className="stroke-dot" />
      {/* visitors dropping through */}
      <Packet d="M340 30 C360 60 370 120 376 240" className="fill-rose" dur={2.8} delay={1.2} />
      <Packet d="M414 30 C400 70 384 130 376 240" className="fill-aqua" dur={2.8} delay={2.1} />
      <Packet d="M376 30 C378 90 375 150 376 240" className="fill-iris" dur={2.8} delay={3} />
      {/* conversion spark */}
      <motion.circle cx="376" cy="252" r="6" variants={pop} custom={6} className="fill-dot stroke-none" />
      <Ripple cx={376} cy={252} className="stroke-dot" delay={2.2} />
      {[[-14, -6], [14, -6], [0, -16]].map(([dx, dy], i) => (
        <motion.line
          key={i}
          x1={376 + dx * 0.4}
          y1={252 + dy * 0.4}
          x2={376 + dx}
          y2={252 + dy}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, delay: 2.3 + i * 0.1, times: [0, 0.2, 0.5] }}
          className="stroke-dot"
        />
      ))}
    </>
  );
}

function SceneDashboards() {
  return (
    <>
      <motion.rect x="16" y="16" width="448" height="268" rx="12" variants={draw} custom={0} />
      <motion.line x1="16" y1="52" x2="464" y2="52" variants={draw} custom={1} />
      <TrafficLights />
      {/* KPI cards with sparklines */}
      {[
        { x: 344, spark: "M{x}18 {y}96 L{x}34 88 L{x}50 92 L{x}66 82", cls: "stroke-aqua" },
        { x: 232, spark: "", cls: "stroke-iris" },
        { x: 120, spark: "", cls: "stroke-rose" },
      ].map((k, i) => (
        <g key={k.x}>
          <motion.rect x={k.x} y="66" width="100" height="46" rx="8" variants={draw} custom={2 + i} />
          <motion.line x1={k.x + 14} y1="80" x2={k.x + 54} y2="80" variants={write} custom={2 + i} style={{ originX: `${k.x + 54}px` }} className="opacity-40" />
          <motion.path
            d={`M${k.x + 14} 100 L${k.x + 34} 92 L${k.x + 54} 96 L${k.x + 86} 84`}
            variants={draw}
            custom={3 + i}
            className={k.cls}
            strokeWidth={2}
          />
        </g>
      ))}
      {/* donut — two colored segments over a faint track */}
      <motion.circle cx="76" cy="196" r="30" variants={draw} custom={4} className="opacity-20" strokeWidth={9} />
      <motion.circle
        cx="76"
        cy="196"
        r="30"
        strokeWidth={9}
        className="stroke-aqua"
        initial={{ pathLength: 0, rotate: -90, opacity: 0 }}
        animate={{ pathLength: 0.58, opacity: 1 }}
        transition={{ delay: 0.9, duration: 1, ease: "easeInOut" }}
        style={{ originX: "76px", originY: "196px", rotate: -90 }}
      />
      <motion.circle
        cx="76"
        cy="196"
        r="30"
        strokeWidth={9}
        className="stroke-iris"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 0.2, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.7, ease: "easeInOut" }}
        style={{ originX: "76px", originY: "196px", rotate: 128 }}
      />
      <motion.circle cx="76" cy="196" r="4" variants={pop} custom={6} className="fill-dot stroke-none" />
      {/* bars */}
      {[
        { x: 150, h: 52, cls: "" },
        { x: 182, h: 84, cls: "" },
        { x: 214, h: 66, cls: "stroke-aqua" },
        { x: 246, h: 108, cls: "" },
      ].map((b, i) => (
        <motion.rect
          key={b.x}
          x={b.x}
          y={252 - b.h}
          width="20"
          height={b.h}
          rx="4"
          variants={rise}
          custom={i}
          style={{ originY: "252px" }}
          className={b.cls}
        />
      ))}
      {/* amber trend + live tip */}
      <motion.path d="M292 244 L328 214 L356 226 L392 180 L436 150" variants={draw} custom={6} className="stroke-dot" strokeWidth={2} />
      <Guide d="M292 252 L436 252" delay={1} />
      <motion.circle
        cx="436"
        cy="150"
        r="4.5"
        className="fill-dot stroke-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.4, 1] }}
        transition={{ delay: 1.8, repeat: Infinity, duration: 1.6 }}
      />
      <Ripple cx={436} cy={150} className="stroke-dot" delay={2} />
    </>
  );
}

function SceneAgents() {
  return (
    <>
      {/* chat window */}
      <motion.rect x="16" y="16" width="300" height="268" rx="12" variants={draw} custom={0} />
      <motion.line x1="16" y1="52" x2="316" y2="52" variants={draw} custom={1} />
      <TrafficLights />
      {/* incoming */}
      <motion.rect x="36" y="68" width="180" height="42" rx="12" variants={draw} custom={2} />
      <motion.line x1="52" y1="85" x2="160" y2="85" variants={write} custom={1.5} style={{ originX: "160px" }} className="opacity-50" />
      <motion.line x1="52" y1="96" x2="130" y2="96" variants={write} custom={2} style={{ originX: "130px" }} className="opacity-30" />
      <motion.rect x="36" y="122" width="140" height="38" rx="12" variants={draw} custom={3} />
      <motion.line x1="52" y1="141" x2="148" y2="141" variants={write} custom={2.6} style={{ originX: "148px" }} className="opacity-40" />
      {/* the agent answers — bubble grows, lines type in */}
      <motion.rect x="118" y="178" width="178" height="72" rx="12" variants={draw} custom={4} className="stroke-dot" />
      {[196, 210, 224].map((y, i) => (
        <motion.line
          key={y}
          x1="136"
          y1={y}
          x2={i === 2 ? 216 : 278}
          y2={y}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: i === 0 ? 0.7 : 0.45 }}
          transition={{ delay: 2 + i * 0.5, duration: 0.6, ease: "easeOut" }}
          style={{ originX: "278px" }}
          className="stroke-dot"
        />
      ))}
      {/* typing dots fade out as the answer arrives */}
      {[150, 168, 186].map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy="164"
          r="3"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0.2, 0.9, 0] }}
          transition={{ delay: 1 + i * 0.15, duration: 1.4, times: [0, 0.3, 0.5, 0.7, 1] }}
          className="fill-ivory stroke-none"
        />
      ))}
      {/* neural core with orbiting electrons */}
      <motion.circle cx="398" cy="120" r="26" variants={draw} custom={3} />
      <motion.circle
        cx="398"
        cy="120"
        r="6"
        className="fill-dot stroke-none"
        animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 6 }}
        style={{ originX: "398px", originY: "120px" }}
      >
        <circle cx="398" cy="82" r="4" className="fill-aqua stroke-none" />
        <circle cx="398" cy="158" r="3" className="fill-iris stroke-none" />
      </motion.g>
      <motion.ellipse cx="398" cy="120" rx="38" ry="14" variants={draw} custom={5} className="opacity-30" style={{ rotate: -18 }} />
      <motion.ellipse cx="398" cy="120" rx="38" ry="14" variants={draw} custom={5.5} className="opacity-30" style={{ rotate: 18 }} />
      {/* thought packets to the reply */}
      <Packet d="M390 150 C370 190 340 200 300 205" className="fill-aqua" dur={2.2} delay={1.4} />
      <Packet d="M390 150 C370 190 340 200 300 205" className="fill-iris" dur={2.2} delay={2.5} />
    </>
  );
}

function SceneSystems() {
  return (
    <>
      {/* hub */}
      <motion.rect x="196" y="118" width="88" height="64" rx="10" variants={draw} custom={0} />
      <motion.circle
        cx="240"
        cy="150"
        r="6"
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.85, 1.2, 0.85] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="fill-dot stroke-none"
      />
      <Ripple cx={240} cy={150} className="stroke-dot" />
      <Ripple cx={240} cy={150} className="stroke-dot" delay={1.2} />
      {/* satellite modules with glyphs */}
      <motion.rect x="44" y="36" width="92" height="52" rx="9" variants={draw} custom={1} />
      <motion.circle cx="118" cy="56" r="6" variants={draw} custom={2} className="stroke-aqua" />
      <motion.line x1="60" y1="56" x2="102" y2="56" variants={write} custom={1.5} style={{ originX: "102px" }} className="opacity-40" />
      <motion.line x1="60" y1="70" x2="88" y2="70" variants={write} custom={2} style={{ originX: "88px" }} className="opacity-25" />

      <motion.rect x="344" y="36" width="92" height="52" rx="9" variants={draw} custom={2} />
      {[358, 372, 386].map((x, i) => (
        <motion.rect key={x} x={x} y={54 + i * 2} width="8" height={18 - i * 4} rx="2" variants={rise} custom={2 + i} style={{ originY: "72px" }} className="stroke-iris" />
      ))}
      <motion.line x1="404" y1="62" x2="424" y2="62" variants={write} custom={3} style={{ originX: "424px" }} className="opacity-40" />

      <motion.rect x="44" y="212" width="92" height="52" rx="9" variants={draw} custom={3} />
      <motion.path d="M60 246 L72 234 L84 242 L98 228" variants={draw} custom={4} className="stroke-rose" />
      <motion.line x1="106" y1="232" x2="122" y2="232" variants={write} custom={4} style={{ originX: "122px" }} className="opacity-40" />

      <motion.rect x="344" y="212" width="92" height="52" rx="9" variants={draw} custom={4} />
      <motion.circle cx="366" cy="238" r="9" variants={draw} custom={5} className="stroke-aqua" />
      <motion.path d="M362 238 L365 242 L371 234" variants={draw} custom={5.5} className="stroke-aqua" />
      <motion.line x1="386" y1="238" x2="420" y2="238" variants={write} custom={5} style={{ originX: "420px" }} className="opacity-40" />

      {/* guides + packets both ways */}
      <Guide d="M136 62 C180 62 200 100 214 118" delay={0.8} />
      <Guide d="M344 62 C300 62 280 100 266 118" delay={0.9} />
      <Guide d="M136 238 C180 238 200 200 214 182" delay={1} />
      <Guide d="M344 238 C300 238 280 200 266 182" delay={1.1} />
      <Packet d="M136 62 C180 62 200 100 214 118" className="fill-aqua" dur={2} delay={1.2} />
      <Packet d="M344 62 C300 62 280 100 266 118" className="fill-iris" dur={2.3} delay={1.7} reverse />
      <Packet d="M136 238 C180 238 200 200 214 182" className="fill-rose" dur={2.1} delay={2.2} reverse />
      <Packet d="M344 238 C300 238 280 200 266 182" className="fill-dot" dur={2.4} delay={2.6} />
    </>
  );
}

function SceneAutomations() {
  return (
    <>
      {/* clock trigger */}
      <motion.circle cx="62" cy="150" r="22" variants={draw} custom={0} />
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <motion.line
            key={deg}
            x1={62 + Math.cos(rad) * 17}
            y1={150 + Math.sin(rad) * 17}
            x2={62 + Math.cos(rad) * 21}
            y2={150 + Math.sin(rad) * 21}
            variants={draw}
            custom={1}
            className="opacity-50"
          />
        );
      })}
      <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 5 }} style={{ originX: "62px", originY: "150px" }}>
        <line x1="62" y1="150" x2="62" y2="137" stroke="currentColor" strokeWidth={1.8} className="text-aqua" />
      </motion.g>
      <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 40 }} style={{ originX: "62px", originY: "150px" }}>
        <line x1="62" y1="150" x2="71" y2="150" stroke="currentColor" strokeWidth={1.8} />
      </motion.g>
      {/* meshed gear pair */}
      {[
        { cx: 178, cy: 136, r: 24, dir: 360, dur: 9 },
        { cx: 216, cy: 172, r: 17, dir: -360, dur: 6.4 },
      ].map((g2, gi) => (
        <g key={gi}>
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: g2.dir }}
            transition={{ opacity: { delay: 0.5 + gi * 0.2, duration: 0.4 }, rotate: { repeat: Infinity, ease: "linear", duration: g2.dur } }}
            style={{ originX: `${g2.cx}px`, originY: `${g2.cy}px` }}
          >
            <circle cx={g2.cx} cy={g2.cy} r={g2.r} fill="none" stroke="currentColor" strokeWidth="1.5" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={deg}
                  x1={g2.cx + Math.cos(rad) * g2.r}
                  y1={g2.cy + Math.sin(rad) * g2.r}
                  x2={g2.cx + Math.cos(rad) * (g2.r + 7)}
                  y2={g2.cy + Math.sin(rad) * (g2.r + 7)}
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              );
            })}
          </motion.g>
          <motion.circle cx={g2.cx} cy={g2.cy} r="6" variants={draw} custom={2 + gi} className={gi === 1 ? "stroke-iris" : ""} />
        </g>
      ))}
      {/* process card with filling progress */}
      <motion.rect x="278" y="122" width="88" height="56" rx="9" variants={draw} custom={3} />
      <motion.line x1="294" y1="140" x2="350" y2="140" variants={write} custom={3} style={{ originX: "350px" }} className="opacity-40" />
      <motion.rect x="294" y="154" width="56" height="8" rx="4" variants={draw} custom={4} className="opacity-50" />
      <motion.rect
        x="294"
        y="154"
        width="56"
        height="8"
        rx="4"
        className="fill-iris stroke-none"
        initial={{ scaleX: 0, opacity: 0.9 }}
        animate={{ scaleX: [0, 1] }}
        transition={{ repeat: Infinity, duration: 2.2, delay: 1.4, ease: "easeInOut", repeatDelay: 0.4 }}
        style={{ originX: "350px" }}
      />
      {/* amber check with ripple */}
      <motion.circle cx="420" cy="150" r="22" variants={draw} custom={5} className="stroke-dot" />
      <motion.path d="M410 150 L417 158 L431 142" variants={draw} custom={6} className="stroke-dot" strokeWidth={2.2} />
      <Ripple cx={420} cy={150} className="stroke-dot" delay={1.8} />
      {/* conveyor guides + document packet */}
      <Guide d="M84 150 L154 150" delay={0.8} />
      <Guide d="M240 172 L278 156" delay={1} />
      <Guide d="M366 150 L398 150" delay={1.2} />
      <Packet d="M84 150 L154 150" className="fill-aqua" dur={1.8} delay={1.2} />
      <Packet d="M240 172 C255 166 265 160 278 156" className="fill-aqua" dur={1.8} delay={1.9} />
      <Packet d="M366 150 L398 150" className="fill-dot" dur={1.6} delay={2.6} />
    </>
  );
}

const SCENES: Record<string, () => JSX.Element> = {
  websites: SceneWebsites,
  landing: SceneLanding,
  dashboards: SceneDashboards,
  agents: SceneAgents,
  systems: SceneSystems,
  automations: SceneAutomations,
};

/* ---------- section ---------- */

export function WhatWeBuild() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => setActive((i) => (i + 1) % CATEGORIES.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [paused, reduced, active]);

  const cat = CATEGORIES[active];
  const Scene = SCENES[cat.id];

  return (
    <section id="build" className="py-32 sm:py-48">
      <div className="shell">
        <SectionHeader
          index="01"
          label="מה אנחנו בונים"
          title="פתרון חי לכל צורך עסקי."
          lead="אתר, דף נחיתה, דשבורד, סוכן AI, מערכת או אוטומציה — כל פתרון נבנה בדיוק למידות של העסק שלכם."
        />

        <div
          className="mt-16 grid gap-5 lg:grid-cols-[1fr_320px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* live panel */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-surface">
            <div className="flex items-center justify-between px-7 pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-mist">
              <AnimatePresence mode="wait">
                <motion.span
                  key={cat.id}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="kicker"
                >
                  {cat.name}
                </motion.span>
              </AnimatePresence>
              <span dir="ltr">
                <span className="text-dot">{String(active + 1).padStart(2, "0")}</span>
                <span className="text-mist/50"> // </span>
                {String(CATEGORIES.length).padStart(2, "0")}
              </span>
            </div>

            <div className="px-4 sm:px-8">
              <AnimatePresence mode="wait">
                <motion.svg
                  key={cat.id}
                  viewBox="0 0 480 300"
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.25 } }}
                  className="mx-auto block w-full max-w-[640px] fill-none stroke-ivory text-ivory [stroke-linecap:round] [stroke-linejoin:round]"
                  strokeWidth={1.5}
                  aria-label={cat.name}
                >
                  <Scene />
                </motion.svg>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={cat.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="border-t border-white/[0.06] px-7 py-5 text-[15px] font-light text-mist"
              >
                {cat.blurb}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* category selectors */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {CATEGORIES.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border px-5 py-4 text-start transition-colors duration-500",
                    isActive
                      ? "border-white/25 bg-surface"
                      : "border-white/[0.08] hover:border-white/20"
                  )}
                >
                  <span
                    className={cn(
                      "flex items-center gap-3 text-lg font-black tracking-tightest transition-colors duration-300 sm:text-xl",
                      isActive ? "text-ivory" : "text-mist group-hover:text-ivory"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300",
                        isActive ? "bg-dot" : "bg-white/15"
                      )}
                    />
                    {c.name}
                    <span dir="ltr" className="ms-auto font-mono text-[10px] font-normal tracking-[0.22em] text-mist/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  {/* amber fuse — burns down while this card is live */}
                  {isActive && !reduced && (
                    <motion.span
                      key={`fuse-${active}-${paused}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: paused ? 0 : 1 }}
                      transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                      className="absolute bottom-0 right-0 h-px w-full origin-right bg-dot/80"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
