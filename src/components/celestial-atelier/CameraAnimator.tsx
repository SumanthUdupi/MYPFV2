import { useThree, useFrame } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

const CameraAnimator = () => {
  const { camera } = useThree();

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 80;
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  useFrame((_, delta) => {
    if (camera instanceof THREE.PerspectiveCamera && camera.fov > 75) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, 75, delta * 0.3);
      camera.updateProjectionMatrix();
    }
  });

  return null;
};

export default CameraAnimator;
