import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatWeBuild />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
