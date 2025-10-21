
import { useEffect, type MutableRefObject } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface InteractionOrchestratorProps {
  nebulaMaterial: MutableRefObject<THREE.ShaderMaterial | null>;
}

const InteractionOrchestrator: React.FC<InteractionOrchestratorProps> = ({ nebulaMaterial }) => {
  const { camera, size } = useThree();
  const mouse = new THREE.Vector2();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / size.width) * 2 - 1;
      mouse.y = -(event.clientY / size.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);

  useFrame(() => {
    // Parallax effect
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, (mouse.x * Math.PI) / 20, 0.05);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, (-mouse.y * Math.PI) / 20, 0.05);

    // Nebula breathing
    if (nebulaMaterial.current) {
        nebulaMaterial.current.uniforms.uMouse.value.lerp(mouse, 0.05);
    }
  });

  return null;
};

export default InteractionOrchestrator;
