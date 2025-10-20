import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CursorTrail({ mouse }: { mouse: { x: number; y: number } | null }) {
  const group = useRef<THREE.Group>(null!);
  useFrame(() => {
    // simple placeholder: position an invisible group at mouse projection
    if (!group.current || !mouse) return;
    group.current.position.set((mouse.x / window.innerWidth) * 10 - 5, -(mouse.y / window.innerHeight) * 6 + 3, 0);
  });

  return (
    <group ref={group}>
      {/* small sprite as a hint */}
      <mesh position={[0, 0, 0]}>
        <circleGeometry args={[0.12, 8]} />
        <meshBasicMaterial color={0x00ffff} transparent opacity={0.4} depthWrite={false} />
      </mesh>
    </group>
  );
}
// end of file
