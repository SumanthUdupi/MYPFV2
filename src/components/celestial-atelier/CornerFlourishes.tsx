
import { useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CornerFlourishesProps {
  reduceMotion: boolean;
}

const CornerFlourishes = ({ reduceMotion }: CornerFlourishesProps) => {
  const { viewport } = useThree();

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
        uColor: { value: new THREE.Color('#c4a662') }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        varying vec2 vUv;

        float whiplash(vec2 p) {
            return sin(p.x * 2.0 + p.y * 5.0 + uTime) * 0.5 + 0.5;
        }

        void main() {
          float border = smoothstep(0.4, 0.5, vUv.x) * (1.0 - smoothstep(0.5, 0.6, vUv.x));
          border *= smoothstep(0.4, 0.5, vUv.y) * (1.0 - smoothstep(0.5, 0.6, vUv.y));
          float pattern = whiplash(vUv);
          gl_FragColor = vec4(uColor, border * pattern * 0.2);
        }
      `,
      transparent: true,
      depthWrite: false,
    });
  }, []);

  useFrame(({ clock }) => {
    if (!reduceMotion) {
      material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <group>
      <mesh position={[-viewport.width / 2 + 1, viewport.height / 2 - 1, -5]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[2, 2]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh position={[viewport.width / 2 - 1, viewport.height / 2 - 1, -5]} rotation={[0, 0, -Math.PI / 4]}>
        <planeGeometry args={[2, 2]} />
        <primitive object={material} attach="material" />
      </mesh>
      <mesh position={[-viewport.width / 2 + 1, -viewport.height / 2 + 1, -5]} rotation={[0, 0, (3 * Math.PI) / 4]}>
        <planeGeometry args={[2, 2]} />
        <primitive object={material} attach="material" />
      </mesh>
       <mesh position={[viewport.width / 2 - 1, -viewport.height / 2 + 1, -5]} rotation={[0, 0, (-3 * Math.PI) / 4]}>
        <planeGeometry args={[2, 2]} />
        <primitive object={material} attach="material" />
      </mesh>
    </group>
  );
};

export default CornerFlourishes;
