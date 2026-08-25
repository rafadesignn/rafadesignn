"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { brand } from "@/data/story";

/**
 * Primeira quebra de expectativa: depois do preto pós-intro,
 * HOJENOFLIX surge lentamente ao estilo de abertura de série
 * original, com "UMA HISTÓRIA ORIGINAL" abaixo.
 */

const HOLD = 3.4; // segundos em cena antes do fade para a interface

type Props = { onComplete: () => void };

export default function HojeNoFlixReveal({ onComplete }: Props) {
  useEffect(() => {
    const t = setTimeout(onComplete, HOLD * 1000);
    return () => clearTimeout(t);
  }, [onComplete]);

  const letters = brand.name.split("");

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-black px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
      aria-hidden
    >
      <div className="flex overflow-hidden">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 26, filter: "blur(10px)", letterSpacing: "0.35em" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "0.12em" }}
            transition={{
              delay: 0.35 + i * 0.055,
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[9.2vw] sm:text-5xl font-black text-brand"
            style={{ textShadow: "0 0 40px rgba(229,9,20,0.45)" }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.9, ease: "easeOut" }}
        className="mt-4 text-[11px] sm:text-xs tracking-[0.45em] text-muted"
      >
        {brand.tagline}
      </motion.p>
    </motion.div>
  );
}
