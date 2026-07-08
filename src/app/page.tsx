import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Cursor } from "@/components/cursor";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Nav } from "@/components/nav";
import { Providers } from "@/components/providers";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <Providers>
      <a
        href="#main"
        className="sr-only z-[100] rounded-md bg-neon px-4 py-2 font-semibold text-zinc-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Cursor />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Services />
        <Testimonials />
        <Contact />
      </main>
    </Providers>
  );
}
