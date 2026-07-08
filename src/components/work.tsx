import { Badge } from "@/components/ui/badge";
import { ProjectVisual } from "@/components/project-visual";
import { FadeIn } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <SectionHeading
        label={`Selected work — ${projects.length} case studies`}
        title={
          <span id="work-title">
            Work that moved <span className="text-gradient">the numbers</span>
          </span>
        }
        description="Four engagements, four measurable outcomes. Full case studies — process, artifacts and honest post-mortems — are available on request."
      />

      <div className="mt-16 space-y-20 sm:mt-24 sm:space-y-28">
        {projects.map((project, i) => {
          const flip = i % 2 === 1;
          return (
            <FadeIn key={project.slug}>
              <article
                className="group grid items-center gap-8 md:grid-cols-12 lg:gap-14"
                aria-label={`${project.title}: ${project.headline}`}
              >
                <div
                  data-cursor="Case study"
                  className={cn("md:col-span-7", flip && "md:order-2")}
                >
                  <ProjectVisual
                    slug={project.slug}
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                  />
                </div>

                <div className={cn("md:col-span-5", flip && "md:order-1")}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-sm font-bold text-neon">
                      {project.index}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {project.title} · {project.year}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                    {project.headline}
                  </h3>

                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="rounded-full border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <p className="mt-8 flex items-baseline gap-3 border-t border-white/5 pt-6">
                    <span className="font-display text-4xl font-extrabold text-neon sm:text-5xl">
                      {project.outcome}
                    </span>
                    <span className="max-w-[16rem] text-sm leading-snug text-muted-foreground">
                      {project.outcomeLabel}
                    </span>
                  </p>
                </div>
              </article>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn className="mt-20 text-center">
        <p className="text-muted-foreground">
          Want the full story behind any of these?{" "}
          <a
            href="#contact"
            className="font-semibold text-neon underline-offset-4 hover:underline"
          >
            Request a case study walkthrough
          </a>
          .
        </p>
      </FadeIn>
    </section>
  );
}
