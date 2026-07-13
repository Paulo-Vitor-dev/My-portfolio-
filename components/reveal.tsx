'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  blur?: boolean
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  blur = true,
}: RevealProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y,
      filter: blur ? 'blur(10px)' : 'blur(0px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: ReactNode
  description?: string
}) {
  return (
    <div className="mx-auto mb-16 max-w-2xl text-center">
      <Reveal>
        <span className="mb-4 inline-block font-mono text-xs uppercase tracking-[0.35em] text-accent">
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.2}>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
