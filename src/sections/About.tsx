import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, SplitText } from "@/lib/gsap"
import { Separator } from "@/components/ui/separator"

const stats = [
  { value: 8, suffix: "+", label: "Years of experience" },
  { value: 60, suffix: "+", label: "Projects shipped" },
  { value: 12, suffix: "", label: "Design awards" },
  { value: 40, suffix: "+", label: "Happy clients" },
]

export function About() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduced) return

      // Word-by-word reveal, scrubbed to scroll
      const split = new SplitText(".about-statement", { type: "words" })
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-statement",
            start: "top 78%",
            end: "bottom 45%",
            scrub: true,
          },
        },
      )

      // Animated counters (markup holds the final value for no-motion contexts)
      gsap.utils.toArray<HTMLElement>(".about-stat-value").forEach((el) => {
        const target = Number(el.dataset.value)
        const counter = { value: 0 }
        el.textContent = "0"
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value))
          },
        })
      })

      gsap.from(".about-card", {
        y: 70,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-card", start: "top 85%" },
      })

      return () => split.revert()
    },
    { scope: rootRef },
  )

  return (
    <section id="about" ref={rootRef} className="px-6 py-24 md:px-12 md:py-36">
      <p className="mb-10 text-sm tracking-widest text-muted-foreground uppercase">
        <span className="mr-3 text-primary">●</span>About me
      </p>

      <div className="grid gap-16 lg:grid-cols-12">
        <h2 className="about-statement font-display text-3xl leading-snug font-medium tracking-tight lg:col-span-8 md:text-5xl md:leading-snug">
          I design digital products that balance business goals with human needs — turning
          complex problems into interfaces that feel{" "}
          <em className="font-serif text-primary italic">effortless</em>, look{" "}
          <em className="font-serif text-primary italic">unforgettable</em> and ship on time.
        </h2>

        <div className="about-card lg:col-span-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-primary font-display text-2xl font-bold text-primary-foreground">
              R
            </div>
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Currently</dt>
                <dd className="text-right">UX/UI Designer · Cavalcante Digital Services</dd>
              </div>
              <Separator className="bg-border" />
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Exploring</dt>
                <dd className="text-right">React Native</dd>
              </div>
              <Separator className="bg-border" />
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Next stop</dt>
                <dd className="text-right">Vancouver, Canada 🇨🇦</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-28 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border-t border-border pt-6">
            <p className="font-display text-5xl font-bold tracking-tight md:text-7xl">
              <span className="about-stat-value" data-value={stat.value}>
                {stat.value}
              </span>
              <span className="text-primary">{stat.suffix}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
