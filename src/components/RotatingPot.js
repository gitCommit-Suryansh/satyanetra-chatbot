import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, OrbitControls, Html } from '@react-three/drei';
import { Model as Pot } from './Scene'; // Your renamed model component

// --- NEW: A themed loader component to show during fallback ---
function Loader() {
  // The <Html> helper from drei lets us render standard HTML inside the 3D canvas
  return (
    <Html center>
      <div className="text-center font-mono text-gray-500">
        <p className="font-handwriting text-2xl animate-pulse">
          Sketching the details...
        </p>
      </div>
    </Html>
  );
}

// This component contains everything that goes INSIDE the canvas
function SceneContent() {
  const modelRef = useRef();

  // This hook creates the continuous rotation
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      
      {/* --- UPDATED: The Suspense fallback now uses our themed Loader --- */}
      <Suspense fallback={<Loader />}>
        <Center ref={modelRef}>
          <Pot scale={20} />
        </Center>
      </Suspense>
      
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
}

// The main component that sets up the Canvas "stage"
export default function RotatingPot() {
  return (
    <Canvas 
        camera={{ position: [0, 0, 50], fov: 50 }} 
        style={{ background: 'transparent' }}
    >
      <SceneContent />
    </Canvas>
  );
}