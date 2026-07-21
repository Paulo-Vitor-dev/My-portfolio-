'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, MousePointer2 } from 'lucide-react'
import { GithubIcon } from '@/components/brand-icons'
import { SectionHeading, Reveal } from '@/components/reveal'
import { projects } from '@/lib/data'

const filters = [
  { label: 'Todos', value: 'all' },
  { label: 'Destaques', value: 'featured' },
  { label: 'Web', value: 'web' },
  { label: 'APIs & Back-end', value: 'apis' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Design', value: 'design' },
]

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const visibleProjects = useMemo(() => {
    if (!activeFilter) return []
    if (activeFilter === 'all') return projects
    if (activeFilter === 'featured') return projects.filter((project) => project.featured)
    return projects.filter((project) => project.categories.includes(activeFilter))
  }, [activeFilter])

  useEffect(() => {
    setActiveIndex(0)
    setDirection(1)
  }, [activeFilter])

  const activeProject = visibleProjects[activeIndex]

  const goTo = (index: number) => {
    if (!visibleProjects.length || index === activeIndex) return
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  const nextProject = () => {
    if (visibleProjects.length < 2) return
    setDirection(1)
    setActiveIndex((current) => (current + 1) % visibleProjects.length)
  }

  const previousProject = () => {
    if (visibleProjects.length < 2) return
    setDirection(-1)
    setActiveIndex((current) => (current - 1 + visibleProjects.length) % visibleProjects.length)
  }

  return (
    <section id="projetos" className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[580px] w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Portfólio"
          title={<>Meus <span className="gradient-text">Projetos</span></>}
          description="Selecione uma categoria e navegue pelos projetos em uma apresentação interativa."
        />

        <Reveal>
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            {filters.map((filter) => {
              const active = activeFilter === filter.value
              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`rounded-full border px-5 py-2 text-sm transition-all duration-300 ${
                    active
                      ? 'border-primary bg-primary text-primary-foreground purple-glow'
                      : 'border-border bg-background/40 text-muted-foreground hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground'
                  }`}
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
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Depois de selecionar uma categoria, use as setas, as imagens ou os indicadores para navegar pelos projetos.
              </p>
            </motion.div>
          ) : visibleProjects.length && activeProject ? (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16"
            >
              {/* Pilha visual inspirada na apresentação do vídeo */}
              <div className="relative mx-auto h-[400px] w-full max-w-[610px] sm:h-[470px] lg:h-[530px]">
                <div className="absolute inset-x-[12%] bottom-[3%] h-20 rounded-[50%] bg-primary/15 blur-3xl" />

                {visibleProjects.map((project, index) => {
                  let offset = index - activeIndex
                  const total = visibleProjects.length
                  if (offset > total / 2) offset -= total
                  if (offset < -total / 2) offset += total

                  const distance = Math.abs(offset)
                  const isActive = index === activeIndex
                  const y = offset * 62
                  const scale = Math.max(0.74, 1 - distance * 0.075)
                  const opacity = distance > 3 ? 0 : Math.max(0.24, 1 - distance * 0.21)
                  const zIndex = 30 - distance

                  return (
                    <motion.button
                      key={project.id}
                      type="button"
                      aria-label={`Abrir projeto ${project.title}`}
                      onClick={() => goTo(index)}
                      animate={{ y, scale, opacity }}
                      transition={{ type: 'spring', stiffness: 190, damping: 24, mass: 0.9 }}
                      style={{ zIndex }}
                      className={`absolute left-1/2 top-1/2 aspect-[16/10] w-[82%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border bg-card text-left shadow-2xl transition-[border-color,filter] duration-300 sm:w-[78%] ${
                        isActive
                          ? 'border-primary/55 shadow-primary/15'
                          : 'border-border/70 saturate-[0.75] hover:border-primary/35 hover:saturate-100'
                      }`}
                    >
                      <Image
                        src={project.image || '/placeholder.svg'}
                        alt={`Prévia do ${project.title}`}
                        fill
                        sizes="(max-width: 1024px) 80vw, 40vw"
                        className="object-cover"
                        priority={isActive}
                      />
                      <div className={`absolute inset-0 transition-colors duration-300 ${isActive ? 'bg-transparent' : 'bg-background/15'}`} />
                    </motion.button>
                  )
                })}

                {visibleProjects.length > 1 && (
                  <div className="absolute bottom-0 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full border border-border/70 bg-background/75 px-3 py-2 shadow-lg backdrop-blur-xl">
                    <button
                      type="button"
                      onClick={previousProject}
                      aria-label="Projeto anterior"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-all hover:border-primary/60 hover:bg-primary/10 hover:text-accent"
                    >
                      <ArrowLeft size={16} />
                    </button>

                    <div className="flex items-center gap-1.5 px-1">
                      {visibleProjects.map((project, index) => (
                        <button
                          key={project.id}
                          type="button"
                          aria-label={`Ir para ${project.title}`}
                          onClick={() => goTo(index)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === activeIndex ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/35 hover:bg-muted-foreground/70'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={nextProject}
                      aria-label="Próximo projeto"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-all hover:border-primary/60 hover:bg-primary/10 hover:text-accent"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Conteúdo que muda junto com o projeto ativo */}
              <div className="relative min-h-[390px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeProject.id}
                    custom={direction}
                    initial={(dir) => ({ opacity: 0, x: dir * 30, filter: 'blur(5px)' })}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={(dir) => ({ opacity: 0, x: dir * -24, filter: 'blur(5px)' })}
                    transition={{ duration: 0.32, ease: 'easeOut' }}
                    className="flex h-full flex-col justify-center"
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono text-sm font-semibold text-accent">
                        {String(activeIndex + 1).padStart(2, '0')}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {String(visibleProjects.length).padStart(2, '0')} projetos na categoria
                      </span>
                    </div>

                    <h3 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                      {activeProject.title}
                    </h3>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {activeProject.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="font-mono text-[11px] uppercase tracking-wider text-accent/90 after:ml-2 after:text-muted-foreground/40 after:content-['•'] last:after:hidden"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                      {activeProject.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      {activeProject.demo !== '#' && (
                        <a
                          href={activeProject.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
                        >
                          Acessar projeto <ArrowUpRight size={15} />
                        </a>
                      )}

                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/5"
                      >
                        <GithubIcon size={15} /> Repositório GitHub
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mx-auto flex min-h-[220px] max-w-3xl items-center justify-center rounded-3xl border border-dashed border-primary/20 bg-card/30 px-6 text-center text-muted-foreground"
            >
              Ainda não há projetos cadastrados nessa categoria.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
