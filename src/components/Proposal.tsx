"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { proposal, yesFlow } from "@/data/story";
import Reveal from "./Reveal";

type ProposalProps = {
  official: boolean;
  onYes: () => void;
  onLater: () => void;
};

/**
 * Preparação (uma frase por tela, fundo preto) e o pedido.
 * Sem botão "não" — mas "EM BREVE…" é uma escolha legítima,
 * com o mesmo tamanho e sem truque.
 */
export default function Proposal({ official, onYes, onLater }: ProposalProps) {
  return (
    <section id="pedido" className="bg-black">
      {/* Preparação */}
      <div className="mx-auto max-w-xl px-6">
        {proposal.preparation.map((line, i) => (
          <div key={i} className="flex min-h-[58svh] items-center justify-center">
            <Reveal amount={0.7}>
              <p
                className={`text-center leading-relaxed ${
                  i === 0
                    ? "text-2xl font-semibold text-white"
                    : "text-xl font-light text-neutral-100 sm:text-2xl"
                }`}
              >
                {line}
              </p>
            </Reveal>
          </div>
        ))}
      </div>

      {/* Episódio especial */}
      <div className="flex min-h-[50svh] items-center justify-center px-6">
        <Reveal amount={0.7}>
          <span className="rounded-sm border border-brand px-3 py-1.5 text-[11px] font-bold tracking-[0.35em] text-brand">
            {proposal.specialBadge}
          </span>
        </Reveal>
      </div>

      <div className="flex min-h-[45svh] items-center justify-center px-6">
        <Reveal amount={0.7}>
          <p className="text-center text-2xl font-light text-neutral-100">
            {proposal.callName}
          </p>
        </Reveal>
      </div>

      {/* O pedido */}
      <div className="flex min-h-svh flex-col items-center justify-center px-6 pb-safe">
        <Reveal amount={0.5}>
          <h2 className="text-center text-[11vw] font-black leading-tight sm:text-5xl">
            {proposal.question}
          </h2>
        </Reveal>

        {official ? (
          <Reveal amount={0.5} delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-2">
              <span className="rounded-full bg-brand px-4 py-1.5 text-sm font-bold">
                {yesFlow.renewed}
              </span>
              <p className="text-sm text-muted">
                Ela disse sim. {yesFlow.seasonConfirmed.toLowerCase()}.
              </p>
            </div>
          </Reveal>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex w-full max-w-xs flex-col gap-3.5"
          >
            <button
              type="button"
              onClick={onYes}
              className="flex min-h-14 items-center justify-center gap-2.5 rounded-md bg-brand text-lg font-bold shadow-[0_0_40px_rgba(229,9,20,0.35)] transition-transform active:scale-[0.97]"
            >
              <Heart size={20} fill="currentColor" />
              {proposal.yesButton}
            </button>
            <button
              type="button"
              onClick={onLater}
              className="flex min-h-14 items-center justify-center rounded-md border border-white/25 text-base font-medium text-neutral-200 transition-transform active:scale-[0.97]"
            >
              {proposal.laterButton}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
