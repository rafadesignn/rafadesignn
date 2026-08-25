"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import NetflixIntro from "@/components/NetflixIntro";
import HojeNoFlixReveal from "@/components/HojeNoFlixReveal";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StorySynopsis from "@/components/StorySynopsis";
import Season from "@/components/Season";
import RatingCard from "@/components/RatingCard";
import MemoryGallery from "@/components/MemoryGallery";
import SmallMoments from "@/components/SmallMoments";
import LoveLetter from "@/components/LoveLetter";
import FutureEpisodes from "@/components/FutureEpisodes";
import FutureTrailer from "@/components/FutureTrailer";
import Proposal from "@/components/Proposal";
import { LaterOverlay, YesOverlay } from "@/components/ProposalResult";
import SeasonTwo from "@/components/SeasonTwo";
import Credits from "@/components/Credits";
import PostCredits from "@/components/PostCredits";
import { useRelationship } from "@/hooks/useRelationship";

/**
 * A experiência inteira:
 *   preto → abertura Netflix → preto → HOJENOFLIX → interface de
 *   streaming → história → declaração → futuro → pedido.
 */

type Phase = "intro" | "reveal" | "main";
type Outcome = null | "yes" | "later";

export default function Page() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [outcome, setOutcome] = useState<Outcome>(null);
  const { official, makeOfficial } = useRelationship();

  // Sem scroll enquanto a abertura acontece
  useEffect(() => {
    const locked = phase !== "main";
    document.documentElement.classList.toggle("lock-scroll", locked);
    return () => document.documentElement.classList.remove("lock-scroll");
  }, [phase]);

  const toReveal = useCallback(() => setPhase("reveal"), []);
  const toMain = useCallback(() => setPhase("main"), []);

  const handleYesContinue = useCallback(() => {
    makeOfficial();
    setOutcome(null);
    setTimeout(() => {
      document
        .getElementById("temporada-2")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
  }, [makeOfficial]);

  const handleLaterBack = useCallback(() => {
    setOutcome(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <AnimatePresence>
        {phase === "intro" && <NetflixIntro key="intro" onComplete={toReveal} />}
        {phase === "reveal" && (
          <HojeNoFlixReveal key="reveal" onComplete={toMain} />
        )}
      </AnimatePresence>

      {phase === "main" && (
        <main>
          <Header />
          <Hero official={official} />
          <StorySynopsis />
          <Season />
          <RatingCard />
          <MemoryGallery />
          <SmallMoments />
          <LoveLetter />
          <FutureEpisodes />
          <FutureTrailer />
          <Proposal
            official={official}
            onYes={() => setOutcome("yes")}
            onLater={() => setOutcome("later")}
          />
          {official && <SeasonTwo />}
          <Credits />
          <PostCredits />
        </main>
      )}

      <AnimatePresence>
        {outcome === "later" && (
          <LaterOverlay key="later" onBack={handleLaterBack} />
        )}
        {outcome === "yes" && (
          <YesOverlay key="yes" onContinue={handleYesContinue} />
        )}
      </AnimatePresence>
    </>
  );
}
