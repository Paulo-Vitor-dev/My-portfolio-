'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { portfolioPalette, type ThemePalette } from '@/lib/palette'
import { useSceneVisibility } from '@/lib/use-scene-visibility'

type Palette = ThemePalette

function CaseGeometry({ palette }: { palette: Palette }) {
  const wireRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.18 + state.pointer.x * 0.28
      wireRef.current.rotation.x = t * 0.08 + state.pointer.y * 0.2
    }

    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.12
      innerRef.current.rotation.x = t * 0.05
      const scale = 1 + Math.sin(t * 1.2) * 0.035
      innerRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group rotation={[0.08, -0.18, 0]}>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.25, 2]} />
        <meshBasicMaterial
          color={palette.primary}
          wireframe
          transparent
          opacity={0.48}
        />
      </mesh>

      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.52, 1]} />
        <meshStandardMaterial
          color={palette.dark}
          emissive={palette.primary}
          emissiveIntensity={0.82}
          roughness={0.22}
          metalness={0.78}
          flatShading
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  )
}

export function CaseHeroSphere() {
  const palette = portfolioPalette
  const { containerRef, active } = useSceneVisibility()

  return (
    <div ref={containerRef} className="h-full min-h-[320px] w-full sm:min-h-[400px] lg:min-h-[520px]">
      <Canvas
        camera={{ position: [0, 0, 6.7], fov: 52 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        frameloop={active ? 'always' : 'never'}
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[5, 5, 5]} intensity={1.45} color={palette.light} />
        <pointLight position={[-4, -4, 3]} intensity={0.9} color={palette.dark} />
        <CaseGeometry palette={palette} />
      </Canvas>
    </div>
  )
}
