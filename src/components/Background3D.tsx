"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { fireRequest } from "@/lib/requestBus";
import { GRAPH_NODES, type NodeScreenPosition } from "@/components/scene/ApiGraph";

const Scene3D = dynamic(() => import("@/components/scene/Scene3D").then((m) => m.Scene3D), {
  ssr: false,
});

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function Background3D() {
  const reducedMotion = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const labelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const handleNodePositions = useCallback((positions: NodeScreenPosition[]) => {
    positions.forEach((p, i) => {
      const el = labelRefs.current[i];
      if (!el) return;
      if (!p.visible) {
        el.style.opacity = "0";
        return;
      }
      el.style.transform = `translate(-50%, -140%) translate(${p.x}px, ${p.y}px)`;
      el.style.opacity = "0.85";
    });
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest("[data-cursor]");
      if (target) fireRequest();
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [reducedMotion]);

  // Let the real page (text, nav, buttons) hydrate and become interactive
  // first; the WebGL scene is a visual enhancement, not critical content,
  // so it shouldn't compete with that for the main thread on first load.
  useEffect(() => {
    if (reducedMotion) return;
    const idleWindow = window as IdleWindow;
    if (idleWindow.requestIdleCallback) {
      const id = idleWindow.requestIdleCallback(() => setReady(true), { timeout: 1500 });
      return () => idleWindow.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(id);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {ready && <Scene3D onNodePositions={handleNodePositions} />}
      <div className="absolute inset-0 hidden overflow-hidden lg:block">
        {GRAPH_NODES.map((node, i) => (
          <div
            key={node.key}
            ref={(el) => void (labelRefs.current[i] = el)}
            className="absolute left-0 top-0 whitespace-nowrap rounded-full border border-white/10 bg-black/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/80 opacity-0 backdrop-blur-sm transition-opacity duration-200"
          >
            {node.label}
          </div>
        ))}
      </div>
    </div>
  );
}
