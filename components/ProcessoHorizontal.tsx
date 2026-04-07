"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useMeasure } from "@uidotdev/usehooks"

const PROCESS_PHASES = [
  {
    id: "process-1",
    number: "01",
    title: "Imersão &\nConvivência",
    subtitle: "A base de tudo é o vivido.",
    description: "Nosso processo nasce da convivência. Observamos como você se comunica e se posiciona para criar algo autêntico.",
    accent: "#CA8A04",
  },
  {
    id: "process-2",
    number: "02",
    title: "Conteúdo &\nAutoridade",
    subtitle: "Transformando o comum em extraordinário.",
    description: "É da vivência que surgem roteiros e decisões. Captamos detalhes que passam despercebidos para transformar o vivido em autoridade real.",
    accent: "#CA8A04",
  },
  {
    id: "process-3",
    number: "03",
    title: "Suporte &\nEstratégia",
    subtitle: "Próximo, humanizado e intencional.",
    description: "Criamos conteúdo, orientamos gravações, ajustamos estratégias e auxiliamos na gestão do seu posicionamento.",
    accent: "#CA8A04",
  },
  {
    id: "process-4",
    number: "04",
    title: "Distribuição\nde Impacto",
    subtitle: "Escala com intenção.",
    description: "Utilizamos tráfego pago de forma integrada, sempre alinhado ao seu posicionamento e objetivos reais.",
    accent: "#CA8A04",
  },
]

function ProcessoScrollInternal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [trackRef, { width: trackWidth }] = useMeasure()
  const [vw, setVw] = useState(0)

  useEffect(() => {
    setVw(window.innerWidth)
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 26, restDelta: 0.001 })

  const totalScroll = (trackWidth || 0) - vw
  const x = useTransform(smooth, [0.06, 0.94], [0, -Math.max(0, totalScroll)])

  // Título
  const titleOp = useTransform(smooth, [0, 0.06, 0.22], [1, 1, 0])
  const titleY = useTransform(smooth, [0, 0.22], [0, -40])

  // Fundo paralaxe
  const ghostX = useTransform(smooth, [0, 1], [0, -300])
  const ghostOp = useTransform(smooth, [0, 0.15, 0.85, 1], [0.025, 0.02, 0.01, 0])

  return (
    <div ref={containerRef} className="relative w-full h-[500vh]" style={{ background: "linear-gradient(180deg, #FAFAF9 0%, #F5F0EB 100%)" }}>

      {/* Textura de luxo */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(ellipse at 15% 50%, rgba(67,24,70,0.04) 0%, transparent 55%), radial-gradient(ellipse at 85% 30%, rgba(202,138,4,0.025) 0%, transparent 50%)"
      }} />

      {/* Ghost typography */}
      <motion.div style={{ x: ghostX, opacity: ghostOp }} className="absolute top-[28vh] left-0 z-0 select-none pointer-events-none whitespace-nowrap">
        <span className="text-[20vw] font-serif italic text-[#312338] leading-none tracking-[-0.06em]">
          Processo • Intencionalidade
        </span>
      </motion.div>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative h-full w-full flex flex-col">

          {/* ═══ HEADER ZONE ═══ */}
          <motion.header
            style={{ opacity: titleOp, y: titleY }}
            className="relative z-20 pt-[max(5rem,10vh)] pb-8 px-[8vw] md:px-[10vw]"
          >
            <div className="flex items-end gap-8">
              {/* Linha decorativa vertical fina */}
              <div className="hidden md:block w-[1px] h-16 bg-gradient-to-b from-[#CA8A04]/60 to-transparent" />
              <div>
                <p className="text-[0.55rem] font-bold font-sans tracking-[0.7em] text-[#CA8A04] uppercase mb-4">
                  Metodologia
                </p>
                <h2 style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
                    className="font-serif italic text-[#312338] leading-[0.95] tracking-[-0.02em]">
                  Nosso Processo
                </h2>
              </div>
            </div>
          </motion.header>

          {/* ═══ CARDS ZONE ═══ */}
          <div className="flex-1 flex items-center w-full min-h-0">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex flex-nowrap items-stretch gap-[6vw] md:gap-[4vw] pl-[8vw] md:pl-[10vw] pr-[20vw]"
            >
              {PROCESS_PHASES.map((phase, idx) => (
                <LuxuryCard key={phase.id} phase={phase} index={idx} total={PROCESS_PHASES.length} />
              ))}

              {/* CTA Final */}
              <div className="min-w-[42vw] md:min-w-[30vw] flex flex-col justify-center px-[4vw]">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.2 }}>
                  <div className="w-12 h-[1px] bg-[#CA8A04]/40 mb-8" />
                  <h3 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                      className="font-serif italic text-[#312338] leading-[1.1] mb-5">
                    Pronto para{" "}
                    <span className="text-[#CA8A04]">transcender?</span>
                  </h3>
                  <p className="text-[#312338]/55 font-sans font-light text-base max-w-xs leading-relaxed">
                    Sua autoridade merece um palco à altura.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* ═══ PROGRESS BAR ═══ */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
            <div className="w-20 md:w-28 h-[1.5px] bg-[#312338]/8 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#CA8A04] rounded-full origin-left"
                style={{ scaleX: useTransform(smooth, [0.06, 0.94], [0, 1]) }}
              />
            </div>
            <span className="text-[0.55rem] font-bold tracking-[0.25em] text-[#312338]/45 uppercase font-sans">
              Jornada
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProcessoHorizontal() {
  const [ready, setReady] = useState(false)
  useEffect(() => { setReady(true) }, [])

  if (!ready) return (
    <div className="w-full h-screen flex items-center justify-center" style={{ background: "#FAFAF9" }}>
      <p className="text-[0.55rem] font-bold tracking-[0.7em] text-[#CA8A04] uppercase font-sans">Metodologia</p>
    </div>
  )

  return <ProcessoScrollInternal />
}

