"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Glass, type Quality } from "./materials";

const N = 12; // control points along the spine
const SEG = 220; // rings along the body
const RAD = 24; // vertices around each ring
const HEAD = 0.44; // head scale
const UP = new THREE.Vector3(0, 1, 0);
const ZERO = new THREE.Vector3();

/** Body thickness along the spine (u: 0 = tail, 1 = neck): needle tail, heavy middle, slimmer neck. */
function radiusAt(u: number) {
  const body = 0.012 + 0.31 * Math.pow(Math.sin(Math.min(1, u / 0.82) * Math.PI * 0.5), 0.75);
  const neck = 1 - 0.3 * THREE.MathUtils.smoothstep(u, 0.84, 1);
  return body * neck;
}

/** A sphere pulled into a python's head: long, flat, tapering to the snout (+z). */
function makeHeadGeometry() {
  const g = new THREE.SphereGeometry(1, 48, 32);
  const p = g.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const width = 1 - 0.45 * THREE.MathUtils.smoothstep(v.z, -0.2, 1);
    const height = 1 - 0.3 * THREE.MathUtils.smoothstep(v.z, 0, 1);
    p.setXYZ(i, v.x * 0.72 * width, v.y * 0.5 * height, v.z * 1.55);
  }
  g.computeVertexNormals();
  return g;
}

/**
 * A glass python, coiled and afloat. The spine is a spline whose points
 * ripple every frame, and the tube around it is rewritten in place (same
 * buffers, no reallocation), so the body slithers. The last two spine points
 * follow the head's heading, which leans toward the pointer, so the neck
 * always flows into the head instead of kinking. The tongue flicks now and
 * then. Still under reduced motion.
 */
export function Python({ quality, reduced }: { quality: Quality; reduced: boolean }) {
  const head = useRef<THREE.Group>(null);
  const tongue = useRef<THREE.Group>(null);

  const rig = useMemo(() => {
    const points = Array.from({ length: N }, () => new THREE.Vector3());
    return {
      points,
      curve: new THREE.CatmullRomCurve3(points, false, "centripetal"),
      dir: new THREE.Vector3(0, 0.3, 1).normalize(),
      look: new THREE.Matrix4(),
      p: new THREE.Vector3(),
      n: new THREE.Vector3(),
    };
  }, []);

  const layout = (t: number, px: number, py: number) => {
    const { points, curve, dir } = rig;
    const coil = N - 2;
    for (let i = 0; i < coil; i++) {
      const s = i / (coil - 1);
      // Ends at a = π/2, the front of the coil, so the neck rises toward the viewer.
      const a = s * Math.PI * 2.25 - Math.PI * 1.75;
      // A wave travelling down the coil: the body breathes and slides.
      const r = 1.05 + 0.09 * Math.sin(6 * s - 2.2 * t);
      points[i].set(r * Math.cos(a), -1.3 + s * 1.45 + 0.07 * Math.sin(5 * s - 1.8 * t), r * Math.sin(a));
    }
    // Head heading: carried level like a real snake's, leaning to the pointer, with a slow sway.
    dir
      .set(0.2 + px * 0.9 + 0.12 * Math.sin(t * 0.9), 0.08 + py * 0.45 + 0.05 * Math.sin(t * 1.3), 1)
      .normalize();
    points[coil].copy(points[coil - 1]).addScaledVector(UP, 0.75).addScaledVector(dir, 0.1);
    points[coil + 1].copy(points[coil]).addScaledVector(dir, 0.5);
    curve.updateArcLengths();
  };

  const geometry = useMemo(() => {
    layout(0, 0, 0);
    return new THREE.TubeGeometry(rig.curve, SEG, 0.2, RAD, false);
    // layout only reads `rig`, which is stable for the component's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rig]);

  const headGeometry = useMemo(makeHeadGeometry, []);

  useFrame((state) => {
    const t = reduced ? 0 : state.clock.elapsedTime;
    layout(t, reduced ? 0 : state.pointer.x, reduced ? 0 : state.pointer.y);

    // Rewrite the tube around the moved spine, ring by ring, the same way
    // TubeGeometry lays it out, so the index buffer stays valid.
    const { curve, p, n, dir, look } = rig;
    const frames = curve.computeFrenetFrames(SEG, false);
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const nor = geometry.attributes.normal as THREE.BufferAttribute;
    let idx = 0;
    for (let j = 0; j <= SEG; j++) {
      const u = j / SEG;
      curve.getPointAt(u, p);
      const fn = frames.normals[j];
      const fb = frames.binormals[j];
      const r = radiusAt(u);
      for (let k = 0; k <= RAD; k++) {
        const v = (k / RAD) * Math.PI * 2;
        const sin = Math.sin(v);
        const cos = -Math.cos(v);
        n.set(cos * fn.x + sin * fb.x, cos * fn.y + sin * fb.y, cos * fn.z + sin * fb.z);
        nor.setXYZ(idx, n.x, n.y, n.z);
        pos.setXYZ(idx, p.x + r * n.x, p.y + r * n.y, p.z + r * n.z);
        idx++;
      }
    }
    pos.needsUpdate = true;
    nor.needsUpdate = true;

    if (head.current) {
      curve.getPointAt(1, p);
      head.current.position.copy(p);
      // Matrix4.lookAt(eye, target) aims +Z from target to eye: here, along `dir`.
      look.lookAt(dir, ZERO, UP);
      head.current.quaternion.setFromRotationMatrix(look);
    }
    if (tongue.current) {
      const c = t % 2.8;
      const flick = c < 0.4 ? Math.sin((c / 0.4) * Math.PI) : 0;
      tongue.current.scale.set(1, 1, Math.max(0.001, flick));
    }
  });

  return (
    <group>
      {/* Bounds change every frame, so skip frustum culling rather than recompute them. */}
      <mesh geometry={geometry} frustumCulled={false}>
        <Glass quality={quality} />
      </mesh>

      <group ref={head}>
        <mesh geometry={headGeometry} scale={HEAD} position={[0, 0, HEAD * 0.75]}>
          <Glass quality={quality} />
          {/* Small eyes set on the sides of the head, as on a real python. */}
          {[-1, 1].map((side) => (
            <mesh key={side} position={[side * 0.39, 0.17, 0.83]} scale={0.075}>
              <sphereGeometry args={[1, 24, 24]} />
              <meshPhysicalMaterial color="#141a10" roughness={0.05} clearcoat={1} clearcoatRoughness={0} />
            </mesh>
          ))}
          {/* Forked tongue, pointing out of the snout */}
          <group ref={tongue} position={[0, -0.1, 1.48]}>
            <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.6, 8]} />
              <meshStandardMaterial color="#1d2418" roughness={0.4} />
            </mesh>
            {[-1, 1].map((side) => (
              <group key={side} position={[0, 0, 0.6]} rotation={[0, side * 0.45, 0]}>
                <mesh position={[0, 0, 0.13]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.012, 0.03, 0.26, 8]} />
                  <meshStandardMaterial color="#1d2418" roughness={0.4} />
                </mesh>
              </group>
            ))}
          </group>
        </mesh>
      </group>
    </group>
  );
}
