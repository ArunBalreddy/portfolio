import { Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, deployed on Vercel.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            data-cursor=""
            className="transition-colors hover:text-accent"
          >
            <Mail size={17} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            data-cursor=""
            className="transition-colors hover:text-accent"
          >
            <LinkedinIcon size={17} />
          </a>
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-cursor=""
              className="transition-colors hover:text-accent"
            >
              <GithubIcon size={17} />
            </a>
          )}
        </div>
      </Container>
    </footer>
  );
}
