import { lazy, Suspense, useRef } from "react"
import { useGSAP } from "@gsap/react"
import { ArrowDown } from "lucide-react"
import { gsap, SplitText } from "@/lib/gsap"
import { scrollToSection } from "@/lib/scroll"

const HeroCanvas = lazy(() =>
  import("@/components/HeroCanvas").then((m) => ({ default: m.HeroCanvas })),
)

export function Hero({ ready }: { ready: boolean }) {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!ready) return
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduced) {
        gsap.set(".hero-reveal, .hero-fade", { opacity: 1, yPercent: 0, y: 0 })
        return
      }

      const split = new SplitText(".hero-title-line", { type: "chars" })
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

      tl.from(split.chars, {
        yPercent: 120,
        rotate: 4,
        duration: 1.1,
        stagger: 0.025,
      })
        .from(
          ".hero-fade",
          { y: 24, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" },
          "-=0.6",
        )

      // Subtle parallax out on scroll
      gsap.to(".hero-content", {
        yPercent: -12,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      return () => split.revert()
    },
    { scope: rootRef, dependencies: [ready] },
  )

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background/60 via-transparent to-background" />

      <div className="hero-content relative z-10 px-6 pt-32 pb-10 md:px-12 md:pb-14">
        <div className="hero-fade mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm tracking-wide text-foreground/70 uppercase md:mb-10">
          <span>UX/UI Designer</span>
          <span className="hidden size-1 rounded-full bg-primary md:block" />
          <span>Art Director</span>
          <span className="hidden size-1 rounded-full bg-primary md:block" />
          <span>Based in Vancouver, working worldwide</span>
        </div>

        <h1 className="font-display font-bold tracking-tighter uppercase">
          <span className="block overflow-hidden pb-1">
            <span className="hero-title-line block text-[16.5vw] leading-[0.92] md:text-[11.5vw]">
              Rafa
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <span className="hero-title-line block font-serif text-[15vw] leading-[0.98] font-normal tracking-normal normal-case italic md:text-[10.5vw]">
              Cavalcante
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col justify-between gap-8 md:mt-12 md:flex-row md:items-end">
          <p className="hero-fade max-w-md text-base leading-relaxed text-foreground/75 md:text-lg">
            I craft <em className="font-serif text-primary italic">bold digital experiences</em>{" "}
            where strategy meets emotion — interfaces people don't just use, but remember.
          </p>
          <button
            onClick={() => scrollToSection("#works")}
            className="hero-fade group flex items-center gap-3 self-start text-sm tracking-widest uppercase md:self-auto"
          >
            <span className="flex size-11 items-center justify-center rounded-full border border-border transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </span>
            Scroll to explore
          </button>
        </div>
      </div>
    </section>
  )
}
