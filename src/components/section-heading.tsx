import { FadeIn, LineReveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/**
 * Shared section opener: mono eyebrow label + display title,
 * with an optional supporting paragraph on the right.
 */
export function SectionHeading({
  label,
  title,
  description,
  className,
}: {
  label: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-12 md:items-end", className)}>
      <div className="md:col-span-8">
        <FadeIn>
          <p className="mb-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-neon" />
            {label}
          </p>
        </FadeIn>
        <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          <LineReveal delay={0.05}>{title}</LineReveal>
        </h2>
      </div>
      {description && (
        <FadeIn delay={0.15} className="md:col-span-4">
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground md:ml-auto">
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
