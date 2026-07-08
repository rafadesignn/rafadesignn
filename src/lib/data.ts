export type Project = {
  index: string
  title: string
  category: string
  year: string
  tags: string[]
  palette: [string, string, string]
  variant: "rings" | "arch" | "grid" | "wave"
}

export const projects: Project[] = [
  {
    index: "01",
    title: "Lumen Health",
    category: "Mobile App · Health Tech",
    year: "2026",
    tags: ["UX Research", "UI Design", "Design System"],
    palette: ["#d7ff3e", "#1c2a12", "#0b0b0a"],
    variant: "rings",
  },
  {
    index: "02",
    title: "Atlas Travel",
    category: "Booking Platform · Web",
    year: "2025",
    tags: ["Product Design", "Interaction", "Prototyping"],
    palette: ["#ff8a3d", "#2a1810", "#0b0b0a"],
    variant: "arch",
  },
  {
    index: "03",
    title: "Nova Bank",
    category: "Fintech Dashboard · SaaS",
    year: "2025",
    tags: ["UX Strategy", "Data Viz", "Design System"],
    palette: ["#8ab4ff", "#101a2e", "#0b0b0a"],
    variant: "grid",
  },
  {
    index: "04",
    title: "Pulse Audio",
    category: "Brand & E-commerce",
    year: "2024",
    tags: ["Art Direction", "Motion", "Webflow"],
    palette: ["#e08aff", "#22102e", "#0b0b0a"],
    variant: "wave",
  },
]

export const services = [
  {
    index: "01",
    title: "Product Design",
    description:
      "From discovery to launch — user research, flows, wireframes and high-fidelity interfaces that move business metrics.",
    tags: ["UX Research", "User Flows", "Wireframing", "Usability Testing"],
  },
  {
    index: "02",
    title: "Interface & Systems",
    description:
      "Pixel-perfect UI backed by scalable design systems, tokens and documentation your engineers will actually love.",
    tags: ["UI Design", "Design Systems", "Accessibility", "Design Tokens"],
  },
  {
    index: "03",
    title: "Motion & Interaction",
    description:
      "Micro-interactions and motion language that make products feel alive — prototyped, spec'd and ready to ship.",
    tags: ["Micro-interactions", "Prototyping", "Lottie", "GSAP"],
  },
  {
    index: "04",
    title: "Design Engineering",
    description:
      "Bridging design and code — production-ready front-end for marketing sites, landing pages and creative moments.",
    tags: ["React", "Webflow", "Creative Dev", "Handoff"],
  },
]

export const awards = [
  { title: "Site of the Day — Lumen Health", org: "Awwwards", year: "2026" },
  { title: "FWA of the Day — Atlas Travel", org: "The FWA", year: "2025" },
  { title: "Best UI Design — Nova Bank", org: "CSS Design Awards", year: "2025" },
  { title: "Honorable Mention × 3", org: "Awwwards", year: "2024" },
  { title: "Featured — Interaction Design", org: "Behance", year: "2024" },
]

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rafadesignn/" },
  { label: "Instagram", href: "https://instagram.com/rafaduduzao" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCdymNeYil84JxGVtDpzllQg" },
  { label: "Twitch", href: "https://www.twitch.tv/rafadesignn" },
]

export const email = "rafadesignn@gmail.com"
