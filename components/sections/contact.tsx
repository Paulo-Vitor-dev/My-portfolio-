'use client'

import type React from 'react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Mail, MessageCircle, ArrowUpRight, Send } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { Reveal } from '@/components/reveal'
import { contactLinks } from '@/lib/data'

const ContactSphere = dynamic(
  () => import('./contact-sphere').then((m) => m.ContactSphere),
  { ssr: false },
)

const ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Email: Mail,
  WhatsApp: MessageCircle,
}

export function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '')
    const email = String(form.get('email') ?? '')
    const subject = String(form.get('subject') ?? 'Contato pelo portfólio')
    const message = String(form.get('message') ?? '')
    const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`)
    window.location.href = `mailto:paulov9517@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contato" className="relative flex min-h-screen items-center overflow-hidden py-28">
      <div className="absolute inset-0" aria-hidden><ContactSphere /></div>
      <div className="absolute inset-0" aria-hidden style={{ background: 'radial-gradient(circle at 50% 50%, transparent 25%, var(--scene-vignette) 82%)' }} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="text-center lg:text-left">
          <Reveal>
            <span className="mb-4 inline-block font-mono text-xs uppercase tracking-[0.35em] text-accent">Contato</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              Vamos construir algo <span className="gradient-text text-glow">incrível</span> juntos?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground lg:mx-0">
              Estou aberto para oportunidades de estágio, posições júnior, freelances e projetos envolvendo desenvolvimento Full Stack, automação e Inteligência Artificial.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2 lg:mx-0">
              {contactLinks.map((link) => {
                const Icon = ICONS[link.label] ?? Mail
                return (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="glass group flex items-center gap-4 rounded-2xl p-4 text-left transition-all duration-300 hover:purple-glow">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-accent transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><Icon size={20} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-foreground">{link.label}</span>
                      <span className="block truncate font-mono text-xs text-muted-foreground">{link.handle}</span>
                    </span>
                    <ArrowUpRight size={16} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                  </a>
                )
              })}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <form onSubmit={handleSubmit} className="glass mx-auto w-full max-w-2xl rounded-3xl p-6 text-left sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold text-foreground">
                Nome
                <input required name="name" placeholder="Seu nome" className="mt-2 w-full rounded-2xl border border-primary/15 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary" />
              </label>
              <label className="space-y-2 text-sm font-semibold text-foreground">
                Email
                <input required type="email" name="email" placeholder="seu@email.com" className="mt-2 w-full rounded-2xl border border-primary/15 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary" />
              </label>
            </div>
            <label className="mt-5 block space-y-2 text-sm font-semibold text-foreground">
              Assunto
              <input required name="subject" placeholder="Assunto da mensagem" className="mt-2 w-full rounded-2xl border border-primary/15 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary" />
            </label>
            <label className="mt-5 block space-y-2 text-sm font-semibold text-foreground">
              Mensagem
              <textarea required name="message" placeholder="Sua mensagem..." rows={6} className="mt-2 w-full resize-none rounded-2xl border border-primary/15 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary" />
            </label>
            <button type="submit" className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.01] hover:purple-glow">
              Enviar mensagem <Send size={17} />
            </button>
            {sent && <p className="mt-4 text-center text-sm text-accent">Seu aplicativo de e-mail foi aberto para finalizar o envio.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
