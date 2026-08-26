import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/hero/hero'
import { About } from '@/components/sections/about'
import { Skills } from '@/components/sections/skills'
import { Projects } from '@/components/sections/projects'
import { Experience } from '@/components/sections/experience'
import { Contact } from '@/components/sections/contact'
import { Achievements } from '@/components/sections/achievements'
import { TechMarquee } from '@/components/sections/tech-marquee'

export default function Page() {
  return (
    <>
      <div className="noise-overlay" aria-hidden />
      <SiteNav />
      <main className="relative">
        <Hero />
        <Projects />
        <TechMarquee />
        <About />
        <Skills />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
