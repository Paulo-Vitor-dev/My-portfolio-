'use client'

import { useEffect } from 'react'

/**
 * Smooth scrolling for mouse-wheel navigation without external dependencies.
 * Keeps touch scrolling native and respects prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    let current = window.scrollY
    let target = window.scrollY
    let rafId = 0

    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

    const animate = () => {
      current += (target - current) * 0.1

      if (Math.abs(target - current) < 0.5) {
        current = target
        window.scrollTo(0, current)
        rafId = 0
        return
      }

      window.scrollTo(0, current)
      rafId = requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      if (!rafId) rafId = requestAnimationFrame(animate)
    }

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return

      // Preserve native scrolling inside independently scrollable elements.
      const element = event.target as HTMLElement | null
      const scrollableParent = element?.closest('[data-native-scroll], textarea, select')
      if (scrollableParent) return

      event.preventDefault()
      target = Math.min(maxScroll(), Math.max(0, target + event.deltaY))
      startAnimation()
    }

    const syncPosition = () => {
      if (!rafId) {
        current = window.scrollY
        target = window.scrollY
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', syncPosition, { passive: true })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', syncPosition)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return null
}
