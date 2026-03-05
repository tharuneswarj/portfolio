'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Simple 3D noise function
function noise3D(x: number, y: number, z: number): number {
  const p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,
    30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,
    219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,
    175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,
    220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,
    132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,
    3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,
    227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,
    221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,
    185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,
    51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,
    121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,
    78,66,215,61,156,180]

  const X = Math.floor(x) & 255
  const Y = Math.floor(y) & 255
  const Z = Math.floor(z) & 255
  const xf = x - Math.floor(x)
  const yf = y - Math.floor(y)
  const zf = z - Math.floor(z)
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)
  const w = zf * zf * (3 - 2 * zf)

  const A = (p[X & 255] + Y) & 255
  const B = (p[(X + 1) & 255] + Y) & 255
  const AA = (p[A] + Z) & 255
  const AB = (p[(A + 1) & 255] + Z) & 255
  const BA = (p[B] + Z) & 255
  const BB = (p[(B + 1) & 255] + Z) & 255

  const grad = (hash: number, x: number, y: number, z: number) => {
    const h = hash & 15
    const u = h < 8 ? x : y
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
  }

  const lerp = (a: number, b: number, t: number) => a + t * (b - a)

  return lerp(
    lerp(
      lerp(grad(p[AA], xf, yf, zf), grad(p[BA], xf - 1, yf, zf), u),
      lerp(grad(p[AB], xf, yf - 1, zf), grad(p[BB], xf - 1, yf - 1, zf), u),
      v
    ),
    lerp(
      lerp(grad(p[(AA + 1) & 255], xf, yf, zf - 1), grad(p[(BA + 1) & 255], xf - 1, yf, zf - 1), u),
      lerp(grad(p[(AB + 1) & 255], xf, yf - 1, zf - 1), grad(p[(BB + 1) & 255], xf - 1, yf - 1, zf - 1), u),
      v
    ),
    w
  )
}

function fbm(x: number, y: number, z: number, octaves = 4): number {
  let value = 0
  let amplitude = 1
  let frequency = 1
  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise3D(x * frequency, y * frequency, z * frequency)
    amplitude *= 0.5
    frequency *= 2
  }
  return value
}

const SEGMENTS = 80
const SIZE = 12

export function HeroTerrain() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS)
  }, [])

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return

    mouseRef.current.x += (pointer.x * 0.5 - mouseRef.current.x) * 0.05
    mouseRef.current.y += (pointer.y * 0.5 - mouseRef.current.y) * 0.05

    const time = clock.getElapsedTime() * 0.15
    const positions = meshRef.current.geometry.attributes.position
    const colors = meshRef.current.geometry.attributes.color

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)

      const noiseVal = fbm(
        x * 0.3 + mouseRef.current.x + time,
        y * 0.3 + mouseRef.current.y,
        time * 0.5,
        4
      )

      const height = noiseVal * 1.8

      positions.setZ(i, height)

      // Color: dark base → accent glow at peaks
      const t = Math.max(0, Math.min(1, (height + 1) / 2.5))
      colors.setXYZ(
        i,
        0.04 + t * 0.69,  // R: 0.04 → 0.69 (accent red)
        0.04 + t * 0.04,  // G: stays dark
        0.06 + t * 0.12   // B: slight blue shift
      )
    }

    positions.needsUpdate = true
    colors.needsUpdate = true
    meshRef.current.geometry.computeVertexNormals()
  })

  const colorAttr = useMemo(() => {
    const count = (SEGMENTS + 1) * (SEGMENTS + 1)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      colors[i * 3] = 0.04
      colors[i * 3 + 1] = 0.04
      colors[i * 3 + 2] = 0.06
    }
    return new THREE.BufferAttribute(colors, 3)
  }, [])

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2.8, 0, 0]}
      position={[0, -1.5, 0]}
    >
      <primitive object={geometry} attach="geometry">
        <primitive object={colorAttr} attach="attributes-color" />
      </primitive>
      <meshStandardMaterial
        vertexColors
        wireframe
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
