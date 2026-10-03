import { skillGroups } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

export function Skills() {
  return (
    <section id="skills" className="py-24 border-t border-border">
      <Container>
        <SectionHeading
          index="01"
          title="Skills"
          description="The languages, frameworks, and infrastructure I use to design and ship backend systems."
        />

        <RevealGroup className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <RevealItem key={group.category}>
              <SpotlightCard className="h-full rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
                  {group.category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border bg-background px-3 py-1 font-mono text-xs text-foreground/90 transition-colors hover:border-accent/60 hover:text-accent"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
