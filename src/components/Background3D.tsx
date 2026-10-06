"use client";

import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/lib/hooks";

const Scene3D = dynamic(() => import("@/components/scene/Scene3D").then((m) => m.Scene3D), {
  ssr: false,
});

export function Background3D() {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Scene3D />
    </div>
  );
}
