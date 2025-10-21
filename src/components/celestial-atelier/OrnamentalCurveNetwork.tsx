
import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OrnamentalCurveNetworkProps {
  count: number;
  reduceMotion: boolean;
}

const OrnamentalCurveNetwork: React.FC<OrnamentalCurveNetworkProps> = ({ count, reduceMotion }) => {
  const curves = useMemo(() => {
    const curveArray = [];
    for (let i = 0; i < count; i++) {
      const startPoint = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10 - 5
      );
      const endPoint = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10 - 5
      );
      const controlPoint1 = new THREE.Vector3().lerpVectors(startPoint, endPoint, 0.25).add(new THREE.Vector3((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8));
      const controlPoint2 = new THREE.Vector3().lerpVectors(startPoint, endPoint, 0.75).add(new THREE.Vector3((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8));

      curveArray.push(new THREE.CubicBezierCurve3(startPoint, controlPoint1, controlPoint2, endPoint));
    }
    return curveArray;
  }, [count]);

  const lineMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#c4a662") },
    },
    vertexShader: `
      varying float vProgress;
      void main() {
        vProgress = uv.x;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      varying float vProgress;
      void main() {
        float alpha = (sin(vProgress * 10.0 - uTime * 2.0) * 0.5 + 0.5) * 0.3 + 0.1; // Pulsing effect
        float taper = pow(sin(vProgress * 3.14159), 0.2); // Tapering
        gl_FragColor = vec4(uColor, alpha * taper);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  useFrame(({ clock }) => {
    if (lineMaterial && !reduceMotion) {
      lineMaterial.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <>
      {curves.map((curve, i) => (
        <group key={i}>
          <mesh geometry={new THREE.TubeGeometry(curve, 64, 0.02, 8, false)} material={lineMaterial} />
          <mesh position={curve.v0}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
          <mesh position={curve.v3}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        </group>
      ))}
    </>
  );
};

export default OrnamentalCurveNetwork;
