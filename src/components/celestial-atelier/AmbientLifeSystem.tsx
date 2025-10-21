
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AmbientLifeSystemProps {
  nebulaMaterialRef: THREE.ShaderMaterial | null;
  curveNetworkRef: THREE.Group | null;
  stardustRef: THREE.Points | null;
  reduceMotion: boolean;
}

const AmbientLifeSystem = ({ nebulaMaterialRef, curveNetworkRef, stardustRef, reduceMotion }: AmbientLifeSystemProps) => {

  useFrame(({ clock }) => {
    if (reduceMotion) return;
    const time = clock.getElapsedTime();

    // Nebula breathing and color shifting
    if (nebulaMaterialRef) {
      nebulaMaterialRef.uniforms.uTime.value = time;
    }

    // Curve network undulation
    if (curveNetworkRef) {
        curveNetworkRef.rotation.y += Math.sin(time * 0.1) * 0.0001;
        curveNetworkRef.rotation.x += Math.cos(time * 0.1) * 0.0001;
    }

    // Particle drift and lifecycle
    if (stardustRef) {
        stardustRef.rotation.z += 0.0001;
    }
  });

  return null;
};

export default AmbientLifeSystem;
