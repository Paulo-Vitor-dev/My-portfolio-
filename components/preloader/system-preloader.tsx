"use client"

import { Canvas } from "@react-three/fiber"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import { BinaryField } from "./binary-field"

const bootLines = [
  { label: "PV.SYSTEM INIT", delay: 0.15 },
  { label: "verificando ambiente...", delay: 0.55 },
  { label: "sincronizando interface...", delay: 0.95 },
  { label: "compilando presença digital...", delay: 1.35 },
  { label: "acesso concedido.", delay: 2.25 },
]

export function SystemPreloader() {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  const duration = reduceMotion ? 850 : 3600
  const progressDuration = reduceMotion ? 500 : 2800

  useEffect(() => {
    document.body.style.overflow = "hidden"

    const startedAt = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const elapsed = now - startedAt
      const next = Math.min(100, Math.round((elapsed / progressDuration) * 100))
      setProgress(next)

      if (next < 100) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    const timer = window.setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = ""
    }, duration)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
      document.body.style.overflow = ""
    }
  }, [duration, progressDuration])


  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#050507]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
          transition={{ duration: reduceMotion ? 0.18 : 0.65, ease: [0.76, 0, 0.24, 1] }}
          aria-label="Inicializando portfólio"
          role="status"
        >
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(124,58,237,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,.08)_1px,transparent_1px)] [background-size:48px_48px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(124,58,237,.14),transparent_42%)]" />

          {!reduceMotion && (
            <div className="absolute inset-0 opacity-70">
              <Canvas
                camera={{ position: [0, 0, 7], fov: 48 }}
                dpr={[1, 1.25]}
                gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
              >
                <fog attach="fog" args={["#050507", 5.5, 14]} />
                <BinaryField />
              </Canvas>
            </div>
          )}

          <motion.div
            className="absolute left-0 top-0 h-px w-full bg-purple-300/70 shadow-[0_0_22px_rgba(167,139,250,.75)]"
            animate={reduceMotion ? undefined : { y: [0, 760, 0] }}
            transition={{ duration: 2.4, ease: "linear", repeat: Infinity }}
            aria-hidden
          />

          <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-14">
            <div className="w-full max-w-3xl">
              <div className="mb-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-white/35 sm:text-xs">
                <span>PV / SYSTEM</span>
                <span>SESSION_01</span>
              </div>

              <div className="space-y-3 font-mono text-sm sm:text-base">
                {bootLines.map((line, index) => (
                  <motion.div
                    key={line.label}
                    initial={{ opacity: 0, x: -12, filter: "blur(5px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{
                      delay: reduceMotion ? index * 0.06 : line.delay,
                      duration: reduceMotion ? 0.12 : 0.3,
                    }}
                    className={index === 0 ? "text-purple-200" : index === bootLines.length - 1 ? "text-white" : "text-white/55"}
                  >
                    <span className="mr-3 text-purple-400">&gt;</span>
                    {line.label}
                    {index === bootLines.length - 1 && (
                      <motion.span
                        className="ml-2 inline-block h-[1em] w-[7px] translate-y-[2px] bg-purple-300"
                        animate={reduceMotion ? undefined : { opacity: [1, 0, 1] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 flex items-end gap-5">
                <div className="h-px flex-1 overflow-hidden bg-white/10">
                  <motion.div
                    className="h-full origin-left bg-gradient-to-r from-purple-700 via-purple-400 to-white"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: progress / 100 }}
                    transition={{ duration: 0.08, ease: "linear" }}
                  />
                </div>
                <span className="min-w-12 text-right font-mono text-xs tabular-nums text-white/45">
                  {String(progress).padStart(3, "0")}%
                </span>
              </div>

              <motion.div
                className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-purple-300/35"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduceMotion ? 0.2 : 1.6 }}
              >
                binary stream / interface handshake / pv.system
              </motion.div>
            </div>
          </div>

        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
