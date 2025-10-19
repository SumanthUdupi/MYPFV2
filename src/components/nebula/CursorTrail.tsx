import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CursorTrail: React.FC<{ mousePos: THREE.Vector2 }> = ({ mousePos }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const count = 30;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(),
        life: 0,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    particles.forEach((particle, i) => {
      if (particle.life > 0) {
        particle.life -= 0.02;
      } else if (Math.random() > 0.9) {
        particle.life = 0.8;
        particle.position.set(mousePos.x * 50, mousePos.y * 50, 0);
      }

      dummy.position.copy(particle.position);
      const s = Math.max(0, particle.life);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
};

export default CursorTrail;
