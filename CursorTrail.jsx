// components/canvas/CursorTrail.jsx
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const trailSize = 35;

export default function CursorTrail() {
  const pointsRef = useRef();
  const shaderRef = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < trailSize; i++) {
      temp.push({
        position: new THREE.Vector3(),
        life: 0,
      });
    }
    return temp;
  }, []);

  useFrame(({ pointer, viewport }) => {
    if (!pointsRef.current) return;

    const mousePos = new THREE.Vector3(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    );

    particles.forEach((p, i) => {
      p.life -= 0.03;
      if (p.life <= 0) {
        // Find the next particle to "revive"
        const nextParticle = particles[(i + 1) % trailSize];
        if (nextParticle.life <= 0) {
          p.position.copy(mousePos);
          p.life = Math.random() * 0.8; // Each particle lives for 0.8s
        }
      }

      const scale = Math.max(0, p.life / 0.8);
      pointsRef.current.geometry.attributes.position.setXYZ(i, p.position.x, p.position.y, p.position.z);
      pointsRef.current.geometry.attributes.scale.setX(i, scale * 1.5);
      pointsRef.current.geometry.attributes.alpha.setX(i, scale);
    });

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.scale.needsUpdate = true;
    pointsRef.current.geometry.attributes.alpha.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={trailSize}
          array={new Float32Array(trailSize * 3)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={trailSize}
          array={new Float32Array(trailSize)}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-alpha"
          count={trailSize}
          array={new Float32Array(trailSize)}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={shaderRef}
        uniforms={{ color: { value: new THREE.Color('#00ffff') } }}
        vertexShader={`
          attribute float scale;
          attribute float alpha;
          varying float vAlpha;
          void main() {
            vAlpha = alpha;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = scale * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          varying float vAlpha;
          void main() {
            float r = 0.0, delta = 0.0;
            vec2 cxy = 2.0 * gl_PointCoord - 1.0;
            r = dot(cxy, cxy);
            if (r > 1.0) {
                discard;
            }
            gl_FragColor = vec4(color, vAlpha * (1.0 - r));
          }
        `}
        blending={THREE.AdditiveBlending}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
