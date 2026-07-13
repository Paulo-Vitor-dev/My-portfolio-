'use client'

import { useMemo, useRef } from 'react'
import { ThemePalette, usePortfolioTheme } from '@/lib/theme'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Icosahedron, Torus } from '@react-three/drei'
import * as THREE from 'three'

type Palette = ThemePalette

function ParticleField({ count = 1400, palette }: { count?: number; palette: Palette }) {
  const pointsRef = useRef<THREE.Points>(null)
  const { viewport } = useThree()
  const mouse = useRef(new THREE.Vector2(0, 0))

  const { positions, colors, scales } = useMemo(() => {
    const primary = new THREE.Color(palette.primary)
    const light = new THREE.Color(palette.light)
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 18
      positions[i3 + 1] = (Math.random() - 0.5) * 12
      positions[i3 + 2] = (Math.random() - 0.5) * 10
      const c = Math.random() > 0.5 ? primary : light
      colors[i3] = c.r
      colors[i3 + 1] = c.g
      colors[i3 + 2] = c.b
      scales[i] = Math.random() * 0.05 + 0.01
    }
    return { positions, colors, scales }
  }, [count, palette.primary, palette.light])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    mouse.current.lerp(
      new THREE.Vector2(state.pointer.x, state.pointer.y),
      0.05,
    )
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.04 + mouse.current.x * 0.4
      pointsRef.current.rotation.x = mouse.current.y * 0.25
      const positions = pointsRef.current.geometry.attributes.position
        .array as Float32Array
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        positions[i3 + 1] += Math.sin(t * 0.5 + i) * 0.0015
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function ConnectionLines({ palette }: { palette: Palette }) {
  const groupRef = useRef<THREE.Group>(null)
  const nodes = useMemo(() => {
    const arr: THREE.Vector3[] = []
    for (let i = 0; i < 9; i++) {
      arr.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
        ),
      )
    }
    return arr
  }, [])

  const lineGeo = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 5.5) {
          pts.push(nodes[i], nodes[j])
        }
      }
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts)
    return geo
  }, [nodes])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.06
      groupRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          color={palette.primary}
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      {nodes.map((n, i) => (
        <mesh key={i} position={n}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={palette.light} />
        </mesh>
      ))}
    </group>
  )
}

function FloatingShapes({ palette }: { palette: Palette }) {
  return (
    <group>
      <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.5}>
        <Icosahedron args={[1, 0]} position={[-4, 1.5, -2]}>
          <meshStandardMaterial
            color={palette.dark}
            wireframe
            emissive={palette.primary}
            emissiveIntensity={0.6}
          />
        </Icosahedron>
      </Float>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Torus args={[0.7, 0.18, 16, 60]} position={[4.2, -1.2, -1]}>
          <meshStandardMaterial
            color={palette.light}
            emissive={palette.primary}
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.7}
          />
        </Torus>
      </Float>
      <Float speed={1.2} rotationIntensity={1} floatIntensity={1.2}>
        <Icosahedron args={[0.5, 0]} position={[3, 2.2, -3]}>
          <meshStandardMaterial
            color={palette.primary}
            wireframe
            emissive={palette.light}
            emissiveIntensity={0.8}
          />
        </Icosahedron>
      </Float>
    </group>
  )
}

function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime
    state.camera.position.x = Math.sin(t * 0.1) * 0.6 + state.pointer.x * 0.5
    state.camera.position.y = Math.cos(t * 0.12) * 0.3 + state.pointer.y * 0.3
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export function HeroScene() {
  const { theme, palette } = usePortfolioTheme()
  return (
    <Canvas
      key={theme}
      camera={{ position: [0, 0, 9], fov: 60 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color={palette.primary} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color={palette.light} />
      <ParticleField palette={palette} />
      <ConnectionLines palette={palette} />
      <FloatingShapes palette={palette} />
      <CameraRig />
      <fog attach="fog" args={[palette.background, 9, 20]} />
    </Canvas>
  )
}
