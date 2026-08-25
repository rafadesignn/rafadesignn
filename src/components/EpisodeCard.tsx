"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, MapPin, MessageCircle, Phone, Plane } from "lucide-react";
import type { Episode } from "@/data/story";

const ICONS = [MessageCircle, Phone, MapPin, Plane, Heart];

type EpisodeCardProps = { episode: Episode; index: number };

/**
 * Card no formato de episódio de streaming. Episódios sem foto
 * (a fase das conversas) ganham thumbnail gráfica com ícone —
 * também é o fallback caso alguma imagem esteja ausente.
 */
export default function EpisodeCard({ episode, index }: EpisodeCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = ICONS[index % ICONS.length];
  const hasImage = Boolean(episode.image) && !imageFailed;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.06 }}
      id={`episodio-${episode.number}`}
      className={`snap-start shrink-0 scroll-ml-5 ${
        episode.featured ? "w-[84vw] max-w-[400px]" : "w-[74vw] max-w-[330px]"
      }`}
    >
      <div className="relative aspect-video overflow-hidden rounded-lg bg-surface-2">
        {hasImage ? (
          <Image
            src={episode.image!}
            alt={`Episódio ${episode.number} — ${episode.title}`}
            fill
            sizes="(max-width: 768px) 84vw, 400px"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface-2 via-surface to-black">
            <Icon size={34} className="text-brand/70" strokeWidth={1.5} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute bottom-1.5 right-3 text-4xl font-black text-white/25">
          {episode.number}
        </span>
        {typeof episode.progress === "number" && (
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/20">
            <div
              className="h-full bg-brand"
              style={{ width: `${episode.progress}%` }}
            />
          </div>
        )}
      </div>

      <div className="mt-2.5 px-0.5">
        <p className="text-[10px] font-medium tracking-[0.18em] text-neutral-500">
          EPISÓDIO {episode.number} • {episode.duration.toUpperCase()}
        </p>
        <h3 className="mt-1 font-semibold leading-snug">{episode.title}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-400">
          {episode.description}
        </p>
      </div>
    </motion.article>
  );
}
