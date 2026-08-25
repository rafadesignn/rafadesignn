"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { brand } from "@/data/story";

/**
 * Recriação do ident "Tudum" (2019–hoje), reconstruída do zero:
 *   preto → N vermelho surge no centro → leve push-in → a câmera
 *   mergulha no logo enquanto ele se estilhaça em dezenas de feixes
 *   verticais coloridos (espectro tipo padrão de teste) que varrem a
 *   tela com glow e motion blur → corte seco para o preto.
 *
 * Linha do tempo (~3.5s, próxima da duração real do ident):
 *   0–450ms      preto absoluto
 *   450–1700ms   logo em cena, zoom quase imperceptível
 *   1700–2750ms  mergulho + explosão de feixes verticais
 *   2750–3550ms  preto (pausa dramática) → onComplete
 */

const T = {
  logoIn: 0.45,
  zoomStart: 1.7,
  streaksStart: 1.78,
  cutToBlack: 2.75,
  complete: 3.4,
};

// PRNG com semente fixa: mesmo resultado no servidor e no cliente
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Espectro do burst: vermelhos dominantes + cores de "padrão de teste"
const SPECTRUM = [
  "#E50914", "#B00710", "#FF2A1F", "#FF0A54", "#8E0308", "#FF4D00",
  "#FFB400", "#FFD86B", "#7B2FF7", "#4318D8", "#0058F0", "#00A6FF",
  "#00E0C6", "#00C853", "#B4E33D", "#FF7AC6",
];

type Streak = {
  left: number;      // deslocamento a partir do centro, em vw
  width: number;     // px
  color: string;
  delay: number;     // s (relativo ao início dos feixes)
  duration: number;  // s
  drift: number;     // deslocamento horizontal final, em vw
  blur: number;      // px
  scaleY: number;
};

function buildStreaks(count: number): Streak[] {
  const rnd = mulberry32(20260510);
  const streaks: Streak[] = [];
  for (let i = 0; i < count; i++) {
    // concentra feixes perto do centro (onde o N "se abre")
    const side = rnd() < 0.5 ? -1 : 1;
    const offset = side * Math.pow(rnd(), 1.6) * 46;
    const redBias = rnd() < 0.42;
    streaks.push({
      left: offset,
      width: 1.5 + rnd() * 5.5,
      color: redBias
        ? SPECTRUM[Math.floor(rnd() * 6)]
        : SPECTRUM[Math.floor(rnd() * SPECTRUM.length)],
      delay: rnd() * 0.22,
      duration: 0.75 + rnd() * 0.35,
      drift: offset * (1.7 + rnd() * 1.4) + side * 6,
      blur: 0.4 + rnd() * 2.2,
      scaleY: 0.88 + rnd() * 0.12,
    });
  }
  return streaks;
}

type NetflixIntroProps = { onComplete: () => void };

export default function NetflixIntro({ onComplete }: NetflixIntroProps) {
  const [phase, setPhase] = useState<"black" | "logo" | "zoom" | "out">("black");
  const streaks = useMemo(() => buildStreaks(56), []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("logo"), T.logoIn * 1000),
      setTimeout(() => setPhase("zoom"), T.zoomStart * 1000),
      setTimeout(() => setPhase("out"), T.cutToBlack * 1000),
      setTimeout(onComplete, T.complete * 1000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const showLogo = phase === "logo" || phase === "zoom";
  const showStreaks = phase === "zoom";

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden bg-black"
      style={{ perspective: "900px" }}
      aria-hidden
    >
      {/* Logo N: entra seco, respira, depois mergulha na tela */}
      {showLogo && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 1 }}
          animate={
            phase === "logo"
              ? { opacity: 1, scale: 1.045 }
              : { opacity: [1, 1, 0], scale: [1.045, 4.2, 15] }
          }
          transition={
            phase === "logo"
              ? {
                  opacity: { duration: 0.16, ease: "easeOut" },
                  scale: { duration: 1.3, ease: "linear" },
                }
              : {
                  opacity: { duration: 0.72, times: [0, 0.35, 1], ease: "easeIn" },
                  scale: { duration: 1.05, times: [0, 0.6, 1], ease: [0.7, 0, 0.9, 0.4] },
                }
          }
          style={{ transformOrigin: "50% 47%" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brand.netflixLogo}
            alt=""
            draggable={false}
            className="w-[46vw] max-w-[280px] select-none"
          />
        </motion.div>
      )}

      {/* Glow vermelho que incha no momento do mergulho */}
      {showStreaks && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.65, 0] }}
          transition={{ duration: 1.0, times: [0, 0.4, 1], ease: "easeOut" }}
          style={{
            background:
              "radial-gradient(ellipse 60% 90% at 50% 50%, rgba(229,9,20,0.55), rgba(229,9,20,0.12) 45%, transparent 70%)",
          }}
        />
      )}

      {/* Feixes verticais: o espectro que varre a tela */}
      {showStreaks && (
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: 3.1 }}
          transition={{ duration: 1.05, ease: [0.55, 0, 0.85, 0.35] }}
          style={{ transformOrigin: "50% 50%" }}
        >
          {streaks.map((s, i) => (
            <motion.span
              key={i}
              className="absolute top-[-20vh] h-[140vh]"
              initial={{ scaleY: 0, opacity: 0, x: 0 }}
              animate={{
                scaleY: [0, s.scaleY, s.scaleY],
                opacity: [0, 1, 1, 0.9],
                x: [`0vw`, `${s.drift}vw`],
              }}
              transition={{
                delay: s.delay,
                duration: s.duration,
                scaleY: { times: [0, 0.38, 1], duration: s.duration, delay: s.delay },
                opacity: { times: [0, 0.12, 0.85, 1], duration: s.duration, delay: s.delay },
                ease: [0.4, 0, 0.8, 0.4],
              }}
              style={{
                left: `calc(50% + ${s.left}vw)`,
                width: s.width,
                background: `linear-gradient(to bottom, transparent 0%, ${s.color} 18%, ${s.color} 82%, transparent 100%)`,
                filter: `blur(${s.blur}px) brightness(1.6)`,
                boxShadow: `0 0 ${s.width * 4.5}px ${s.color}`,
                transformOrigin: "50% 50%",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Corte final para o preto */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "out" ? 1 : 0 }}
        transition={{ duration: 0.12 }}
      />
    </div>
  );
}
