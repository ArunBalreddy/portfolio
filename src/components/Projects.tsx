import { projects } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="py-24 border-t border-border">
      <Container>
        <SectionHeading
          index="02"
          title="Projects"
          description="A mix of production backend work and self-directed projects. Each one links to a short case study."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
