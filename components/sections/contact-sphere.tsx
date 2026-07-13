'use client'

import { useMemo, useRef } from 'react'
import { ThemePalette, usePortfolioTheme } from '@/lib/theme'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

type Palette = ThemePalette

function WireSphere({ palette }: { palette: Palette }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.18 + state.pointer.x * 0.4
      meshRef.current.rotation.x = t * 0.08 + state.pointer.y * 0.3
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.12
      const s = 1 + Math.sin(t * 1.2) * 0.04
      innerRef.current.scale.setScalar(s)
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.2, 2]} />
        <meshBasicMaterial color={palette.primary} wireframe transparent opacity={0.4} />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color={palette.dark}
          emissive={palette.primary}
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
          flatShading
        />
      </mesh>
    </group>
  )
}

function FieldParticles({ palette }: { palette: Palette }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const count = 600
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={palette.light}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export function ContactSphere() {
  const { theme, palette } = usePortfolioTheme()
  return (
    <Canvas
      key={theme}
      camera={{ position: [0, 0, 7], fov: 55 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color={palette.light} />
      <pointLight position={[-5, -5, 2]} intensity={1} color={palette.dark} />
      <WireSphere palette={palette} />
      <FieldParticles palette={palette} />
      <Sparkles count={40} scale={8} size={3} speed={0.4} color={palette.light} />
    </Canvas>
  )
}
