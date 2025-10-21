import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TaperedCurve } from './TaperedCurve';

function SingleCurve({ initialPoints, color, pulse }: { initialPoints: number[][], color: string, pulse: boolean }) {
  const [opacity, setOpacity] = useState(0.3);

  useFrame(() => {
    const targetOpacity = pulse ? 0.9 : 0.3;
    setOpacity(THREE.MathUtils.lerp(opacity, targetOpacity, 0.1));
  });

  const points = useMemo(() => new THREE.CubicBezierCurve3(
    new THREE.Vector3(initialPoints[0][0], initialPoints[0][1], initialPoints[0][2]),
    new THREE.Vector3(initialPoints[1][0], initialPoints[1][1], initialPoints[1][2]),
    new THREE.Vector3(initialPoints[2][0], initialPoints[2][1], initialPoints[2][2]),
    new THREE.Vector3(initialPoints[3][0], initialPoints[3][1], initialPoints[3][2])
  ).getPoints(50), [initialPoints]);

  return <TaperedCurve points={points} color={color} width={0.1} opacity={opacity} />;
}

function Node({ position, color, onHover }: { position: [number, number, number], color: string, onHover: (hovered: boolean) => void }) {
  const nodeRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (nodeRef.current) {
      const targetScale = 1;
      nodeRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  // reference onHover to avoid unused parameter warning (used by parent when needed)
  void onHover;

  return (
    <mesh ref={nodeRef} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export function OrnamentalCurveNetwork() {
  const [pulsing, setPulsing] = useState(false);

  const curves = [
    { points: [[-4, -2, -2], [-2, 2, 0], [2, -2, 0], [4, 2, -2]], color: '#fbbf24' },
    { points: [[-3, 2, -1], [0, 0, 0], [0, 0, 0], [3, -2, -1]], color: '#2dd4bf' },
    { points: [[-5, 0, -3], [-2, 0, 1], [2, 0, -1], [5, 0, -3]], color: '#9333ea' },
    { points: [[0, -4, 0], [0, -2, 0], [0, 2, 0], [0, 4, 0]], color: '#fbbf24' },
  ];

  const nodes = [
    { position: [0, 0, 0], color: '#ffffff' },
  ];

  return (
    <group position={[0, 0, -5]}>
      {curves.map((curve, index) => (
        <SingleCurve key={index} initialPoints={curve.points} color={curve.color} pulse={pulsing} />
      ))}
      {nodes.map((node, index) => (
        <Node key={index} position={node.position as [number, number, number]} color={node.color} onHover={setPulsing} />
      ))}
    </group>
  );
}