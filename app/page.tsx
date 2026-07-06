import { Navbar } from "@/components/Navbar";
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
    </>
  );
}
