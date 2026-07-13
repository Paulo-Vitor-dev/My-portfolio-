'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { X } from 'lucide-react'
import { SectionHeading } from '@/components/reveal'
import { timeline, type TimelineStep } from '@/lib/data'

const stats = [
  { value: 3, suffix: '+', label: 'Anos de experiência' },
  { value: 15, suffix: '+', label: 'Projetos realizados' },
  { value: 10, suffix: '+', label: 'Tecnologias' },
  { value: 100, suffix: '%', label: 'Dedicação' },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const totalFrames = 60
    const id = window.setInterval(() => {
      frame += 1
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3)
      setCount(Math.round(value * progress))
      if (frame >= totalFrames) window.clearInterval(id)
    }, 18)
    return () => window.clearInterval(id)
  }, [inView, value])

  return <span ref={ref}>{count}{suffix}</span>
}

function JourneyModal({ step, onClose }: { step: TimelineStep; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-background/80 px-4 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        onClick={(event) => event.stopPropagation()}
        className="glass relative w-full max-w-2xl rounded-3xl p-7 text-left purple-glow"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Fechar detalhes"
        >
          <X size={18} />
        </button>
        <span className="font-heading text-5xl font-bold text-primary/40">{step.year}</span>
        <h3 className="mt-3 font-heading text-2xl font-semibold text-foreground">{step.title}</h3>
        <p className="mt-4 leading-relaxed text-muted-foreground">{step.details ?? step.description}</p>
        {!!step.technologies?.length && (
          <div className="mt-6 flex flex-wrap gap-2">
            {step.technologies.map((tech) => (
              <span key={tech} className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-xs text-accent">
                {tech}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

function TimelineItem({ step, index, onSelect }: { step: TimelineStep; index: number; onSelect: () => void }) {
  const isLeft = index % 2 === 0
  return (
    <div className="relative flex items-center md:justify-center">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'backOut' }}
        className="absolute left-4 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:left-1/2"
      >
        <span className="absolute h-4 w-4 animate-ping rounded-full bg-primary/40" />
        <span className="h-4 w-4 rounded-full border-2 border-accent bg-background" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`ml-12 w-full md:ml-0 md:w-[calc(50%-3rem)] ${
          isLeft ? 'md:mr-auto md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
        }`}
      >
        <button
          type="button"
          onClick={onSelect}
          className="glass group w-full rounded-2xl p-6 text-left transition-all duration-500 hover:-translate-y-1 hover:purple-glow md:text-inherit"
        >
          <div className={`mb-3 flex items-center gap-3 ${isLeft ? 'md:justify-end' : ''}`}>
            <span className="font-heading text-5xl font-bold text-primary/30 transition-colors group-hover:text-primary/50">{step.year}</span>
            <h3 className="font-heading text-xl font-semibold text-foreground">{step.title}</h3>
          </div>
          <p className="leading-relaxed text-muted-foreground">{step.description}</p>
          <span className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.2em] text-accent opacity-0 transition-opacity group-hover:opacity-100">
            Ver detalhes
          </span>
        </button>
      </motion.div>
    </div>
  )
}

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<TimelineStep | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="sobre" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="A Jornada"
          title={<>Cada linha de código conta <span className="gradient-text">uma história</span></>}
          description="Sou estudante de Análise e Desenvolvimento de Sistemas e construo aplicações web, interfaces responsivas, APIs e automações com IA. Minha jornada une aprendizado constante, prática em projetos reais e vontade de transformar problemas em soluções digitais eficientes."
        />

        <div className="mb-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-3xl p-6 transition-all hover:purple-glow">
              <div className="font-heading text-4xl font-bold text-accent">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div ref={ref} className="relative mt-10">
          <div className="absolute left-4 top-0 h-full w-px -translate-x-1/2 bg-border md:left-1/2" />
          <motion.div style={{ scaleY: lineScale }} className="absolute left-4 top-0 h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-accent via-primary to-purple-dark md:left-1/2" />

          <div className="flex flex-col gap-16">
            {timeline.map((step, i) => (
              <TimelineItem key={step.year} step={step} index={i} onSelect={() => setSelected(step)} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>{selected && <JourneyModal step={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  )
}
