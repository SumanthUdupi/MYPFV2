import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface AmbientLifeSystemProps {
  nebulaMaterialRef: React.MutableRefObject<THREE.ShaderMaterial | null>;
  curveNetworkRef: React.MutableRefObject<THREE.Group | null>;
  stardustRef: React.MutableRefObject<THREE.Points | null>;
  reduceMotion: boolean;
}

interface ShootingStar {
  start: THREE.Vector3;
  end: THREE.Vector3;
  progress: number;
  duration: number;
  createdAt: number;
}

const AmbientLifeSystem: React.FC<AmbientLifeSystemProps> = ({
  nebulaMaterialRef,
  curveNetworkRef,
  stardustRef,
  reduceMotion,
}) => {
  const { scene } = useThree();
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const shootingStarMeshRef = useRef<THREE.Mesh>(null);
  const lastShootingStarRef = useRef<number>(0);

  // Shooting star trail geometry
  const trailGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(300 * 3);
    const indices = new Uint32Array(300 * 2);

    for (let i = 0; i < 300; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      if (i < 299) {
        indices[i * 2] = i;
        indices[i * 2 + 1] = i + 1;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    return geometry;
  }, []);

  // Initialize shooting star
  const createShootingStar = () => {
    const startX = (Math.random() - 0.5) * 20;
    const startY = (Math.random() - 0.5) * 20;
    const startZ = -8;

    const endX = (Math.random() - 0.5) * 20;
    const endY = (Math.random() - 0.5) * 20;
    const endZ = -1;

    shootingStarsRef.current.push({
      start: new THREE.Vector3(startX, startY, startZ),
      end: new THREE.Vector3(endX, endY, endZ),
      progress: 0,
      duration: 1.5 + Math.random() * 1.0,
      createdAt: Date.now(),
    });
  };

  // Ambient animations
  useFrame(({ clock }) => {
    const time = reduceMotion ? 0 : clock.getElapsedTime();

    // Nebula breathing effect
    if (nebulaMaterialRef.current) {
      nebulaMaterialRef.current.uniforms.uTime.value = time;
    }

    // Color breathing cycle (120-second cycle)
    const colorCycle = (time % 120) / 120;
    if (nebulaMaterialRef.current) {
      const hueShift = Math.sin(colorCycle * Math.PI * 2) * 0.1;
      nebulaMaterialRef.current.uniforms.uColorCycle = {
        value: hueShift,
      };
    }

    // Curve network pulsing
    if (curveNetworkRef.current && !reduceMotion) {
      curveNetworkRef.current.children.forEach((child, index) => {
        const baseMaterial = (child as THREE.Mesh).material as THREE.ShaderMaterial;
        if (baseMaterial.uniforms) {
          const pulseIntensity = 0.5 + Math.sin(time * 0.8 + index * 0.3) * 0.3;
          baseMaterial.uniforms.uPulseIntensity = { value: pulseIntensity };
        }
      });
    }

    // Shooting stars generation
    if (!reduceMotion && Date.now() - lastShootingStarRef.current > 40000 + Math.random() * 20000) {
      createShootingStar();
      lastShootingStarRef.current = Date.now();
    }

    // Update shooting stars
    shootingStarsRef.current = shootingStarsRef.current.filter((star) => {
      star.progress += 0.016 / star.duration;
      return star.progress < 1.0;
    });

    // Render shooting star trails
    if (shootingStarMeshRef.current && !reduceMotion) {
      const positions = (trailGeometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array;
      let posIndex = 0;

      shootingStarsRef.current.forEach((star) => {
        const progress = Math.min(star.progress, 1.0);
        const position = new THREE.Vector3().lerpVectors(star.start, star.end, progress);

        if (posIndex < positions.length) {
          positions[posIndex] = position.x;
          positions[posIndex + 1] = position.y;
          positions[posIndex + 2] = position.z;
          posIndex += 3;
        }
      });

      (trailGeometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
    }

    // Stardust particle color breathing
    if (stardustRef.current && !reduceMotion) {
      const colors = (stardustRef.current.geometry.getAttribute('color') as THREE.BufferAttribute).array as Float32Array;
      const colorCycleFactor = Math.sin(time * 0.3) * 0.2 + 0.9;

      for (let i = 0; i < Math.min(colors.length, 100); i += 3) {
        colors[i] *= colorCycleFactor;
        colors[i + 1] *= colorCycleFactor;
        colors[i + 2] *= colorCycleFactor;
      }
      (stardustRef.current.geometry.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true;
    }
  });

  return (
    <>
      {/* Shooting star trail renderer */}
      {!reduceMotion && (
        <mesh ref={shootingStarMeshRef} geometry={trailGeometry}>
          <lineBasicMaterial
            color="#ffd700"
            linewidth={2}
            transparent
            opacity={0.6}
            fog={false}
          />
        </mesh>
      )}
    </>
  );
};

export default AmbientLifeSystem;
