"use client";

import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { PROJECTS, type Project } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

function BentoCell({ project }: { project: Project }) {
  const external = project.href.startsWith("http");
  return (
    <motion.a
      variants={fadeUp}
      href={project.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card shadow-[0_34px_80px_-42px_rgba(0,0,0,0.85)] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-white/25",
        project.span
      )}
    >
      {/* media */}
      <div className="relative flex-1 overflow-hidden">
        <span className="absolute inset-0 grid place-items-center bg-gradient-to-br from-card to-bg text-2xl font-extrabold tracking-tightest text-steel/40">
          {project.name}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
          className="relative h-full min-h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent" />
        {/* on-hover tech-stack overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-bright backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="flex items-start justify-between gap-3 p-6">
        <div>
          <h3 className="text-xl font-bold tracking-tightest text-bright">
            {project.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-steel">
            {project.description}
          </p>
        </div>
        <ArrowUpLeft className="mt-1 h-5 w-5 shrink-0 text-steel transition-all duration-300 group-hover:-translate-x-1 group-hover:text-bright" />
      </div>
    </motion.a>
  );
}

export function BentoProjects() {
  return (
    <section id="projects" className="py-32 sm:py-44">
      <div className="shell">
        <SectionHeader
          index="(02)"
          label="פרויקטים"
          title="עבודות שכבר בנינו."
          lead="בכל פרויקט, כיצבנו בעיה עסקית, בחרנו את הדרך הישירה, וגדלנו את הפתרון אחרי ההשקה."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid auto-rows-[minmax(220px,1fr)] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS.map((p) => (
            <BentoCell key={p.id} project={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
