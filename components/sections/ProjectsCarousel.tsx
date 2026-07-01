"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { PROJECTS, type Project } from "@/lib/data";
import { fadeUp, viewportOnce } from "@/lib/motion";

const TILT = 5; // deg

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const external = project.href.startsWith("http");
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-py * TILT * 2);
    ry.set(px * TILT * 2);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.a
      href={project.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      draggable={false}
      data-cursor="view"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1100 }}
      className="group relative flex w-[82vw] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-surface transition-[border-color] duration-500 will-change-transform hover:border-white/25 sm:w-[440px] lg:w-[520px]"
    >
      {/* media */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <span className="absolute inset-0 grid place-items-center bg-gradient-to-br from-surface to-ink text-3xl font-black tracking-tightest text-mist/30">
          {project.name}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          draggable={false}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
          className="relative h-full w-full object-cover grayscale-[45%] transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.05] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/5 to-transparent" />
        {/* index figure */}
        <span className="absolute right-5 top-4 font-mono text-[11px] tracking-[0.22em] text-ivory/70">
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* on-hover tag overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-ink/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ivory backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="flex flex-1 items-start justify-between gap-3 p-7">
        <div>
          <h3 className="text-2xl font-black tracking-tightest text-ivory">
            {project.name}
          </h3>
          <p className="mt-2.5 text-sm font-light leading-relaxed text-mist">
            {project.description}
          </p>
        </div>
        <ArrowUpLeft className="mt-1.5 h-5 w-5 shrink-0 text-mist transition-all duration-500 group-hover:-translate-x-1 group-hover:translate-y-[-2px] group-hover:text-volt" />
      </div>
    </motion.a>
  );
}

/**
 * Editorial horizontal showcase: native RTL scroll-snap rail with
 * forward/backward navigation, a live counter, and a volt progress hairline.
 */
export function ProjectsCarousel() {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [page, setPage] = useState(0);

  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    // RTL scrollLeft runs 0 → -max in modern browsers.
    const traveled = Math.min(Math.abs(el.scrollLeft), max);
    setProgress(max > 0 ? traveled / max : 0);
    const step = el.scrollWidth / PROJECTS.length;
    setPage(Math.min(PROJECTS.length - 1, Math.round(traveled / step)));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  function nav(dir: 1 | -1) {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector("a");
    const step = card ? card.getBoundingClientRect().width + 20 : 480;
    // In RTL, advancing through content means scrolling toward negative left.
    el.scrollBy({ left: -dir * step, behavior: "smooth" });
  }

  return (
    <section id="projects" className="py-32 sm:py-48">
      <div className="shell">
        <SectionHeader
          index="(02)"
          label="פרויקטים"
          title="עבודות שכבר בנינו."
          lead="בכל פרויקט זיהינו בעיה עסקית, בחרנו את הדרך הישירה אליה — והמשכנו לפתח את הפתרון גם אחרי ההשקה."
        />
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-16"
      >
        {/* rail — bleeds to the viewport edge, padded back to the shell line */}
        <div
          ref={railRef}
          onScroll={measure}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--shell-pad)] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* controls */}
        <div className="shell mt-10 flex items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="הקודם"
              onClick={() => nav(-1)}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-ivory transition-all duration-300 hover:border-volt hover:text-volt active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="הבא"
              onClick={() => nav(1)}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-ivory transition-all duration-300 hover:border-volt hover:text-volt active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-1 items-center gap-6">
            <div className="relative h-px flex-1 bg-white/10">
              <span
                className="absolute inset-y-0 right-0 bg-volt transition-[width] duration-200"
                style={{ width: `${Math.max(progress * 100, 2)}%` }}
              />
            </div>
            <span className="font-mono text-[11px] tracking-[0.22em] text-mist">
              {String(page + 1).padStart(2, "0")}
              <span className="mx-1 text-mist/50">/</span>
              {String(PROJECTS.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
