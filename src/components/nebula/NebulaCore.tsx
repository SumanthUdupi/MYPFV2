import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from './shaders/nebula.vert?raw';
import fragmentShader from './shaders/nebula.frag?raw';

const NebulaLayer: React.FC<{ speed: number, scale: number, z: number, mousePos: THREE.Vector2 }> = ({ speed, scale, z, mousePos }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_mouse: { value: new THREE.Vector2() },
  }), []);

  useFrame((state) => {
    const { clock } = state;
    if (meshRef.current) {
      meshRef.current.rotation.z = clock.getElapsedTime() * speed;
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.u_time.value = clock.getElapsedTime();
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.u_mouse.value.lerp(mousePos, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} scale={[scale, scale, scale]} position-z={z}>
      <planeGeometry args={[1, 1, 128, 128]} />
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

const NebulaCore: React.FC<{ mousePos: THREE.Vector2 }> = ({ mousePos }) => {
  return (
    <>
      <NebulaLayer speed={0.1} scale={10} z={-100} mousePos={mousePos} />
      <NebulaLayer speed={0.2} scale={12} z={-200} mousePos={mousePos} />
      <NebulaLayer speed={0.3} scale={15} z={-300} mousePos={mousePos} />
    </>
  );
};

export default NebulaCore;
