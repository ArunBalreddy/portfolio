import { Mail, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
      />

      <Container className="relative">
        <p className="font-mono text-sm text-accent">Hi, I&apos;m</p>
        <h1 className="mt-3 text-4xl sm:text-6xl font-semibold tracking-tight text-foreground">
          {profile.name}
        </h1>
        <p className="mt-3 text-xl sm:text-2xl text-muted font-medium">
          {profile.role} · {profile.tagline}
        </p>

        <div className="mt-8 max-w-2xl space-y-4 text-foreground/90 leading-relaxed">
          {profile.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Get in Touch
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-5 text-muted">
          <span className="inline-flex items-center gap-2 text-sm">
            <MapPin size={16} />
            {profile.location}
          </span>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="transition-colors hover:text-accent"
          >
            <Mail size={19} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-accent"
          >
            <LinkedinIcon size={19} />
          </a>
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-accent"
            >
              <GithubIcon size={19} />
            </a>
          )}
        </div>

        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-3 border-t border-border pt-8 text-sm text-muted">
          <div>
            <p className="text-foreground font-medium">
              {profile.currentRole.title}
            </p>
            <p>
              {profile.currentRole.company} · {profile.currentRole.period}
            </p>
          </div>
          <div>
            {profile.education.map((item) => (
              <p key={item.school}>
                <span className="text-foreground font-medium">{item.school}</span>{" "}
                — {item.credential}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
