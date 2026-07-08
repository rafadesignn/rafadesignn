"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Aurora } from "@/components/aurora";
import { Magnetic } from "@/components/magnetic";
import { LineReveal } from "@/components/reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      {/* Backdrop layers */}
      <div className="absolute inset-0" aria-hidden="true">
        <Aurora className="size-full" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      <motion.div
        style={{ y: parallax, opacity: fade }}
        className="relative mx-auto w-full max-w-[1440px] px-5 pb-16 pt-36 sm:px-8 sm:pb-20 lg:px-12"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-md"
        >
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-neon opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-neon" />
          </span>
          Open for select projects — 2026
        </motion.p>

        <h1 className="font-display font-extrabold uppercase leading-[0.95] tracking-[-0.02em]">
          <LineReveal onLoad delay={0.25} className="text-[clamp(2.35rem,11.5vw,10.5rem)]">
            Rafael
          </LineReveal>
          <LineReveal onLoad delay={0.38} className="text-[clamp(1.55rem,7.7vw,7.5rem)]">
            <span className="text-gradient">Cavalcante</span>
          </LineReveal>
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            className="md:col-span-6 lg:col-span-5"
          >
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
              UX/UI &amp; Product Designer crafting{" "}
              <span className="text-foreground">bold, human interfaces</span>{" "}
              that people remember — from first insight to final pixel.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.68 }}
            className="flex flex-wrap items-center gap-4 md:col-span-6 lg:col-span-7 md:justify-end"
          >
            <Magnetic>
              <a
                href="#work"
                data-cursor="Scroll"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-neon px-8 text-base font-bold text-zinc-950 transition-transform duration-300 hover:scale-[1.03]"
              >
                View selected work
                <svg
                  className="size-4 transition-transform duration-300 group-hover:translate-y-1"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 2v12m0 0l5-5m-5 5L3 9" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex h-14 items-center rounded-full border border-white/15 px-8 text-base font-semibold text-foreground backdrop-blur-md transition-colors duration-300 hover:border-neon hover:text-neon"
              >
                Get in touch
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-14 flex items-center justify-between border-t border-white/5 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span>Brazil — working worldwide</span>
          <span className="hidden sm:inline">8+ yrs · 60+ products shipped</span>
          <span aria-hidden="true" className="flex items-center gap-2">
            Scroll
            <span className="relative h-8 w-px overflow-hidden bg-white/15">
              <motion.span
                className="absolute left-0 top-0 h-3 w-px bg-neon"
                animate={{ y: [-12, 32] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
