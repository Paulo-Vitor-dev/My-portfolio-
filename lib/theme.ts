'use client'

import { useEffect, useState } from 'react'

export type PortfolioTheme = 'dark' | 'light'

export const themePalettes = {
  dark: {
    primary: '#8b5cf6',
    light: '#a78bfa',
    dark: '#6d28d9',
    background: '#0a0a0f',
    surface: 'rgba(17,17,25,0.72)',
  },
  light: {
    primary: '#06b6d4',
    light: '#22d3ee',
    dark: '#0891b2',
    background: '#f7f7f2',
    surface: 'rgba(255,255,255,0.82)',
  },
} as const

export type ThemePalette = (typeof themePalettes)[keyof typeof themePalettes]

export function getDocumentTheme(): PortfolioTheme {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.classList.contains('light') ? 'light' : 'dark'
}

export function usePortfolioTheme() {
  const [theme, setTheme] = useState<PortfolioTheme>('dark')

  useEffect(() => {
    const update = () => setTheme(getDocumentTheme())
    update()

    window.addEventListener('portfolio-theme-change', update)
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      window.removeEventListener('portfolio-theme-change', update)
      observer.disconnect()
    }
  }, [])

  return { theme, palette: themePalettes[theme] }
}
