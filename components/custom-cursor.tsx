'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = useState(true)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    // Only enable on devices with a fine pointer
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return

    document.documentElement.classList.add('custom-cursor-active')
    setHidden(false)

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: pos.x, y: pos.y }
    let raf = 0

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      }
      const target = e.target as HTMLElement
      setHovering(
        !!target.closest('a, button, [data-cursor="hover"], input, textarea'),
      )
    }

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.18
      ring.y += (pos.y - ring.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
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
