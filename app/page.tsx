import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ShowcaseScene } from "@/components/sections/ShowcaseScene";
import { Approach } from "@/components/sections/Approach";
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
        <Approach />
        <ProjectsCarousel />
        <Process />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
