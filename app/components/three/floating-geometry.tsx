'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function RotatingIcosahedron() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.x = clock.getElapsedTime() * 0.15
    ref.current.rotation.y = clock.getElapsedTime() * 0.2
  })

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial
        wireframe
        color="#b11f2d"
        transparent
        opacity={0.4}
      />
    </mesh>
  )
}

export function FloatingGeometry({ className = '' }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4] }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={0.6} color="#b11f2d" />
        <RotatingIcosahedron />
      </Canvas>
    </div>
  )
}
