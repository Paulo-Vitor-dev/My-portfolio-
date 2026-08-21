'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = useState(true)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return

    document.documentElement.classList.add('custom-cursor-active')
    setHidden(false)

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: pos.x, y: pos.y }
    let raf = 0
    let isHovering = false

    const animateRing = () => {
      ring.x += (pos.x - ring.x) * 0.18
      ring.y += (pos.y - ring.y) * 0.18

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      }

      if (Math.abs(pos.x - ring.x) > 0.1 || Math.abs(pos.y - ring.y) > 0.1) {
        raf = requestAnimationFrame(animateRing)
      } else {
        ring.x = pos.x
        ring.y = pos.y
        raf = 0
      }
    }

    const onMove = (event: MouseEvent) => {
      pos.x = event.clientX
      pos.y = event.clientY

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      }

      const target = event.target as HTMLElement
      const nextHovering = Boolean(
        target.closest('a, button, [data-cursor="hover"], input, textarea'),
      )
      if (nextHovering !== isHovering) {
        isHovering = nextHovering
        setHovering(nextHovering)
      }

      if (!raf) raf = requestAnimationFrame(animateRing)
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  if (hidden) return null

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="custom-cursor-dot pointer-events-none fixed left-0 top-0 z-[100] -ml-1.5 -mt-1.5 h-3 w-3 rounded-full"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="custom-cursor-ring pointer-events-none fixed left-0 top-0 z-[100] rounded-full transition-[width,height,margin,opacity] duration-200"
        style={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          marginLeft: hovering ? -28 : -16,
          marginTop: hovering ? -28 : -16,
          opacity: hovering ? 0.9 : 0.5,
          boxShadow: 'var(--cursor-ring-shadow)',
        }}
      />
    </>
  )
}
