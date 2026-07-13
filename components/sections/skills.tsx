'use client'

import dynamic from 'next/dynamic'
import { SectionHeading } from '@/components/reveal'

const SkillsGalaxyScene = dynamic(
  () => import('./skills-galaxy').then((m) => m.SkillsGalaxyScene),
  { ssr: false },
)

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-28 sm:py-36">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Arsenal Técnico"
          title={
            <>
              Uma <span className="gradient-text">galáxia</span> de tecnologias
            </>
          }
          description="Tecnologias que utilizo para construir interfaces modernas, APIs, bancos de dados, automações e aplicações web completas."
        />
      </div>

      <div className="relative mx-auto mt-4 h-[520px] w-full max-w-4xl px-4 sm:h-[600px]">
        <SkillsGalaxyScene />
      </div>
    </section>
  )
}
