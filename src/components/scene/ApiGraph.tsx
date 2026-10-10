"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { QuadraticBezierLine } from "@react-three/drei";
import * as THREE from "three";
import { onRequest } from "@/lib/requestBus";

export type NodeDef = {
  key: string;
  label: string;
  position: [number, number, number];
  color: string;
};

// A realistic request path for a production, internet-scale service: edge
// delivery and traffic shaping in front, a security layer before anything
// touches application code, then the app fanning out to its data layer.
export const GRAPH_NODES: NodeDef[] = [
  { key: "client", label: "Client", position: [-1.4, 0.4, 0], color: "#818cf8" },
  { key: "cdn", label: "CDN", position: [-0.95, 0.08, 0.16], color: "#22d3ee" },
  { key: "loadbalancer", label: "Load Balancer", position: [-0.5, 0.35, -0.1], color: "#f472b6" },
  { key: "firewall", label: "Firewall", position: [-0.05, 0.05, 0.16], color: "#f87171" },
  { key: "gateway", label: "API Gateway", position: [0.4, 0.3, -0.1], color: "#34d399" },
  { key: "service", label: "Service", position: [0.85, 0.05, 0.12], color: "#34d399" },
  { key: "cache", label: "Cache", position: [1.5, 0.6, 0.2], color: "#f59e0b" },
  { key: "db", label: "Database", position: [1.6, -0.05, -0.08], color: "#60a5fa" },
  { key: "queue", label: "Queue", position: [1.35, -0.7, 0.18], color: "#c084fc" },
];

const EDGES: Array<[string, string]> = [
  ["client", "cdn"],
  ["cdn", "loadbalancer"],
  ["loadbalancer", "firewall"],
  ["firewall", "gateway"],
  ["gateway", "service"],
  ["service", "cache"],
  ["service", "db"],
  ["service", "queue"],
];
const EDGE_KEY = (a: string, b: string) => `${a}-${b}`;
const EDGE_INDEX: Record<string, number> = Object.fromEntries(
  EDGES.map(([a, b], i) => [EDGE_KEY(a, b), i])
);

// Every journey walks the full edge path (client through to the gateway),
// then picks one of the three downstream branches — cache hit, a database
// read, or handing off to a queue for async work — same way a real request
// only takes one of those paths per call.
const SPINE_PATH = [
  EDGE_INDEX["client-cdn"],
  EDGE_INDEX["cdn-loadbalancer"],
  EDGE_INDEX["loadbalancer-firewall"],
  EDGE_INDEX["firewall-gateway"],
  EDGE_INDEX["gateway-service"],
];
const BRANCH_EDGES = [
  EDGE_INDEX["service-cache"],
  EDGE_INDEX["service-db"],
  EDGE_INDEX["service-queue"],
];

const REQUEST_COLOR = new THREE.Color("#6ee7b7");
const RESPONSE_COLOR = new THREE.Color("#93c5fd");
const STEP = 0.34; // seconds per hop
const MAX_SLOTS = 20;

type Slot = {
  edge: number;
  reverse: boolean;
  color: THREE.Color;
  start: number;
  until: number;
  duration: number;
};

function buildJourney(now: number, branchIndex: number): Slot[] {
  const path = [...SPINE_PATH, BRANCH_EDGES[branchIndex % BRANCH_EDGES.length]];

  const forward = path.map((edge, i) => {
    const start = now + i * STEP;
    return { edge, reverse: false, color: REQUEST_COLOR, start, duration: STEP * 0.95, until: start + STEP * 0.95 };
  });

  const responseStart = now + path.length * STEP + 0.3;
  const response = [...path].reverse().map((edge, i) => {
    const start = responseStart + i * STEP;
    return { edge, reverse: true, color: RESPONSE_COLOR, start, duration: STEP * 0.95, until: start + STEP * 0.95 };
  });

  return [...forward, ...response];
}

export type NodeScreenPosition = { x: number; y: number; visible: boolean };

