'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { HeroTerrain } from './hero-terrain'

export function SceneContainer() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 3, 6], fov: 50 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, 3, -3]} intensity={0.5} color="#b11f2d" />
        <Suspense fallback={null}>
          <HeroTerrain />
        </Suspense>
      </Canvas>
    </div>
  )
}
