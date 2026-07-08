import Lenis from "lenis"

let lenis: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenis = instance
}

export function getLenis() {
  return lenis
}

export function scrollToSection(target: string) {
  if (lenis) {
    lenis.scrollTo(target, { offset: 0, duration: 1.6 })
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" })
  }
}