export function ApiGraph({
  position,
  onNodePositions,
}: {
  position: [number, number, number];
  onNodePositions?: (positions: NodeScreenPosition[]) => void;
}) {
  const { camera, size } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<Array<THREE.Object3D | null>>([]);
  const pulseRefs = useRef<Array<THREE.Mesh | null>>([]);
  const slots = useRef<Slot[]>([]);
  const elapsed = useRef(0);
  const nextAutoFire = useRef(2.5);
  const nextBranch = useRef(0);
  const positionsBuffer = useRef<NodeScreenPosition[]>(
    GRAPH_NODES.map(() => ({ x: 0, y: 0, visible: false }))
  );

  const curves = useMemo(
    () =>
      EDGES.map(([a, b]) => {
        const start = new THREE.Vector3(...GRAPH_NODES.find((n) => n.key === a)!.position);
        const end = new THREE.Vector3(...GRAPH_NODES.find((n) => n.key === b)!.position);
        const mid = new THREE.Vector3()
          .addVectors(start, end)
          .multiplyScalar(0.5)
          .add(new THREE.Vector3(0, 0.22, 0.17));
        return { start, end, mid, curve: new THREE.QuadraticBezierCurve3(start, mid, end) };
      }),
    []
  );

  function enqueueJourney(now: number) {
    const journey = buildJourney(now, nextBranch.current);
    nextBranch.current = (nextBranch.current + 1) % BRANCH_EDGES.length;
    slots.current = [...slots.current, ...journey].slice(-MAX_SLOTS);
  }

  useEffect(() => {
    const unsubscribe = onRequest(() => enqueueJourney(elapsed.current));
    return unsubscribe;
  }, []);

  const tempWorld = useMemo(() => new THREE.Vector3(), []);
  const tempProj = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    elapsed.current += delta;

    // Fire an ambient demo request on its own every few seconds so the
    // diagram stays alive even if the visitor never clicks anything.
    if (elapsed.current >= nextAutoFire.current) {
      nextAutoFire.current = elapsed.current + 5 + Math.random() * 2;
      enqueueJourney(elapsed.current);
    }

    // Drop expired hops.
    if (slots.current.length) {
      slots.current = slots.current.filter((s) => elapsed.current <= s.until + 0.15);
    }

    // Animate the pulse pool against current slots.
    for (let i = 0; i < MAX_SLOTS; i++) {
      const mesh = pulseRefs.current[i];
      if (!mesh) continue;
      const slot = slots.current[i];
      const material = mesh.material as THREE.MeshBasicMaterial;
      if (!slot || elapsed.current < slot.start || elapsed.current > slot.until) {
        material.opacity = 0;
        continue;
      }
      const t = (elapsed.current - slot.start) / slot.duration;
      const curveT = slot.reverse ? 1 - t : t;
      const point = curves[slot.edge].curve.getPoint(Math.min(1, Math.max(0, curveT)));
      mesh.position.copy(point);
      material.color.copy(slot.color);
      const fade = Math.min(1, Math.min(t, 1 - t) * 6);
      material.opacity = Math.max(0, fade);
    }

    // Project node world positions to screen space and hand them off —
    // the caller owns whatever DOM labels it wants to sync to these.
    if (onNodePositions) {
      const buffer = positionsBuffer.current;
      for (let i = 0; i < GRAPH_NODES.length; i++) {
        const node = nodeRefs.current[i];
        const slot = buffer[i];
        if (!node) {
          slot.visible = false;
          continue;
        }
        node.getWorldPosition(tempWorld);
        tempProj.copy(tempWorld).project(camera);
        slot.visible = tempProj.z < 1;
        if (slot.visible) {
          slot.x = (tempProj.x * 0.5 + 0.5) * size.width;
          slot.y = (-tempProj.y * 0.5 + 0.5) * size.height;
        }
      }
      onNodePositions(buffer);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {EDGES.map(([a, b], i) => (
        <QuadraticBezierLine
          key={EDGE_KEY(a, b)}
          start={curves[i].start}
          end={curves[i].end}
          mid={curves[i].mid}
          color="#3a4150"
          lineWidth={1}
          transparent
          opacity={0.5}
        />
      ))}

      {Array.from({ length: MAX_SLOTS }).map((_, i) => (
        <mesh key={i} ref={(el) => void (pulseRefs.current[i] = el)}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={REQUEST_COLOR} transparent opacity={0} />
        </mesh>
      ))}

      {GRAPH_NODES.map((node, i) => (
        <mesh key={node.key} ref={(el) => void (nodeRefs.current[i] = el)} position={node.position}>
          <icosahedronGeometry args={[0.09, 0]} />
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
