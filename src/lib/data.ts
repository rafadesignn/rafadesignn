export type Project = {
  index: string;
  slug: "lumen" | "atlas" | "verde" | "nimbus";
  title: string;
  headline: string;
  description: string;
  outcome: string;
  outcomeLabel: string;
  tags: string[];
  year: string;
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "lumen",
    title: "Lumen Health",
    headline: "Reimagining chronic care for two million patients",
    description:
      "A ground-up redesign of Lumen's patient platform — turning a maze of clinical forms into a calm daily companion that people actually open.",
    outcome: "+38%",
    outcomeLabel: "patient activation in the first quarter",
    tags: ["Product Design", "Design System", "Mobile"],
    year: "2025",
  },
  {
    index: "02",
    slug: "atlas",
    title: "Atlas Bank",
    headline: "Onboarding that feels like a conversation",
    description:
      "Atlas asked for fewer drop-offs; we gave them a flow that reads like a dialogue. Progressive disclosure, humane copy, zero dead ends.",
    outcome: "−64%",
    outcomeLabel: "drop-off across the signup funnel",
    tags: ["UX Research", "UI Design", "Fintech"],
    year: "2024",
  },
  {
    index: "03",
    slug: "verde",
    title: "Verde Market",
    headline: "Sustainable commerce, designed to convert",
    description:
      "An e-commerce experience where the sustainability story sells the product — traceability made tangible, checkout made frictionless.",
    outcome: "2.1×",
    outcomeLabel: "conversion rate after relaunch",
    tags: ["E-commerce", "Interaction Design", "Branding"],
    year: "2024",
  },
  {
    index: "04",
    slug: "nimbus",
    title: "Nimbus AI",
    headline: "An AI copilot people actually trust",
    description:
      "Designing the interface between humans and a reasoning model — legible confidence, graceful failure states, and control that never leaves the user.",
    outcome: "92%",
    outcomeLabel: "task success rate in usability testing",
    tags: ["AI-assisted Design", "Prototyping", "SaaS"],
    year: "2026",
  },
];

export type Service = {
  index: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    index: "01",
    title: "UX Research",
    tagline: "Decisions grounded in evidence, not opinions.",
    description:
      "I start every engagement by listening — to users, to data, to the business. Research isn't a phase; it's the operating system for everything that follows.",
    deliverables: ["User interviews", "Usability testing", "Journey mapping", "JTBD analysis"],
  },
  {
    index: "02",
    title: "UI Design",
    tagline: "Interfaces with a point of view.",
    description:
      "Pixel-precise visual design that balances brand expression with usability. Every screen earns its place; every state is considered, including the unhappy ones.",
    deliverables: ["Visual language", "Interaction design", "WCAG accessibility", "Dev-ready handoff"],
  },
  {
    index: "03",
    title: "Product Design",
    tagline: "From first insight to shipped feature.",
    description:
      "End-to-end product thinking — framing the problem, mapping the flows, shipping the solution, and measuring whether it actually moved the needle.",
    deliverables: ["Product discovery", "Flows & architecture", "Iteration cycles", "Success metrics"],
  },
  {
    index: "04",
    title: "Design Systems",
    tagline: "Design that scales with your team.",
    description:
      "Token-based systems that make the right thing the easy thing. Fewer decisions per screen, faster shipping, and a UI that stays coherent as the team grows.",
    deliverables: ["Design tokens", "Component libraries", "Documentation", "Governance models"],
  },
  {
    index: "05",
    title: "Prototyping",
    tagline: "Make it real before it's expensive.",
    description:
      "High-fidelity, testable prototypes that answer hard questions early — how it feels, how it flows, and whether anyone actually wants it.",
    deliverables: ["Hi-fi prototypes", "Motion studies", "Concept validation", "Stakeholder demos"],
  },
  {
    index: "06",
    title: "AI-assisted Design",
    tagline: "Move ten times faster without losing craft.",
    description:
      "I build AI into the design process itself — rapid exploration, systematic iteration, model-aware UX patterns — while keeping human judgment at the center.",
    deliverables: ["AI-augmented workflows", "Prompt-driven exploration", "Model-aware UX", "Team enablement"],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  hue: "neon" | "iris" | "mint";
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Rafael doesn't just design screens — he redesigned how our team thinks about patients. Activation jumped 38% in a single quarter, and the design system he left behind is still paying dividends.",
    name: "Marina Duarte",
    role: "Head of Product",
    company: "Lumen Health",
    initials: "MD",
    hue: "mint",
  },
  {
    quote:
      "The rare designer who asks about business metrics before opening Figma. Our onboarding drop-off fell by two-thirds, and the board noticed.",
    name: "Daniel Costa",
    role: "CEO",
    company: "Atlas Bank",
    initials: "DC",
    hue: "iris",
  },
  {
    quote:
      "The smoothest handoff we've ever had. His specs were so clear our engineers stopped scheduling design QA meetings entirely.",
    name: "Sofia Lindqvist",
    role: "VP of Engineering",
    company: "Nimbus AI",
    initials: "SL",
    hue: "neon",
  },
];

export const clients = ["Lumen", "Atlas Bank", "Verde", "Nimbus AI", "Kova", "Polaris"];

export const marqueeItems = [
  "UX Research",
  "UI Design",
  "Product Design",
  "Design Systems",
  "Prototyping",
  "AI-assisted Design",
  "Interaction Design",
  "Design Strategy",
];

export const stats = [
  { value: 8, suffix: "+", label: "years designing digital products" },
  { value: 60, suffix: "+", label: "projects shipped to production" },
  { value: 12, suffix: "", label: "industries, from health to fintech" },
  { value: 97, suffix: "%", label: "of clients come back for more" },
];

export const principles = [
  {
    title: "Clarity over cleverness",
    body: "If a user has to think about the interface, the interface has failed. I design for the person in a hurry, not the judge at an award show — which, funnily enough, is what wins them.",
  },
  {
    title: "Motion with meaning",
    body: "Animation is information. Every transition I ship answers a question — where did this come from, where did it go — and respects the people who'd rather it didn't move at all.",
  },
  {
    title: "Ship, learn, refine",
    body: "A design isn't done when it looks right; it's done when the metric moves. I stay through launch and iterate on what reality reports back.",
  },
];

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rafadesignn/" },
  { label: "Instagram", href: "https://instagram.com/rafaduduzao" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCdymNeYil84JxGVtDpzllQg" },
  { label: "Twitch", href: "https://www.twitch.tv/rafadesignn" },
];

export const email = "rafadesignn@gmail.com";
