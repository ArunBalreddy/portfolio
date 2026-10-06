import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/profile";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard className="group h-full rounded-2xl border border-border bg-surface/80 backdrop-blur-xl transition-colors hover:border-accent/60 hover:bg-surface-hover/90">
      <Link
        href={`/projects/${project.slug}`}
        data-cursor="View"
        className="relative z-10 flex h-full flex-col p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
          <ArrowUpRight
            size={18}
            className="shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        </div>

        <span className="mt-1 font-mono text-xs uppercase tracking-widest text-accent">
          {project.kind}
        </span>

        <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[11px] text-foreground/80"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="mt-5 text-sm font-medium text-accent">Read case study →</span>
      </Link>
    </SpotlightCard>
  );
}
