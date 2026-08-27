import type { Project } from '@/lib/data'

type ProjectGalleryProps = {
  media: NonNullable<Project['caseMedia']>
}

export function ProjectGallery({ media }: ProjectGalleryProps) {
  if (!media.length) return null

  return (
    <div className="mt-16 sm:mt-20">
      <div className="mb-8 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Demonstração visual</p>
        <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">Galeria do projeto</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
          Uma seleção de telas e demonstrações do projeto, organizada em uma grade compacta para preservar a qualidade das imagens.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {media.map((item) => (
          <figure
            key={item.src}
            className="group overflow-hidden rounded-2xl border border-border bg-card/45 shadow-lg shadow-primary/5"
          >
            <div className="relative aspect-square overflow-hidden bg-background/50 p-2 sm:p-3">
              {item.kind === 'gif' ? (
                // GIFs use the native img element so the browser receives the original animated file
                // without passing through Next/Image optimization.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full rounded-xl object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                // Native img also keeps the gallery implementation identical for future media additions.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full rounded-xl object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              )}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
            </div>
            <figcaption className="border-t border-border/70 px-4 py-3 text-xs leading-5 text-muted-foreground sm:text-sm">
              {item.alt}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
