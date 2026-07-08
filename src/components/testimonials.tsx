import { FadeIn } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { clients, testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

const hueStyles = {
  neon: "from-neon/30 to-neon/5 text-neon",
  iris: "from-iris/30 to-iris/5 text-iris",
  mint: "from-mint/30 to-mint/5 text-mint",
} as const;

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="border-t border-white/5 bg-white/[0.015]"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <SectionHeading
          label="Social proof"
          title={
            <span id="testimonials-title">
              Partners put it <span className="text-gradient">better</span>
            </span>
          }
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1} className={cn(i === 1 && "md:translate-y-8")}>
              <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-500 hover:border-white/20">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 32 24"
                  className="size-8 text-neon/70"
                  fill="currentColor"
                >
                  <path d="M0 24V14.4C0 6.8 4.2 1.6 12.2 0l1.6 4C8.6 5.4 6.2 8.2 6 12h6v12H0zm18.2 0V14.4C18.2 6.8 22.4 1.6 30.4 0L32 4c-5.2 1.4-7.6 4.2-7.8 8h6v12H18.2z" />
                </svg>
                <blockquote className="mt-6 flex-1">
                  <p className="leading-relaxed text-foreground/90">{t.quote}</p>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-white/5 pt-6">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-display text-sm font-bold",
                      hueStyles[t.hue],
                    )}
                  >
                    {t.initials}
                  </span>
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-sm text-muted-foreground">
                      {t.role}, {t.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-20 md:mt-28">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Trusted by teams at
          </p>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
            {clients.map((client) => (
              <li
                key={client}
                className="font-display text-lg font-bold uppercase tracking-wide text-foreground/30 transition-colors duration-300 hover:text-foreground/70"
              >
                {client}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
