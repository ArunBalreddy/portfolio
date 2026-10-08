import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center py-24">
      <Container className="flex flex-col items-center text-center">
        <p className="font-mono text-sm text-accent">HTTP/1.1 404</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
          Not Found
        </h1>

        <pre className="mt-8 w-full max-w-md rounded-xl border border-border bg-surface/80 p-5 text-left font-mono text-xs leading-relaxed text-muted backdrop-blur-xl">
          {"{\n"}
          {'  "error": "Route not found",\n'}
          {'  "status": 404,\n'}
          {'  "suggestion": "check the URL, or head back home"\n'}
          {"}"}
        </pre>

        <Link
          href="/"
          data-cursor=""
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </Container>
    </div>
  );
}
