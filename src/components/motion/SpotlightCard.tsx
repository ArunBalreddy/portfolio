"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "@/lib/hooks";

export function SpotlightCard({
  children,
  className = "",
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isFinePointer = useFinePointer();

  const spotX = useMotionValue("50%");
  const spotY = useMotionValue("50%");
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 220, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 220, damping: 20 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isFinePointer || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    spotX.set(`${px * 100}%`);
    spotY.set(`${py * 100}%`);
    if (tilt) {
      rotateY.set((px - 0.5) * 10);
      rotateX.set((0.5 - py) * 10);
    }
  }

  function onMouseLeave() {
    if (tilt) {
      rotateX.set(0);
      rotateY.set(0);
    }
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 800,
        ...({ "--spot-x": spotX, "--spot-y": spotY } as Record<string, unknown>),
      }}
      className={`group/spotlight relative ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--spot-x) var(--spot-y), rgba(52,211,153,0.12), transparent 70%)",
        }}
      />
      {children}
    </motion.div>
  );
}
