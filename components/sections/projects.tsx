'use client'

import type React from 'react'
import { useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MousePointer2 } from 'lucide-react'
import { GithubIcon } from '@/components/brand-icons'
import { SectionHeading, Reveal } from '@/components/reveal'
import { projects, type Project } from '@/lib/data'

const filters = [
  { label: 'Todos', value: 'all' },
  { label: 'Destaques', value: 'featured' },
  { label: 'Web', value: 'web' },
  { label: 'APIs & Back-end', value: 'apis' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Design', value: 'design' },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTransform(`perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(10px)`)
  }
  const onLeave = () => setTransform('')

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onLeave}
        style={{ transform, transition: 'transform 0.2s ease-out' }}
        className="group relative h-full overflow-hidden rounded-3xl border border-primary/15 bg-card"
      >
        <div className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(400px circle at 50% 0%, color-mix(in srgb, var(--primary) 18%, transparent), transparent 70%)' }} />
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image src={project.image || '/placeholder.svg'} alt={`Prévia do ${project.title}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col gap-4 p-6">
          <h3 className="font-heading text-xl font-semibold text-foreground">{project.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="rounded-full border border-primary/25 bg-primary/5 px-3 py-1 font-mono text-xs text-accent">{tech}</span>
            ))}
          </div>
          <div className="mt-2 flex gap-3">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary">
              <GithubIcon size={14} /> GitHub
            </a>
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-transform hover:scale-105">
              Demo <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const visibleProjects = useMemo(() => {
    if (!activeFilter) return []
    if (activeFilter === 'all') return projects
    if (activeFilter === 'featured') return projects.filter((project) => project.featured)
    return projects.filter((project) => project.categories.includes(activeFilter))
  }, [activeFilter])

  return (
    <section id="projetos" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Portfólio"
          title={<>Meus <span className="gradient-text">Projetos</span></>}
          description="Selecione uma categoria abaixo para revelar os projetos correspondentes."
        />

        <Reveal>
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            {filters.map((filter) => {
              const active = activeFilter === filter.value
              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`rounded-full border px-5 py-2 text-sm transition-all ${active ? 'border-primary bg-primary text-primary-foreground purple-glow' : 'border-border bg-background/40 text-muted-foreground hover:border-primary/50 hover:text-foreground'}`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          {!activeFilter ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-auto flex min-h-[280px] max-w-5xl flex-col items-center justify-center rounded-3xl border border-dashed border-primary/20 bg-card/30 px-6 text-center"
            >
              <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-accent">
                <MousePointer2 size={24} />
              </span>
              <h3 className="font-heading text-xl font-semibold text-foreground">Escolha um filtro para começar</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">Os projetos aparecem aqui assim que você seleciona uma categoria acima. Experimente clicar em Destaques.</p>
            </motion.div>
          ) : visibleProjects.length ? (
            <motion.div key={activeFilter} layout className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleProjects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
            </motion.div>
          ) : (
            <motion.div key="no-results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-auto flex min-h-[220px] max-w-3xl items-center justify-center rounded-3xl border border-dashed border-primary/20 bg-card/30 px-6 text-center text-muted-foreground">
              Ainda não há projetos cadastrados nessa categoria.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
