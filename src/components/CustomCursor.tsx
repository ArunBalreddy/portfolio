"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

export function CustomCursor() {
  const isFinePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = isFinePointer && !reducedMotion;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 300, mass: 0.4 });
  const ringY = useSpring(y, { damping: 28, stiffness: 300, mass: 0.4 });

  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor");

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);

    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      if (target) {
        setHovering(true);
        setLabel(target.dataset.cursor || "");
      } else {
        setHovering(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999] transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute top-0 left-0 rounded-full bg-accent"
        style={{ x, y, width: 6, height: 6, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-accent/70"
        animate={{
          width: hovering ? 76 : 32,
          height: hovering ? 76 : 32,
          backgroundColor: hovering ? "rgba(52, 211, 153, 0.08)" : "rgba(52, 211, 153, 0)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
