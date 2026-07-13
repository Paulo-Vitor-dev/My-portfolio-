'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

const HeroScene = dynamic(
  () => import('./hero-scene').then((m) => m.HeroScene),
  { ssr: false },
)

const ROLES = [
  'Full Stack Developer',
  'React & Next.js Developer',
  'Java & Spring Boot',
  'IA & Automação com n8n',
]

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % ROLES.length),
      2600,
    )
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-24"
    >
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div className="absolute inset-0" aria-hidden>
        <HeroScene />
      </div>

      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 30%, var(--scene-vignette) 95%)',
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 mx-auto w-full max-w-[340px] lg:order-1"
        >
          <div className="glass purple-glow relative aspect-[4/5] overflow-hidden rounded-[2rem] p-2">
            <div className="absolute -inset-20 rounded-full bg-primary/20 blur-[80px]" aria-hidden />
            <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-primary/25 bg-secondary">
              <Image
                src="/paulo-vitor.jpg"
                alt="Foto de Paulo Vitor Brandão"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 340px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-primary/10" />
            </div>
          </div>
        </motion.div>

        <div className="order-1 flex flex-col items-center text-center lg:order-2 lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-accent backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Aberto para oportunidades e novos projetos
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl font-bold leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-8xl" style={{ fontFamily: 'var(--font-poppins)' }}
          >
            <span className="block text-foreground">PAULO VITOR</span>
            <span className="block gradient-text text-glow">BRANDÃO</span>
          </motion.h1>

          <div className="mt-8 flex h-8 items-center justify-center overflow-hidden lg:justify-start">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-base text-muted-foreground sm:text-lg"
              >
                {'> '}
                <span className="text-accent">{ROLES[roleIndex]}</span>
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground"
          >
            Desenvolvedor Full Stack em formação, com experiência prática em
            desenvolvimento web, criação de interfaces responsivas, integração de
            APIs REST e automação de processos com Inteligência Artificial.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start"
          >
            <a
              href="#projetos"
              className="group flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:purple-glow"
            >
              Ver Projetos
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="#contato"
              className="flex items-center gap-2 rounded-full border border-primary/40 px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-primary/10"
            >
              Entrar em Contato
            </a>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#sobre"
        aria-label="Rolar para baixo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Explore</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  )
}
