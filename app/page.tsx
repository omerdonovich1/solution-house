import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Approach } from "@/components/sections/Approach";
import { BentoProjects } from "@/components/sections/BentoProjects";
import { Process } from "@/components/sections/Process";
import { Team } from "@/components/sections/Team";
import { Contact } from "@/components/sections/Contact";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Approach />
        <BentoProjects />
        <Process />
        <Team />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
