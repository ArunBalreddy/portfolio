import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { GithubIcon } from "@/components/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Case Study`,
    description: project.description,
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="py-20">
      <Container className="max-w-3xl">
        <Link
          href="/#projects"
          data-cursor=""
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={15} />
          Back to projects
        </Link>

        <div className="mt-8 rounded-3xl border border-border bg-surface/80 p-8 backdrop-blur-xl sm:p-10">
          <Reveal>
            <span className="block font-mono text-xs uppercase tracking-widest text-accent">
              {project.kind}
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-foreground">
              {project.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-background px-3 py-1 font-mono text-xs text-foreground/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            {(project.repoUrl || project.demoUrl) && (
              <div className="mt-6 flex gap-5">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor=""
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:opacity-80"
                  >
                    <GithubIcon size={16} /> View code
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor=""
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:opacity-80"
                  >
                    <ExternalLink size={16} /> Live demo
                  </a>
                )}
              </div>
            )}
          </Reveal>

          <RevealGroup className="mt-12 space-y-10 border-t border-border pt-10" stagger={0.12}>
            <RevealItem>
              <h2 className="font-mono text-xs uppercase tracking-widest text-accent">Problem</h2>
              <p className="mt-3 leading-relaxed text-foreground/90">
                {project.caseStudy.problem}
              </p>
            </RevealItem>
            <RevealItem>
              <h2 className="font-mono text-xs uppercase tracking-widest text-accent">
                Approach
              </h2>
              <p className="mt-3 leading-relaxed text-foreground/90">
                {project.caseStudy.approach}
              </p>
            </RevealItem>
            <RevealItem>
              <h2 className="font-mono text-xs uppercase tracking-widest text-accent">Outcome</h2>
              <p className="mt-3 leading-relaxed text-foreground/90">
                {project.caseStudy.outcome}
              </p>
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </div>
  );
}
