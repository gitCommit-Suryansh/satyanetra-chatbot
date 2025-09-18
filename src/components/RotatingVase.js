import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, OrbitControls, Html } from '@react-three/drei';
import { Model as Vase } from './Vase'; 

function Loader() {
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

function SceneContent() {
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.008;
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      
      <Suspense fallback={<Loader />}>
        {/* This <Center> component is the key to the fix */}
        <Center ref={modelRef}>
          {/* Using the scale={1} that you said works for you */}
          <Vase scale={1} />
        </Center>
      </Suspense>
      
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
}

export default function RotatingVase() {
  return (
    <Canvas 
        // Adjust camera to frame the model with scale={1}
        camera={{ position: [0, 0, 70], fov: 50 }} 
        style={{ background: 'transparent' }}
    >
      <SceneContent />
    </Canvas>
  );
}