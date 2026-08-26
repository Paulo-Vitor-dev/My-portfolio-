'use client'

import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const INTRO_DURATION = 4.4

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2
}

function easeOutExpo(value: number) {
  return value === 1 ? 1 : 1 - Math.pow(2, -10 * value)
}

function Laptop({ onComplete }: { onComplete: () => void }) {
  const { scene } = useGLTF('/models/laptop.glb')
  const model = useMemo(() => scene.clone(true), [scene])
  const rootRef = useRef<THREE.Group>(null)
  const lidRef = useRef<THREE.Object3D | null>(null)
  const startedAt = useRef<number | null>(null)
  const completed = useRef(false)
  const { camera } = useThree()

  useEffect(() => {
    let display: THREE.Object3D | null = null

    model.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return

      const material = object.material
      const materials = Array.isArray(material) ? material : [material]

      if (
        materials.some((item) =>
          item?.name?.toLowerCase().includes('display and camera'),
        )
      ) {
        display = object
      }
    })

    // Fallback para o nome encontrado no GLB fornecido.
    lidRef.current = display ?? model.getObjectByName('Cube.003_9a00e6') ?? null

    if (lidRef.current) {
      lidRef.current.rotation.x = Math.PI / 2
    }

    if (rootRef.current) {
      rootRef.current.position.set(0, -1.15, 0)
      rootRef.current.rotation.set(0.1, -0.62, -0.04)
      rootRef.current.scale.setScalar(1.45)
    }

    camera.position.set(0, 0.55, 4.6)
    camera.lookAt(0, 0.12, 0)
  }, [camera, model])

  useFrame((state) => {
    const root = rootRef.current
    const lid = lidRef.current
    if (!root || !lid) return

    if (startedAt.current === null) {
      startedAt.current = state.clock.elapsedTime
    }

    const elapsed = state.clock.elapsedTime - startedAt.current

    // 0.0s → 1.35s: notebook entra na cena.
    const entrance = easeOutExpo(clamp01(elapsed / 1.35))
    root.position.y = THREE.MathUtils.lerp(-1.15, -0.48, entrance)
    root.rotation.y = THREE.MathUtils.lerp(-0.62, -0.12, entrance)
    root.rotation.x = THREE.MathUtils.lerp(0.1, 0.02, entrance)

    // 0.75s → 2.55s: tampa abre na dobradiça.
    const opening = easeInOutCubic(clamp01((elapsed - 0.75) / 1.8))
    lid.rotation.x = THREE.MathUtils.lerp(Math.PI / 2, 0, opening)

    // 2.35s → 4.15s: aproximação da câmera para a tela.
    const zoom = easeInOutCubic(clamp01((elapsed - 2.35) / 1.8))
    root.scale.setScalar(THREE.MathUtils.lerp(1.45, 2.45, zoom))
    root.position.y = THREE.MathUtils.lerp(-0.48, -0.16, zoom)
    root.rotation.y = THREE.MathUtils.lerp(-0.12, 0, zoom)

    camera.position.z = THREE.MathUtils.lerp(4.6, 2.15, zoom)
    camera.position.y = THREE.MathUtils.lerp(0.55, 0.42, zoom)
    camera.lookAt(0, 0.18, -0.24)

    // Pequeno movimento vivo depois de aberto.
    if (elapsed > 2.3 && zoom < 0.75) {
      root.rotation.z = Math.sin(elapsed * 1.8) * 0.008
    }

    if (elapsed >= INTRO_DURATION && !completed.current) {
      completed.current = true
      onComplete()
    }
  })

  return (
    <group ref={rootRef}>
      <primitive object={model} />
    </group>
  )
}

export function LaptopIntroScene({ onComplete }: { onComplete: () => void }) {
  return (
    <Canvas
      camera={{ position: [0, 0.55, 4.6], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={1.45} />
      <directionalLight position={[4, 6, 5]} intensity={2.8} />
      <pointLight position={[-3, 1.5, 3]} intensity={10} color="#7c3aed" />
      <pointLight position={[3, 2, -1]} intensity={8} color="#a78bfa" />
      <Laptop onComplete={onComplete} />
      <Environment preset="city" />
    </Canvas>
  )
}

useGLTF.preload('/models/laptop.glb')
