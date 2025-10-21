
import { useMemo, useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from './shaders/stardust.vert?raw';
import fragmentShader from './shaders/stardust.frag?raw';

interface CelestialStardustFieldProps {
  count: number;
  reduceMotion: boolean;
}

const CelestialStardustField = forwardRef<THREE.Points, CelestialStardustFieldProps>(({ count, reduceMotion }, ref) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors, sizes, types] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const types = new Float32Array(count);

    const color_emerald = new THREE.Color('#2dd4bf');
    const color_sapphire = new THREE.Color('#1e40af');
    const color_amber = new THREE.Color('#f59e0b');
    const color_white = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 30;

      const random_type = Math.random();
      if (random_type < 0.55) { // Background cosmic dust
        types[i] = 0.0;
        sizes[i] = Math.random() * 1.5 + 0.5;
        color_white.toArray(colors, i3);
      } else if (random_type < 0.90) { // Mid-field jeweled stars
        types[i] = 1.0;
        sizes[i] = Math.random() * 2.5 + 1.0;
        const jewel_colors = [color_emerald, color_sapphire, color_amber];
        jewel_colors[Math.floor(Math.random() * 3)].toArray(colors, i3);
      } else { // Hero ornamental stars
        types[i] = 2.0;
        sizes[i] = Math.random() * 4.0 + 2.0;
        const jewel_colors = [color_emerald, color_sapphire, color_amber];
        jewel_colors[Math.floor(Math.random() * 3)].toArray(colors, i3);
      }
    }
    return [positions, colors, sizes, types];
  }, [count]);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0.0 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
    });
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current && !reduceMotion) {
      (pointsRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
      pointsRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <points ref={ref || pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} needsUpdate />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} needsUpdate />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} needsUpdate />
        <bufferAttribute attach="attributes-type" args={[types, 1]} needsUpdate />
      </bufferGeometry>
      <primitive object={shaderMaterial} attach="material" />
    </points>
  );
});

export default CelestialStardustField;
