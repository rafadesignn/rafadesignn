import { useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { ArrowUpRight, ArrowUp } from "lucide-react"
import { gsap } from "@/lib/gsap"
import { getLenis } from "@/lib/scroll"
import { email, socials } from "@/lib/data"
import { Magnetic } from "@/components/Magnetic"

function useVancouverTime() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Vancouver",
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])
  return time
}

export function Contact() {
  const rootRef = useRef<HTMLElement>(null)
  const time = useVancouverTime()

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduced) return

      gsap.from(".contact-line", {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: ".contact-heading", start: "top 80%" },
      })

      gsap.from(".contact-fade", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-heading", start: "top 70%" },
      })
    },
    { scope: rootRef },
  )

  const backToTop = () => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { duration: 1.8 })
    else window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer id="contact" ref={rootRef} className="relative overflow-hidden px-6 pt-24 pb-10 md:px-12 md:pt-36">
      <p className="contact-fade mb-8 text-sm tracking-widest text-muted-foreground uppercase">
        <span className="mr-3 text-primary">●</span>Got a project in mind?
      </p>

      <div className="contact-heading relative">
        <h2 className="font-display text-[13.5vw] leading-[0.95] font-bold tracking-tighter uppercase md:text-[10vw]">
          <span className="block overflow-hidden pb-1">
            <span className="contact-line block">Let's work</span>
          </span>
          <span className="block overflow-hidden pb-[0.18em]">
            <span className="contact-line block font-serif leading-[1.02] font-normal tracking-normal normal-case italic text-primary">
              together
            </span>
          </span>
        </h2>

        <Magnetic className="mt-10 inline-block md:mt-0 md:absolute md:right-[6vw] md:bottom-2">
          <a
            href={`mailto:${email}`}
            data-cursor
            className="flex size-28 items-center justify-center rounded-full bg-primary text-center font-display text-sm leading-tight font-semibold tracking-wide text-primary-foreground uppercase transition-transform duration-300 hover:scale-105 md:size-40 md:text-base"
          >
            Get in
            <br />
            touch ↗
          </a>
        </Magnetic>
      </div>

      <div className="mt-24 grid gap-10 border-t border-border pt-10 md:mt-32 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="mb-2 text-sm text-muted-foreground">Drop me a line</p>
          <a
            href={`mailto:${email}`}
            className="link-sweep font-display text-xl font-semibold break-all md:text-2xl"
          >
            {email}
          </a>
        </div>

        <div className="md:col-span-4">
          <p className="mb-2 text-sm text-muted-foreground">Elsewhere</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-1 font-display text-base"
                >
                  {social.label}
                  <ArrowUpRight className="size-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3 md:text-right">
          <p className="mb-2 text-sm text-muted-foreground">Local time — Vancouver</p>
          <p className="font-display text-base tabular-nums">{time || "—"}</p>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-between text-xs text-muted-foreground">
        <p>© 2026 Rafa Cavalcante. All rights reserved.</p>
        <button
          onClick={backToTop}
          className="group flex items-center gap-2 uppercase tracking-widest"
        >
          Back to top
          <span className="flex size-8 items-center justify-center rounded-full border border-border transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUp className="size-3.5" />
          </span>
        </button>
      </div>
    </footer>
  )
}
