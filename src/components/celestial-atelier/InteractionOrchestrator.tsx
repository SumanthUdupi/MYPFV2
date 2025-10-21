
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface InteractionOrchestratorProps {
  nebulaMaterial: React.RefObject<THREE.ShaderMaterial | null>;
  curveNetworkRef: React.RefObject<THREE.Group | null>;
  stardustRef: React.RefObject<THREE.Points | null>;
}

const InteractionOrchestrator = ({ nebulaMaterial, curveNetworkRef, stardustRef }: InteractionOrchestratorProps) => {
  const { camera } = useThree();
  const target = new THREE.Vector3(0, 0, 5);

  useFrame(({ mouse }) => {
    // Parallax effect for different layers
    // Deepest layer (nebula) - subtle camera movement
    target.x = mouse.x * 0.05;
    target.y = mouse.y * 0.05;
    camera.position.lerp(target, 0.02);

    // Update nebula shader mouse uniform for internal parallax
    if (nebulaMaterial.current) {
        nebulaMaterial.current.uniforms.uMouse.value.lerp(mouse, 0.05);
    }

    // Mid-ground layer (curves)
    if (curveNetworkRef.current) {
        curveNetworkRef.current.rotation.y = THREE.MathUtils.lerp(curveNetworkRef.current.rotation.y, mouse.x * Math.PI * 0.1, 0.02);
        curveNetworkRef.current.rotation.x = THREE.MathUtils.lerp(curveNetworkRef.current.rotation.x, mouse.y * Math.PI * 0.1, 0.02);
    }

    // Foreground layer (stardust) - stronger reaction
    if (stardustRef.current) {
        stardustRef.current.rotation.y = THREE.MathUtils.lerp(stardustRef.current.rotation.y, mouse.x * Math.PI * 0.2, 0.02);
        stardustRef.current.rotation.x = THREE.MathUtils.lerp(stardustRef.current.rotation.x, mouse.y * Math.PI * 0.2, 0.02);
    }
  });

  return null;
};

export default InteractionOrchestrator;
