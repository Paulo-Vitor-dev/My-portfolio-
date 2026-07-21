'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Award, Download, ExternalLink, Sparkles, X } from 'lucide-react'
import { SectionHeading } from '@/components/reveal'

type Achievement = {
  id: string
  title: string
  issuer: string
  date: string
  workload: string
  description: string
  image: string
  certificateUrl?: string
  position: { left: string; top: string }
  size: number
}

const achievements: Achievement[] = [
  {
    id: 'rocketseat-n8n',
    title: 'Carreira IA: do zero ao primeiro agente automático com n8n',
    issuer: 'Rocketseat',
    date: '15/01/2026',
    workload: '5 horas',
    description:
      'Formação prática sobre automações com n8n, integração de serviços e criação de fluxos inteligentes com Inteligência Artificial.',
    image: '/certificado-rocketseat-n8n.png',
    position: { left: '47%', top: '36%' },
    size: 26,
  },
  {
    id: 'alura-front-end-2',
    title: 'Imersão Front-End 2ª Edição',
    issuer: 'Alura',
    date: '15/02/2025',
    workload: '5 horas',
    description:
      'Imersão prática em desenvolvimento Front-End, fortalecendo fundamentos e práticas para criação de interfaces web modernas.',
    image: '/certificado-alura-imersao-front-end.png',
    certificateUrl: '/certificado-alura-imersao-front-end.pdf',
    position: { left: '17%', top: '24%' },
    size: 26,
  },
  {
    id: 'alura-arquitetura-web-ia',
    title: 'Imersão Arquitetura Web com IA',
    issuer: 'Alura',
    date: '21/07/2026',
    workload: '4 horas',
    description:
      'Imersão dedicada à arquitetura web com Inteligência Artificial, explorando conceitos e práticas para construção de soluções web modernas apoiadas por IA.',
    image: '/certificado-alura-arquitetura-web-ia.png',
    certificateUrl: '/certificado-alura-arquitetura-web-ia.pdf',
    position: { left: '77%', top: '18%' },
    size: 26,
  },
]

const futureStars = [
  { left: '84%', top: '62%', size: 11, delay: 1.4 },
  { left: '24%', top: '72%', size: 7, delay: 2 },
  { left: '64%', top: '78%', size: 9, delay: 2.6 },
]

const backgroundStars = Array.from({ length: 34 }, (_, index) => ({
  left: `${(index * 37 + 11) % 96}%`,
  top: `${(index * 53 + 7) % 92}%`,
  size: 1 + (index % 3),
  delay: (index % 9) * 0.35,
}))

