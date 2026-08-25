"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
import { couple, laterFlow, yesFlow } from "@/data/story";

/**
 * Overlays de resposta do pedido.
 *  - "EM BREVE…": acolhimento sem culpa e volta para a história.
 *  - "SIM": o momento visual mais bonito depois da intro — glow,
 *    feixes de luz, partículas discretas e o anúncio da renovação.
 */

function useStaged(count: number, interval = 1350, initialDelay = 600) {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= count; i++) {
      timers.push(setTimeout(() => setVisible(i), initialDelay + (i - 1) * interval));
    }
    return () => timers.forEach(clearTimeout);
  }, [count, interval, initialDelay]);
  return visible;
}

const fadeUp = {
  initial: { opacity: 0, y: 18, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
};

/* ── EM BREVE ────────────────────────────────────────────────── */

type LaterProps = { onBack: () => void };

export function LaterOverlay({ onBack }: LaterProps) {
  const steps = laterFlow.lines.length + 1; // linhas + botão
  const visible = useStaged(steps, 1500);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-6 bg-black px-8 text-center"
    >
      {laterFlow.lines.map(
        (line, i) =>
          visible > i && (
            <motion.p
              key={i}
              {...fadeUp}
              className={
                i === 0
                  ? "text-2xl font-medium"
                  : "text-base font-light leading-relaxed text-neutral-300"
              }
            >
              {line}
            </motion.p>
          ),
      )}
      {visible > laterFlow.lines.length && (
        <motion.button
          {...fadeUp}
          type="button"
          onClick={onBack}
          className="mt-4 flex min-h-12 items-center justify-center rounded-md border border-white/25 px-6 text-sm font-medium text-neutral-100 active:scale-[0.97]"
        >
          {laterFlow.backButton}
        </motion.button>
      )}
    </motion.div>
  );
}

/* ── SIM ─────────────────────────────────────────────────────── */

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CELEBRATION_COLORS = ["#E50914", "#FF4D6D", "#FFB4C0", "#FFD86B", "#FFFFFF"];

type YesProps = { onContinue: () => void };

export function YesOverlay({ onContinue }: YesProps) {
  const visible = useStaged(6, 1300, 1500);

  const streaks = useMemo(() => {
    const rnd = mulberry32(1005);
    return Array.from({ length: 26 }, () => ({
      left: (rnd() - 0.5) * 92,
      width: 1 + rnd() * 3.5,
      color: CELEBRATION_COLORS[Math.floor(rnd() * CELEBRATION_COLORS.length)],
      delay: rnd() * 0.5,
      duration: 1 + rnd() * 0.8,
      drift: (rnd() - 0.5) * 40,
    }));
  }, []);

  const particles = useMemo(() => {
    const rnd = mulberry32(87);
    return Array.from({ length: 34 }, () => ({
      x: rnd() * 100,
      y: 30 + rnd() * 70,
      size: 1.5 + rnd() * 2.5,
      delay: 1 + rnd() * 3,
      rise: 24 + rnd() * 40,
      duration: 3 + rnd() * 3,
    }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[80] overflow-hidden bg-black"
    >
      {/* Feixes de luz da celebração */}
      <div className="absolute inset-0">
        {streaks.map((s, i) => (
          <motion.span
            key={i}
            className="absolute top-[-15vh] h-[130vh]"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: [0, 0.85, 0], x: [`0vw`, `${s.drift}vw`] }}
            transition={{ delay: s.delay, duration: s.duration, ease: "easeOut" }}
            style={{
              left: `calc(50% + ${s.left}vw)`,
              width: s.width,
              background: `linear-gradient(to bottom, transparent, ${s.color} 30%, ${s.color} 70%, transparent)`,
              filter: `blur(1.5px)`,
              boxShadow: `0 0 12px ${s.color}`,
            }}
          />
        ))}
      </div>

      {/* Glow central respirando */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.45] }}
        transition={{ duration: 3, times: [0, 0.4, 1], ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% 45%, rgba(229,9,20,0.35), rgba(229,9,20,0.08) 50%, transparent 75%)",
        }}
      />

      {/* Partículas discretas subindo */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0], y: -p.rise }}
          transition={{
            delay: p.delay,
            duration: p.duration,
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
        />
      ))}

      {/* Conteúdo */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-5 px-8 text-center pb-safe">
        <AnimatePresence>
          {visible >= 1 && (
            <motion.p
              {...fadeUp}
              className="text-[11px] font-bold tracking-[0.4em] text-neutral-300"
            >
              {yesFlow.unlocked}
            </motion.p>
          )}
          {visible >= 2 && (
            <motion.h2
              initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl font-black sm:text-5xl"
              style={{ textShadow: "0 0 60px rgba(229,9,20,0.6)" }}
            >
              {yesFlow.episodeTitle}
            </motion.h2>
          )}
          {visible >= 3 && (
            <motion.p {...fadeUp} className="text-sm text-neutral-300">
              {yesFlow.premiere}
            </motion.p>
          )}
          {visible >= 4 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="rounded-full bg-brand px-5 py-2 text-sm font-bold shadow-[0_0_40px_rgba(229,9,20,0.5)]"
            >
              {yesFlow.renewed}
            </motion.span>
          )}
          {visible >= 5 && (
            <motion.div {...fadeUp}>
              <p className="text-lg font-semibold">{yesFlow.names}</p>
              <p className="mt-1 text-sm text-muted">{yesFlow.seasonConfirmed}</p>
            </motion.div>
          )}
          {visible >= 6 && (
            <motion.button
              {...fadeUp}
              type="button"
              onClick={onContinue}
              className="mt-5 flex min-h-13 items-center justify-center gap-2 rounded-md bg-white px-7 font-semibold text-black active:scale-[0.97]"
            >
              <Play size={18} fill="currentColor" />
              {yesFlow.continueButton}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <span className="sr-only">
        {couple.person2} disse sim para {couple.person1}
      </span>
    </motion.div>
  );
}
