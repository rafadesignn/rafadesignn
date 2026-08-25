"use client";

import { rating } from "@/data/story";
import Reveal from "./Reveal";

/** Momento de humor: classificação indicativa da série. */
export default function RatingCard() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <Reveal>
        <div className="flex items-start gap-4 rounded-lg border border-white/10 bg-surface p-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-brand text-lg font-black">
            {rating.age}
          </span>
          <div>
            <p className="text-[10px] font-medium tracking-[0.22em] text-neutral-500">
              {rating.label.toUpperCase()}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-neutral-300">
              {rating.content}
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
