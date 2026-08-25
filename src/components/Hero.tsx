"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Play, Plus } from "lucide-react";
import { hero } from "@/data/story";

type HeroProps = { official: boolean };

/**
 * Hero fullscreen no vocabulário de streaming premium: foto do casal,
 * gradientes para legibilidade, metadata de série e ações.
 */
export default function Hero({ official }: HeroProps) {
  const [listAdded, setListAdded] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const matchTaps = useRef(0);
  const tooltipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const inList = official || listAdded;

  const onMatchTap = () => {
    matchTaps.current += 1;
    if (matchTaps.current >= 4) {
      matchTaps.current = 0;
      setTooltip(true);
      if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
      tooltipTimer.current = setTimeout(() => setTooltip(false), 2600);
    }
  };

  const scrollToEpisodes = () => {
    document
      .getElementById("temporada-1")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative flex min-h-svh flex-col justify-end overflow-hidden">
      {/* Foto principal */}
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-14 pb-safe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Selo de série */}
          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg font-black leading-none text-brand">HN</span>
            <span className="text-[10px] font-medium tracking-[0.42em] text-neutral-300">
              SÉRIE
            </span>
          </div>

          <h1 className="text-[13vw] font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
            {hero.title}
          </h1>

          {/* Metadata */}
          <div className="relative mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            <button
              type="button"
              onClick={onMatchTap}
              className="min-h-11 -my-2.5 py-2.5 font-semibold text-match"
            >
              {official ? hero.matchOfficial : hero.match}
            </button>
            <span className="text-neutral-300">2026</span>
            <span className="rounded-sm border border-neutral-500 px-1.5 py-px text-[10px] leading-tight text-neutral-300">
              16
            </span>
            <span className="text-neutral-300">
              {official ? hero.seasonsOfficial : hero.seasons}
            </span>
            <span className="rounded-sm border border-neutral-500 px-1 py-px text-[9px] leading-tight text-neutral-300">
              HD
            </span>

            <AnimatePresence>
              {tooltip && (
                <motion.span
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute -top-11 left-0 whitespace-nowrap rounded-md bg-surface-2 px-3 py-2 text-xs text-neutral-200 shadow-xl shadow-black/60"
                >
                  {hero.matchEasterEgg}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <p className="mt-2 text-sm text-muted">{hero.since}</p>
          <p className="mt-1 text-xs text-neutral-500">{hero.genres}</p>

          <AnimatePresence>
            {official && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 inline-block rounded-full bg-brand px-3 py-1 text-xs font-semibold"
              >
                {hero.girlfriendBadge}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Ações */}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={scrollToEpisodes}
              className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-white px-6 font-semibold text-black transition-transform active:scale-[0.97] sm:flex-none"
            >
              <Play size={19} fill="currentColor" />
              {hero.watch}
            </button>
            <button
              type="button"
              onClick={() => setListAdded((v) => !v)}
              className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-white/15 px-5 font-medium text-white backdrop-blur-sm transition-transform active:scale-[0.97] sm:flex-none"
            >
              <AnimatePresence mode="wait" initial={false}>
                {inList ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0, rotate: -60 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 22 }}
                    className="flex items-center"
                  >
                    <Check size={19} className="text-match" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="plus"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0, rotate: 60 }}
                    className="flex items-center"
                  >
                    <Plus size={19} />
                  </motion.span>
                )}
              </AnimatePresence>
              {inList ? hero.myListDone : hero.myList}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
