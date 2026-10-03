"use client";

import { FormEvent, useState } from "react";
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkedinIcon } from "@/components/icons";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot: real visitors never fill this hidden field.
    if (data.company) {
      setStatus("success");
      form.reset();
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <section id="contact" className="py-24 border-t border-border">
      <Container>
        <SectionHeading
          index="04"
          title="Contact"
          description="Have a role, project, or question in mind? My inbox is open."
        />

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 text-sm transition-colors hover:border-accent/60"
            >
              <Mail size={18} className="text-accent" />
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 text-sm transition-colors hover:border-accent/60"
            >
              <LinkedinIcon size={18} className="text-accent" />
              Connect on LinkedIn
            </a>
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-4 rounded-2xl border border-border bg-surface p-6"
          >
            {/* Honeypot field, hidden from real users via CSS */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm text-muted">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={120}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm text-muted">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={200}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm text-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={4000}
                className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "loading" && <Loader2 size={16} className="animate-spin" />}
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-accent">
                <CheckCircle2 size={16} />
                Thanks — your message is on its way. I&apos;ll reply soon.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={16} />
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}
