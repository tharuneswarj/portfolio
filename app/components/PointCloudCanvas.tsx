'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function PointCloudCanvas() {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 1000)
        camera.position.set(0, 3, 12)

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        renderer.setSize(mount.clientWidth, mount.clientHeight)
        renderer.setClearColor(0x000000, 0)
        mount.appendChild(renderer.domElement)

        // Build point cloud
        const COUNT = 2200
        const positions = new Float32Array(COUNT * 3)
        const origPositions = new Float32Array(COUNT * 3)

        for (let i = 0; i < COUNT; i++) {
            const i3 = i * 3
            const col = i % 44
            const row = Math.floor(i / 44)
            const x = (col / 43) * 16 - 8
            const z = (row / 49) * 14 - 7
            const y = Math.sin(x * 0.6) * Math.cos(z * 0.5) * 0.8

            positions[i3] = x + (Math.random() - 0.5) * 0.3
            positions[i3 + 1] = y + (Math.random() - 0.5) * 0.2
            positions[i3 + 2] = z + (Math.random() - 0.5) * 0.3

            origPositions[i3] = positions[i3]
            origPositions[i3 + 1] = positions[i3 + 1]
            origPositions[i3 + 2] = positions[i3 + 2]
        }

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        const material = new THREE.PointsMaterial({
            color: new THREE.Color('#6366f1'),
            size: 0.055,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.75,
            depthWrite: false,
        })

        const points = new THREE.Points(geometry, material)
        scene.add(points)

        // Mouse tracking
        let mouseX = 0
        let mouseY = 0
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1
            mouseY = -((e.clientY / window.innerHeight) * 2 - 1)
        }
        window.addEventListener('mousemove', handleMouseMove)

        // Resize handler
        const handleResize = () => {
            if (!mount) return
            camera.aspect = mount.clientWidth / mount.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(mount.clientWidth, mount.clientHeight)
        }
        window.addEventListener('resize', handleResize)

        // Animation loop
        const clock = new THREE.Clock()
        let animId: number

        const animate = () => {
            animId = requestAnimationFrame(animate)
            const t = clock.getElapsedTime()
            const arr = geometry.attributes.position.array as Float32Array

            for (let i = 0; i < COUNT; i++) {
                const i3 = i * 3
                const ox = origPositions[i3]
                const oy = origPositions[i3 + 1]
                const oz = origPositions[i3 + 2]

                const wave = Math.sin(ox * 0.8 + t * 0.9) * Math.cos(oz * 0.7 + t * 0.6) * 0.35
                const distX = ox - mouseX * 6
                const distZ = oz - mouseY * 4
                const dist = Math.sqrt(distX * distX + distZ * distZ)
                const pull = Math.exp(-dist * 0.15) * 0.3

                arr[i3] = ox + mouseX * 0.8 * pull
                arr[i3 + 1] = oy + wave - mouseY * 0.5 * pull
                arr[i3 + 2] = oz
            }

            geometry.attributes.position.needsUpdate = true
            points.rotation.y = t * 0.04
            points.rotation.x = Math.sin(t * 0.025) * 0.08

            renderer.render(scene, camera)
        }

        animate()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)
            renderer.dispose()
            geometry.dispose()
            material.dispose()
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement)
            }
        }
    }, [])

    return (
        <div
            ref={mountRef}
            style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        />
    )
}
