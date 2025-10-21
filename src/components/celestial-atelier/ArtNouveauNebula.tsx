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
  const { camera, size } = useThree();

  const shaderMaterial = useMemo(() => {
    const material = new THREE.ShaderMaterial({
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
    if (ref && typeof ref !== 'function') {
      ref.current = material;
    }
    return material;
  }, [ref, reduceMotion, isMobile, size.width, size.height]);

  useEffect(() => {
    if (shaderMaterial) {
      shaderMaterial.uniforms.uResolution.value.set(size.width, size.height);
    }
  }, [size.width, size.height, shaderMaterial]);

  useFrame(({ clock }) => {
    if (shaderMaterial && !reduceMotion) {
      shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  const vFov = THREE.MathUtils.degToRad((camera as THREE.PerspectiveCamera).fov);
  const distance = (camera as THREE.PerspectiveCamera).position.z;
  const viewportHeight = 2 * Math.tan(vFov / 2) * distance;
  const viewportWidth = viewportHeight * (size.width / size.height);

  return (
    <mesh ref={meshRef} material={shaderMaterial} position={[0, 0, -2]} scale={[viewportWidth * 1.3, viewportHeight * 1.3, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
    </mesh>
  );
});

export default ArtNouveauNebula;
