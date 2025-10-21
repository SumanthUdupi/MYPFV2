import { useRef, useMemo } from 'react';
import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from './shaders/artnouveau.vert?raw';
import fragmentShader from './shaders/artnouveau.frag?raw';

const ArtNouveauShaderMaterial = shaderMaterial(
  // Uniforms
  {
    u_time: 0,
    u_resolution: new THREE.Vector2(),
    u_mouse: new THREE.Vector2(),
    u_color1: new THREE.Color('#2dd4bf'), // Emerald
    u_color2: new THREE.Color('#fbbf24'), // Gold
    u_color3: new THREE.Color('#9333ea'), // Amethyst Purple
  },
  // Vertex Shader
  vertexShader,
  // Fragment Shader
  fragmentShader
);

extend({ ArtNouveauShaderMaterial });

export function ArtNouveauNebula() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width * viewport.dpr, size.height * viewport.dpr) },
      u_mouse: { value: new THREE.Vector2() },
      u_color1: { value: new THREE.Color('#2dd4bf') },
      u_color2: { value: new THREE.Color('#fbbf24') },
      u_color3: { value: new THREE.Color('#9333ea') },
    }),
    [size, viewport]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
      {/* @ts-expect-error: artNouveauShaderMaterial is not a standard JSX element */}
      <artNouveauShaderMaterial ref={materialRef} uniforms={uniforms} />
    </mesh>
  );
}