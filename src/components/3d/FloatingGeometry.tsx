import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingGeometryProps {
  position: [number, number, number];
  color: string;
  speed?: number;
}

export const FloatingCube = ({ position, color, speed = 1 }: FloatingGeometryProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const initialPosition = useRef(new THREE.Vector3(...position)).current;

  useFrame(({ mouse, clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;

      const parallaxFactor = 0.5;
      const targetX = initialPosition.x + mouse.x * parallaxFactor;
      const floatOffsetY = Math.sin(clock.elapsedTime * speed) * 0.2;
      const targetY = initialPosition.y + mouse.y * parallaxFactor + floatOffsetY;

      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
    }
  });

  return (
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
  );
};

export const FloatingSphere = ({ position, color, speed = 1 }: FloatingGeometryProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const initialPosition = useRef(new THREE.Vector3(...position)).current;

  useFrame(({ mouse, clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 * speed;
      meshRef.current.rotation.y += 0.008 * speed;

      const parallaxFactor = 0.3;
      const targetX = initialPosition.x + mouse.x * parallaxFactor;
      const floatOffsetY = Math.cos(clock.elapsedTime * speed) * 0.3;
      const targetY = initialPosition.y + mouse.y * parallaxFactor + floatOffsetY;

      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
    }
  });

  return (
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
  );
};

export const FloatingTorus = ({ position, color, speed = 1 }: FloatingGeometryProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const initialPosition = useRef(new THREE.Vector3(...position)).current;

  useFrame(({ mouse, clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008 * speed;
      meshRef.current.rotation.z += 0.006 * speed;

      const parallaxFactor = 0.7;
      const floatOffsetX = Math.sin(clock.elapsedTime * speed * 0.8) * 0.2;
      const targetX = initialPosition.x + mouse.x * parallaxFactor + floatOffsetX;
      const targetY = initialPosition.y + mouse.y * parallaxFactor;

      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.08);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.08);
    }
  });

  return (
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
  );
};