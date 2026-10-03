"use client";

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { useMagnetic } from "@/components/motion/useMagnetic";

export function Resume() {
  const magnetic = useMagnetic<HTMLAnchorElement>(0.25);

  return (
    <section id="resume" className="py-24 border-t border-border">
      <Container>
        <SectionHeading index="03" title="Resume" />

        <Reveal>
          <SpotlightCard
            tilt={false}
            className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-surface p-8 sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-accent">
                <FileText size={22} />
              </div>
              <div>
                <p className="font-medium text-foreground">{profile.name} — Resume</p>
                <p className="text-sm text-muted">PDF format</p>
              </div>
            </div>

            <motion.a
              {...magnetic}
              href={profile.resumeFile}
              download
              data-cursor=""
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              <Download size={16} />
              Download Resume
            </motion.a>
          </SpotlightCard>
        </Reveal>
      </Container>
    </section>
  );
}
