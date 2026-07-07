"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTx, type Bi } from "@/lib/i18n";

interface Stat {
  /** numeric target to count to */
  readonly value: number;
  /** text before/after the number */
  readonly prefix?: string;
  readonly suffix?: string;
  readonly label: Bi;
  /** render the number literally instead of counting (e.g. "24/7") */
  readonly literal?: string;
}

const STATS: readonly Stat[] = [
  { value: 10, suffix: "+", label: { he: "פרויקטים שהושלמו", en: "Projects completed" } },
  { value: 2000, suffix: "+", label: { he: "שעות חיסכון ללקוחות", en: "Hours saved for clients" } },
  { value: 100, suffix: "%", label: { he: "שביעות רצון", en: "Client satisfaction" } },
  { value: 0, literal: "24/7", label: { he: "תמיכה טכנית", en: "Technical support" } },
];

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function Counter({ stat, run }: { stat: Stat; run: boolean }) {
  const tx = useTx();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run || stat.literal) return;
    let raf = 0;
    let start = 0;
    const DURATION = 2000;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / DURATION);
      setN(Math.round(easeOutCubic(p) * stat.value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, stat.value, stat.literal]);

  const shown = stat.literal ?? `${stat.prefix ?? ""}${n.toLocaleString("en-US")}${stat.suffix ?? ""}`;

  return (
    <div className="text-center">
      <div
        dir="ltr"
        className="text-[clamp(2.4rem,6vw,3.6rem)] font-black leading-none tracking-tightest text-dot"
      >
        {shown}
      </div>
      <div className="mt-2.5 text-[13.5px] font-light text-mist sm:text-[15px]">{tx(stat.label)}</div>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section className="py-6 sm:py-10">
      <div className="shell">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="liquid-glass grid grid-cols-2 gap-y-8 rounded-3xl px-6 py-9 sm:gap-y-0 sm:px-10 sm:py-11 md:grid-cols-4"
        >
          {STATS.map((s) => (
            <Counter key={s.label.en} stat={s} run={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
