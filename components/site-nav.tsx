'use client'

import { useEffect, useState, type MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/lib/data'

function scrollToSection(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith('#')) return

  const target = document.querySelector<HTMLElement>(href)
  if (!target) return

  event.preventDefault()
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', href)
}

export function SiteNav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const resolveHref = (href: string) => (isHome ? href : `/${href}`)

  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const nextScrolled = window.scrollY > 40
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-3 transition-all duration-500 md:px-6 ${
          scrolled ? 'glass purple-glow' : 'border border-primary/10 bg-background/20 backdrop-blur-md'
        }`}
      >
        <a
          href={resolveHref('#hero')}
          onClick={(event) => { if (isHome) scrollToSection(event, '#hero') }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-primary/10 font-heading text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          aria-label="Início"
        >
          PV
        </a>

        <ul className="hidden items-center justify-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={resolveHref(link.href)}
                onClick={(event) => { if (isHome) scrollToSection(event, link.href) }}
                className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:px-4"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={resolveHref('#contato')}
          onClick={(event) => { if (isHome) scrollToSection(event, '#contato') }}
          className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105 md:inline-block"
        >
          Vamos conversar
        </a>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-foreground md:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass absolute left-4 right-4 top-20 rounded-2xl p-4 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={resolveHref(link.href)}
                    onClick={(event) => {
                      setOpen(false)
                      if (isHome) scrollToSection(event, link.href)
                    }}
                    className="block rounded-lg px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
