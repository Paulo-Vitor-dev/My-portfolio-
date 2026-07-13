'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { SectionHeading } from '@/components/reveal'
import { experiences, type Experience as Exp } from '@/lib/data'

function StackedCard({
  exp,
  index,
  total,
  progress,
}: {
  exp: Exp
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const start = index / total
  const end = 1
  const scale = useTransform(progress, [start, end], [1, 1 - (total - index) * 0.04])
  const rotate = useTransform(progress, [start, end], [0, index % 2 === 0 ? -3 : 3])

  return (
    <motion.div
      style={{
        scale,
        rotate,
        top: `calc(18vh + ${index * 1.5}rem)`,
      }}
      className="sticky"
    >
      <div className="glass mx-auto max-w-3xl rounded-3xl p-8 purple-glow sm:p-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-accent">
            <Briefcase size={22} />
          </span>
          <span className="rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 font-mono text-xs text-accent">
            {exp.period}
          </span>
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          {exp.role}
        </h3>
        <p className="mt-1 font-mono text-sm text-accent">{exp.company}</p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {exp.description}
        </p>
      </div>
    </motion.div>
  )
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="experiencia" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Trajetória"
          title={
            <>
              Experiência <span className="gradient-text">Profissional</span>
            </>
          }
          description="Cards que se empilham conforme você desce — profundidade que reflete a evolução de carreira."
        />
      </div>

      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 pb-[20vh]">
          {experiences.map((exp, i) => (
            <StackedCard
              key={i}
              exp={exp}
              index={i}
              total={experiences.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
