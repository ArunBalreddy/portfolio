"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { useMagnetic } from "@/components/motion/useMagnetic";
import { CodeTerminal } from "@/components/scene/CodeTerminal";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

function PrimaryCta() {
  const magnetic = useMagnetic<HTMLAnchorElement>(0.3);
  return (
    <motion.a
      {...magnetic}
      href="#projects"
      data-cursor=""
      className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-[0_0_0_0_rgba(52,211,153,0.5)] transition-shadow hover:shadow-[0_0_30px_2px_rgba(52,211,153,0.35)]"
    >
      View Projects
    </motion.a>
  );
}

function SecondaryCta() {
  const magnetic = useMagnetic<HTMLAnchorElement>(0.3);
  return (
    <motion.a
      {...magnetic}
      href="#contact"
      data-cursor=""
      className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
    >
      Get in Touch
    </motion.a>
  );
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-background/80 via-background/45 to-transparent lg:w-[60%]"
      />

      <div className="pointer-events-none absolute left-2 top-0 hidden lg:block" aria-hidden>
        <CodeTerminal />
      </div>

      <Container className="relative grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="font-mono text-sm text-accent">
            Hi, I&apos;m
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-3 text-4xl sm:text-6xl font-semibold tracking-tight text-foreground"
          >
            {profile.name}
          </motion.h1>
          <motion.p variants={item} className="mt-3 text-xl sm:text-2xl text-muted font-medium">
            {profile.role} · {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-8 max-w-2xl space-y-4 text-foreground/90 leading-relaxed">
            {profile.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <PrimaryCta />
            <SecondaryCta />
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-5 text-muted">
            <span className="inline-flex items-center gap-2 text-sm">
              <MapPin size={16} />
              {profile.location}
            </span>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              data-cursor=""
              className="transition-colors hover:text-accent"
            >
              <Mail size={19} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-cursor=""
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
                data-cursor=""
                className="transition-colors hover:text-accent"
              >
                <GithubIcon size={19} />
              </a>
            )}
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-3 border-t border-border pt-8 text-sm text-muted"
          >
            <div>
              <p className="text-foreground font-medium">{profile.currentRole.title}</p>
              <p>
                {profile.currentRole.company} · {profile.currentRole.period}
              </p>
            </div>
            <div>
              {profile.education.map((edu) => (
                <p key={edu.school}>
                  <span className="text-foreground font-medium">{edu.school}</span> —{" "}
                  {edu.credential}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mx-auto w-full max-w-xs lg:max-w-sm"
        >
          <div className="animate-float relative">
            <div
              aria-hidden
              className="absolute inset-[-14%] rounded-full bg-[conic-gradient(from_0deg,var(--accent),var(--accent-2),var(--accent))] opacity-20 blur-2xl animate-spin-slow"
            />
            <div
              aria-hidden
              className="absolute inset-[-6%] rounded-full border border-dashed border-accent/30 animate-spin-slow"
            />
            <div className="relative aspect-square overflow-hidden rounded-full border border-border bg-surface shadow-2xl">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                sizes="(min-width: 1024px) 24rem, 20rem"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
