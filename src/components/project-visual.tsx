import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Art-directed cover for each case study, drawn entirely in code —
 * no stock imagery. Each composition is decorative; the surrounding
 * article carries the accessible content.
 */
export function ProjectVisual({
  slug,
  className,
}: {
  slug: Project["slug"];
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10",
        className,
      )}
    >
      {slug === "lumen" && <LumenArt />}
      {slug === "atlas" && <AtlasArt />}
      {slug === "verde" && <VerdeArt />}
      {slug === "nimbus" && <NimbusArt />}
    </div>
  );
}

const tile =
  "rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md shadow-[0_24px_48px_-24px_rgb(0_0_0/0.7)]";

function LumenArt() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,oklch(0.4_0.07_200)_0%,oklch(0.19_0.02_230)_55%,oklch(0.15_0.01_260)_100%)]">
      <div className="absolute -right-16 -top-16 size-64 rounded-full bg-mint/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />
      {/* Patient dashboard card */}
      <div
        className={cn(
          tile,
          "absolute left-[8%] top-[12%] w-[46%] p-5 transition-transform duration-700 group-hover:-translate-y-2",
        )}
      >
        <p className="font-mono text-[9px] uppercase tracking-widest text-white/50">
          Daily adherence
        </p>
        <div className="mt-3 flex items-center gap-4">
          <svg viewBox="0 0 64 64" className="size-16">
            <circle cx="32" cy="32" r="26" fill="none" stroke="oklch(1 0 0 / 0.12)" strokeWidth="7" />
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="oklch(0.83 0.12 180)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="163.4"
              strokeDashoffset="39"
              transform="rotate(-90 32 32)"
            />
          </svg>
          <div>
            <p className="font-display text-2xl font-bold text-white">76%</p>
            <p className="text-[11px] text-white/50">this week</p>
          </div>
        </div>
      </div>
      {/* Vitals sparkline card */}
      <div
        className={cn(
          tile,
          "absolute bottom-[12%] right-[8%] w-[52%] p-5 transition-transform duration-700 group-hover:translate-y-2",
        )}
      >
        <div className="flex items-center justify-between">
          <p className="font-mono text-[9px] uppercase tracking-widest text-white/50">
            Resting heart rate
          </p>
          <span className="rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-semibold text-mint">
            Stable
          </span>
        </div>
        <svg viewBox="0 0 200 48" className="mt-3 w-full" preserveAspectRatio="none">
          <path
            d="M0 34 C20 30 30 18 50 22 S 80 40 100 30 S 140 8 160 16 S 190 28 200 22"
            fill="none"
            stroke="oklch(0.83 0.12 180)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {/* Floating med pill */}
      <div
        className={cn(
          tile,
          "absolute right-[14%] top-[18%] flex items-center gap-2 rounded-full px-4 py-2 transition-transform duration-700 group-hover:-translate-y-3",
        )}
      >
        <span className="size-2 rounded-full bg-mint" />
        <span className="text-[11px] font-medium text-white/80">Metformin · taken</span>
      </div>
    </div>
  );
}

