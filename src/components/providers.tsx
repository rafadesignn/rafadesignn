"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { useMediaQuery } from "@/lib/hooks";

/**
 * Wires up smooth scrolling (Lenis) and global motion settings.
 * Lenis is skipped entirely when the user prefers reduced motion;
 * MotionConfig `reducedMotion="user"` strips transform animations too.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  const content = <MotionConfig reducedMotion="user">{children}</MotionConfig>;

  if (reduced) return content;

  return (
    <ReactLenis root options={{ lerp: 0.11, anchors: { offset: -72 } }}>
      {content}
    </ReactLenis>
  );
}
