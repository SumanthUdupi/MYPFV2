import React, { useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const StarInstance: React.FC<{ count: number, size: number, mousePos: THREE.Vector2 }> = ({ count, size, mousePos }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      const twinkleSpeed = Math.random() * 2 + 1;

      temp.push({ time, factor, speed, x, y, z, twinkleSpeed });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      const { factor, speed, x, y, z, twinkleSpeed } = particle;

      const t = (particle.time += speed);

      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );

      const distance = dummy.position.distanceTo(new THREE.Vector3(mousePos.x * 50, mousePos.y * 50, 0));
      const s = Math.cos(t) * size * (distance < 2 ? 1.3 : 1);
      dummy.scale.set(s, s, s);

      if (distance < 2) {
        dummy.position.add(new THREE.Vector3(0.1, 0.1, 0));
      }

      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, distance < 2 ? color.set(0x00ffff) : color.set(0xC4A662));

      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = Math.sin(state.clock.getElapsedTime() * twinkleSpeed) * 0.5 + 0.5;
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor!.needsUpdate = true;
  });

  const texture = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}star.png`);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        emissive="#A48642"
        emissiveIntensity={0.5}
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
};

const StardustField: React.FC<{ mousePos: THREE.Vector2 }> = ({ mousePos }) => {
  return (
    <>
      <StarInstance count={100} size={0.1} mousePos={mousePos} />
      <StarInstance count={1000} size={0.05} mousePos={mousePos} />
      <StarInstance count={2000} size={0.02} mousePos={mousePos} />
    </>
  );
};

export default StardustField;