// ═══════════════════════════════════════════════════════
// LUXURY CARD — Design Premium Editorial
// ═══════════════════════════════════════════════════════
function LuxuryCard({ phase, index, total }: { phase: typeof PROCESS_PHASES[0]; index: number; total: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50, rotateY: -3 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative perspective-1000
                 min-w-[80vw] md:min-w-[48vw] lg:min-w-[40vw]
                 h-[52vh] md:h-[56vh]
                 rounded-[1.5rem] md:rounded-[2rem]
                 overflow-hidden cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* ══ BACKGROUND LAYERS ══ */}
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2A1B30] via-[#312338] to-[#3D1F42]" />

      {/* Subtle inner glow: top-left warm light */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />

      {/* Bottom-right accent glow */}
      <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-gradient-to-tl from-[#431846]/30 to-transparent opacity-60" />

      {/* Hover shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.2s] ease-out" />

      {/* ══ CONTENT GRID ══ */}
      <div className="relative z-10 h-full grid grid-rows-[auto_1fr_auto] p-8 md:p-10 lg:p-12">

        {/* ROW 1: Número + Subtítulo */}
        <div className="flex items-start justify-between mb-6">
          <span className="text-[3.5rem] md:text-[4.5rem] font-serif italic text-white/[0.07] leading-none tracking-tight select-none">
            {phase.number}
          </span>
          <span className="text-[0.55rem] md:text-[0.6rem] font-bold font-sans tracking-[0.4em] uppercase text-[#CA8A04]/90 mt-3 text-right max-w-[50%] leading-relaxed">
            {phase.subtitle}
          </span>
        </div>

        {/* ROW 2: Título Principal */}
        <div className="flex items-center">
          <h3 className="text-[clamp(2rem,4.5vw,3.2rem)] font-serif italic font-normal leading-[1.08] text-[#F0ECE6] tracking-[-0.01em] whitespace-pre-line">
            {phase.title}
          </h3>
        </div>

        {/* ROW 3: Descrição + Divider */}
        <div>
          {/* Thin gold line */}
          <div className="w-10 h-[1px] bg-[#CA8A04]/30 mb-5 transition-all duration-700 group-hover:w-20 group-hover:bg-[#CA8A04]/60" />
          <p className="text-[#F0ECE6]/55 font-sans font-light text-[0.82rem] md:text-[0.88rem] leading-[1.7] max-w-[38ch]">
            {phase.description}
          </p>

          {/* Step indicator */}
          <div className="mt-5 flex items-center gap-2">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className="h-[2px] rounded-full transition-all duration-500"
                style={{
                  width: i === index ? 20 : 6,
                  backgroundColor: i === index ? "#CA8A04" : "rgba(240,236,230,0.1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ══ BORDER: Subtle inner stroke ══ */}
      <div className="absolute inset-0 rounded-[inherit] border border-white/[0.06] pointer-events-none" />

      {/* ══ HOVER: Gold accent glow ══ */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#CA8A04]/8 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.article>
  )
}
