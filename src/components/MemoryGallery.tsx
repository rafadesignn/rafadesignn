"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery, humorBits } from "@/data/story";
import Reveal from "./Reveal";

/**
 * "Cenas que eu assistiria de novo" — trilho horizontal com snap e
 * lightbox fullscreen com swipe. Mídias ausentes somem sozinhas.
 */
export default function MemoryGallery() {
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<number | null>(null);

  const items = gallery.items.filter((m) => !failed.has(m.src));

  const markFailed = (src: string) =>
    setFailed((prev) => new Set(prev).add(src));

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length],
  );
  const prev = useCallback(
    () =>
      setOpen((i) => (i === null ? null : (i - 1 + items.length) % items.length)),
    [items.length],
  );

  // trava o scroll da página enquanto o lightbox está aberto
  useEffect(() => {
    document.documentElement.classList.toggle("lock-scroll", open !== null);
    return () => document.documentElement.classList.remove("lock-scroll");
  }, [open]);

  if (items.length === 0) return null;

  const current = open !== null ? items[open] : null;

  return (
    <section className="py-10">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal amount={0.6}>
          <h2 className="text-xl font-bold">{gallery.title}</h2>
          <p className="mt-1 text-xs text-neutral-500">{humorBits.gallery}</p>
        </Reveal>
      </div>

      <div className="rail no-scrollbar mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4">
        {items.map((item, i) => (
          <motion.button
            key={item.src}
            type="button"
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.07 }}
            className="relative aspect-[2/3] h-64 shrink-0 snap-start scroll-ml-5 overflow-hidden rounded-lg bg-surface-2"
            aria-label={`Abrir cena ${i + 1}`}
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={item.caption ?? `Cena ${i + 1}`}
                fill
                sizes="200px"
                className="object-cover transition-transform duration-500 active:scale-105"
                onError={() => markFailed(item.src)}
              />
            ) : (
              <video
                src={item.src}
                poster={item.poster}
                preload="none"
                muted
                playsInline
                className="h-full w-full object-cover"
                onError={() => markFailed(item.src)}
              />
            )}
          </motion.button>
        ))}
        <div className="w-1 shrink-0" aria-hidden />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col bg-black"
          >
            <div className="flex items-center justify-between px-4 pt-safe">
              <span className="pl-1 pt-3 text-xs text-neutral-500">
                {open + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Fechar"
                className="mt-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <motion.div
              key={current.src}
              className="relative flex-1"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) next();
                else if (info.offset.x > 70) prev();
              }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {current.type === "image" ? (
                <Image
                  src={current.src}
                  alt={current.caption ?? "Cena"}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              ) : (
                <video
                  src={current.src}
                  poster={current.poster}
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-contain"
                />
              )}
            </motion.div>

            <div className="flex items-center justify-between px-4 pb-safe">
              <button
                type="button"
                onClick={prev}
                aria-label="Anterior"
                className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10"
              >
                <ChevronLeft size={20} />
              </button>
              {current.caption && (
                <p className="mx-3 mb-3 flex-1 text-center text-sm text-neutral-300">
                  {current.caption}
                </p>
              )}
              <button
                type="button"
                onClick={next}
                aria-label="Próxima"
                className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
