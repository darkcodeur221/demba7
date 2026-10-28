"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerformanceMonitor, RoundedBox, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { Chrome, Glass, Lime, LIME, Studio, type Quality } from "./materials";

export type SectionKind = "chart" | "bag" | "cap";

type Props = { quality: Quality; reduced: boolean };

/** Frame deltas are capped so a scene resumed after a pause eases instead of jumping. */
const step = (delta: number) => Math.min(delta, 1 / 30);

// ----- Data: a live bar chart and a donut, in glass, chrome and lime -----

const BARS = [
  { h: 0.95, mat: "glass" },
  { h: 1.55, mat: "chrome" },
  { h: 1.2, mat: "glass" },
  { h: 2.25, mat: "lime" },
] as const;

function Chart({ quality, reduced }: Props) {
  const bars = useRef<(THREE.Group | null)[]>([]);
  const grown = useRef(0);

  useFrame((state, delta) => {
    // The bars rise from the base the first time the scene runs, then keep
    // breathing a little, like a dashboard on live data.
    grown.current = reduced ? 1 : THREE.MathUtils.damp(grown.current, 1, 1.4, step(delta));
    const t = state.clock.elapsedTime;
    bars.current.forEach((g, i) => {
      if (!g) return;
      const live = reduced ? 1 : 1 + Math.sin(t * 1.3 + i * 1.7) * 0.07;
      g.scale.y = Math.max(0.001, grown.current * live);
    });
  });

  return (
    <group position={[0.35, -0.95, 0]} rotation={[0.3, -0.55, 0]}>
      <RoundedBox args={[3, 0.12, 1.05]} radius={0.05} position={[0, -0.06, 0]}>
        <Glass quality={quality} />
      </RoundedBox>
      {BARS.map((b, i) => (
        <group key={i} position={[(i - 1.5) * 0.66, 0, 0]} ref={(el) => void (bars.current[i] = el)}>
          <RoundedBox args={[0.44, b.h, 0.44]} radius={0.07} position={[0, b.h / 2, 0]}>
            {b.mat === "glass" ? <Glass quality={quality} /> : b.mat === "chrome" ? <Chrome /> : <Lime />}
          </RoundedBox>
        </group>
      ))}
      <Float speed={2} rotationIntensity={0} floatIntensity={reduced ? 0 : 1.2}>
        <mesh position={[0.99, 2.6, 0]} scale={0.16}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color={LIME} toneMapped={false} />
        </mesh>
      </Float>
    </group>
  );
}

function Donut({ quality }: { quality: Quality }) {
  const share = 0.36;
  return (
    <group rotation={[0.5, 0.3, 0.2]}>
      <mesh rotation={[0, 0, Math.PI * 2 * share]}>
        <torusGeometry args={[0.5, 0.17, 24, 96, Math.PI * 2 * (1 - share)]} />
        <Glass quality={quality} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.5, 0.17, 24, 48, Math.PI * 2 * share]} />
        <Lime />
      </mesh>
    </group>
  );
}

// ----- E-commerce: a glass shopping bag, a lime price tag, coins -----

function Bag({ quality, reduced }: Props) {
  const tag = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (tag.current && !reduced) tag.current.rotation.z = -0.3 + Math.sin(state.clock.elapsedTime * 1.7) * 0.16;
  });

  return (
    <group rotation={[0.18, -0.5, 0.06]}>
      <RoundedBox args={[1.6, 1.8, 0.78]} radius={0.1} smoothness={4}>
        <Glass quality={quality} />
      </RoundedBox>
      {[0.22, -0.22].map((z) => (
        <mesh key={z} position={[0, 0.88, z]}>
          <torusGeometry args={[0.38, 0.05, 16, 48, Math.PI]} />
          <Chrome />
        </mesh>
      ))}
      {/* Graphite price tag swinging in front of the bag, from the rim */}
      <group ref={tag} position={[-0.42, 0.9, 0.46]}>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.4, 8]} />
          <Chrome />
        </mesh>
        <RoundedBox args={[0.3, 0.44, 0.04]} radius={0.04} position={[0, -0.6, 0]}>
          <Chrome />
        </RoundedBox>
      </group>
    </group>
  );
}

function Coin({ lime = false }: { lime?: boolean }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.3, 0.3, 0.07, 48]} />
      {lime ? <Lime /> : <Chrome />}
    </mesh>
  );
}

// ----- Formation: a mortarboard with a swinging lime tassel, a diploma -----

function Cap({ quality, reduced }: Props) {
  const tassel = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!tassel.current || reduced) return;
    const t = state.clock.elapsedTime;
    tassel.current.rotation.x = Math.sin(t * 1.5) * 0.22;
    tassel.current.rotation.z = Math.cos(t * 1.1) * 0.12;
  });

  const corner = 1.48;
  return (
    <group rotation={[0.42, 0.55, -0.1]}>
      <RoundedBox args={[2.1, 0.1, 2.1]} radius={0.03} position={[0, 0.32, 0]} rotation={[0, Math.PI / 4, 0]}>
        <Glass quality={quality} />
      </RoundedBox>
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.74, 0.64, 0.62, 48]} />
        <Chrome />
      </mesh>
      <mesh position={[0, 0.39, 0]} scale={0.085}>
        <sphereGeometry args={[1, 24, 24]} />
        <Lime />
      </mesh>
      {/* Cord along the board to the front corner, then the hanging tassel */}
      <mesh position={[0, 0.385, corner / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.018, 0.018, corner, 8]} />
        <Lime />
      </mesh>
      <group ref={tassel} position={[0, 0.38, corner]}>
        <mesh position={[0, -0.32, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.64, 8]} />
          <Lime />
        </mesh>
        <mesh position={[0, -0.78, 0]}>
          <cylinderGeometry args={[0.05, 0.1, 0.36, 16]} />
          <Lime />
        </mesh>
      </group>
    </group>
  );
}

