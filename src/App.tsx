import { useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useSmoothScroll } from "@/hooks/useSmoothScroll"
import { Cursor } from "@/components/Cursor"
import { Preloader } from "@/components/Preloader"
import { Navbar } from "@/components/Navbar"
import { Marquee } from "@/components/Marquee"
import { Hero } from "@/sections/Hero"
import { Works } from "@/sections/Works"
import { About } from "@/sections/About"
import { Services } from "@/sections/Services"
import { Recognition } from "@/sections/Recognition"
import { Contact } from "@/sections/Contact"

const marqueeItems = [
  "Product Design",
  "Interaction",
  "Design Systems",
  "Art Direction",
  "Motion",
  "UX Research",
  "Prototyping",
]

export default function App() {
  const [ready, setReady] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)
  const progressRef = useRef<HTMLDivElement>(null)

  useSmoothScroll(ready)

  // Lock scroll while the preloader is up
  useEffect(() => {
    document.body.style.overflow = showPreloader ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [showPreloader])

  // Recalculate scroll positions once fonts are in
  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }, [])

  useGSAP(() => {
    gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "max",
          scrub: 0.3,
        },
      },
    )
  })

  return (
    <div className="grain">
      <Cursor />
      {showPreloader && (
        <Preloader onReveal={() => setReady(true)} onExited={() => setShowPreloader(false)} />
      )}

      <div
        ref={progressRef}
        className="fixed inset-x-0 top-0 z-120 h-0.5 origin-left bg-primary"
        aria-hidden
      />

      <Navbar ready={ready} />

      <main>
        <Hero ready={ready} />
        <Marquee
          items={marqueeItems}
          duration={30}
          className="border-y border-border py-5 md:py-7"
          itemClassName="font-display text-2xl md:text-4xl font-bold uppercase tracking-tight"
        />
        <Works />
        <About />
        <Services />
        <Recognition />
        <Marquee
          items={["Available for freelance", "Let's build something bold", "Open to relocate"]}
          duration={22}
          className="border-y border-border bg-primary py-4 md:py-5"
          itemClassName="font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-primary-foreground"
          separatorClassName="text-primary-foreground"
        />
        <Contact />
      </main>
    </div>
  )
}
