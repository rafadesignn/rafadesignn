"use client";

import { useState } from "react";
import Image from "next/image";
import { humorBits, smallMoments } from "@/data/story";
import Reveal from "./Reveal";

/**
 * "As cenas que não estavam no roteiro" — os detalhes que Rafael
 * lembra: frases curtas intercaladas com fotos pequenas.
 */
export default function SmallMoments() {
  const [failed, setFailed] = useState<Set<string>>(new Set());

  return (
    <section className="mx-auto max-w-2xl px-5 py-14">
      <Reveal amount={0.6}>
        <h2 className="text-center text-xl font-bold">{smallMoments.title}</h2>
        <p className="mx-auto mt-2 max-w-sm text-center text-sm text-muted">
          {smallMoments.intro}
        </p>
      </Reveal>

      <div className="mt-12 space-y-12">
        {smallMoments.moments.map((moment, i) => (
          <Reveal key={i} amount={0.5}>
            <div className="flex flex-col items-center gap-6">
              {moment.image && !failed.has(moment.image) && (
                <div
                  className={`relative aspect-[3/4] w-40 overflow-hidden rounded-md shadow-xl shadow-black/50 ${
                    i % 2 === 0 ? "rotate-2" : "-rotate-2"
                  }`}
                >
                  <Image
                    src={moment.image}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover"
                    onError={() =>
                      setFailed((prev) => new Set(prev).add(moment.image!))
                    }
                  />
                </div>
              )}
              <p className="max-w-md text-center text-[15px] font-light leading-relaxed text-neutral-200">
                {moment.text}
              </p>
              {i < smallMoments.moments.length - 1 && (
                <span className="block h-px w-10 bg-white/10" aria-hidden />
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal amount={0.6}>
        <p className="mt-14 text-center text-sm italic text-muted">
          {smallMoments.outro}
        </p>
        <p className="mt-8 text-center text-xs text-neutral-600">
          {humorBits.audio}
        </p>
      </Reveal>
    </section>
  );
}
