"use client";

import { motion, useInView, type Variants } from "motion/react";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts content into view once, on scroll. */
export function FadeIn({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Masked line reveal — text slides up from behind an overflow clip.
 * Visibility is observed on the outer (unclipped) wrapper: the inner
 * span starts fully outside the clip, so observing it directly would
 * never fire.
 */
export function LineReveal({
  children,
  delay = 0,
  onLoad = false,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  /** Animate on mount (hero) instead of on scroll into view. */
  onLoad?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const show = onLoad || inView;

  return (
    <span ref={ref} className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: "110%", opacity: 0.6 }}
        animate={show ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0.6 }}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
