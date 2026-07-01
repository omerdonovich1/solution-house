import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ShowcaseScene } from "@/components/sections/ShowcaseScene";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { ProjectsCarousel } from "@/components/sections/ProjectsCarousel";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ShowcaseScene />
        <WhatWeBuild />
        <ProjectsCarousel />
        <Process />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
