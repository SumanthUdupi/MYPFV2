
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Stars } from '@react-three/drei';

// Vertex shader for jeweled stars
const vertexShader = `
  attribute float size;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Fragment shader for jeweled stars
const fragmentShader = `
  varying vec3 vColor;
  uniform float uTime;
  void main() {
    float strength = (sin(uTime * 2.0 + gl_FragCoord.x * 0.1) * 0.5 + 0.5) * 0.6 + 0.4; // Twinkle effect
    gl_FragColor = vec4(vColor, strength);
  }
`;

interface CelestialStardustFieldProps {
  count: number;
  reduceMotion: boolean;
}

const CelestialStardustField: React.FC<CelestialStardustFieldProps> = ({ count, reduceMotion }) => {
  const jeweledStarsRef = useRef<THREE.ShaderMaterial>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const jeweledCount = Math.floor(count * 0.35);
    const positions = new Float32Array(jeweledCount * 3);
    const colors = new Float32Array(jeweledCount * 3);
    const sizes = new Float32Array(jeweledCount);

    const colorPalette = [
      new THREE.Color('#2dd4bf'), // Emerald
      new THREE.Color('#fbbf24'), // Gold
      new THREE.Color('#9333ea'), // Amethyst
      new THREE.Color('#1e40af'), // Sapphire
    ];

    for (let i = 0; i < jeweledCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 200;
      positions[i3 + 1] = (Math.random() - 0.5) * 200;
      positions[i3 + 2] = (Math.random() - 0.5) * 100 - 50;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 1.5 + 0.5;
    }
    return [positions, colors, sizes];
  }, [count]);

  useFrame(({ clock }) => {
    if (jeweledStarsRef.current && !reduceMotion) {
      jeweledStarsRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });


  return (
    <>
      {/* Tier 1: Background Cosmic Dust */}
      <Stars
        radius={100}
        depth={50}
        count={Math.floor(count * 0.55)}
        factor={4}
        saturation={0}
        fade
        speed={reduceMotion ? 0 : 1}
      />

      {/* Tier 2: Mid-Field Jeweled Stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={jeweledStarsRef}
          uniforms={{ uTime: { value: 0.0 } }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          vertexColors
        />
      </points>

      {/* Tier 3: Hero Ornamental Stars */}
      <HeroStars count={Math.floor(count * 0.1)} reduceMotion={reduceMotion} />
    </>
  );
};

interface HeroStarsProps {
  count: number;
  reduceMotion: boolean;
}

const HeroStars: React.FC<HeroStarsProps> = ({ count, reduceMotion }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const [positions, scales] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 150;
      positions[i3 + 1] = (Math.random() - 0.5) * 150;
      positions[i3 + 2] = (Math.random() - 0.5) * 80;
      scales[i] = Math.random() * 0.3 + 0.2;
    }
    return [positions, scales];
  }, [count]);

  const starGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const size = 0.5;
    shape.moveTo(0, size);
    shape.quadraticCurveTo(0, 0, size * 0.2, 0);
    shape.quadraticCurveTo(0, 0, 0, -size);
    shape.quadraticCurveTo(0, 0, -size * 0.2, 0);
    shape.quadraticCurveTo(0, 0, 0, size);
    return new THREE.ShapeGeometry(shape);
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame(({ clock }) => {
    if (meshRef.current && !reduceMotion) {
      const time = clock.getElapsedTime();
      for (let i = 0; i < count; i++) {
        dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        const scale = scales[i] * (1.0 + Math.sin(time + i) * 0.15);
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[starGeometry, undefined, count]}>
      <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} transparent opacity={0.8} />
    </instancedMesh>
  );
}

export default CelestialStardustField;
