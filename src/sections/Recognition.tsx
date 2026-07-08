import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { awards } from "@/lib/data"

export function Recognition() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduced) return

      gsap.from(".award-row", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".awards-list", start: "top 85%" },
      })
    },
    { scope: rootRef },
  )

  return (
    <section ref={rootRef} className="px-6 py-24 md:px-12 md:py-32">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="mb-4 text-sm tracking-widest text-muted-foreground uppercase">
            <span className="mr-3 text-primary">●</span>Recognition
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight uppercase md:text-5xl">
            Awards &<br />
            <span className="font-serif font-normal tracking-normal normal-case italic text-primary">
              Features
            </span>
          </h2>
        </div>

        <div className="awards-list md:col-span-8">
          {awards.map((award) => (
            <div
              key={award.title}
              className="award-row group flex items-baseline justify-between gap-6 border-t border-border py-5 last:border-b"
            >
              <div>
                <p className="font-display text-lg font-semibold transition-colors duration-300 group-hover:text-primary md:text-xl">
                  {award.title}
                </p>
                <p className="text-sm text-muted-foreground">{award.org}</p>
              </div>
              <span className="font-display text-sm text-muted-foreground tabular-nums">
                {award.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
