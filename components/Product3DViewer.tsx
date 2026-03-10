'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, PerspectiveCamera, Environment, Float, PresentationControls } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'

interface Product3DViewerProps {
  modelUrl?: string
  fallbackColor?: string
}

function ProductMesh({ fallbackColor = '#FF6B3D' }: { fallbackColor?: string }) {
  // In a real app, we would load a GLB model here using useGLTF(modelUrl)
  // For now, we'll use a beautiful placeholder mesh
  return (
    <Float
      speed={2} 
      rotationIntensity={0.5} 
      floatIntensity={0.5}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhysicalMaterial 
          color={fallbackColor} 
          roughness={0.1} 
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  )
}

export function Product3DViewer({ modelUrl, fallbackColor }: Product3DViewerProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return <div className="w-full h-full bg-slate-100 animate-pulse rounded-2xl" />

  return (
    <div className="w-full h-[400px] md:h-[600px] bg-slate-50 rounded-[2rem] overflow-hidden border border-white shadow-inner relative group">
      <div className="absolute top-6 left-6 z-10">
        <div className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">Interactive 3D View</div>
        <div className="h-1 w-12 bg-stripe-blurple rounded-full" />
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <Environment preset="city" />
          
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <Stage environment="city" intensity={0.6} contactShadow={false}>
              <ProductMesh fallbackColor={fallbackColor} />
            </Stage>
          </PresentationControls>

          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            makeDefault 
            autoRotate 
            autoRotateSpeed={0.5} 
          />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Drag to Rotate • Scroll to Zoom
        </div>
      </div>
    </div>
  )
}
