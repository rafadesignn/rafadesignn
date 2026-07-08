import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { ArrowUpRight } from "lucide-react"
import { gsap } from "@/lib/gsap"
import { projects } from "@/lib/data"
import { ProjectVisual } from "@/components/ProjectVisual"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function Works() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduced) return

      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
        gsap.from(card, {
          y: 90,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        })

        const art = card.querySelector(".work-art")
        if (art) {
          gsap.fromTo(
            art,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
            },
          )
        }
      })

      gsap.from(".works-heading", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".works-heading", start: "top 88%" },
      })
    },
    { scope: rootRef },
  )

  return (
    <section id="works" ref={rootRef} className="px-6 py-24 md:px-12 md:py-36">
      <div className="works-heading mb-16 flex items-end justify-between md:mb-24">
        <h2 className="font-display text-[13vw] leading-none font-bold tracking-tighter uppercase md:text-[7.5vw]">
          Selected<br />
          <span className="font-serif font-normal tracking-normal normal-case italic text-primary">
            Works
          </span>
        </h2>
        <span className="font-display text-lg text-muted-foreground md:text-2xl">
          ({projects.length})
        </span>
      </div>

      <div className="space-y-20 md:space-y-32">
        {projects.map((project, i) => (
          <article
            key={project.index}
            className={cn(
              "work-card group grid items-center gap-6 md:grid-cols-12 md:gap-10",
            )}
          >
            <a
              href="#contact"
              onClick={(e) => e.preventDefault()}
              data-cursor-label="View case"
              aria-label={`${project.title} case study`}
              className={cn(
                "relative block overflow-hidden rounded-2xl md:col-span-7",
                i % 2 === 1 && "md:order-2",
              )}
            >
              <div className="work-art aspect-4/3 scale-110 transition-transform duration-700 ease-out group-hover:scale-[1.16] md:aspect-16/10">
                <ProjectVisual project={project} />
              </div>
              <span className="pointer-events-none absolute top-5 left-5 font-display text-sm tracking-widest text-foreground/70 uppercase">
                {project.year}
              </span>
              <span
                className="pointer-events-none absolute right-5 bottom-4 font-display text-7xl font-bold md:text-8xl"
                style={{ color: project.palette[0], opacity: 0.25 }}
              >
                {project.index}
              </span>
            </a>

            <div className={cn("md:col-span-5", i % 2 === 1 && "md:order-1")}>
              <p className="mb-3 text-sm tracking-widest text-muted-foreground uppercase">
                {project.category}
              </p>
              <h3 className="mb-5 flex items-center gap-3 font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                {project.title}
                <ArrowUpRight className="size-7 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 md:size-9" />
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="rounded-full border-border px-3 py-1 font-body text-xs text-foreground/70"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
