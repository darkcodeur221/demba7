"use client";

import { Environment, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import { LIME } from "./palette";

export { LIME, PAGE, SURFACE } from "./palette";

export type Quality = { samples: number; resolution: number };

/** Lime-tinted glass that bends what is behind it and splits light at the edges. */
export function Glass({ quality }: { quality: Quality }) {
  return (
    <MeshTransmissionMaterial
      backside
      samples={quality.samples}
      resolution={quality.resolution}
      transmission={1}
      thickness={1.4}
      roughness={0.05}
      ior={1.4}
      chromaticAberration={0.12}
      anisotropicBlur={0.25}
      distortion={0.3}
      distortionScale={0.45}
      temporalDistortion={0.1}
      color="#f6fdea"
      attenuationColor={LIME}
      attenuationDistance={2.4}
    />
  );
}

/** Graphite chrome: the dark notes that give a scene contrast on white. */
export function Chrome() {
  return <meshStandardMaterial color="#3a3f47" metalness={1} roughness={0.18} />;
}

/** Solid lime with a faint glow, for small accents. */
export function Lime() {
  return (
    <meshStandardMaterial color={LIME} emissive={LIME} emissiveIntensity={0.3} roughness={0.35} metalness={0.1} />
  );
}

/**
 * Studio lighting baked once into the environment map, so reflections need
 * no fetched HDR and cost nothing per frame.
 */
export function Studio() {
  return (
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
  );
}
