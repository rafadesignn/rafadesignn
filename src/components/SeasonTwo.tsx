"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { seasonTwo } from "@/data/story";
import Reveal from "./Reveal";

/**
 * Temporada 2 — só existe depois do sim. O roteiro está em aberto
 * e agora é escrito a dois.
 */
export default function SeasonTwo() {
  return (
    <motion.section
      id="temporada-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="scroll-mt-16 py-14"
    >
      <div className="mx-auto max-w-5xl px-5">
        <Reveal amount={0.6}>
          <span className="rounded-sm bg-brand px-2 py-0.5 text-[9px] font-bold tracking-[0.14em]">
            NOVA
          </span>
          <h2 className="mt-3 text-2xl font-bold">{seasonTwo.title}</h2>
          <p className="mt-1 text-base text-neutral-200">{seasonTwo.subtitle}</p>
          <div className="mt-3 space-y-1">
            {seasonTwo.intro.map((line, i) => (
              <p key={i} className="text-sm text-muted">
                {line}
              </p>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="rail no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
        {seasonTwo.episodes.map((episode, i) => (
          <motion.article
            key={episode.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.06 }}
            className="w-[62vw] max-w-[280px] shrink-0 snap-start scroll-ml-5"
          >
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, rgba(229,9,20,${
                    0.32 - i * 0.03
                  }) 0%, #161616 55%, #000 100%)`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/40">
                  <Play size={16} fill="currentColor" className="ml-0.5" />
                </span>
              </div>
              <span className="absolute bottom-1.5 right-3 text-3xl font-black text-white/25">
                {episode.number}
              </span>
            </div>
            <div className="mt-2.5 px-0.5">
              <p className="text-[10px] font-medium tracking-[0.18em] text-neutral-500">
                EP. {String(episode.number).padStart(2, "0")}
              </p>
              <h3 className="mt-1 font-semibold leading-snug">{episode.title}</h3>
            </div>
          </motion.article>
        ))}
        <div className="w-1 shrink-0" aria-hidden />
      </div>

      <Reveal amount={0.6}>
        <div className="mx-auto mt-6 max-w-5xl px-5">
          {seasonTwo.outro.map((line, i) => (
            <p key={i} className="text-sm italic text-neutral-500">
              {line}
            </p>
          ))}
        </div>
      </Reveal>
    </motion.section>
  );
}
