"use client";

import { seasonOne } from "@/data/story";
import EpisodeCard from "./EpisodeCard";
import Reveal from "./Reveal";

export default function Season() {
  return (
    <section id="temporada-1" className="scroll-mt-16 py-10">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal amount={0.6}>
          <h2 className="text-xl font-bold">{seasonOne.title}</h2>
          <p className="mt-1 text-sm text-muted">{seasonOne.subtitle}</p>
        </Reveal>
      </div>

      <div className="rail no-scrollbar mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
        {seasonOne.episodes.map((episode, i) => (
          <EpisodeCard key={episode.number} episode={episode} index={i} />
        ))}
        <div className="w-1 shrink-0" aria-hidden />
      </div>
    </section>
  );
}
