import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const InteractionOrchestrator = ({ onMouseMove }: { onMouseMove: (mouse: THREE.Vector2) => void }) => {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 1, camera.position.z), 0.02);
    camera.lookAt(0, 0, 0);
    onMouseMove(mouse);
  });

  return null;
};

export default InteractionOrchestrator;
