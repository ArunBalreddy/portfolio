"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

export function SectionHeading({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-sm text-accent">{index}</span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
          className="h-px flex-1 max-w-10 bg-border"
        />
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          {title}
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-muted leading-relaxed">{description}</p>
      )}
    </Reveal>
  );
}
