
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AmbientLifeSystemProps {
  nebulaMaterialRef: React.RefObject<THREE.ShaderMaterial>;
  curveNetworkRef: React.RefObject<THREE.Group>;
  stardustRef: React.RefObject<THREE.Points>;
  reduceMotion: boolean;
}

const AmbientLifeSystem = ({ nebulaMaterialRef, curveNetworkRef, stardustRef, reduceMotion }: AmbientLifeSystemProps) => {

  useFrame(({ clock }) => {
    if (reduceMotion) return;
    const time = clock.getElapsedTime();

    // Nebula breathing and color shifting
    if (nebulaMaterialRef.current) {
      nebulaMaterialRef.current.uniforms.uTime.value = time;
    }

    // Curve network undulation
    if (curveNetworkRef.current) {
        curveNetworkRef.current.rotation.y += Math.sin(time * 0.1) * 0.0001;
        curveNetworkRef.current.rotation.x += Math.cos(time * 0.1) * 0.0001;
    }

    // Particle drift and lifecycle
    if (stardustRef.current) {
        stardustRef.current.rotation.z += 0.0001;
    }
  });

  return null;
};

export default AmbientLifeSystem;
