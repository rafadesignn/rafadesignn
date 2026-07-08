import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { ArrowUpRight } from "lucide-react"
import { gsap } from "@/lib/gsap"
import { services } from "@/lib/data"

export function Services() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduced) return

      gsap.from(".service-row", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-list", start: "top 82%" },
      })

      gsap.from(".services-heading", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-heading", start: "top 88%" },
      })
    },
    { scope: rootRef },
  )

  return (
    <section id="services" ref={rootRef} className="px-6 py-24 md:px-12 md:py-36">
      <div className="services-heading mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display text-[13vw] leading-none font-bold tracking-tighter uppercase md:text-[7.5vw]">
          What I <span className="font-serif font-normal text-primary italic normal-case">do</span>
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Every engagement is end-to-end: strategy, design and the motion details that make it
          memorable.
        </p>
      </div>

      <div className="services-list">
        {services.map((service) => (
          <div
            key={service.index}
            data-cursor
            className="service-row group relative overflow-hidden border-t border-border py-8 transition-colors duration-500 last:border-b md:py-10"
          >
            <div className="absolute inset-0 origin-bottom scale-y-0 bg-primary transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100" />
            <div className="relative grid items-center gap-4 transition-colors duration-300 group-hover:text-primary-foreground md:grid-cols-12">
              <span className="font-display text-sm md:col-span-1">{service.index}</span>
              <h3 className="font-display text-3xl font-bold tracking-tight uppercase md:col-span-4 md:text-4xl lg:text-5xl">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-primary-foreground/80 md:col-span-4">
                {service.description}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3 md:col-span-3">
                <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs tracking-wide uppercase opacity-70">
                  {service.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <ArrowUpRight className="size-6 shrink-0 transition-transform duration-300 group-hover:rotate-45" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
