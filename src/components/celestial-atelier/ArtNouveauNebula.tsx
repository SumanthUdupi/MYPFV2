
import { useMemo, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from './shaders/nebula.vert?raw';
import fragmentShader from './shaders/nebula.frag?raw';

interface ArtNouveauNebulaProps {
  isMobile: boolean;
  reduceMotion: boolean;
}

const ArtNouveauNebula = forwardRef<THREE.ShaderMaterial, ArtNouveauNebulaProps>(({ isMobile, reduceMotion }, ref) => {
  const shaderMaterial = useMemo(() => {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uReduceMotion: { value: reduceMotion },
        uIsMobile: { value: isMobile },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });
    if (ref && typeof ref !== 'function') {
      ref.current = material;
    }
    return material;
  }, [ref, reduceMotion, isMobile]);

  useFrame(({ clock }) => {
    if (shaderMaterial && !reduceMotion) {
      shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh material={shaderMaterial}>
      <planeGeometry args={[10, 10, 128, 128]} />
    </mesh>
  );
});

export default ArtNouveauNebula;
