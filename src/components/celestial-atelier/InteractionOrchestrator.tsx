
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface InteractionOrchestratorProps {
  nebulaMaterial: THREE.ShaderMaterial | null;
  curveNetworkRef: THREE.Group | null;
  stardustRef: THREE.Points | null;
}

const InteractionOrchestrator = ({ nebulaMaterial, curveNetworkRef, stardustRef }: InteractionOrchestratorProps) => {
  const { camera } = useThree();
  const target = new THREE.Vector3(0, 0, 5);

  useFrame(({ mouse }) => {
    // Parallax effect
    target.x = mouse.x * 0.1;
    target.y = mouse.y * 0.1;
    camera.position.lerp(target, 0.02);

    // Update nebula shader mouse uniform
    if (nebulaMaterial) {
        nebulaMaterial.uniforms.uMouse.value.lerp(mouse, 0.05);
    }

    // Rotate curve network
    if (curveNetworkRef) {
        curveNetworkRef.rotation.y = THREE.MathUtils.lerp(curveNetworkRef.rotation.y, mouse.x * Math.PI * 0.1, 0.02);
        curveNetworkRef.rotation.x = THREE.MathUtils.lerp(curveNetworkRef.rotation.x, mouse.y * Math.PI * 0.1, 0.02);
    }

    // Rotate stardust field
    if (stardustRef) {
        stardustRef.rotation.y = THREE.MathUtils.lerp(stardustRef.rotation.y, mouse.x * Math.PI * 0.05, 0.02);
        stardustRef.rotation.x = THREE.MathUtils.lerp(stardustRef.rotation.x, mouse.y * Math.PI * 0.05, 0.02);
    }
  });

  return null;
};

export default InteractionOrchestrator;
