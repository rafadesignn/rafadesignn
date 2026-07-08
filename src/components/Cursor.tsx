import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!fine.matches || reduced.matches) return
    setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    document.documentElement.classList.add("has-custom-cursor")

    // Hidden until the pointer first moves so nothing sits at (0,0)
    gsap.set([dot, ring], { opacity: 0 })
    gsap.set(label, { scale: 0.5, opacity: 0 })
    let hasMoved = false

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" })
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" })
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" })
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" })
    const labelX = gsap.quickTo(label, "x", { duration: 0.35, ease: "power3" })
    const labelY = gsap.quickTo(label, "y", { duration: 0.35, ease: "power3" })

    const onMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true
        gsap.set([dot, ring, label], { x: e.clientX, y: e.clientY })
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      }
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
      labelX(e.clientX)
      labelY(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const labelled = target.closest<HTMLElement>("[data-cursor-label]")
      const interactive = target.closest("a, button, [data-cursor]")

      if (labelled) {
        label.textContent = labelled.dataset.cursorLabel ?? "View"
        gsap.to(label, { scale: 1, opacity: 1, duration: 0.3, ease: "power3.out" })
        gsap.to([dot, ring], { opacity: 0, duration: 0.2 })
      } else {
        gsap.to(label, { scale: 0.5, opacity: 0, duration: 0.25, ease: "power3.in" })
        gsap.to(dot, { opacity: 1, scale: interactive ? 0.4 : 1, duration: 0.25 })
        gsap.to(ring, {
          opacity: 1,
          scale: interactive ? 1.8 : 1,
          duration: 0.35,
          ease: "power3.out",
        })
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseover", onOver, { passive: true })

    return () => {
      document.documentElement.classList.remove("has-custom-cursor")
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-130">
      <div
        ref={dotRef}
        className="absolute top-0 left-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
      />
      <div
        ref={ringRef}
        className="absolute top-0 left-0 size-9 rounded-full border border-foreground/40"
        style={{ marginLeft: "-18px", marginTop: "-18px" }}
      />
      <div
        ref={labelRef}
        className="absolute top-0 left-0 flex items-center justify-center rounded-full bg-primary px-5 py-4 font-display text-xs font-semibold tracking-wide text-primary-foreground uppercase"
        style={{ marginLeft: "-42px", marginTop: "-24px" }}
      />
    </div>
  )
}
