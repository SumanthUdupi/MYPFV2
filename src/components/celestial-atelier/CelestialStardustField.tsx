import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Stars } from '@react-three/drei';

const vertexShader = `
  attribute float size;
  attribute float age;
  varying vec3 vColor;
  varying float vAge;
  void main() {
    vColor = color;
    vAge = age;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + age * 0.5);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAge;
  uniform float uTime;
  void main() {
    float twinkle = sin(uTime * 2.0 + gl_FragCoord.x * 0.1) * 0.5 + 0.5;
    float fade = 1.0 - vAge;
    float strength = twinkle * 0.6 + 0.4;
    float glow = exp(-vAge * 2.0) * 0.3;
    gl_FragColor = vec4(vColor, strength * fade + glow);
  }
`;

interface CelestialStardustFieldProps {
  count: number;
  reduceMotion: boolean;
}

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  age: number;
  maxAge: number;
  color: THREE.Color;
  size: number;
}

const CelestialStardustField: React.FC<CelestialStardustFieldProps> = ({ count, reduceMotion }) => {
  const jeweledStarsRef = useRef<THREE.Points>(null);
  const particlesRef = useRef<Particle[]>([]);
  const positionsRef = useRef<Float32Array | null>(null);
  const colorsRef = useRef<Float32Array | null>(null);
  const agesRef = useRef<Float32Array | null>(null);
  const sizesRef = useRef<Float32Array | null>(null);

  const [positions, colors, ages, sizes] = useMemo(() => {
    const jeweledCount = Math.floor(count * 0.35);
    const positions = new Float32Array(jeweledCount * 3);
    const colors = new Float32Array(jeweledCount * 3);
    const ages = new Float32Array(jeweledCount);
    const sizes = new Float32Array(jeweledCount);

    const colorPalette = [
      new THREE.Color('#2dd4bf'),
      new THREE.Color('#fbbf24'),
      new THREE.Color('#9333ea'),
      new THREE.Color('#1e40af'),
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

      ages[i] = Math.random() * 0.5;
      sizes[i] = Math.random() * 1.5 + 0.5;
    }

    positionsRef.current = positions;
    colorsRef.current = colors;
    agesRef.current = ages;
    sizesRef.current = sizes;

    return [positions, colors, ages, sizes];
  }, [count]);

  useFrame(({ clock }) => {
    if (!reduceMotion && jeweledStarsRef.current) {
      const time = clock.getElapsedTime();

      if (jeweledStarsRef.current.material && 'uniforms' in jeweledStarsRef.current.material) {
        const material = jeweledStarsRef.current.material as THREE.ShaderMaterial;
        material.uniforms.uTime.value = time;
      }

      if (agesRef.current && colorsRef.current) {
        for (let i = 0; i < agesRef.current.length; i++) {
          agesRef.current[i] += 0.002;

          if (agesRef.current[i] > 1.0) {
            agesRef.current[i] = 0.0;
          }

          const hueShift = Math.sin(time * 0.2 + i) * 0.1;
          const baseColor = [
            new THREE.Color('#2dd4bf'),
            new THREE.Color('#fbbf24'),
            new THREE.Color('#9333ea'),
            new THREE.Color('#1e40af'),
          ][i % 4];

          const i3 = i * 3;
          colorsRef.current[i3] = baseColor.r * (1.0 + hueShift);
          colorsRef.current[i3 + 1] = baseColor.g * (1.0 + hueShift);
          colorsRef.current[i3 + 2] = baseColor.b * (1.0 + hueShift);
        }

        (jeweledStarsRef.current.geometry.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true;
        (jeweledStarsRef.current.geometry.getAttribute('age') as THREE.BufferAttribute).needsUpdate = true;
      }
    }
  });

  return (
    <>
      <Stars
        radius={100}
        depth={50}
        count={Math.floor(count * 0.55)}
        factor={4}
        saturation={0}
        fade
        speed={reduceMotion ? 0 : 1}
      />

      <points ref={jeweledStarsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-age" args={[ages, 1]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          uniforms={{ uTime: { value: 0.0 } }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          vertexColors
        />
      </points>

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
  const positionsRef = useRef<Float32Array | null>(null);
  const scalesRef = useRef<Float32Array | null>(null);

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

    positionsRef.current = positions;
    scalesRef.current = scales;

    return [positions, scales];
  }, [count]);

  const starGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const size = 0.5;
    shape.moveTo(0, size);
    shape.lineTo(size * 0.2, size * 0.2);
    shape.lineTo(size, 0);
    shape.lineTo(size * 0.2, -size * 0.2);
    shape.lineTo(0, -size);
    shape.lineTo(-size * 0.2, -size * 0.2);
    shape.lineTo(-size, 0);
    shape.lineTo(-size * 0.2, size * 0.2);
    shape.lineTo(0, size);
    return new THREE.ShapeGeometry(shape);
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (meshRef.current && !reduceMotion) {
      const time = clock.getElapsedTime();
      for (let i = 0; i < count; i++) {
        if (positionsRef.current && scalesRef.current) {
          dummy.position.set(
            positionsRef.current[i * 3],
            positionsRef.current[i * 3 + 1],
            positionsRef.current[i * 3 + 2]
          );

          const basePulse = Math.sin(time * 1.5 + i * 0.2) * 0.2 + 0.8;
          const driftOffset = Math.sin(time * 0.3 + i) * 0.02;
          dummy.position.y += driftOffset;

          const scale = scalesRef.current[i] * basePulse;
          dummy.scale.set(scale, scale, scale);

          const rotZ = time * 0.5 + i * 0.3;
          dummy.rotation.z = rotZ;

          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i, dummy.matrix);
        }
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[starGeometry, undefined, count]}>
      <meshBasicMaterial
        color="#fbbf24"
        side={THREE.DoubleSide}
        transparent
        opacity={0.7}
        wireframe={false}
      />
    </instancedMesh>
  );
};

export default CelestialStardustField;
