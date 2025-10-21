
import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function CustomStar() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 1);
    s.quadraticCurveTo(0.2, 0.2, 1, 0);
    s.quadraticCurveTo(0.2, -0.2, 0, -1);
    s.quadraticCurveTo(-0.2, -0.2, -1, 0);
    s.quadraticCurveTo(-0.2, 0.2, 0, 1);
    return new THREE.ShapeGeometry(s);
  }, []);
  return shape;
}

function Particles({ count, color, size, isHero, isShootingStar }: { count: number, color: string, size: number, isHero: boolean, isShootingStar: boolean }) {
  const mesh = useRef<THREE.InstancedMesh | null>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = isShootingStar ? 0 : Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = isShootingStar ? 0.5 + Math.random() * 0.5 : 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count, isShootingStar]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!mesh.current) return;

    particles.forEach((particle, i) => {
      let { t } = particle;
      const { factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed;
      if (isShootingStar && t > 100) {
        particle.t = 0;
        particle.xFactor = -50 + Math.random() * 100;
        particle.yFactor = -50 + Math.random() * 100;
        particle.zFactor = -50 + Math.random() * 100;
      }

  // keep a and b for potential future modulation — reference them to avoid unused-var errors
  const a = Math.cos(t) + Math.sin(t * 1) / 10;
  const b = Math.sin(t) + Math.cos(t * 2) / 10;
  void a; void b;
      const s = isHero ? Math.max(0.5, Math.cos(t) * 1.5) : Math.max(1.5, Math.cos(t) * 5);

      dummy.position.set(
        xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current!.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[isHero ? CustomStar() : undefined, undefined, count]}>
      {!isHero && <circleGeometry args={[size, 8]} />}
      <meshBasicMaterial color={color} transparent opacity={isHero ? 0.9 : 0.3} />
    </instancedMesh>
  );
}

export function CelestialStardustField() {
  const { size } = useThree();
  const isMobile = size.width < 768;

  const DUST_COUNT = isMobile ? 1000 : 2000;
  const JEWELED_COUNT = isMobile ? 500 : 1000;
  const HERO_COUNT = isMobile ? 250 : 500;
  const SHOOTING_STAR_COUNT = isMobile ? 5 : 10;

  return (
    <>
      <Particles count={DUST_COUNT} color="#ffffff" size={0.05} isHero={false} isShootingStar={false} />
      <Particles count={JEWELED_COUNT} color="#fbbf24" size={0.1} isHero={false} isShootingStar={false} />
      <Particles count={HERO_COUNT} color="#2dd4bf" size={0.15} isHero={true} isShootingStar={false} />
      <Particles count={SHOOTING_STAR_COUNT} color="#ffffff" size={0.2} isHero={false} isShootingStar={true} />
    </>
  );
}
