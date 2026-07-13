const technologies = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'PostgreSQL',
  'MongoDB',
  'MySQL',
  'Tailwind CSS',
  'Python',
  'n8n',
  'Figma',
  'Git',
  'REST APIs',
]

function MarqueeContent() {
  return (
    <div className="flex min-w-max items-center gap-7 px-4">
      {technologies.map((tech) => (
        <div key={tech} className="flex items-center gap-7">
          <span className="font-mono text-base font-semibold text-muted-foreground/75 sm:text-lg">
            {tech}
          </span>
          <span className="font-mono text-xl font-bold text-accent">/</span>
        </div>
      ))}
    </div>
  )
}

export function TechMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-primary/10 bg-background/70 py-5 backdrop-blur">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="tech-marquee flex w-max hover:[animation-play-state:paused]">
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </section>
  )
}