function Diploma({ quality }: { quality: Quality }) {
  return (
    <group rotation={[0.2, 0, 0.5]}>
      <mesh>
        <cylinderGeometry args={[0.15, 0.15, 1.3, 32]} />
        <Glass quality={quality} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.16, 0.03, 12, 32]} />
        <Lime />
      </mesh>
    </group>
  );
}

/**
 * Leans the object toward the pointer and turns it as its section scrolls
 * through the viewport, so it reads as a physical thing pinned to the page.
 */
function Rig({
  children,
  anchor,
  pointer,
  reduced,
}: {
  children: React.ReactNode;
  anchor: React.RefObject<HTMLElement | null>;
  pointer: React.RefObject<{ x: number; y: number }>;
  reduced: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const g = group.current;
    const el = anchor.current;
    if (!g || !el) return;
    const dt = step(delta);
    const r = el.getBoundingClientRect();
    // -1 when the object enters at the bottom, 0 mid-screen, 1 as it leaves at the top.
    const p = reduced ? 0 : THREE.MathUtils.clamp(1 - (r.top + r.height / 2) / (window.innerHeight / 2), -1.2, 1.2);
    const px = reduced ? 0 : pointer.current.x;
    const py = reduced ? 0 : pointer.current.y;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, px * 0.35 + p * 0.7, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -py * 0.18 + p * 0.12, 3, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, p * 0.35, 3, dt);
  });
  return <group ref={group}>{children}</group>;
}

function Objects({ kind, quality, reduced }: { kind: SectionKind } & Props) {
  const float = reduced ? { speed: 0, floatIntensity: 0, rotationIntensity: 0 } : {};

  if (kind === "chart") {
    return (
      <>
        <Float speed={1} rotationIntensity={0.15} floatIntensity={0.5} {...float}>
          <Chart quality={quality} reduced={reduced} />
        </Float>
        <Float position={[-1.55, 1.35, -0.8]} speed={1.3} rotationIntensity={0.8} floatIntensity={0.9} {...float}>
          <Donut quality={quality} />
        </Float>
      </>
    );
  }

  if (kind === "bag") {
    return (
      <>
        <Float speed={1} rotationIntensity={0.3} floatIntensity={0.7} {...float}>
          <Bag quality={quality} reduced={reduced} />
        </Float>
        <Float position={[1.5, 1.2, 0.3]} speed={1.6} rotationIntensity={1.6} floatIntensity={1.2} {...float}>
          <Coin lime />
        </Float>
        <Float position={[-1.55, -1.05, 0.5]} speed={1.3} rotationIntensity={1.4} floatIntensity={1} {...float}>
          <group scale={0.8}>
            <Coin />
          </group>
        </Float>
      </>
    );
  }

  return (
    <>
      <Float speed={1} rotationIntensity={0.25} floatIntensity={0.6} {...float}>
        <Cap quality={quality} reduced={reduced} />
      </Float>
      <Float position={[-1.4, -1.3, 0.4]} speed={1.3} rotationIntensity={0.9} floatIntensity={1} {...float}>
        <Diploma quality={quality} />
      </Float>
    </>
  );
}

/**
 * A small WebGL still life for a section header: same glass, chrome and lime
 * language as the hero, one object per subject. Renders only while on screen.
 */
export default function SectionScene({
  kind,
  active,
  compact,
  reduced,
  background,
  anchor,
}: {
  kind: SectionKind;
  active: boolean;
  compact: boolean;
  reduced: boolean;
  /** Section background: the glass refracts it, so it must match the page behind. */
  background: string;
  anchor: React.RefObject<HTMLElement | null>;
}) {
  const [ready, setReady] = useState(false);
  const [dpr, setDpr] = useState(compact ? 1.25 : 1.5);
  const pointer = useRef({ x: 0, y: 0 });
  const quality: Quality = compact ? { samples: 3, resolution: 256 } : { samples: 4, resolution: 384 };

  // Pointer across the whole window, not the small canvas, so the lean is gentle.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 7.5], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => setReady(true)}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: ready ? 1 : 0,
        transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      fallback={null}
    >
      <color attach="background" args={[background]} />
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <directionalLight position={[5, 6, 4]} intensity={1.1} />
      <Rig anchor={anchor} pointer={pointer} reduced={reduced}>
        <Objects kind={kind} quality={quality} reduced={reduced} />
      </Rig>
      {!reduced && (
        <Sparkles count={compact ? 14 : 26} scale={[5, 4.5, 3]} size={2} speed={0.3} opacity={0.8} color="#8fbf1c" />
      )}
      <Studio />
    </Canvas>
  );
}
