"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
  PerformanceMonitor,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

const LIME = "#c6f24a";

type Quality = { samples: number; resolution: number };

/** Clear glass that bends what is behind it and splits light at the edges. */
function Glass({ quality }: { quality: Quality }) {
  return (
    <MeshTransmissionMaterial
      backside
      samples={quality.samples}
      resolution={quality.resolution}
      transmission={1}
      thickness={1.1}
      roughness={0.04}
      ior={1.35}
      chromaticAberration={0.09}
      anisotropicBlur={0.2}
      distortion={0.3}
      distortionScale={0.45}
      temporalDistortion={0.1}
      color="#ffffff"
      attenuationColor="#eaffd0"
      attenuationDistance={2.5}
    />
  );
}

function Chrome() {
  return <meshStandardMaterial color="#d3d7dc" metalness={1} roughness={0.14} />;
}

/** Slow, independent spin on top of the Float bob. */
function Spin({ children, speed = 0.15 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });
  return <group ref={ref}>{children}</group>;
}

/**
 * Leans the whole cluster toward the pointer, then lifts and tilts it as the
 * hero scrolls away, so the objects feel physically attached to the page.
 */
function Rig({ children, reduced }: { children: React.ReactNode; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const scroll = window.scrollY;
    const px = reduced ? 0 : state.pointer.x;
    const py = reduced ? 0 : state.pointer.y;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -py * 0.16 + scroll * 0.0005, 3, delta);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, px * 0.26, 3, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, scroll * 0.003, 4, delta);
  });
  return <group ref={group}>{children}</group>;
}

function Objects({ compact, reduced }: { compact: boolean; reduced: boolean }) {
  const quality: Quality = compact ? { samples: 3, resolution: 256 } : { samples: 6, resolution: 512 };
  const float = reduced ? { speed: 0, floatIntensity: 0, rotationIntensity: 0 } : {};

  // Phones are portrait and the copy sits low, so the cluster moves up and in.
  const at = compact
    ? {
        knot: [0.75, 2.05, -0.6] as const,
        knotScale: 0.68,
        orbit: [0.75, 2.05, -2.6] as const,
        gem: [-1.25, 2.95, -2.4] as const,
        ring: [1.75, 0.75, -1.4] as const,
        capsule: [-1.4, 1.2, -3] as const,
        lime: [-0.35, 1.25, 0.6] as const,
      }
    : {
        knot: [2.6, 0.15, 0] as const,
        knotScale: 1.05,
        orbit: [2.6, 0.15, -2.6] as const,
        gem: [0.4, 2.2, -2.2] as const,
        ring: [4.4, -1.75, -0.6] as const,
        capsule: [4.5, 1.95, -2.4] as const,
        // Upper-left gap between the status line and the headline, clear of the CTAs.
        lime: [-0.9, 1.6, 0.6] as const,
      };

  // Each object's position sits on its <Float>, with the mesh at the local
  // origin, so the bob and the spin turn the object on itself instead of
  // swinging it around the centre of the screen.
  return (
    <Rig reduced={reduced}>
      {/* Hero piece: glass torus knot */}
      <Float position={at.knot} speed={1.2} rotationIntensity={0.6} floatIntensity={0.8} {...float}>
        <Spin>
          <mesh scale={at.knotScale}>
            <torusKnotGeometry args={[1, 0.32, 260, 36]} />
            <Glass quality={quality} />
          </mesh>
        </Spin>
      </Float>

      {/* A lime orbit behind the knot, refracted through the glass */}
      <Float position={at.orbit} speed={0.8} rotationIntensity={0.3} floatIntensity={0.3} {...float}>
        <mesh rotation={[1.15, 0.25, 0]} scale={compact ? 1.05 : 1.7}>
          <torusGeometry args={[1.35, 0.022, 16, 160]} />
          <meshBasicMaterial color={LIME} toneMapped={false} />
        </mesh>
      </Float>

      {/* Faceted chrome gem */}
      <Float position={at.gem} speed={1.6} rotationIntensity={1.4} floatIntensity={1.2} {...float}>
        <mesh scale={compact ? 0.38 : 0.55}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#d3d7dc" metalness={1} roughness={0.08} flatShading />
        </mesh>
      </Float>

      {/* Glass ring */}
      <Float position={at.ring} speed={1.1} rotationIntensity={1.1} floatIntensity={1} {...float}>
        <mesh rotation={[0.6, 0.4, 0]} scale={compact ? 0.45 : 0.75}>
          <torusGeometry args={[0.85, 0.28, 48, 120]} />
          <Glass quality={quality} />
        </mesh>
      </Float>

      {/* Chrome capsule */}
      <Float position={at.capsule} speed={1.4} rotationIntensity={1.6} floatIntensity={1.1} {...float}>
        <mesh rotation={[0, 0, 0.7]} scale={compact ? 0.32 : 0.45}>
          <capsuleGeometry args={[0.45, 1.1, 12, 32]} />
          <Chrome />
        </mesh>
      </Float>

      {/* A lit lime bead: the single warm point in the scene */}
      <Float position={at.lime} speed={2} rotationIntensity={0} floatIntensity={1.6} {...float}>
        <mesh scale={compact ? 0.14 : 0.2}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshBasicMaterial color={LIME} toneMapped={false} />
        </mesh>
      </Float>

      {!compact && (
        <Float position={[-3.9, -2.25, -3.4]} speed={1.3} rotationIntensity={1.2} floatIntensity={1} {...float}>
          <mesh scale={0.5}>
            <octahedronGeometry args={[1, 0]} />
            <Glass quality={quality} />
          </mesh>
        </Float>
      )}
    </Rig>
  );
}

/**
 * The hero's WebGL layer. Reflections come from a studio of lightformers
 * rendered once into the environment map, so nothing is fetched at runtime.
 * The render loop stops while the hero is off screen.
 */
export default function HeroScene({
  active,
  compact,
  reduced,
}: {
  active: boolean;
  compact: boolean;
  reduced: boolean;
}) {
  const [ready, setReady] = useState(false);
  const [dpr, setDpr] = useState(compact ? 1.25 : 1.75);

  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 9], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      eventSource={typeof document !== "undefined" ? document.documentElement : undefined}
      eventPrefix="client"
      onCreated={() => setReady(true)}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: ready ? 1 : 0,
        transition: "opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      fallback={null}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <directionalLight position={[5, 6, 4]} intensity={1.1} />
      <Objects compact={compact} reduced={reduced} />
      {!reduced && (
        <Sparkles
          count={compact ? 30 : 70}
          scale={[12, 7, 6]}
          size={2.2}
          speed={0.3}
          opacity={0.55}
          color={LIME}
        />
      )}
      <Environment resolution={256} frames={1}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
          <Lightformer
            form="ring"
            color={LIME}
            intensity={8}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
            position={[10, 10, 0]}
            scale={10}
          />
        </group>
      </Environment>
    </Canvas>
  );
}
