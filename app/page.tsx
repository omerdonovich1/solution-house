import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CursorGlow } from "@/components/CursorGlow";
import { CursorTrail } from "@/components/CursorTrail";
import { GlassLight } from "@/components/GlassLight";
import { FloatingActions } from "@/components/FloatingActions";
import { Hero } from "@/components/sections/Hero";
import { WhyUs } from "@/components/sections/WhyUs";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { Stats } from "@/components/sections/Stats";
import { SocialProof } from "@/components/sections/SocialProof";
import { Process } from "@/components/sections/Process";
import { Team } from "@/components/sections/Team";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      {/* interactive chrome — lives on the site itself, not the lock screen */}
      <CursorGlow />
      <CursorTrail />
      <GlassLight />
      <SmoothScroll />

      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <WhatWeBuild />
        <Stats />
        <SocialProof />
        <Process />
        <Team />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
