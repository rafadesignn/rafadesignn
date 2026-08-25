"use client";

import { motion } from "framer-motion";
import { brand, couple } from "@/data/story";
import AudioController from "./AudioController";

/**
 * Header fixo estilo app de streaming: wordmark à esquerda,
 * controle de som + "perfil" da espectadora à direita.
 */
export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.4 }}
      className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-black/90 via-black/55 to-transparent pt-safe"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <span className="text-base font-black tracking-[0.14em] text-brand">
          {brand.name}
        </span>
        <div className="flex items-center gap-2.5">
          <AudioController />
          <div
            aria-label={`Perfil de ${couple.person2}`}
            className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-brand to-brand-dark text-sm font-bold"
          >
            {couple.person2.charAt(0)}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
