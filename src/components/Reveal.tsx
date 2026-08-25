"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  amount?: number;
};

/** Fade cinematográfico disparado quando o elemento entra na viewport. */
export default function Reveal({
  children,
  delay = 0,
  className,
  amount = 0.4,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}
