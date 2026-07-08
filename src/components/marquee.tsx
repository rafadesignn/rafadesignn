import { marqueeItems } from "@/lib/data";

/** Infinite skills ticker. Content is duplicated once; the track
 *  translates -50% and loops seamlessly. Pauses under reduced motion. */
export function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="mask-fade-x overflow-hidden border-y border-white/5 bg-white/[0.02] py-5"
    >
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap pr-10">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-10">
            {marqueeItems.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center gap-10 font-display text-xl font-semibold uppercase tracking-wide text-muted-foreground/80"
              >
                {item}
                <svg
                  className="size-4 text-neon"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 0l1.8 6.2L16 8l-6.2 1.8L8 16l-1.8-6.2L0 8l6.2-1.8L8 0z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
