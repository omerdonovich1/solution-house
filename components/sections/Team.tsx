"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Magnetic } from "@/components/Magnetic";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { useTx, type Bi } from "@/lib/i18n";

interface Member {
  readonly name: Bi;
  readonly role: Bi;
  readonly bio: Bi;
  readonly initials: string;
  /** portrait shown inside the avatar circle (falls back to initials) */
  readonly image: string;
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
    image: "/team/yarin.jpg",
  },
  {
    name: { he: "עומר דונוביץ", en: "Omer Donovich" },
    role: { he: "AI Systems & Agents", en: "AI Systems & Agents" },
    bio: {
      he: "בונה מערכות מותאמות, אוטומציות וסוכני AI לעסקים.",
      en: "Builds tailored systems, automations and AI agents for businesses.",
    },
    initials: "עד",
    image: "/team/omer.jpg",
  },
];

// a quiet lift — the panel itself handles the border/fill warm-up. The old
// gold glow was part of why the accent stopped reading as an accent.
const cardHover =
  "transition-transform duration-500 ease-out hover:-translate-y-1";

export function Team() {
  const tx = useTx();
  return (
    <section id="team" className="py-14 sm:py-20">
      <div className="shell">
        <SectionHeader
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
                  className={`panel group relative flex h-full flex-col items-center rounded-3xl p-7 text-center ${cardHover}`}
                >
              {/* avatar — gold ring, gently floating animated portrait
                  (initials show underneath until the image loads / if missing) */}
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
                  whileHover={{ scale: 1.06 }}
                  className="relative grid h-[120px] w-[120px] place-items-center overflow-hidden rounded-full bg-gradient-to-b from-[#1B1B1F] to-[#0E0E11] text-2xl font-black text-ivory ring-2 ring-dot/50 ring-offset-4 ring-offset-[#0b0b0d]"
                >
                  {m.initials}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <motion.img
                    src={m.image}
                    alt={tx(m.name)}
                    draggable={false}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    animate={{ scale: [1, 1.09, 1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                </motion.div>
                <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_0_36px_-4px_rgba(217,161,59,0.55)] transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <h3 className="mt-5 text-xl font-black tracking-tight text-ivory">{tx(m.name)}</h3>
              <div className="mt-1 text-[13.5px] font-medium text-dot">{tx(m.role)}</div>
              <p className="mt-3 text-[14px] font-light leading-relaxed text-mist">{tx(m.bio)}</p>
                </div>
              </Magnetic>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
