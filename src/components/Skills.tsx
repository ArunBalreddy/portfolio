import { skillGroups } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="py-24 border-t border-border">
      <Container>
        <SectionHeading
          index="01"
          title="Skills"
          description="The languages, frameworks, and infrastructure I use to design and ship backend systems."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-background px-3 py-1 font-mono text-xs text-foreground/90"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
