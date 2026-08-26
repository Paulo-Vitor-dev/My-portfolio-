'use client'

import dynamic from 'next/dynamic'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

const LaptopIntroScene = dynamic(
  () => import('./laptop-intro-scene').then((module) => module.LaptopIntroScene),
  { ssr: false },
)

export function PortfolioPreloader() {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)

  const finish = useCallback(() => {
    setLeaving(true)
    window.setTimeout(() => setVisible(false), 650)
  }, [])

  useEffect(() => {
    if (!visible) return

    document.body.style.overflow = 'hidden'

    if (reduceMotion) {
      const timer = window.setTimeout(() => setVisible(false), 150)
      return () => {
        window.clearTimeout(timer)
        document.body.style.overflow = ''
      }
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [reduceMotion, visible])

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = ''
    }
  }, [visible])

  if (!visible) return null

  return (
    <AnimatePresence>
      <motion.div
        key="portfolio-preloader"
        initial={{ opacity: 1 }}
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[9999] overflow-hidden bg-[#050507]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(124,58,237,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(124,58,237,.14),transparent_42%)]" />

        {!reduceMotion && (
          <div className="absolute inset-0">
            <LaptopIntroScene onComplete={finish} />
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 mx-auto flex w-[min(92%,72rem)] items-end justify-between gap-8 px-2 md:bottom-12 md:px-6">
          <div className="min-w-0 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45 sm:text-xs">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.35 }}
              className="text-violet-300"
            >
              &gt; pv.system:init()
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.35 }}
            >
              &gt; carregando experiência...
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.55, duration: 0.35 }}
            >
              &gt; interface pronta
            </motion.p>
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 0.25, duration: 0.9, repeat: Infinity }}
            className="hidden font-mono text-xs text-violet-300 sm:block"
          >
            _
          </motion.span>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-30 h-[2px] bg-white/10">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: leaving ? 1 : 0.96 }}
            transition={{ duration: leaving ? 0.25 : 4.05, ease: 'easeInOut' }}
            className="h-full origin-left bg-violet-400"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: leaving ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 z-40 bg-background"
        />
      </motion.div>
    </AnimatePresence>
  )
}
