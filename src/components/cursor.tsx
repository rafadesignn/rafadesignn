"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/hooks";

/**
 * A trailing cursor halo for pointer devices. The native cursor stays
 * visible — this only adds presence. Elements can opt into a label via
 * `data-cursor="View"`; plain links/buttons get a subtle ring expansion.
 */
export function Cursor() {
  const fine = useMediaQuery("(pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = fine && !reduced;
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 320, damping: 32, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 320, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      const interactive = target?.closest?.("[data-cursor], a, button");
      setLabel(
        interactive ? (interactive.getAttribute("data-cursor") ?? "") : null,
      );
    };
    const onLeave = () => {
      x.set(-200);
      y.set(-200);
      setLabel(null);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const hasLabel = Boolean(label);
  const isHover = label !== null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        animate={{
          width: hasLabel ? 88 : isHover ? 56 : 36,
          height: hasLabel ? 88 : isHover ? 56 : 36,
          backgroundColor: hasLabel
            ? "oklch(0.93 0.2 122)"
            : "oklch(0.93 0.2 122 / 0)",
          borderColor: hasLabel
            ? "oklch(0.93 0.2 122)"
            : "oklch(1 0 0 / 0.5)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        style={{ borderWidth: 1.5, mixBlendMode: hasLabel ? "normal" : "difference" }}
      >
        {hasLabel && (
          <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-zinc-950">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
