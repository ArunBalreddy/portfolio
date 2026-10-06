"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { QuadraticBezierLine } from "@react-three/drei";
import * as THREE from "three";

type NodeDef = {
  key: string;
  label: string;
  position: [number, number, number];
  color: string;
};

const NODES: NodeDef[] = [
  { key: "client", label: "Client", position: [-1.0, 0.5, 0], color: "#818cf8" },
  { key: "gateway", label: "API Gateway", position: [-0.27, 0.14, 0.18], color: "#34d399" },
  { key: "service", label: "Service", position: [0.5, 0.45, -0.1], color: "#34d399" },
  { key: "cache", label: "Cache", position: [1.17, 0.05, 0.14], color: "#f59e0b" },
  { key: "db", label: "Database", position: [0.58, -0.6, -0.18], color: "#60a5fa" },
];

const EDGES: Array<[string, string]> = [
  ["client", "gateway"],
  ["gateway", "service"],
  ["service", "cache"],
  ["service", "db"],
];

function findNode(key: string) {
  return NODES.find((n) => n.key === key)!;
}

function Edge({ start, end, delay }: { start: NodeDef; end: NodeDef; delay: number }) {
  const startVec = useMemo(() => new THREE.Vector3(...start.position), [start]);
  const endVec = useMemo(() => new THREE.Vector3(...end.position), [end]);
  const midVec = useMemo(
    () =>
      new THREE.Vector3()
        .addVectors(startVec, endVec)
        .multiplyScalar(0.5)
        .add(new THREE.Vector3(0, 0.22, 0.17)),
    [startVec, endVec]
  );
  const curve = useMemo(
    () => new THREE.QuadraticBezierCurve3(startVec, midVec, endVec),
    [startVec, midVec, endVec]
  );
  const pulseRef = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    const mesh = pulseRef.current;
    if (!mesh) return;
    elapsed.current += delta;
    const t = ((elapsed.current + delay) % 2.6) / 2.6;
    mesh.position.copy(curve.getPoint(t));
    const material = mesh.material as THREE.MeshBasicMaterial;
    material.opacity = t < 0.06 || t > 0.94 ? 0 : 1;
  });

  return (
    <>
      <QuadraticBezierLine
        start={startVec}
        end={endVec}
        mid={midVec}
        color="#3a4150"
        lineWidth={1}
        transparent
        opacity={0.55}
      />
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshBasicMaterial color="#d1fae5" transparent opacity={0} />
      </mesh>
    </>
  );
}

export function ApiGraph({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {EDGES.map(([a, b], i) => (
        <Edge key={`${a}-${b}`} start={findNode(a)} end={findNode(b)} delay={i * 0.65} />
      ))}

      {NODES.map((node) => (
        <mesh key={node.key} position={node.position}>
          <icosahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}
