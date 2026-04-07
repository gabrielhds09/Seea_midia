"use client"

import React from "react"
import { ContainerScroll, ContainerSticky, ProcessTrack, ProcessCard, ProcessCardBody, ProcessCardTitle } from "@/components/ui/process-timeline"
import { BrandAccent } from "./ContentSections"
import { motion, useScroll, useTransform } from "framer-motion"

const PROCESS_PHASES = [
  {
    id: "process-1",
    title: "Imersão & Convivência",
    subtitle: "A base de tudo é o vivido.",
    description: "Nosso processo nasce da convivência. Observamos como você se comunica, vende e se posiciona para criar algo autêntico. Nossa principal fonte não é o Google, é o próprio cliente.",
  },
  {
    id: "process-2",
    title: "Conteúdo & Autoridade",
    subtitle: "Transformando o comum em extraordinário.",
    description: "É da vivência que surgem roteiros e decisões. Captamos detalhes que passam despercebidos para transformar o vivido em autoridade real.",
  },
  {
    id: "process-3",
    title: "Suporte & Estratégia",
    subtitle: "Próximo, humanizado e intencional.",
    description: "Atendimento próximo e humanizado. Criamos conteúdo, orientamos gravações, ajustamos estratégias e auxiliamos até na gestão do seu posicionamento.",
  },
  {
    id: "process-4",
    title: "Distribuição de Impacto",
    subtitle: "Escala com intenção.",
    description: "Criação e distribuição caminhham juntas. Utilizamos tráfego pago de forma integrada, sempre alinhado ao seu posicionamento e aos seus objetivos reais.",
  },
]

export default function ProcessoHorizontal() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Opacidade do título desaparecendo conforme a jornada avança
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.4])
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -20])

  return (
    <ContainerScroll
      ref={containerRef}
      className="w-full h-[600vh] bg-[var(--color-marble-white)]"
    >
      <ContainerSticky className="flex flex-col justify-center overflow-hidden">
        {/* Título de Background que fica fixo enquanto iniciamos */}
        <motion.div 
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute top-[15%] left-[6vw] md:left-[15vw] z-0 pointer-events-none"
        >
          <div className="flex flex-col gap-2">
            <p className="text-[0.62rem] font-bold font-sans uppercase tracking-[0.55em] text-[var(--color-category)] mb-2">
              Metodologia
            </p>
            <h2 className="text-[clamp(2.5rem,8vw,6.5rem)] font-light font-sans tracking-tight text-[#312338] leading-[0.95] uppercase">
                Nosso <span className="serif-luxury italic font-normal text-[var(--color-category)]">Processo</span><br />
                Na Prática.
            </h2>
          </div>
        </motion.div>

        {/* Trilho Horizontal dos Cards */}
        <ProcessTrack className="relative z-10">
          {PROCESS_PHASES.map((phase, index) => (
            <ProcessCard
              key={phase.id}
              variant="heritage"
              className="min-w-[85vw] md:min-w-[45vw] xl:min-w-[38vw] h-fit md:h-[60vh] flex flex-col items-stretch shadow-[0_50px_100px_-20px_rgba(49,35,56,0.2)]"
            >
              <ProcessCardTitle className="border-b md:border-b-0 md:border-r border-white/10 flex items-center justify-center py-6 md:px-8">
                <div className="rounded-full size-14 md:size-20 bg-white/10 text-white font-serif italic text-2xl md:text-4xl flex justify-center items-center backdrop-blur-md">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </ProcessCardTitle>
              <ProcessCardBody className="flex flex-col gap-6 md:gap-10 flex-1 justify-center py-10">
                <div>
                  <span className="text-[0.65rem] md:text-[0.75rem] font-bold tracking-[0.35em] uppercase text-[var(--color-category)] opacity-70 mb-3 block">
                    {phase.subtitle}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-6">
                    {phase.title}
                  </h3>
                  <p className="text-white/70 font-light leading-relaxed text-base md:text-lg max-w-[35ch]">
                    {phase.description}
                  </p>
                </div>
              </ProcessCardBody>
            </ProcessCard>
          ))}
        </ProcessTrack>

        {/* Indicador de Progresso Lateral (Sutil) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-stone-300 overflow-hidden">
          <motion.div 
            style={{ scaleX: scrollYProgress, originX: 0 }}
            className="w-full h-full bg-[var(--color-category)]"
          />
        </div>
      </ContainerSticky>

      {/* Footer da Seção para suavizar a saída */}
      <div className="absolute bottom-10 right-10 opacity-20 pointer-events-none">
        <BrandAccent className="scale-75" />
      </div>
    </ContainerScroll>
  )
}
