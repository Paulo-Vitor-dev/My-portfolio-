import type { Project } from '@/lib/data'
import { InteractiveFolderGallery } from '@/components/ui/interactive-folder-gallery'

type ProjectGalleryProps = {
  media: NonNullable<Project['caseMedia']>
  projectTitle: string
}

export function ProjectGallery({ media, projectTitle }: ProjectGalleryProps) {
  if (!media.length) return null

  const galleryMedia = media.map((item, index) => ({
    id: `${item.src}-${index}`,
    src: item.src,
    alt: item.alt,
    kind: item.kind,
  }))

  return (
    <div className="mt-16 sm:mt-20">
      <div className="mb-2 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Demonstração visual</p>
        <h2 className="mt-3 font-heading text-3xl font-semibold sm:text-4xl">Galeria interativa</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
          Abra a pasta para explorar as telas e demonstrações do case. As mídias podem ser arrastadas e organizadas de forma interativa.
        </p>
      </div>

      <InteractiveFolderGallery
        media={galleryMedia}
        folderName={`${projectTitle}.gallery`}
        dragHintText="Arraste uma mídia para baixo para fechar"
      />
    </div>
  )
}
