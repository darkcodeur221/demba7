"use client";

import { MeshTransmissionMaterial } from "@react-three/drei";

export const LIME = "#c6f24a";
/** Must match --background: the glass refracts the scene, so it needs the page colour behind it. */
export const PAGE = "#f4f5f7";

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
