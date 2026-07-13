'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionHeading, Reveal } from '@/components/reveal'

const PYODIDE_VERSION = 'v0.26.2'
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<any>
    __snakeState?: {
      mx: number
      my: number
      w: number
      h: number
    }
  }
}

type Status = 'idle' | 'loading' | 'ready' | 'error'

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve()
    s.onerror = () => reject(new Error(`Falha ao carregar ${src}`))
    document.head.appendChild(s)
  })
}

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [started, setStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const pyodideRef = useRef<any>(null)
  const tickRef = useRef<any>(null)
  const rafRef = useRef<number>(0)

  // load best score from session
  useEffect(() => {
    const stored = window.localStorage.getItem('snake-best')
    if (stored) setBest(Number(stored) || 0)
  }, [])

  const sizeCanvas = () => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const rect = wrap.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.floor(rect.width * dpr)
    canvas.height = Math.floor(rect.height * dpr)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    if (window.__snakeState) {
      window.__snakeState.w = rect.width
      window.__snakeState.h = rect.height
    }
  }

  const start = async () => {
    setStarted(true)
    if (status === 'ready') return
    setStatus('loading')
    try {
      window.__snakeState = {
        mx: 0,
        my: 0,
        w: 0,
        h: 0,
      }
      await loadScript(`${PYODIDE_URL}pyodide.js`)
      const pyodide = await window.loadPyodide!({ indexURL: PYODIDE_URL })
      pyodideRef.current = pyodide
      sizeCanvas()
      const wrap = wrapRef.current!
      const rect = wrap.getBoundingClientRect()
      window.__snakeState!.mx = rect.width / 2
      window.__snakeState!.my = rect.height / 2
      const code = await (await fetch('/snake_game.py')).text()
      await pyodide.runPythonAsync(code)
      pyodide.runPython('init()')
      tickRef.current = pyodide.globals.get('tick')
      setStatus('ready')

      const loop = () => {
        if (tickRef.current) {
          const s = tickRef.current()
          setScore((prev) => (prev !== s ? s : prev))
        }
        rafRef.current = requestAnimationFrame(loop)
      }
      rafRef.current = requestAnimationFrame(loop)
    } catch (e) {
      console.error('[v0] Pyodide error', e)
      setStatus('error')
    }
  }

  // update best
  useEffect(() => {
    if (score > best) {
      setBest(score)
      window.localStorage.setItem('snake-best', String(score))
    }
  }, [score, best])

  // pointer + resize
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const onMove = (clientX: number, clientY: number) => {
      const rect = wrap.getBoundingClientRect()
      if (window.__snakeState) {
        window.__snakeState.mx = clientX - rect.left
        window.__snakeState.my = clientY - rect.top
      }
    }
    const mouse = (e: MouseEvent) => onMove(e.clientX, e.clientY)
    const touch = (e: TouchEvent) => {
      if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY)
    }
    wrap.addEventListener('mousemove', mouse)
    wrap.addEventListener('touchmove', touch, { passive: true })
    const onResize = () => sizeCanvas()
    window.addEventListener('resize', onResize)
    return () => {
      wrap.removeEventListener('mousemove', mouse)
      wrap.removeEventListener('touchmove', touch)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section id="game" className="relative overflow-hidden py-28 sm:py-36">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Interaja com meu código"
          title={
            <>
              Um jogo escrito em <span className="gradient-text">Python</span>,
              rodando no navegador
            </>
          }
          description="Snake neon controlado pelo seu cursor — lógica em Python compilada via Pyodide (WebAssembly). Mova o mouse e absorva as partículas."
        />

        <Reveal>
          <div className="mx-auto max-w-3xl">
            {/* HUD */}
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex gap-3">
                <div className="glass rounded-xl px-5 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Score
                  </p>
                  <p className="font-heading text-2xl font-bold text-accent tabular-nums">
                    {score}
                  </p>
                </div>
                <div className="glass rounded-xl px-5 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Melhor
                  </p>
                  <p className="font-heading text-2xl font-bold text-foreground tabular-nums">
                    {best}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Python · Pyodide
              </div>
            </div>

            {/* Canvas */}
            <div
              ref={wrapRef}
              className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-primary/20 bg-[var(--game-bg)] purple-glow"
            >
              <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full"
                aria-label="Mini game Snake controlado pelo mouse"
              />

              {(!started || status !== 'ready') && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-[var(--game-bg)]/80 text-center backdrop-blur-sm">
                  {status === 'loading' ? (
                    <>
                      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/30 border-t-accent" />
                      <p className="font-mono text-sm text-muted-foreground">
                        Carregando interpretador Python...
                      </p>
                    </>
                  ) : status === 'error' ? (
                    <p className="font-mono text-sm text-destructive">
                      Não foi possível carregar o Python. Tente novamente.
                    </p>
                  ) : (
                    <>
                      <p className="max-w-xs text-pretty text-muted-foreground">
                        Pressione iniciar para carregar o runtime Python e jogar.
                      </p>
                      <button
                        type="button"
                        onClick={start}
                        className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 hover:purple-glow"
                      >
                        Iniciar Jogo
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            <p className="mt-3 text-center font-mono text-xs text-muted-foreground">
              {'// '}a cobrinha segue o cursor — colete as partículas para crescer
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
