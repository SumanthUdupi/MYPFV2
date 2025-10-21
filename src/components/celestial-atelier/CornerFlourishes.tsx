import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CornerFlourishesProps {
  reduceMotion: boolean;
}

const CornerFlourishes: React.FC<CornerFlourishesProps> = ({ reduceMotion }) => {
  const groupRef = useRef<THREE.Group>(null);

  const createOrnateCurve = (startPos: THREE.Vector3, direction: number) => {
    const curve = new THREE.CatmullRomCurve3([
      startPos.clone(),
      startPos.clone().add(new THREE.Vector3(direction * 0.8, 0.3, 0)),
      startPos.clone().add(new THREE.Vector3(direction * 1.2, 0.8, 0)),
      startPos.clone().add(new THREE.Vector3(direction * 1.5, 1.5, 0)),
    ]);
    return curve;
  };

  const corners = useMemo(() => {
    return [
      { pos: new THREE.Vector3(-5, 2.5, -2), dir: 1, name: 'topLeft' },
      { pos: new THREE.Vector3(5, 2.5, -2), dir: -1, name: 'topRight' },
      { pos: new THREE.Vector3(-5, -2.5, -2), dir: 1, name: 'bottomLeft' },
      { pos: new THREE.Vector3(5, -2.5, -2), dir: -1, name: 'bottomRight' },
    ];
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current && !reduceMotion) {
      const time = clock.getElapsedTime();
      let meshIndex = 0;

      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = child.material as THREE.MeshBasicMaterial;
          if (material.opacity !== undefined) {
            material.opacity = 0.12 + Math.sin(time * 0.5 + meshIndex) * 0.08;
          }
          child.rotation.z = Math.sin(time * 0.3 + meshIndex * 0.5) * 0.05;
          meshIndex++;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {corners.map((corner) => (
        <group key={corner.name} position={[corner.pos.x, corner.pos.y, corner.pos.z]}>
          {/* Primary ornamental curve */}
          <mesh>
            <tubeGeometry
              args={[
                createOrnateCurve(corner.pos, corner.dir),
                12,
                0.04,
                8,
                false,
              ]}
            />
            <meshBasicMaterial
              color="#fbbf24"
              transparent
              opacity={0.15}
              wireframe={false}
            />
          </mesh>

          {/* Decorative flourish nodes */}
          <group>
            {[0.25, 0.5, 0.75].map((t) => {
              const curve = createOrnateCurve(corner.pos, corner.dir);
              const point = curve.getPoint(t);
              return (
                <mesh key={`node-${t}`} position={[point.x, point.y, point.z]}>
                  <sphereGeometry args={[0.08, 16, 16]} />
                  <meshBasicMaterial
                    color="#2dd4bf"
                    transparent
                    opacity={0.3}
                  />
                </mesh>
              );
            })}
          </group>

          {/* Botanical tendril accent */}
          <mesh scale={0.6}>
            <tubeGeometry
              args={[
                new THREE.CatmullRomCurve3([
                  corner.pos.clone(),
                  corner.pos.clone().add(new THREE.Vector3(corner.dir * 0.5, -0.3, 0)),
                  corner.pos.clone().add(new THREE.Vector3(corner.dir * 0.9, -0.8, 0)),
                ]),
                10,
                0.02,
                6,
                false,
              ]}
            />
            <meshBasicMaterial
              color="#9333ea"
              transparent
              opacity={0.1}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default CornerFlourishes;