function CertificateModal({ achievement, onClose }: { achievement: Achievement; onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-background/90 p-4 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="glass relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl p-4 purple-glow sm:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-background/80 text-muted-foreground backdrop-blur-md transition hover:border-primary/60 hover:text-foreground"
          aria-label="Fechar certificado"
        >
          <X size={18} />
        </button>

        <div className="overflow-hidden rounded-2xl border border-primary/15 bg-white">
          <img src={achievement.image} alt={`Certificado ${achievement.title}`} className="h-auto w-full" />
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              <span>{achievement.issuer}</span><span className="text-muted-foreground">•</span>
              <span>{achievement.date}</span><span className="text-muted-foreground">•</span>
              <span>{achievement.workload}</span>
            </div>
            <h3 id="certificate-title" className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
              {achievement.title}
            </h3>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{achievement.description}</p>
          </div>
          <a
            href={achievement.certificateUrl ?? achievement.image}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-3 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:border-primary/70 hover:bg-primary/20"
          >
            Abrir certificado <ExternalLink size={16} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Achievements() {
  const [selected, setSelected] = useState<Achievement | null>(null)
  const reduceMotion = useReducedMotion()
  const stars = useMemo(() => backgroundStars, [])

  return (
    <section id="conquistas" className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 achievement-radial" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Conquistas"
          title={<>Uma constelação de <span className="gradient-text">aprendizados</span></>}
          description="Cada estrela representa um curso, certificado ou conquista importante da minha jornada. Clique nos pontos luminosos para explorar cada marco."
        />

        <div className="mb-10 flex justify-center">
          <motion.a
            href="/curriculo-paulo-vitor.pdf"
            download="Curriculo-Paulo-Vitor-Brandao.pdf"
            whileHover={reduceMotion ? undefined : { y: -4, scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            className="group inline-flex items-center gap-3 rounded-full border border-primary/35 bg-primary/10 px-6 py-3.5 font-medium text-foreground achievement-button-shadow transition hover:border-primary/70 hover:bg-primary/20"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition group-hover:rotate-6">
              <Download size={17} />
            </span>
            Baixar meu currículo
          </motion.a>
        </div>

        <div className="glass relative h-[520px] overflow-hidden rounded-[2rem] border-primary/20 sm:h-[620px]">
          <div className="absolute inset-0 constellation-grid opacity-50" aria-hidden />
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[90px]" aria-hidden />

          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <motion.path
              d="M 17 24 L 47 36 L 77 18 M 47 36 L 84 62 L 64 78 L 24 72 L 17 24"
              fill="none"
              stroke="var(--accent)" strokeOpacity="0.25"
              strokeWidth="0.28"
              strokeDasharray="1.4 1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: reduceMotion ? 0 : 2.3, ease: 'easeInOut' }}
            />
          </svg>

          {stars.map((star, index) => (
            <motion.span
              key={index}
              className="absolute rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]"
              style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
              animate={reduceMotion ? undefined : { opacity: [0.25, 1, 0.3], scale: [0.8, 1.25, 0.85] }}
              transition={{ duration: 2.4 + (index % 4), repeat: Infinity, delay: star.delay }}
              aria-hidden
            />
          ))}

          {futureStars.map((star, index) => (
            <motion.div
              key={`${star.left}-${star.top}`}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: star.left, top: star.top }}
              animate={reduceMotion ? undefined : { y: [0, -5, 0], opacity: [0.45, 0.8, 0.45] }}
              transition={{ duration: 4.5, repeat: Infinity, delay: star.delay }}
            >
              <span
                className="block rotate-45 border border-primary/40 bg-primary/30 achievement-star-shadow"
                style={{ width: star.size, height: star.size }}
                aria-hidden
              />
              <span className="pointer-events-none absolute left-1/2 top-6 w-max -translate-x-1/2 rounded-full border border-primary/15 bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                Próxima conquista
              </span>
            </motion.div>
          ))}

          {achievements.map((achievement) => (
            <motion.button
              key={achievement.id}
              type="button"
              onClick={() => setSelected(achievement)}
              className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 text-left focus:outline-none"
              style={{ left: achievement.position.left, top: achievement.position.top }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={reduceMotion ? undefined : { scale: 1.12 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              transition={{ duration: 0.7, ease: 'backOut' }}
              aria-label={`Ver certificado ${achievement.title}`}
            >
              <motion.span
                className="absolute inset-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-2xl"
                animate={reduceMotion ? undefined : { scale: [0.8, 1.3, 0.8], opacity: [0.35, 0.75, 0.35] }}
                transition={{ duration: 3, repeat: Infinity }}
                aria-hidden
              />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-accent/60 bg-background/80 achievement-orb-shadow backdrop-blur-md sm:h-24 sm:w-24">
                <Sparkles className="absolute -right-2 -top-2 text-accent" size={20} />
                <Award className="text-accent transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" size={achievement.size} />
              </span>
              <span className="absolute left-1/2 top-[calc(100%+14px)] w-64 -translate-x-1/2 text-center">
                <span className="block font-heading text-sm font-semibold text-foreground sm:text-base">{achievement.issuer}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{achievement.title}</span>
                <span className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-accent opacity-70 transition-opacity group-hover:opacity-100">Clique para explorar</span>
              </span>
            </motion.button>
          ))}

          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 text-xs text-muted-foreground">
            <span className="font-mono uppercase tracking-[0.16em]">3 conquistas mapeadas</span>
            <span className="hidden items-center gap-2 sm:flex"><Sparkles size={13} className="text-accent" /> Novas estrelas serão adicionadas aqui</span>
          </div>
        </div>
      </div>

      <AnimatePresence>{selected && <CertificateModal achievement={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  )
}
