import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingGeometryProps {
  position: [number, number, number];
  color: string;
  speed?: number;
}

export const FloatingCube = ({ position, color, speed = 1 }: FloatingGeometryProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.8}
          distort={0.1}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

export const FloatingSphere = ({ position, color, speed = 1 }: FloatingGeometryProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 * speed;
      meshRef.current.rotation.y += 0.008 * speed;
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.3} floatIntensity={0.7}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.7}
          distort={0.2}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
};

export const FloatingTorus = ({ position, color, speed = 1 }: FloatingGeometryProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008 * speed;
      meshRef.current.rotation.z += 0.006 * speed;
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * speed * 0.8) * 0.2;
    }
  });

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[1, 0.4, 16, 100]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.6}
          distort={0.15}
          speed={1.2}
        />
      </mesh>
    </Float>
  );
};