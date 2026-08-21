'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Ring } from '@react-three/drei'
import * as THREE from 'three'
import { skills } from '@/lib/data'
import { portfolioPalette, type ThemePalette } from '@/lib/palette'
import { useSceneVisibility } from '@/lib/use-scene-visibility'

type Palette = ThemePalette

const ORBIT_RADII: Record<number, number> = { 1: 2.4, 2: 3.6, 3: 4.8 }
const ORBIT_SPEED: Record<number, number> = { 1: 0.18, 2: -0.12, 3: 0.08 }

function SkillNode({
  name,
  color,
  angle,
  radius,
  palette,
}: {
  name: string
  color: string
  angle: number
  radius: number
  palette: Palette
}) {
  return (
    <group
      position={[Math.cos(angle) * radius, Math.sin(angle) * radius * 0.45, Math.sin(angle) * radius * 0.5]}
    >
      <Html center distanceFactor={8} zIndexRange={[10, 0]}>
        <div
          data-cursor="hover"
          className="select-none whitespace-nowrap rounded-full border px-2 py-1 text-[11px] sm:px-3 sm:py-1.5 sm:text-[13px] md:text-[14px] font-medium backdrop-blur-md transition-transform duration-300 hover:scale-110"
          style={{
            borderColor: `${color}55`,
            background: palette.surface,
            color,
            boxShadow: `0 0 16px ${color}33`,
          }}
        >
          {name}
        </div>
      </Html>
    </group>
  )
}

function OrbitRing({ radius, palette }: { radius: number; palette: Palette }) {
  const lineMaterialRef = useRef<THREE.MeshBasicMaterial>(null)
  const glowMaterialRef = useRef<THREE.MeshBasicMaterial>(null)
  const thickness = 0.018
  const glowThickness = 0.05
  const baseOpacity = 0.34
  const glowOpacity = 0.13

  useFrame((state) => {
    const pulse = (Math.sin(state.clock.elapsedTime * 1.15) + 1) / 2

    if (lineMaterialRef.current) {
      lineMaterialRef.current.opacity = baseOpacity + pulse * 0.12
    }

    if (glowMaterialRef.current) {
      glowMaterialRef.current.opacity = glowOpacity + pulse * 0.07
    }
  })

  const ringColor = palette.light

  return (
    <group rotation={[Math.PI / 2.4, 0, 0]}>
      <Ring args={[radius - glowThickness, radius + glowThickness, 128]}>
        <meshBasicMaterial
          ref={glowMaterialRef}
          color={ringColor}
          transparent
          opacity={glowOpacity}
          side={THREE.DoubleSide}
          depthWrite={false}
          depthTest={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </Ring>

      <Ring args={[radius - thickness, radius + thickness, 128]}>
        <meshBasicMaterial
          ref={lineMaterialRef}
          color={ringColor}
          transparent
          opacity={baseOpacity}
          side={THREE.DoubleSide}
          depthWrite={false}
          depthTest={false}
          toneMapped={false}
        />
      </Ring>
    </group>
  )
}

function Galaxy({ palette }: { palette: Palette }) {
  const groupRef = useRef<THREE.Group>(null)
  const orbitRefs = useRef<Record<number, THREE.Group | null>>({})

  const grouped = useMemo(() => {
    const map: Record<number, { name: string; color: string; angle: number }[]> =
      { 1: [], 2: [], 3: [] }
    for (const s of skills) {
      const list = map[s.orbit]
      list.push({ name: s.name, color: s.color, angle: 0 })
    }
    for (const k of Object.keys(map)) {
      const arr = map[Number(k)]
      arr.forEach((item, i) => {
        item.angle = (i / arr.length) * Math.PI * 2
      })
    }
    return map
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.5,
        0.04,
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -state.pointer.y * 0.3,
        0.04,
      )
    }
    for (const orbit of [1, 2, 3]) {
      const g = orbitRefs.current[orbit]
      if (g) g.rotation.y = t * ORBIT_SPEED[orbit]
    }
  })

  return (
    <group ref={groupRef}>
      <Html center distanceFactor={9} zIndexRange={[20, 0]}>
        <div className="pointer-events-none select-none text-center">
          <div id="skills-central-bg" className="mx-auto flex h-48 w-48 items-center justify-center rounded-full" style={{ background: `radial-gradient(circle at 30% 20%, ${palette.light}, ${palette.primary} 45%, ${palette.dark} 100%)`, boxShadow: `0 10px 30px ${palette.primary}40` }}>
            <div className="px-2 text-center font-heading" style={{ lineHeight: 1 }}>
              <div className="font-heading text-sm font-bold tracking-tight text-white">PAULO</div>
              <div className="font-heading text-sm font-bold tracking-tight text-white">VITOR BRANDÃO</div>
            </div>
          </div>
        </div>
      </Html>

      {[1, 2, 3].map((orbit) => (
        <group key={orbit}>
          <OrbitRing radius={ORBIT_RADII[orbit]} palette={palette} />
          <group ref={(el) => (orbitRefs.current[orbit] = el)}>
            {grouped[orbit].map((s) => (
              <SkillNode
                key={s.name}
                name={s.name}
                color={s.color}
                angle={s.angle}
                radius={ORBIT_RADII[orbit]}
                palette={palette}
              />
            ))}
          </group>
        </group>
      ))}
    </group>
  )
}

export function SkillsGalaxyScene() {
  const palette = portfolioPalette
  const { containerRef, active } = useSceneVisibility()

  return (
    <div ref={containerRef} className="h-full w-full">
    <Canvas
      camera={{ position: [0, 1.5, 9], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? 'always' : 'never'}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2} color={palette.primary} distance={12} />
      <pointLight position={[6, 6, 6]} intensity={0.6} color={palette.light} />
      <Galaxy palette={palette} />
    </Canvas>
    </div>
  )
}
