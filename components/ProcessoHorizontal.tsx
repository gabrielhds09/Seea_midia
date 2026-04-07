"use client"

import React from "react"
import { ContainerScroll, ContainerSticky, ProcessTrack, ProcessCard, ProcessCardBody, ProcessCardTitle, useContainerScrollContext } from "@/components/ui/process-timeline"
import { BrandAccent } from "./ContentSections"
import { motion, useTransform } from "framer-motion"

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

// Subcomponente para consumir o contexto de scroll e evitar erros de ref/hidratação
const HorizontalScrollContent = () => {
  const { scrollYProgress } = useContainerScrollContext()
  
  // Efeitos de paralaxe e opacidade sincronizados
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.4])
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -40])
  const progressScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])

  return (
    <ContainerSticky className="flex flex-col justify-center overflow-hidden">
        {/* Título de Background que fica fixo inicialmente */}
        <motion.div 
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute top-[18%] left-[6vw] md:left-[15vw] z-0 pointer-events-none"
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
              className="min-w-[85vw] md:min-w-[48vw] xl:min-w-[40vw] h-fit md:h-[65vh] flex flex-col items-stretch shadow-[0_60px_120px_-30px_rgba(49,35,56,0.25)] border-white/5"
            >
              <ProcessCardTitle className="border-b md:border-b-0 md:border-r border-white/10 flex items-center justify-center py-6 md:px-10">
                <div className="rounded-full size-14 md:size-24 bg-white/10 text-white font-serif italic text-2xl md:text-5xl flex justify-center items-center backdrop-blur-md">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </ProcessCardTitle>
              <ProcessCardBody className="flex flex-col gap-6 md:gap-10 flex-1 justify-center py-10 px-8 md:px-14">
                <div>
                  <span className="text-[0.65rem] md:text-[0.75rem] font-bold tracking-[0.4em] uppercase text-[var(--color-category)] opacity-80 mb-3 block">
                    {phase.subtitle}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-bold leading-[1.1] text-white mb-6">
                    {phase.title}
                  </h3>
                  <p className="text-white/70 font-light leading-relaxed text-base md:text-[1.1rem] max-w-[40ch]">
                    {phase.description}
                  </p>
                </div>
              </ProcessCardBody>
            </ProcessCard>
          ))}
        </ProcessTrack>

        {/* Indicador de Progresso Lateral (Sutil) */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-[1.5px] bg-stone-300/30 overflow-hidden">
          <motion.div 
            style={{ scaleX: progressScale, originX: 0 }}
            className="w-full h-full bg-[var(--color-category)] shadow-[0_0_10px_rgba(var(--color-category-rgb),0.5)]"
          />
        </div>
    </ContainerSticky>
  )
}

export default function ProcessoHorizontal() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  return (
    <ContainerScroll
      ref={containerRef}
      className="w-full h-[600vh] bg-[var(--color-marble-white)]"
    >
      <HorizontalScrollContent />

      {/* Footer da Seção para suavizar a saída */}
      <div className="absolute bottom-12 right-12 opacity-30 pointer-events-none">
        <BrandAccent className="scale-75" />
      </div>
    </ContainerScroll>
  )
}
