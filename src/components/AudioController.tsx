"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { audio } from "@/data/story";

/**
 * Controle discreto de trilha sonora. Safari/iPhone bloqueia autoplay
 * com áudio, então a experiência inteira funciona em silêncio — este
 * botão só aparece se /public/audio/intro.mp3 existir, e o som só
 * toca depois que ela mesma tocar no botão.
 */
export default function AudioController() {
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(audio.src, { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") ?? "";
        if (!cancelled && res.ok && !type.includes("text/html")) {
          setAvailable(true);
        }
      })
      .catch(() => {
        /* sem arquivo, sem botão */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audio.src);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.45;
    }
    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch {
      // navegador recusou — não bloqueia nada
    }
  };

  if (!available) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? audio.disableLabel : audio.enableLabel}
      className="flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 text-xs text-muted backdrop-blur-sm transition-colors active:bg-white/10"
    >
      {playing ? <Volume2 size={15} /> : <VolumeX size={15} />}
      <span className="hidden sm:inline">
        {playing ? audio.disableLabel : `♫ ${audio.enableLabel}`}
      </span>
    </button>
  );
}
