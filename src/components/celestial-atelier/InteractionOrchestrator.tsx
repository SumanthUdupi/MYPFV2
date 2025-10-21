import { useEffect, useRef, type MutableRefObject } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RippleEvent {
  position: THREE.Vector2;
  time: number;
  intensity: number;
}

interface InteractionOrchestratorProps {
  nebulaMaterial: MutableRefObject<THREE.ShaderMaterial | null>;
  curveNetworkRef?: MutableRefObject<THREE.Group | null>;
  stardustRef?: MutableRefObject<THREE.Points | null>;
}

const InteractionOrchestrator: React.FC<InteractionOrchestratorProps> = ({
  nebulaMaterial,
  curveNetworkRef,
  stardustRef,
}) => {
  const { camera, size } = useThree();
  const mouseRef = useRef(new THREE.Vector2());
  const mouseTargetRef = useRef(new THREE.Vector2());
  const ripplesRef = useRef<RippleEvent[]>([]);
  const particleAwakeningRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseTargetRef.current.x = (event.clientX / size.width) * 2 - 1;
      mouseTargetRef.current.y = -(event.clientY / size.height) * 2 + 1;
    };

    const handleClick = (event: MouseEvent) => {
      const clickPos = new THREE.Vector2(
        (event.clientX / size.width) * 2 - 1,
        -(event.clientY / size.height) * 2 + 1
      );

      ripplesRef.current.push({
        position: clickPos.clone(),
        time: Date.now(),
        intensity: 1.0,
      });

      particleAwakeningRef.current = 1.0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [size]);

  useFrame(({ clock }) => {
    // Smooth mouse following
    mouseRef.current.lerp(mouseTargetRef.current, 0.1);

    // Parallax effect (±7° tilt)
    const targetRotY = (mouseRef.current.x * Math.PI) / 20;
    const targetRotX = (-mouseRef.current.y * Math.PI) / 20;

    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotY, 0.08);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotX, 0.08);

    // Nebula breathing and deformation
    if (nebulaMaterial.current) {
      nebulaMaterial.current.uniforms.uMouse.value.lerp(mouseRef.current, 0.08);

      // Nebula deformation based on proximity
      const mouseDist = mouseRef.current.length();
      const deformationIntensity = Math.max(0, 1.0 - mouseDist / 2.0);
      nebulaMaterial.current.uniforms.uMouseIntensity = {
        value: deformationIntensity * 0.3,
      };
    }

    // Curve network response to cursor
    if (curveNetworkRef?.current) {
      const curveDistance = 220;
      const curveChildren = curveNetworkRef.current.children;

      curveChildren.forEach((child, idx) => {
        const mesh = child as THREE.Mesh;
        if (mesh.material && 'uniforms' in mesh.material) {
          const material = mesh.material as THREE.ShaderMaterial;
          const childWorldPos = new THREE.Vector3();
          mesh.getWorldPosition(childWorldPos);

          const screenPos = new THREE.Vector3(
            mouseRef.current.x * size.width,
            mouseRef.current.y * size.height,
            0
          );

          const distance = childWorldPos.distanceTo(screenPos as unknown as THREE.Vector3);
          const proximity = Math.max(0, 1.0 - distance / curveDistance);

          material.uniforms.uProximity = { value: proximity };
          material.uniforms.uTime = { value: clock.getElapsedTime() };
        }
      });
    }

    // Particle awakening effect
    if (stardustRef?.current && particleAwakeningRef.current > 0) {
      const positions = (stardustRef.current.geometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array;
      const colors = (stardustRef.current.geometry.getAttribute('color') as THREE.BufferAttribute).array as Float32Array;

      const proximityRadius = 140;
      for (let i = 0; i < positions.length; i += 3) {
        const px = positions[i];
        const py = positions[i + 1];
        const distance = Math.sqrt(
          Math.pow(px - mouseRef.current.x * 10, 2) +
          Math.pow(py - mouseRef.current.y * 10, 2)
        );

        const proximity = Math.max(0, 1.0 - distance / proximityRadius);
        if (proximity > 0.1) {
          colors[i] = 0.0 + proximity * 1.0;
          colors[i + 1] = 1.0;
          colors[i + 2] = 1.0;
        }
      }
      (stardustRef.current.geometry.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true;
    }

    // Ripple effect handling
    ripplesRef.current = ripplesRef.current.filter((ripple) => {
      const elapsed = (Date.now() - ripple.time) / 1000;
      const maxRippleDuration = 1.2;

      if (elapsed > maxRippleDuration) {
        return false;
      }

      ripple.intensity = Math.max(0, 1.0 - elapsed / maxRippleDuration);

      // Propagate ripple to nebula
      if (nebulaMaterial.current) {
        nebulaMaterial.current.uniforms.uRippleCenter = {
          value: ripple.position,
        };
        nebulaMaterial.current.uniforms.uRippleIntensity = {
          value: ripple.intensity * 0.4,
        };
      }

      // Ripple effect on curves
      if (curveNetworkRef?.current) {
        curveNetworkRef.current.children.forEach((child) => {
          const mesh = child as THREE.Mesh;
          const rippleRadius = elapsed * 8.0;
          const falloff = Math.pow(1.0 - Math.min(1.0, rippleRadius / 3.0), 2.0);

          if (mesh.position) {
            const distToRipple = mesh.position.distanceTo(
              new THREE.Vector3(ripple.position.x * 10, ripple.position.y * 10, 0)
            );

            if (distToRipple < rippleRadius * 1.5) {
              const rippleEffect = Math.sin(distToRipple * 0.5 - elapsed * 10.0) * falloff * ripple.intensity;
              mesh.position.z += rippleEffect * 0.1;
            }
          }
        });
      }

      return true;
    });

    // Decay particle awakening
    particleAwakeningRef.current *= 0.95;
  });

  return null;
};

export default InteractionOrchestrator;
