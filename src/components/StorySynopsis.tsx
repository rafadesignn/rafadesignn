"use client";

import { synopsis } from "@/data/story";
import Reveal from "./Reveal";

export default function StorySynopsis() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-12">
      <Reveal>
        <h2 className="mb-4 text-lg font-bold">{synopsis.heading}</h2>
      </Reveal>
      <div className="space-y-4">
        {synopsis.text.map((paragraph, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p className="text-[15px] leading-relaxed text-neutral-300">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.15}>
        <div className="mt-6 space-y-1.5 text-xs text-neutral-500">
          <p>
            <span className="text-neutral-600">Elenco: </span>
            {synopsis.cast}
          </p>
          <p>
            <span className="text-neutral-600">Gêneros: </span>
            {synopsis.genresLine}
          </p>
          <p>
            <span className="text-neutral-600">Este título é: </span>
            {synopsis.vibeLine}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
