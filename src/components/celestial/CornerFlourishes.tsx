
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

function Flourish({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
  const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(-0.5, 0.5, 0),
    new THREE.Vector3(0.5, -0.5, 0),
    new THREE.Vector3(1, 0, 0)
  );

  const points = curve.getPoints(50);

  return (
    <group position={position} rotation={rotation}>
      <Line points={points} color="#fbbf24" lineWidth={2} transparent opacity={0.2} />
    </group>
  );
}

export function CornerFlourishes() {
  const { viewport } = useThree();
  const { width, height } = viewport;

  const cornerOffset = 2;

  return (
    <group>
      <Flourish position={[-width / 2 + cornerOffset, height / 2 - cornerOffset, 0]} rotation={[0, 0, -Math.PI / 4]} />
      <Flourish position={[width / 2 - cornerOffset, height / 2 - cornerOffset, 0]} rotation={[0, 0, Math.PI / 4]} />
      <Flourish position={[-width / 2 + cornerOffset, -height / 2 + cornerOffset, 0]} rotation={[0, 0, -3 * Math.PI / 4]} />
      <Flourish position={[width / 2 - cornerOffset, -height / 2 + cornerOffset, 0]} rotation={[0, 0, 3 * Math.PI / 4]} />
    </group>
  );
}

