
import { useMemo, useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OrnamentalCurveNetworkProps {
  count: number;
  reduceMotion: boolean;
}

const OrnamentalCurveNetwork = forwardRef<THREE.Group, OrnamentalCurveNetworkProps>(({ count, reduceMotion }, ref) => {
  const groupRef = useRef<THREE.Group>(null);

  const curves = useMemo(() => {
    const curveArray = [];
    for (let i = 0; i < count; i++) {
        const start = new THREE.Vector3(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15
        );
        const end = new THREE.Vector3(
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15
        );
        const control1 = new THREE.Vector3(
            start.x + (Math.random() - 0.5) * 10,
            start.y + (Math.random() - 0.5) * 10,
            start.z + (Math.random() - 0.5) * 10
        );
        const control2 = new THREE.Vector3(
            end.x + (Math.random() - 0.5) * 10,
            end.y + (Math.random() - 0.5) * 10,
            end.z + (Math.random() - 0.5) * 10
        );
        
      curveArray.push(new THREE.CubicBezierCurve3(start, control1, control2, end));
    }
    return curveArray;
  }, [count]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
        uColor: { value: new THREE.Color('#fbbf24') }
      },
      vertexShader: `
        varying float vOpacity;
        void main() {
            vec3 pos = position;
            vOpacity = abs(sin(pos.x * 0.2 + gl_VertexID / 200));
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vOpacity;
        void main() {
            gl_FragColor = vec4(uColor, vOpacity * 0.3);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current && !reduceMotion) {
      groupRef.current.rotation.x += 0.0002;
      groupRef.current.rotation.z += 0.0001;
      material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <group ref={ref || groupRef}>
      {curves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 64, 0.02, 8, false]} />
          <primitive object={material} attach="material" />
        </mesh>
      ))}
    </group>
  );
});

export default OrnamentalCurveNetwork;
