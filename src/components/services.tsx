"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FadeIn } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/data";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <SectionHeading
        label="Services"
        title={
          <span id="services-title">
            What I can <span className="text-gradient">do for you</span>
          </span>
        }
        description="Six disciplines, one goal: products that feel effortless and perform measurably. Engagements range from focused sprints to embedded partnerships."
      />

      <div className="mt-16" role="presentation">
        {services.map((service, i) => {
          const open = openIndex === i;
          return (
            <FadeIn key={service.index} delay={i * 0.04}>
              <div className="border-t border-white/10 last:border-b">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`service-panel-${i}`}
                    id={`service-trigger-${i}`}
                    className="group flex w-full items-center gap-5 py-7 text-left sm:gap-8 sm:py-8"
                  >
                    <span
                      className={cn(
                        "font-display text-sm font-bold transition-colors duration-300",
                        open ? "text-neon" : "text-muted-foreground",
                      )}
                    >
                      {service.index}
                    </span>
                    <span className="flex-1">
                      <span
                        className={cn(
                          "block font-display text-2xl font-bold tracking-tight transition-all duration-300 sm:text-4xl",
                          open
                            ? "translate-x-2 text-neon"
                            : "group-hover:translate-x-2 group-hover:text-neon/80",
                        )}
                      >
                        {service.title}
                      </span>
                      <span className="mt-1 hidden text-sm text-muted-foreground sm:block">
                        {service.tagline}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:size-12",
                        open
                          ? "rotate-45 border-neon bg-neon text-zinc-950"
                          : "border-white/15 text-foreground group-hover:border-neon group-hover:text-neon",
                      )}
                    >
                      <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M8 3v10M3 8h10" />
                      </svg>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`service-panel-${i}`}
                      role="region"
                      aria-labelledby={`service-trigger-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-9 pl-10 pr-2 sm:pl-16 md:grid-cols-2 md:gap-12">
                        <p className="max-w-lg leading-relaxed text-muted-foreground">
                          {service.description}
                        </p>
                        <ul className="flex flex-wrap content-start gap-2">
                          {service.deliverables.map((item) => (
                            <li
                              key={item}
                              className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-sm text-foreground/80"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
