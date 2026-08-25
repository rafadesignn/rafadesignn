"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { futureEpisodes, futureTransition } from "@/data/story";
import Reveal from "./Reveal";

/**
 * Transição ("tem uma parte que ainda não aconteceu") e os
 * PRÓXIMOS EPISÓDIOS: cards bloqueados, com blur, cadeado e badge.
 */
export default function FutureEpisodes() {
  return (
    <section className="bg-black pb-6">
      {/* Frases de transição, uma por tela */}
      <div className="mx-auto max-w-xl px-6">
        {futureTransition.map((line, i) => (
          <div key={i} className="flex min-h-[55svh] items-center justify-center">
            <Reveal amount={0.7}>
              <p className="text-center text-xl font-light leading-relaxed text-neutral-100 sm:text-2xl">
                {line}
              </p>
            </Reveal>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-5xl px-5 pt-16">
        <Reveal amount={0.6}>
          <h2 className="text-[13px] font-bold tracking-[0.35em] text-neutral-300">
            {futureEpisodes.title.toUpperCase()}
          </h2>
        </Reveal>
      </div>

      <div className="rail no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
        {futureEpisodes.items.map((episode, i) => (
          <motion.article
            key={episode.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.06 }}
            className={`snap-start shrink-0 scroll-ml-5 ${
              episode.highlight ? "w-[82vw] max-w-[380px]" : "w-[68vw] max-w-[300px]"
            }`}
          >
            <div
              className={`relative aspect-video overflow-hidden rounded-lg ${
                episode.highlight
                  ? "ring-1 ring-brand/60 shadow-[0_0_36px_rgba(229,9,20,0.18)]"
                  : ""
              }`}
            >
              {/* "imagem" bloqueada: gradiente escuro desfocado */}
              <div
                className="absolute inset-0 blur-2xl saturate-50"
                style={{
                  background: `radial-gradient(circle at ${25 + (i * 17) % 55}% ${
                    30 + (i * 23) % 45
                  }%, rgba(229,9,20,0.28), rgba(22,22,22,0.9) 60%, #000 100%)`,
                }}
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50">
                  <Lock size={17} className="text-neutral-300" />
                </span>
              </div>
              {episode.badge && (
                <span className="absolute left-3 top-3 rounded-sm bg-brand px-2 py-0.5 text-[9px] font-bold tracking-[0.14em]">
                  {episode.badge}
                </span>
              )}
            </div>

            <div className="mt-2.5 px-0.5">
              <h3 className="font-semibold leading-snug">{episode.title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-neutral-400">
                {episode.description}
              </p>
            </div>
          </motion.article>
        ))}
        <div className="w-1 shrink-0" aria-hidden />
      </div>
    </section>
  );
}
