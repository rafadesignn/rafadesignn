import { useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { Menu, ArrowUpRight } from "lucide-react"
import { gsap } from "@/lib/gsap"
import { scrollToSection } from "@/lib/scroll"
import { email } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const links = [
  { label: "Works", target: "#works" },
  { label: "About", target: "#about" },
  { label: "Services", target: "#services" },
  { label: "Contact", target: "#contact" },
]

export function Navbar({ ready }: { ready: boolean }) {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useGSAP(() => {
    if (!ready) {
      gsap.set(navRef.current, { yPercent: -120 })
      return
    }
    gsap.to(navRef.current, { yPercent: 0, duration: 1, ease: "power3.out", delay: 0.4 })
  }, [ready])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const go = (target: string) => {
    setOpen(false)
    // Let the sheet close before scrolling on mobile
    requestAnimationFrame(() => scrollToSection(target))
  }

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed inset-x-0 top-0 z-110 transition-colors duration-500",
        scrolled && "border-b border-border bg-background/70 backdrop-blur-md",
      )}
    >
      <nav className="flex items-center justify-between px-6 py-4 md:px-12">
        <button
          onClick={() => go("#hero")}
          className="font-display text-lg font-bold tracking-tight"
          aria-label="Back to top"
        >
          rafa<span className="text-primary">.</span>design®
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <Badge
            variant="outline"
            className="gap-2 rounded-full border-border px-3 py-1 font-body text-[11px] tracking-wide text-muted-foreground uppercase"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Open for projects
          </Badge>
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => go(link.target)}
                  className="link-sweep font-body text-sm tracking-wide text-foreground/80 uppercase hover:text-foreground"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full border-border bg-background sm:max-w-sm">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex h-full flex-col justify-between p-6 pt-16">
              <ul className="space-y-2">
                {links.map((link, i) => (
                  <li key={link.label}>
                    <button
                      onClick={() => go(link.target)}
                      className="group flex w-full items-baseline gap-4 py-2 text-left"
                    >
                      <span className="font-display text-xs text-primary">0{i + 1}</span>
                      <span className="font-display text-4xl font-bold tracking-tight uppercase transition-transform duration-300 group-active:translate-x-2">
                        {link.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="gap-2 rounded-full border-border px-3 py-1 font-body text-[11px] tracking-wide text-muted-foreground uppercase"
                >
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                  Open for projects
                </Badge>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 font-body text-sm text-muted-foreground"
                >
                  {email} <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
