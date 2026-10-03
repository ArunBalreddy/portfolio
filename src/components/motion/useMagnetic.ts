"use client";

import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "@/lib/hooks";

/**
 * Gives any element a subtle "magnetic" pull toward the cursor on hover.
 * Returns motion values + event handlers to spread onto a `motion.*` element.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.4) {
  const ref = useRef<T>(null);
  const isFinePointer = useFinePointer();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  function onMouseMove(e: React.MouseEvent<T>) {
    if (!isFinePointer || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return {
    ref,
    style: { x: springX, y: springY },
    onMouseMove,
    onMouseLeave,
  };
}
