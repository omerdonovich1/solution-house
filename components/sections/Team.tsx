"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Magnetic } from "@/components/Magnetic";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { useTx, type Bi } from "@/lib/i18n";

interface Member {
  readonly name: Bi;
  readonly role: Bi;
  readonly bio: Bi;
  readonly initials: string;
  readonly linkedin: string;
}

const TEAM: readonly Member[] = [
  {
    name: { he: "ירין לוין", en: "Yarin Levin" },
    role: { he: "מפתח Full Stack", en: "Full Stack Developer" },
    bio: {
      he: "מתמחה באתרים ובדפי נחיתה — עיצוב וחוויית משתמש שממירים.",
      en: "Specializes in websites and landing pages — design and user experience that convert.",
    },
    initials: "יל",
    linkedin: "https://linkedin.com",
  },
  {
    name: { he: "עומר דונוביץ", en: "Omer Donovich" },
    role: { he: "מייסד · מהנדס מערכות ו-AI", en: "Founder & AI Systems Engineer" },
    bio: {
      he: "בונה מערכות מותאמות, אוטומציות וסוכני AI לעסקים.",
      en: "Builds tailored systems, automations and AI agents for businesses.",
    },
    initials: "עד",
    linkedin: "https://linkedin.com",
  },
];

const cardHover =
  "transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(217,161,59,0.3),0_24px_60px_-24px_rgba(217,161,59,0.28)]";

export function Team() {
  const tx = useTx();
  return (
    <section id="team" className="py-16 sm:py-24">
      <div className="shell">
        <SectionHeader
          center
          title={tx({ he: "הצוות שלנו", en: "Our team" })}
          lead={tx({
            he: "האנשים שבונים את הפתרונות שלכם.",
            en: "The people who build your solutions.",
          })}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-10 grid max-w-2xl gap-4 sm:mt-14 sm:gap-5 sm:grid-cols-2"
        >
          {TEAM.map((m) => (
            <motion.div key={m.name.en} variants={fadeUp}>
              <Magnetic strength={0.13} radius={30} className="h-full">
                <div
                  className={`liquid-glass group relative flex h-full flex-col items-center rounded-3xl p-7 text-center ${cardHover}`}
                >
              {/* avatar — gold ring, initials placeholder */}
              <div className="relative">
                <div className="grid h-[120px] w-[120px] place-items-center rounded-full bg-gradient-to-b from-[#1B1B1F] to-[#0E0E11] text-2xl font-black text-ivory ring-2 ring-dot/50 ring-offset-4 ring-offset-[#0b0b0d] transition-transform duration-500 group-hover:scale-105">
                  {m.initials}
                </div>
                <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_0_36px_-4px_rgba(217,161,59,0.55)] transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <h3 className="mt-5 text-xl font-black tracking-tight text-ivory">{tx(m.name)}</h3>
              <div className="mt-1 text-[13.5px] font-medium text-dot">{tx(m.role)}</div>
              <p className="mt-3 text-[14px] font-light leading-relaxed text-mist">{tx(m.bio)}</p>

              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tx({ he: `הפרופיל של ${m.name.he} בלינקדאין`, en: `${m.name.en}'s LinkedIn profile` })}
                className="mt-5 grid h-9 w-9 place-items-center rounded-full border border-white/12 text-mist transition-colors duration-300 hover:border-dot hover:text-dot"
              >
                <Linkedin className="h-[17px] w-[17px]" strokeWidth={1.7} />
              </a>
                </div>
              </Magnetic>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
