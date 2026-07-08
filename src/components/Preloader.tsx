import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"

type PreloaderProps = {
  onReveal: () => void
  onExited: () => void
}

export function Preloader({ onReveal, onExited }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const [done, setDone] = useState(false)

  useGSAP(
    () => {
      const counter = { value: 0 }
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      if (reduced) {
        onReveal()
        setDone(true)
        onExited()
        return
      }

      gsap.set(".preloader-word", { yPercent: 110, opacity: 0 })
      gsap.set(".preloader-bar", { scaleX: 0 })

      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true)
          onExited()
        },
      })

      tl.to(".preloader-word", {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      })
        .to(
          counter,
          {
            value: 100,
            duration: 1.7,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(Math.round(counter.value)).padStart(3, "0")
              }
            },
          },
          "<",
        )
        .to(".preloader-bar", { scaleX: 1, duration: 1.7, ease: "power2.inOut" }, "<")
        .to(".preloader-word, .preloader-meta", {
          yPercent: -110,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.in",
        })
        .add(() => onReveal())
        .to(rootRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        })
    },
    { scope: rootRef },
  )

  if (done) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-140 flex flex-col justify-between bg-background px-6 py-8 md:px-12"
      aria-hidden
    >
      <div className="flex items-center justify-between">
        <span className="preloader-meta font-display text-sm tracking-widest uppercase opacity-60">
          Rafa Cavalcante®
        </span>
        <span className="preloader-meta font-display text-sm tracking-widest uppercase opacity-60">
          Portfolio 2026
        </span>
      </div>

      <div className="flex flex-col items-start gap-6">
        <h1 className="font-display text-[13vw] leading-[0.9] font-bold tracking-tight uppercase md:text-[7vw]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="preloader-word block">Designing</span>
          </span>
          <span className="block overflow-hidden pb-[0.14em] -mb-[0.1em]">
            <span className="preloader-word block">
              <em className="font-serif font-normal tracking-normal text-primary italic">
                experiences
              </em>
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="preloader-word block">that resonate</span>
          </span>
        </h1>
      </div>

      <div className="flex items-end justify-between gap-8">
        <div className="preloader-bar h-px flex-1 origin-left bg-primary" />
        <span
          ref={counterRef}
          className="preloader-meta font-display text-5xl font-bold tabular-nums md:text-7xl"
        >
          000
        </span>
      </div>
    </div>
  )
}
