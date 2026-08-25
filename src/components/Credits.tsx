"use client";

import { credits, finalWords } from "@/data/story";
import Reveal from "./Reveal";

/**
 * Frases finais (uma por tela) e créditos cinematográficos.
 */
export default function Credits() {
  return (
    <section className="bg-black">
      {/* Final antes dos créditos */}
      <div className="mx-auto max-w-xl px-6">
        {finalWords.map((line, i) => (
          <div key={i} className="flex min-h-[52svh] items-center justify-center">
            <Reveal amount={0.7}>
              <p className="text-center text-xl font-light leading-relaxed text-neutral-100 sm:text-2xl">
                {line}
              </p>
            </Reveal>
          </div>
        ))}
      </div>

      {/* Créditos */}
      <div className="mx-auto flex max-w-xl flex-col items-center gap-14 px-6 pb-28 pt-24 text-center">
        <Reveal amount={0.6}>
          <p className="text-2xl font-black tracking-[0.14em] text-brand">
            {credits.brand}
          </p>
          <p className="mt-2 text-[10px] tracking-[0.45em] text-muted">
            {credits.tagline}
          </p>
        </Reveal>

        {credits.cast.map((person, i) => (
          <Reveal key={i} amount={0.6}>
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-lg font-semibold">{person.name}</p>
              <p className="text-[11px] tracking-[0.3em] text-neutral-500">
                {person.as.toUpperCase()}
              </p>
              <p className="max-w-xs text-sm italic leading-relaxed text-neutral-300">
                {person.role}
              </p>
            </div>
          </Reveal>
        ))}

        {credits.lines.map((line, i) => (
          <Reveal key={i} amount={0.6}>
            <p className="max-w-sm text-sm leading-relaxed text-neutral-400">
              {line}
            </p>
          </Reveal>
        ))}

        <Reveal amount={0.6}>
          <p className="text-base font-medium tracking-[0.2em] text-neutral-200">
            {credits.final}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
