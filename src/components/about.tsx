"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { principles, stats } from "@/lib/data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-t border-white/5 bg-white/[0.015]"
    >
      <div className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <SectionHeading
          label="About"
          title={
            <span id="about-title">
              Design is how it <span className="text-gradient">works</span>
            </span>
          }
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-6">
            <FadeIn>
              <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
                I&apos;m Rafael — a Brazilian product designer who has spent the
                last eight years turning ambiguous briefs into products people
                rely on daily. I run{" "}
                <span className="text-foreground">Cavalcante Digital Services</span>,
                partnering with founders and product teams from healthtech to
                fintech to AI.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="leading-relaxed text-muted-foreground">
                My work sits at the intersection of research rigor and visual
                craft: I interview the users, map the funnel, design the system
                — then obsess over the last 4 pixels anyway. Lately I&apos;ve
                been pairing that craft with AI-assisted workflows, exploring
                ten directions in the time one used to take, without letting
                the machine make the taste decisions.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <blockquote className="border-l-2 border-neon pl-6">
                <p className="font-display text-xl font-semibold leading-snug sm:text-2xl">
                  &ldquo;Good design is invisible until it makes you feel
                  something.&rdquo;
                </p>
              </blockquote>
            </FadeIn>

            <FadeIn delay={0.2}>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-background p-6 sm:p-8">
                    <dt className="order-2 mt-2 block text-sm leading-snug text-muted-foreground">
                      {stat.label}
                    </dt>
                    <dd className="order-1 font-display text-4xl font-extrabold text-neon sm:text-5xl">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>

          <div className="lg:col-span-6">
            <FadeIn delay={0.1}>
              <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Three principles I don&apos;t compromise on
              </h3>
            </FadeIn>
            <ol className="mt-6 space-y-4">
              {principles.map((principle, i) => (
                <FadeIn key={principle.title} delay={0.12 + i * 0.08}>
                  <li className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-500 hover:border-neon/40 sm:p-8">
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-sm font-bold text-neon">
                        0{i + 1}
                      </span>
                      <h4 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                        {principle.title}
                      </h4>
                    </div>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {principle.body}
                    </p>
                  </li>
                </FadeIn>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