function AtlasArt() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_80%_0%,oklch(0.35_0.1_295)_0%,oklch(0.19_0.03_290)_55%,oklch(0.15_0.01_270)_100%)]">
      <div className="absolute -left-20 top-1/3 size-72 rounded-full bg-iris/25 blur-3xl transition-transform duration-700 group-hover:scale-125" />
      {/* Credit card */}
      <div
        className={cn(
          tile,
          "absolute left-[10%] top-[16%] aspect-[8/5] w-[48%] rotate-[-6deg] bg-gradient-to-br from-iris/40 to-white/[0.04] p-5 transition-transform duration-700 group-hover:rotate-[-3deg] group-hover:-translate-y-2",
        )}
      >
        <div className="flex items-start justify-between">
          <span className="font-display text-sm font-bold text-white">atlas</span>
          <span className="h-6 w-8 rounded-md bg-gradient-to-br from-yellow-200/70 to-yellow-500/50" />
        </div>
        <p className="absolute bottom-5 left-5 font-mono text-[11px] tracking-[0.25em] text-white/70">
          •••• 4127
        </p>
      </div>
      {/* Balance card */}
      <div
        className={cn(
          tile,
          "absolute bottom-[14%] right-[8%] w-[46%] p-5 transition-transform duration-700 group-hover:translate-y-2",
        )}
      >
        <p className="font-mono text-[9px] uppercase tracking-widest text-white/50">Balance</p>
        <p className="mt-1 font-display text-xl font-bold text-white">R$ 12.480</p>
        <div className="mt-3 flex items-end gap-1.5" aria-hidden="true">
          {[38, 62, 45, 78, 56, 90].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h * 0.4}px` }}
              className={cn(
                "w-3 rounded-sm",
                i === 5 ? "bg-iris" : "bg-white/15",
              )}
            />
          ))}
        </div>
      </div>
      {/* Onboarding step chip */}
      <div
        className={cn(
          tile,
          "absolute right-[12%] top-[14%] flex items-center gap-2 rounded-full px-4 py-2 transition-transform duration-700 group-hover:-translate-y-3",
        )}
      >
        <span className="flex size-4 items-center justify-center rounded-full bg-iris text-[9px] font-bold text-white">
          ✓
        </span>
        <span className="text-[11px] font-medium text-white/80">Verified in 3:12</span>
      </div>
    </div>
  );
}

function VerdeArt() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,oklch(0.35_0.08_140)_0%,oklch(0.19_0.03_150)_55%,oklch(0.15_0.01_160)_100%)]">
      <div className="absolute -bottom-20 left-1/4 size-72 rounded-full bg-neon/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />
      {/* Product card */}
      <div
        className={cn(
          tile,
          "absolute left-[9%] top-[14%] w-[40%] p-4 transition-transform duration-700 group-hover:-translate-y-2",
        )}
      >
        <div className="flex h-20 items-center justify-center rounded-xl bg-gradient-to-br from-neon/25 to-white/[0.03]">
          <svg viewBox="0 0 24 24" className="size-9 text-neon" fill="currentColor">
            <path d="M12 2C7 7 4 10 4 14a8 8 0 0016 0c0-4-3-7-8-12zm0 18a6 6 0 01-6-6c0-.5.06-1 .17-1.5C8 14 10 15.5 12 19c2-3.5 4-5 5.83-6.5.11.5.17 1 .17 1.5a6 6 0 01-6 6z" />
          </svg>
        </div>
        <p className="mt-3 text-[12px] font-semibold text-white/90">Olive oil · single farm</p>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-[11px] text-white/50">500ml</span>
          <span className="font-mono text-[12px] font-medium text-neon">$24</span>
        </div>
      </div>
      {/* Traceability card */}
      <div
        className={cn(
          tile,
          "absolute bottom-[13%] right-[8%] w-[50%] p-5 transition-transform duration-700 group-hover:translate-y-2",
        )}
      >
        <p className="font-mono text-[9px] uppercase tracking-widest text-white/50">
          Farm to door
        </p>
        <ol className="mt-3 space-y-2">
          {["Harvested · Alentejo", "Pressed · 4h later", "Delivered · carbon-neutral"].map(
            (step, i) => (
              <li key={step} className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    i === 2 ? "bg-neon" : "bg-white/30",
                  )}
                />
                <span className="text-[11px] text-white/70">{step}</span>
              </li>
            ),
          )}
        </ol>
      </div>
      {/* Conversion chip */}
      <div
        className={cn(
          tile,
          "absolute right-[10%] top-[16%] rounded-full px-4 py-2 transition-transform duration-700 group-hover:-translate-y-3",
        )}
      >
        <span className="font-display text-sm font-bold text-neon">2.1× conversion</span>
      </div>
    </div>
  );
}

function NimbusArt() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_30%_100%,oklch(0.35_0.08_55)_0%,oklch(0.2_0.03_40)_55%,oklch(0.15_0.01_280)_100%)]">
      <div className="absolute -right-16 bottom-0 size-72 rounded-full bg-ember/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />
      {/* Prompt bar */}
      <div
        className={cn(
          tile,
          "absolute left-[8%] top-[16%] flex w-[64%] items-center gap-3 rounded-full px-5 py-3.5 transition-transform duration-700 group-hover:-translate-y-2",
        )}
      >
        <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-ember" fill="currentColor">
          <path d="M8 0l1.8 6.2L16 8l-6.2 1.8L8 16l-1.8-6.2L0 8l6.2-1.8L8 0z" />
        </svg>
        <span className="truncate text-[12px] text-white/70">
          Summarize this quarter&apos;s churn drivers…
        </span>
        <span className="ml-auto h-4 w-px animate-pulse bg-ember" />
      </div>
      {/* Response card */}
      <div
        className={cn(
          tile,
          "absolute bottom-[12%] left-[14%] w-[58%] p-5 transition-transform duration-700 group-hover:translate-y-2",
        )}
      >
        <div className="flex items-center justify-between">
          <p className="font-mono text-[9px] uppercase tracking-widest text-white/50">
            Nimbus · answer
          </p>
          <span className="rounded-full bg-ember/15 px-2 py-0.5 text-[10px] font-semibold text-ember">
            94% confident
          </span>
        </div>
        <div className="mt-3 space-y-2">
          <span className="block h-2 w-[92%] rounded-full bg-white/15" />
          <span className="block h-2 w-[74%] rounded-full bg-white/15" />
          <span className="block h-2 w-[58%] rounded-full bg-gradient-to-r from-ember/60 to-white/10" />
        </div>
        <div className="mt-4 flex gap-2">
          <span className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] text-white/60">
            View sources
          </span>
          <span className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] text-white/60">
            Refine
          </span>
        </div>
      </div>
      {/* Control chip */}
      <div
        className={cn(
          tile,
          "absolute right-[8%] top-[38%] flex items-center gap-2 rounded-full px-4 py-2 transition-transform duration-700 group-hover:-translate-y-3",
        )}
      >
        <span className="size-2 rounded-full bg-ember" />
        <span className="text-[11px] font-medium text-white/80">Human in the loop</span>
      </div>
    </div>
  );
}
