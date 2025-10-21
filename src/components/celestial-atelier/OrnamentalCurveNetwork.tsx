import { useMemo, useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OrnamentalCurveNetworkProps {
  count: number;
  reduceMotion: boolean;
}

interface CurveData {
  curve: THREE.CubicBezierCurve3;
  indices: number[];
  frequency: number;
  phase: number;
}

const OrnamentalCurveNetwork = forwardRef<THREE.Group, OrnamentalCurveNetworkProps>(
  ({ count, reduceMotion }, ref) => {
    const groupRef = useRef<THREE.Group>(null);

    const curveData = useMemo(() => {
      const curves: CurveData[] = [];
      for (let i = 0; i < count; i++) {
        const startPoint = new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8 - 4
        );
        const endPoint = new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8 - 4
        );

        const t1 = 0.381966;
        const t2 = 0.618034;
        
        const controlPoint1 = new THREE.Vector3().lerpVectors(startPoint, endPoint, t1)
          .add(new THREE.Vector3(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 8
          ));
        const controlPoint2 = new THREE.Vector3().lerpVectors(startPoint, endPoint, t2)
          .add(new THREE.Vector3(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 8
          ));

        const curve = new THREE.CubicBezierCurve3(startPoint, controlPoint1, controlPoint2, endPoint);
        
        const nodeCount = 3 + Math.floor(Math.random() * 3);
        const indices: number[] = [];
        for (let j = 0; j < nodeCount; j++) {
          indices.push((j + 1) / (nodeCount + 1));
        }

        curves.push({
          curve,
          indices,
          frequency: 12 + Math.random() * 13,
          phase: Math.random() * Math.PI * 2,
        });
      }
      return curves;
    }, [count]);

    const lineMaterial = useMemo(() => new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#c4a662") },
        uProximity: { value: 0.0 },
      },
      vertexShader: `
        varying float vProgress;
        varying vec3 vPosition;
        void main() {
          vProgress = uv.x;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uProximity;
        varying float vProgress;
        varying vec3 vPosition;
        void main() {
          float pulse = sin(vProgress * 8.0 - uTime * 2.0) * 0.5 + 0.5;
          float baseAlpha = pulse * 0.25 + 0.1;
          float proximityBoost = uProximity * 0.5;
          float alpha = baseAlpha + proximityBoost;
          float taper = pow(sin(vProgress * 3.14159), 0.3);
          float shimmer = sin(vProgress * 15.0 + uTime) * 0.2 + 0.8;
          gl_FragColor = vec4(uColor * shimmer, alpha * taper);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }), []);

    const nodeGeometry = useMemo(() => {
      const geometry = new THREE.IcosahedronGeometry(0.06, 4);
      return geometry;
    }, []);

    const nodeMaterial = useMemo(() => new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#2dd4bf") },
      },
      vertexShader: `
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        void main() {
          float pulse = sin(uTime * 1.5) * 0.5 + 0.5;
          gl_FragColor = vec4(uColor, 0.6 + pulse * 0.2);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }), []);

    useFrame(({ clock }) => {
      if (!reduceMotion) {
        lineMaterial.uniforms.uTime.value = clock.getElapsedTime();
        nodeMaterial.uniforms.uTime.value = clock.getElapsedTime();

        if (groupRef.current) {
          groupRef.current.children.forEach((group, curveIdx) => {
            const curve = curveData[curveIdx];
            const time = clock.getElapsedTime();
            const undulation = Math.sin(time * 0.4 + curve.phase) * 0.08;

            group.children.forEach((child, childIdx) => {
              if (child instanceof THREE.Mesh && childIdx > 0) {
                const nodeIdx = childIdx - 1;
                const scaleBoost = 1.0 + Math.sin(time * 1.5 + nodeIdx * 0.5) * 0.2;
                child.scale.set(scaleBoost, scaleBoost, scaleBoost);
              }
            });
          });
        }
      }
    });

    return (
      <group ref={ref || groupRef}>
        {curveData.map((data, i) => {
          const points = data.curve.getPoints(64);
          const geometry = new THREE.TubeGeometry(data.curve, 64, 0.018, 8, false);

          return (
            <group key={i}>
              <mesh geometry={geometry} material={lineMaterial} />

              {data.indices.map((t, nodeIdx) => {
                const point = data.curve.getPoint(t);
                return (
                  <mesh
                    key={`node-${nodeIdx}`}
                    geometry={nodeGeometry}
                    material={nodeMaterial}
                    position={[point.x, point.y, point.z]}
                  />
                );
              })}

              <mesh geometry={nodeGeometry} material={nodeMaterial} position={data.curve.v0}>
                <meshBasicMaterial color="#fbbf24" transparent opacity={0.8} />
              </mesh>
              <mesh geometry={nodeGeometry} material={nodeMaterial} position={data.curve.v3}>
                <meshBasicMaterial color="#fbbf24" transparent opacity={0.8} />
              </mesh>
            </group>
          );
        })}
      </group>
    );
  }
);

OrnamentalCurveNetwork.displayName = 'OrnamentalCurveNetwork';

export default OrnamentalCurveNetwork;
