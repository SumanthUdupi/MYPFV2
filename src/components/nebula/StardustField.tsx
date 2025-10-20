import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import starFrag from './shaders/star.frag?raw';
import starVert from './shaders/nebula.vert?raw';

export interface StardustFieldProps {
  positions: Array<[number, number, number]>;
  accentColor?: string;
}

const tmp = new THREE.Object3D();

export default function StardustField({ positions, accentColor = '#C4A662' }: StardustFieldProps) {
  const ref = useRef<THREE.InstancedMesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const count = positions.length;

  const phases = useMemo(() => new Float32Array(count), [count]);

  useEffect(() => {
    if (!ref.current) return;
    for (let i = 0; i < count; i++) {
      const [x, y, z] = positions[i];
      tmp.position.set(x, y, z);
      const s = 0.08 + Math.random() * 0.18;
      tmp.scale.set(s, s, s);
      tmp.updateMatrix();
      ref.current.setMatrixAt(i, tmp.matrix);
      phases[i] = Math.random() * Math.PI * 2;
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, [positions, count, phases]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (materialRef.current) materialRef.current.uniforms.u_time.value = t;
    if (!ref.current) return;
    // small per-instance rotations
    for (let i = 0; i < Math.min(count, 2000); i++) {
      ref.current.getMatrixAt(i, tmp.matrix);
      tmp.rotation.z = Math.sin(t * 0.2 + phases[i]) * 0.1;
      tmp.updateMatrix();
      ref.current.setMatrixAt(i, tmp.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, positions.length]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{ u_time: { value: 0 }, u_phase: { value: 0 }, u_color: { value: new THREE.Color(accentColor) } }}
        vertexShader={starVert}
        fragmentShader={starFrag}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
// end of StardustField
