import { useRef, useMemo, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TRAIL_LENGTH = 35;
const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();

export default function CursorTrail({ mouse }: { mouse: RefObject<THREE.Vector2> | null }) {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null!);

  // A buffer to store the history of mouse positions
  const trail = useMemo(() => Array.from({ length: TRAIL_LENGTH }, () => new THREE.Vector3()), []);

  useFrame((state, delta) => {
    if (!instancedMeshRef.current || !mouse?.current) return;

    const { viewport } = state;
    const targetPosition = new THREE.Vector3((mouse.current.x * viewport.width) / 2, (mouse.current.y * viewport.height) / 2, 0);
    
    // Make the animation frame-rate independent by using delta
    const lerpFactorHead = 1 - Math.exp(-10 * delta);
    const lerpFactorTail = 1 - Math.exp(-20 * delta);

    // Update the trail history
    // The last element "chases" the mouse, and the rest of the trail chases the element in front of it
    trail[TRAIL_LENGTH - 1].lerp(targetPosition, lerpFactorHead); // The head of the trail
    for (let i = TRAIL_LENGTH - 2; i >= 0; i--) {
      trail[i].lerp(trail[i + 1], lerpFactorTail);
    }

    // Update the instanced mesh particles
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const position = trail[i];
      tempObject.position.copy(position);

      // Particles shrink and fade along the trail
      const scale = Math.max(0, 1 - i / TRAIL_LENGTH) * 0.15;
      tempObject.scale.set(scale, scale, scale);

      tempObject.updateMatrix();
      instancedMeshRef.current.setMatrixAt(i, tempObject.matrix);

      // Fade color along the trail
      const opacity = Math.max(0, 1 - i / TRAIL_LENGTH) * 0.7;
      tempColor.set(0x00ffff).multiplyScalar(opacity);
      instancedMeshRef.current.setColorAt(i, tempColor);
    }

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    if (instancedMeshRef.current.instanceColor) {
      instancedMeshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, TRAIL_LENGTH]}>
      <circleGeometry args={[1, 8]} />
      <meshBasicMaterial
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        transparent
      />
    </instancedMesh>
  );
}
