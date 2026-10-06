"use client";

import { useEffect, useState } from "react";

const SNIPPETS = [
  `@Post('invoices')\nasync create(@Body() dto: CreateInvoiceDto) {\n  return this.invoiceService.create(dto);\n}`,
  `const user = await prisma.user.findUnique({\n  where: { id },\n  include: { roles: true },\n});`,
  `await redis.set(\n  cacheKey,\n  JSON.stringify(result),\n  'EX',\n  3600\n);`,
  `GET /api/v1/documents?tenant=acme\n→ 200 OK { "items": [...], "total": 42 }`,
  `@UseGuards(JwtAuthGuard, RolesGuard)\n@Roles('admin')\nasync restore(@Param('id') id: string) {}`,
];

type Phase = "typing" | "pausing" | "deleting";

function useTypewriter(snippets: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    const current = snippets[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 28);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), 1700);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 900);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 10);
      } else {
        timeout = setTimeout(() => {
          setIndex((i) => (i + 1) % snippets.length);
          setPhase("typing");
        }, 200);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, index, snippets]);

  return text;
}

// A plain CSS/DOM floating panel rather than a drei <Html> inside the R3F
// tree — drei's Html portal was racing with React 19's root unmounting.
// Styled with a CSS 3D tilt so it still reads as part of the scene.
export function CodeTerminal({ className = "" }: { className?: string }) {
  const text = useTypewriter(SNIPPETS);

  return (
    <div
      className={`animate-float w-[300px] select-none rounded-xl border border-emerald-400/20 bg-[#0b0d12]/85 p-4 font-mono text-[11px] leading-relaxed text-emerald-200/90 shadow-[0_0_50px_-12px_rgba(52,211,153,0.45)] backdrop-blur-sm sm:w-[340px] ${className}`}
      style={{ transform: "perspective(900px) rotateY(10deg) rotateX(2deg)" }}
    >
      <div className="mb-2.5 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-red-400/60" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
        <span className="h-2 w-2 rounded-full bg-green-400/60" />
      </div>
      <pre className="min-h-[5.5em] whitespace-pre-wrap break-words">
        {text}
        <span className="animate-pulse text-emerald-300/80">{"█"}</span>
      </pre>
    </div>
  );
}
