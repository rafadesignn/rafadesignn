"use client";

import { loveLetter, toneShift } from "@/data/story";
import Reveal from "./Reveal";

/**
 * Mudança de tom + declaração. O visual esvazia: fundo preto,
 * tipografia central, uma frase por vez conforme ela rola.
 */
export default function LoveLetter() {
  return (
    <section className="bg-black">
      {/* Mudança de tom: uma frase por tela */}
      <div className="mx-auto max-w-xl px-6">
        {toneShift.map((line, i) => (
          <div
            key={i}
            className="flex min-h-[62svh] items-center justify-center"
          >
            <Reveal amount={0.7}>
              <p className="text-center text-xl font-light leading-relaxed text-neutral-100 sm:text-2xl">
                {line}
              </p>
            </Reveal>
          </div>
        ))}
      </div>

      {/* A declaração */}
      <div className="mx-auto max-w-xl px-6 pb-24 pt-16">
        <Reveal amount={0.6}>
          <p className="mb-10 text-center text-[11px] font-medium tracking-[0.45em] text-brand">
            {loveLetter.label.toUpperCase()}
          </p>
        </Reveal>

        <div className="space-y-8">
          {loveLetter.paragraphs.map((paragraph, i) => (
            <Reveal key={i} amount={0.35}>
              <p className="text-[16px] font-light leading-[1.85] text-neutral-200">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal amount={0.6}>
          <p className="mt-12 text-right text-sm italic text-muted">
            {loveLetter.signature}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
