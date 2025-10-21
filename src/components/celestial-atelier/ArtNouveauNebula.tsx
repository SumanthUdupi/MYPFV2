
import { useMemo, forwardRef, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from './shaders/nebula.vert?raw';
import fragmentShader from './shaders/nebula.frag?raw';

interface ArtNouveauNebulaProps {
  isMobile: boolean;
  reduceMotion: boolean;
}

const ArtNouveauNebula = forwardRef<THREE.ShaderMaterial, ArtNouveauNebulaProps>(({ isMobile, reduceMotion }, ref) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, camera } = useThree();

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uReduceMotion: { value: reduceMotion },
        uIsMobile: { value: isMobile },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });
  }, [reduceMotion, size.width, size.height, isMobile]);

  useEffect(() => {
    if (shaderMaterial) {
      shaderMaterial.uniforms.uResolution.value.set(size.width, size.height);
    }
  }, [size, shaderMaterial]);

  useFrame(({ clock, mouse }) => {
    if (shaderMaterial && !reduceMotion) {
      shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
      shaderMaterial.uniforms.uMouse.value.lerp(mouse, 0.05);
    }
  });

  const vFov = THREE.MathUtils.degToRad((camera as THREE.PerspectiveCamera).fov);
  const distance = (camera as THREE.PerspectiveCamera).position.z;
  const viewportHeight = 2 * Math.tan(vFov / 2) * distance;
  const viewportWidth = viewportHeight * (size.width / size.height);

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} scale={[viewportWidth, viewportHeight, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive ref={ref} object={shaderMaterial} attach="material" />
    </mesh>
  );
});

export default ArtNouveauNebula;
