"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import type { Group } from "three";
import { ApiGraph, type NodeScreenPosition } from "./ApiGraph";
import { useScrollProgressRef } from "@/lib/hooks";
import { fireRequest } from "@/lib/requestBus";

function Rig({ onNodePositions }: { onNodePositions?: (positions: NodeScreenPosition[]) => void }) {
  const group = useRef<Group>(null);
  const scrollRef = useScrollProgressRef();
  const elapsed = useRef(0);
  const lastBucket = useRef(0);

  useFrame((_, delta) => {
    const node = group.current;
    if (!node) return;
    elapsed.current += delta;

    // Gentle perpetual sway (not a full spin) so the scene stays lively
    // without the code panel / graph drifting across the screen and into
    // foreground content over a long page visit.
    const sway = Math.sin(elapsed.current * 0.15) * 0.14;
    const targetTilt = (scrollRef.current - 0.5) * 0.3;
    const ease = Math.min(1, delta * 1.2);
    node.rotation.y += (sway - node.rotation.y) * ease;
    node.rotation.x += (targetTilt - node.rotation.x) * ease;

    const targetY = -scrollRef.current * 0.6;
    node.position.y += (targetY - node.position.y) * ease;

    // Scrolling past each ~20% of the page fires a request burst, so the
    // graph visibly reacts to scrolling, not just to clicks.
    const bucket = Math.round(scrollRef.current * 5);
    if (bucket !== lastBucket.current) {
      lastBucket.current = bucket;
      fireRequest();
    }
  });

  return (
    <group ref={group}>
      <ApiGraph position={[2.7, -1.9, -3.2]} onNodePositions={onNodePositions} />
      <Sparkles count={110} scale={[10, 7, 5]} size={1.6} speed={0.25} color="#34d399" opacity={0.45} />
    </group>
  );
}

export function Scene3D({
  onNodePositions,
}: {
  onNodePositions?: (positions: NodeScreenPosition[]) => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 6.5], fov: 42 }}
    >
      <color attach="background" args={["#0a0b0f"]} />
      <ambientLight intensity={0.7} />
      <pointLight position={[4, 4, 4]} intensity={30} color="#34d399" />
      <pointLight position={[-4, -3, -3]} intensity={22} color="#818cf8" />
      <Suspense fallback={null}>
        <Rig onNodePositions={onNodePositions} />
      </Suspense>
    </Canvas>
  );
}
