"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { postCredits } from "@/data/story";

/**
 * Cena pós-créditos: quando a seção entra na tela, as frases
 * aparecem sozinhas, uma a uma, com pausa entre elas.
 */
export default function PostCredits() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6, once: true });
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    postCredits.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), 1800 + i * 1900));
    });
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="flex min-h-svh flex-col items-center justify-center gap-7 bg-black px-8 pb-safe text-center"
    >
      {postCredits.map(
        (line, i) =>
          visible > i && (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`leading-relaxed ${
                i === 3 || i === 4
                  ? "text-xl font-medium text-white"
                  : "text-base font-light text-neutral-300"
              }`}
            >
              {line}
            </motion.p>
          ),
      )}
    </section>
  );
}
