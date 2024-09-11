import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Particles = ({ count = 5000 }) => {
  const points = useRef<THREE.Points>();

  const particlesPosition = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    particlesPosition[i * 3] = (Math.random() - 0.5) * 100;
    particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 100;
    particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 100;
  }

  useFrame((_state, delta) => {
    if (points.current) {
      points.current.rotation.x += delta * 0.01;
      points.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={points as React.RefObject<THREE.Points>}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00FFFF" sizeAttenuation transparent />
    </points>
  );
};