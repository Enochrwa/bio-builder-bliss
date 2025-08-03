import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { FloatingCube, FloatingSphere, FloatingTorus } from './FloatingGeometry';

interface Scene3DProps {
  theme: 'light' | 'dark' | 'modern';
}

export const Scene3D = ({ theme }: Scene3DProps) => {
  const getColors = () => {
    switch (theme) {
      case 'light':
        return {
          primary: '#8b5cf6',
          secondary: '#06b6d4',
          accent: '#f59e0b'
        };
      case 'dark':
        return {
          primary: '#a855f7',
          secondary: '#0ea5e9',
          accent: '#fbbf24'
        };
      case 'modern':
        return {
          primary: '#fbbf24',
          secondary: '#8b5cf6',
          accent: '#06b6d4'
        };
      default:
        return {
          primary: '#8b5cf6',
          secondary: '#06b6d4',
          accent: '#f59e0b'
        };
    }
  };

  const colors = getColors();

  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <Environment preset="city" />
        
        {/* Ambient lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        {/* Floating geometries */}
        <FloatingCube position={[-4, 2, -2]} color={colors.primary} speed={1.2} />
        <FloatingSphere position={[4, -1, -3]} color={colors.secondary} speed={0.8} />
        <FloatingTorus position={[0, 3, -4]} color={colors.accent} speed={1.5} />
        <FloatingCube position={[3, 1, -5]} color={colors.secondary} speed={0.6} />
        <FloatingSphere position={[-3, -2, -2]} color={colors.accent} speed={1.1} />
        <FloatingTorus position={[2, -3, -3]} color={colors.primary} speed={0.9} />

        {/* Enable orbit controls but disable auto-rotate for better UX */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};