"use client";

import { useMemo } from "react";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import type { Quality } from "./materials";

/**
 * A brilliant-cut diamond: a lathe profile (culet, pavilion, girdle, crown,
 * table) turned through 16 steps, then un-indexed so every facet gets its own
 * flat normal. Diamond's refractive index (2.42) and a strong chromatic
 * aberration give it the bright, rainbow-edged "fire" of a real stone.
 */
export function Diamond({ quality }: { quality: Quality }) {
  const geometry = useMemo(() => {
    const profile = [
      new THREE.Vector2(0, -1.05), // culet
      new THREE.Vector2(1, 0), // girdle, lower edge
      new THREE.Vector2(1, 0.08), // girdle, upper edge
      new THREE.Vector2(0.58, 0.42), // table edge
      new THREE.Vector2(0, 0.42), // table centre
    ];
    const g = new THREE.LatheGeometry(profile, 16).toNonIndexed();
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geometry}>
      <MeshTransmissionMaterial
        backside
        samples={quality.samples}
        resolution={quality.resolution}
        transmission={1}
        thickness={2.2}
        roughness={0}
        ior={2.42}
        chromaticAberration={0.75}
        anisotropicBlur={0.05}
        distortion={0}
        color="#ffffff"
        envMapIntensity={2.4}
        clearcoat={1}
        clearcoatRoughness={0}
      />
    </mesh>
  );
}
