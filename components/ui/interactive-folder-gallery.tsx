"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export interface GalleryMedia {
  id: string | number;
  src: string;
  alt: string;
  kind?: "image" | "gif" | "video";
}

export interface InteractiveFolderGalleryProps {
  media: GalleryMedia[];
  folderName?: string;
  dragHintText?: string;
  className?: string;
}

export function InteractiveFolderGallery({
  media,
  folderName = "project.gallery",
  dragHintText = "Arraste uma mídia para baixo para fechar",
  className,
}: InteractiveFolderGalleryProps) {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [hoverFolder, setHoverFolder] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const update = () => setIsCompact(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const center = (media.length - 1) / 2;
  const openSpacing = useMemo(() => {
    if (media.length <= 1) return 0;
    const availableWidth = isCompact ? 250 : 820;
    return Math.min(isCompact ? 104 : 210, availableWidth / (media.length - 1));
  }, [isCompact, media.length]);

  if (!media.length) return null;

  return (
    <div className={`relative w-full py-8 sm:py-12 ${className ?? ""}`}>
      <div className="relative flex min-h-[420px] w-full flex-col items-center justify-center sm:min-h-[500px]">
        <div className="relative flex h-[390px] w-full max-w-6xl justify-center sm:h-[450px]">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-8 h-48 w-[300px] drop-shadow-2xl sm:h-56 sm:w-[360px]"
            animate={{ opacity: isFolderOpen ? 0 : 1, scale: isFolderOpen ? 0.92 : 1 }}
          >
            <div className="absolute left-0 top-0 h-10 w-32 rounded-t-xl border-x border-t border-primary/20 bg-linear-to-t from-card to-primary/20" />
            <div className="absolute bottom-0 left-0 right-0 top-8 rounded-b-2xl rounded-tr-2xl border border-primary/20 bg-linear-to-b from-card to-background shadow-[inset_0_0_45px_rgba(0,0,0,0.65)]" />
            <div className="absolute inset-x-2 bottom-2 top-10 rounded-xl bg-background/95 shadow-inner" />
          </motion.div>

          <div className="pointer-events-none absolute bottom-12 z-10 flex justify-center">
            {media.map((item, index) => {
              const offset = index - center;
              const stackY = hoverFolder ? offset * -8 - 34 : offset * -4;
              const stackX = hoverFolder ? offset * (isCompact ? 22 : 34) : offset * 4;
              const stackRotate = hoverFolder ? offset * 6 : offset * 2.5;
              const stackScale = 1 - Math.abs(offset) * 0.025;

              const openY = isCompact ? -118 : -145;
              const openX = offset * openSpacing;
              const openScale = isCompact ? 0.92 : 1;

              return (
                <motion.figure
                  key={item.id}
                  drag={isFolderOpen}
                  dragSnapToOrigin
                  dragElastic={0.16}
                  onDragEnd={(_, info) => {
                    if (info.offset.y > 100 && isFolderOpen) {
                      setIsFolderOpen(false);
                      setHoverFolder(false);
                    }
                  }}
                  className={`group absolute bottom-0 h-[138px] w-[210px] origin-bottom overflow-hidden rounded-2xl border border-primary/25 bg-card shadow-[0_18px_45px_rgba(0,0,0,0.48)] sm:h-[184px] sm:w-[280px] ${
                    isFolderOpen
                      ? "pointer-events-auto cursor-grab active:cursor-grabbing"
                      : "pointer-events-none"
                  }`}
                  animate={
                    !isFolderOpen
                      ? {
                          y: stackY,
                          x: stackX,
                          rotate: stackRotate,
                          scale: stackScale,
                          zIndex: index + 10,
                        }
                      : {
                          y: openY,
                          x: openX,
                          rotate: 0,
                          scale: openScale,
                          zIndex: 50,
                        }
                  }
                  whileHover={isFolderOpen ? { scale: openScale + 0.04, y: openY - 8, zIndex: 100 } : {}}
                  whileDrag={isFolderOpen ? { scale: openScale + 0.06, rotate: 2, zIndex: 150 } : {}}
                  transition={{ type: "spring", stiffness: 330, damping: 30 }}
                >
                  <div className="relative h-full w-full bg-background/70 p-2">
                    {item.kind === "video" ? (
                      <video
                        src={item.src}
                        aria-label={item.alt}
                        controls={isFolderOpen}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="h-full w-full rounded-xl object-contain"
                      />
                    ) : (
                      // Native img keeps GIF playback and local portfolio assets simple.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        draggable={false}
                        className="h-full w-full rounded-xl object-contain"
                      />
                    )}
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
                    {isFolderOpen && (
                      <figcaption className="pointer-events-none absolute inset-x-3 bottom-3 rounded-lg border border-white/10 bg-background/80 px-3 py-2 text-[10px] leading-4 text-foreground/80 opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 sm:text-xs">
                        {item.alt}
                      </figcaption>
                    )}
                  </div>
                </motion.figure>
              );
            })}
          </div>

          <motion.button
            type="button"
            aria-expanded={isFolderOpen}
            aria-label={isFolderOpen ? "Galeria aberta" : "Abrir galeria do projeto"}
            className="pointer-events-auto absolute bottom-0 z-20 h-44 w-[320px] cursor-pointer border-0 bg-transparent p-0 sm:h-48 sm:w-[380px]"
            style={{ transformOrigin: "bottom" }}
            animate={{
              opacity: isFolderOpen ? 0 : 1,
              rotateX: hoverFolder ? -20 : 0,
              y: hoverFolder ? 8 : 0,
            }}
            onMouseEnter={() => setHoverFolder(true)}
            onMouseLeave={() => setHoverFolder(false)}
            onFocus={() => setHoverFolder(true)}
            onBlur={() => setHoverFolder(false)}
            onClick={() => setIsFolderOpen(true)}
          >
            <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-2xl border border-primary/30 bg-linear-to-b from-primary/25 via-card to-background pb-7 shadow-[inset_0_2px_12px_rgba(255,255,255,0.05),0_-18px_50px_rgba(0,0,0,0.55)]">
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent" />
              <div className="max-w-[85%] truncate rounded-lg border border-primary/20 bg-background/85 px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-foreground/90 shadow-inner backdrop-blur-md sm:text-xs">
                {folderName}
              </div>
            </div>
          </motion.button>
        </div>

        <motion.div
          animate={{ opacity: isFolderOpen ? 1 : 0, y: isFolderOpen ? 0 : 28 }}
          className="pointer-events-none absolute bottom-0 rounded-full border border-primary/15 bg-card/70 px-5 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-md sm:text-xs"
        >
          {dragHintText}
        </motion.div>
      </div>
    </div>
  );
}

export { InteractiveFolderGallery as Component };
