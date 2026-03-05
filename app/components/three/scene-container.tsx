'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { HeroTerrain } from './hero-terrain'
import { useTheme } from '../theme-provider'

export function SceneContainer() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 3, 6], fov: 50 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={isDark ? 0.3 : 0.6} />
        <directionalLight position={[5, 5, 5]} intensity={isDark ? 0.8 : 1.0} />
        <pointLight position={[-3, 3, -3]} intensity={isDark ? 0.5 : 0.8} color="#b11f2d" />
        <Suspense fallback={null}>
          <HeroTerrain isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  )
}
