"use client"

import { useEffect, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

type BinaryParticle = {
  sprite: THREE.Sprite
  speed: number
  drift: number
  spin: number
}

function createDigitTexture(digit: "0" | "1") {
  const canvas = document.createElement("canvas")
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext("2d")

  if (!ctx) return null

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.font = "700 82px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillStyle = "#d8ccff"
  ctx.shadowColor = "#8b5cf6"
  ctx.shadowBlur = 24
  ctx.fillText(digit, 64, 66)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

export function BinaryField() {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<BinaryParticle[]>([])

  const textures = useMemo(() => ({ zero: null as THREE.CanvasTexture | null, one: null as THREE.CanvasTexture | null }), [])

  useEffect(() => {
    const group = groupRef.current
    if (!group) return

    textures.zero = createDigitTexture("0")
    textures.one = createDigitTexture("1")

    const particles: BinaryParticle[] = []
    const count = 46

    for (let i = 0; i < count; i += 1) {
      const texture = Math.random() > 0.5 ? textures.one : textures.zero
      if (!texture) continue

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: THREE.MathUtils.randFloat(0.18, 0.58),
        depthWrite: false,
        blending: THREE.NormalBlending,
      })

      const sprite = new THREE.Sprite(material)
      const depth = THREE.MathUtils.randFloat(-9, 2.5)
      const scale = THREE.MathUtils.mapLinear(depth, -9, 2.5, 0.12, 0.42)

      sprite.position.set(
        THREE.MathUtils.randFloatSpread(11),
        THREE.MathUtils.randFloat(-5.2, 5.2),
        depth,
      )
      sprite.scale.set(scale, scale, 1)
      group.add(sprite)

      particles.push({
        sprite,
        speed: THREE.MathUtils.randFloat(1.2, 3.2),
        drift: THREE.MathUtils.randFloat(-0.08, 0.08),
        spin: THREE.MathUtils.randFloat(-0.12, 0.12),
      })
    }

    particlesRef.current = particles

    return () => {
      particles.forEach(({ sprite }) => {
        group.remove(sprite)
        sprite.material.dispose()
      })
      textures.zero?.dispose()
      textures.one?.dispose()
      particlesRef.current = []
    }
  }, [textures])

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime()

    particlesRef.current.forEach((particle, index) => {
      const { sprite } = particle

      sprite.position.y -= particle.speed * delta
      sprite.position.x += particle.drift * delta
      sprite.material.rotation += particle.spin * delta

      const pulse = 0.38 + Math.sin(elapsed * 2.4 + index * 0.55) * 0.16
      sprite.material.opacity = THREE.MathUtils.clamp(pulse, 0.16, 0.56)

      if (sprite.position.y < -5.8) {
        sprite.position.y = 5.8
        sprite.position.x = THREE.MathUtils.randFloatSpread(11)
        sprite.position.z = THREE.MathUtils.randFloat(-9, 2.5)
      }
    })

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(elapsed * 0.28) * 0.045
      groupRef.current.rotation.x = Math.cos(elapsed * 0.22) * 0.02
    }
  })

  return <group ref={groupRef} rotation={[0.04, -0.08, -0.03]} />
}
