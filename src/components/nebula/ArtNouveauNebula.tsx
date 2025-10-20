import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import frag from './shaders/artnouveau.frag?raw';
import vert from './shaders/artnouveau.vert?raw';
import { prefersReducedMotion } from './utils/prefs';

type MouseProp = React.RefObject<THREE.Vector2> | null;

export default function ArtNouveauNebula({ mouse }: { mouse: MouseProp }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  // allow forcing visuals in DEV for easier debugging
  const reduce = prefersReducedMotion() && !(import.meta as any).env?.DEV;
  const isSmall = typeof window !== 'undefined' && window.innerWidth < 900;
  // Skip heavy ornamental layer for reduced-motion or small screens
  try {
    // eslint-disable-next-line no-console
    console.debug('[ArtNouveauNebula] reduce=', reduce, 'isSmall=', isSmall);
  } catch (e) {}

  if (reduce || isSmall) {
    try {
      // eslint-disable-next-line no-console
      console.info('[ArtNouveauNebula] skipping ornamental layer due to reduced-motion or small screen');
    } catch (e) {}
    return null;
  }

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_baseA: { value: new THREE.Color(0x0b1b3a) }, // deep space blue
    u_baseB: { value: new THREE.Color(0x6b2a6f) }, // nebula purple
    u_jewel: { value: new THREE.Color(0xc4a662) }, // amber/gold accent
    u_timeScale: { value: 1.0 },
  }), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!meshRef.current) return;
    (meshRef.current.material as THREE.ShaderMaterial).uniforms.u_time.value = t;
    (meshRef.current.material as THREE.ShaderMaterial).uniforms.u_timeScale.value = 0.6;
    const target = mouse?.current ?? new THREE.Vector2(0, 0);
    (meshRef.current.material as THREE.ShaderMaterial).uniforms.u_mouse.value.lerp(target, 0.05);
    // a slow rotation for parallax
    meshRef.current.rotation.z = Math.sin(t * 0.02) * 0.03;
  });

  const segments = isSmall ? 32 : 128;
  const scaleX = isSmall ? 48 : 60;
  const scaleY = isSmall ? 32 : 40;

  return (
    <mesh ref={meshRef} position={[0, -1.2, -60]} scale={[scaleX, scaleY, 1]}>
      <planeGeometry args={[1.0, 1.0, segments, segments]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={frag}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </mesh>
  );
}
