import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from './shaders/nebula.vert?raw';
import fragmentShader from './shaders/nebula.frag?raw';
import type { RefObject } from 'react';

type MouseProp = RefObject<THREE.Vector2> | null;

const NebulaLayer: React.FC<{ speed: number; scale: number; z: number; mouse: MouseProp }> = ({ speed, scale, z, mouse }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_mouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.z = t * speed * 0.01;
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.u_time.value = t;
      const target = mouse?.current ?? new THREE.Vector2(0, 0);
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.u_mouse.value.lerp(target, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} scale={[scale, scale, scale]} position={[0, 0, z]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export default function NebulaCore({ mouse }: { mouse: MouseProp }) {
  return (
    <group>
      <NebulaLayer speed={0.05} scale={30} z={-50} mouse={mouse} />
      <NebulaLayer speed={0.08} scale={35} z={-80} mouse={mouse} />
      <NebulaLayer speed={0.12} scale={45} z={-110} mouse={mouse} />
    </group>
  );
}
