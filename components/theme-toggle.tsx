'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme | null
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme ?? (systemPrefersDark ? 'dark' : 'light')

    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    document.documentElement.classList.toggle('light', initialTheme === 'light')
    document.documentElement.style.colorScheme = initialTheme
    setTheme(initialTheme)
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    document.documentElement.classList.toggle('light', nextTheme === 'light')
    document.documentElement.style.colorScheme = nextTheme
    localStorage.setItem('portfolio-theme', nextTheme)
    window.dispatchEvent(new CustomEvent('portfolio-theme-change', { detail: nextTheme }))
    setTheme(nextTheme)
  }

  if (!mounted) {
    return <span className="h-10 w-10" aria-hidden />
  }

  const isDark = theme === 'dark'

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      className="theme-toggle flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      title={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, scale: 0, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.span>
    </motion.button>
  )
}
