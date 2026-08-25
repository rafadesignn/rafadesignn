"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { futureTrailer } from "@/data/story";

/**
 * "Trailer" do futuro: sequência fullscreen presa na tela (sticky)
 * em que cada frase entra e sai lentamente conforme o scroll —
 * ela controla o ritmo com o dedo, como num teaser de cinema.
 */

type LineProps = {
  progress: MotionValue<number>;
  index: number;
  total: number;
  text: string;
  isFinal: boolean;
};

function TrailerLine({ progress, index, total, text, isFinal }: LineProps) {
  const slot = 1 / total;
  const start = index * slot;
  const end = start + slot;
  const fade = slot * 0.32;

  const opacity = useTransform(
    progress,
    isFinal
      ? [start, start + fade, 1]
      : [start, start + fade, end - fade, end],
    isFinal ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, end], [26, -26]);
  const scale = useTransform(progress, [start, end], [0.97, 1.03]);

  return (
    <motion.p
      style={{ opacity, y, scale }}
      className={`absolute px-8 text-center leading-relaxed ${
        isFinal
          ? "text-2xl font-medium text-white sm:text-3xl"
          : "text-xl font-light text-neutral-200 sm:text-2xl"
      }`}
    >
      {text}
    </motion.p>
  );
}

export default function FutureTrailer() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const lines = [...futureTrailer.lines, futureTrailer.finalLine];
  const glowOpacity = useTransform(
    scrollYProgress,
    [0.86, 1],
    [0, 0.5],
  );

  return (
    <section
      ref={ref}
      style={{ height: `${lines.length * 58}svh` }}
      className="relative bg-black"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        {/* brilho discreto que cresce na frase final */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(229,9,20,0.16), transparent 70%)",
            }}
          />
        </motion.div>

        {lines.map((text, i) => (
          <TrailerLine
            key={i}
            progress={scrollYProgress}
            index={i}
            total={lines.length}
            text={text}
            isFinal={i === lines.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
