"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { profile } from "@/content/profile";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-sm font-medium tracking-tight">
          <span className="text-accent">~/</span>
          {profile.name.toLowerCase().replace(/\s+/g, "-")}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={profile.resumeFile}
          download
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <Download size={15} />
          Resume
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          className="md:hidden text-foreground"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={profile.resumeFile}
            download
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground"
          >
            <Download size={15} />
            Resume
          </a>
        </nav>
      )}
    </header>
  );
}
