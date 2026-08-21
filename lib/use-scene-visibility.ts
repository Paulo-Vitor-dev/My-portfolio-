'use client'

import { useEffect, useRef, useState } from 'react'

export function useSceneVisibility(rootMargin = '240px') {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { rootMargin, threshold: 0.01 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [rootMargin])

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState === 'visible')
    updateVisibility()
    document.addEventListener('visibilitychange', updateVisibility)
    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  return { containerRef, active: isIntersecting && pageVisible }
}
