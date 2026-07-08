"use client";

import { useState, useSyncExternalStore } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Magnetic } from "@/components/magnetic";
import { FadeIn, LineReveal } from "@/components/reveal";
import { email, socials } from "@/lib/data";

function subscribeToClock(onTick: () => void) {
  const id = setInterval(onTick, 30_000);
  return () => clearInterval(id);
}

function formatBrazilTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Sao_Paulo",
  }).format(new Date());
}

function LocalTime() {
  const time = useSyncExternalStore(
    subscribeToClock,
    formatBrazilTime,
    () => null,
  );

  return (
    <span suppressHydrationWarning>{time ?? "--:--"} BRT — Brazil</span>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const from = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Project inquiry — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${from}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden border-t border-white/5"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[480px] w-[720px] max-w-full -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,oklch(0.93_0.2_122/0.1),transparent)]"
      />

      <div className="relative mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="text-center">
          <FadeIn>
            <p className="mb-6 flex items-center justify-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-neon" />
              Last call
            </p>
          </FadeIn>
          <h2
            id="contact-title"
            className="font-display font-extrabold uppercase leading-[0.95] tracking-[-0.02em]"
          >
            <LineReveal className="text-[clamp(1.7rem,7.2vw,7.5rem)]">
              Have an idea
            </LineReveal>
            <LineReveal delay={0.12} className="text-[clamp(1.7rem,7.2vw,7.5rem)]">
              <span className="text-gradient">worth building?</span>
            </LineReveal>
          </h2>
          <FadeIn delay={0.2}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              I take on a handful of projects each year. If yours needs design
              that moves both people and metrics, let&apos;s talk about it.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.25} className="mx-auto mt-14 max-w-xl">
          <form onSubmit={onSubmit} className="space-y-4" aria-label="Contact form">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  Your name
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className="h-13 rounded-2xl border-white/10 bg-white/[0.04] px-5 py-6 text-base placeholder:text-muted-foreground/70"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">
                  Your email
                </label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="h-13 rounded-2xl border-white/10 bg-white/[0.04] px-5 py-6 text-base placeholder:text-muted-foreground/70"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="sr-only">
                Tell me about your project
              </label>
              <Textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project — the problem, the timeline, the dream outcome."
                className="rounded-2xl border-white/10 bg-white/[0.04] px-5 py-4 text-base placeholder:text-muted-foreground/70"
              />
            </div>
            <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-between">
              <p className="text-sm text-muted-foreground" aria-live="polite">
                {sent
                  ? "Your email app should be open — talk soon."
                  : "Opens your email app. No newsletters, ever."}
              </p>
              <Magnetic>
                <button
                  type="submit"
                  data-cursor="Send"
                  className="inline-flex h-14 items-center gap-3 whitespace-nowrap rounded-full bg-neon px-9 text-base font-bold text-zinc-950 transition-transform duration-300 hover:scale-[1.03]"
                >
                  Start the conversation
                  <svg
                    className="size-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2 8h11m0 0L8 3m5 5l-5 5" />
                  </svg>
                </button>
              </Magnetic>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Prefer your own inbox?{" "}
            <a
              href={`mailto:${email}`}
              className="font-semibold text-neon underline-offset-4 hover:underline"
            >
              {email}
            </a>
          </p>
        </FadeIn>

        <footer className="mt-24 border-t border-white/5 pt-10 sm:mt-32">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="font-display text-lg font-bold tracking-tight">
              rafa<span className="text-neon">®</span>
            </p>
            <nav aria-label="Social links">
              <ul className="flex flex-wrap items-center justify-center gap-6">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-neon"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <LocalTime />
            </p>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-3 pb-2 text-xs text-muted-foreground/70 sm:flex-row">
            <p>© 2026 Rafael Cavalcante. Designed &amp; built with intention.</p>
            <a
              href="#top"
              className="inline-flex items-center gap-2 transition-colors hover:text-neon"
            >
              Back to top
              <svg
                className="size-3.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 14V2m0 0L3 7m5-5l5 5" />
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
