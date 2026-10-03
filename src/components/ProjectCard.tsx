import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/profile";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/60 hover:bg-surface-hover"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-foreground">
          {project.name}
        </h3>
        <ArrowUpRight
          size={18}
          className="shrink-0 text-muted transition-colors group-hover:text-accent"
        />
      </div>

      <span className="mt-1 font-mono text-xs uppercase tracking-widest text-accent">
        {project.kind}
      </span>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

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

      <span className="mt-5 text-sm font-medium text-accent">
        Read case study →
      </span>
    </Link>
  );
}
