import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Lightbulb, Target } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { CaseHeroSphere } from '@/components/case/case-hero-sphere'
import { ProjectGallery } from '@/components/case/project-gallery'
import { projects } from '@/lib/data'

type CasePageProps = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }))
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { id } = await params
  const project = projects.find((item) => item.id === id)

  if (!project) return {}

  return {
    title: `${project.title} — Case | Paulo Vitor Brandão`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Case`,
      description: project.description,
      images: [project.image],
    },
  }
}

export default async function ProjectCasePage({ params }: CasePageProps) {
  const { id } = await params
  const projectIndex = projects.findIndex((item) => item.id === id)
  if (projectIndex === -1) notFound()

  const project = projects[projectIndex]
  const previous = projects[(projectIndex - 1 + projects.length) % projects.length]
  const next = projects[(projectIndex + 1) % projects.length]
  const caseStudy = project.caseStudy

  return (
    <>
      <div className="noise-overlay" aria-hidden />
      <SiteNav />
      <main className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-8 sm:pb-28">
          <Link href="/#projetos" className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent">
            <ArrowLeft size={16} /> Voltar aos projetos
          </Link>

          <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-accent">Case de projeto</p>
              <h1 className="max-w-4xl font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">{project.description}</p>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span key={technology} className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-accent">
                    {technology}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20">
                  Ver código <ArrowUpRight size={16} />
                </a>
                {project.demo !== '#' && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/5">
                    Acessar projeto <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-primary/10 bg-primary/[0.025] sm:min-h-[440px] lg:min-h-[540px]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12),transparent_62%)]" />
              <div className="absolute inset-0">
                <CaseHeroSphere />
              </div>
              <div className="absolute inset-x-5 bottom-5 z-10 glass rounded-2xl p-5 backdrop-blur-md sm:inset-x-7 sm:bottom-7 sm:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Minha atuação</p>
                <p className="mt-2 text-sm leading-6 text-foreground/90 sm:text-base sm:leading-7">{caseStudy.role}</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-14 aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-3xl border border-primary/20 bg-card shadow-2xl shadow-primary/10 sm:mt-20">
            <Image src={project.image} alt={`Tela principal do projeto ${project.title}`} fill priority sizes="(max-width: 1024px) 100vw, 896px" className="object-contain" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
          </div>

          <ProjectGallery media={project.caseMedia ?? []} />
        </section>

        <section className="border-y border-border/70 bg-card/20 py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-2">
            <article className="glass rounded-3xl p-7 sm:p-9">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-accent"><Target size={20} /></div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">O problema</p>
              <h2 className="mt-3 font-heading text-2xl font-semibold sm:text-3xl">O que precisava ser resolvido</h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">{caseStudy.problem}</p>
            </article>

            <article className="glass rounded-3xl p-7 sm:p-9">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-accent"><Lightbulb size={20} /></div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">A solução</p>
              <h2 className="mt-3 font-heading text-2xl font-semibold sm:text-3xl">Como transformei a ideia em produto</h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">{caseStudy.solution}</p>
            </article>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Funcionalidades</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">O que o projeto entrega</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {caseStudy.highlights.map((highlight) => (
                <div key={highlight} className="flex gap-3 rounded-2xl border border-border bg-card/45 p-5">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={18} />
                  <span className="text-sm leading-6 text-foreground/90">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Decisões técnicas</p>
            <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold sm:text-4xl">Tecnologia com uma razão por trás</h2>
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {caseStudy.decisions.map((decision, index) => (
                <article key={decision.title} className="rounded-3xl border border-border bg-card/45 p-6 transition-colors hover:border-primary/35">
                  <span className="font-mono text-xs text-accent">0{index + 1}</span>
                  <h3 className="mt-4 font-heading text-xl font-semibold">{decision.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{decision.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-24 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-border bg-card/45 p-7 sm:p-9">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Desafios</p>
              <h2 className="mt-3 font-heading text-2xl font-semibold sm:text-3xl">Pontos que exigiram mais atenção</h2>
              <ul className="mt-6 space-y-4">
                {caseStudy.challenges.map((challenge) => (
                  <li key={challenge} className="flex gap-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {challenge}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-3xl border border-primary/25 bg-primary/5 p-7 sm:p-9">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Resultado & aprendizado</p>
              <h2 className="mt-3 font-heading text-2xl font-semibold sm:text-3xl">O que esse projeto demonstra</h2>
              <p className="mt-6 text-sm leading-7 text-muted-foreground sm:text-base">{caseStudy.outcome}</p>
            </article>
          </div>
        </section>

        <section className="border-t border-border py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-2">
            <Link href={`/projetos/${previous.id}`} className="group rounded-3xl border border-border bg-card/35 p-6 transition-all hover:-translate-y-1 hover:border-primary/35">
              <span className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground"><ArrowLeft size={14} /> Case anterior</span>
              <strong className="mt-3 block font-heading text-xl transition-colors group-hover:text-accent">{previous.title}</strong>
            </Link>
            <Link href={`/projetos/${next.id}`} className="group rounded-3xl border border-border bg-card/35 p-6 text-right transition-all hover:-translate-y-1 hover:border-primary/35">
              <span className="flex items-center justify-end gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Próximo case <ArrowRight size={14} /></span>
              <strong className="mt-3 block font-heading text-xl transition-colors group-hover:text-accent">{next.title}</strong>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
