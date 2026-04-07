"use client"

import React from "react"
import { ContainerScroll, ContainerSticky, ProcessCard, ProcessCardBody, ProcessCardTitle, useContainerScrollContext } from "@/components/ui/process-timeline"
import { BrandAccent } from "./ContentSections"
import { motion, useTransform } from "framer-motion"

const PROCESS_PHASES = [
  {
    id: "process-1",
    index: 0,
    title: "Imersão & Convivência",
    subtitle: "A base de tudo é o vivido.",
    description: "Nosso processo nasce da convivência. Observamos como você se comunica e se posiciona para criar algo autêntico. Nossa principal fonte não é o Google, é você.",
  },
  {
    id: "process-2",
    index: 1,
    title: "Conteúdo & Autoridade",
    subtitle: "Transformando o comum em extraordinário.",
    description: "É da vivência que surgem roteiros e decisões. Captamos detalhes que passam despercebidos para transformar o vivido em autoridade real.",
  },
  {
    id: "process-3",
    index: 2,
    title: "Suporte & Estratégia",
    subtitle: "Próximo, humanizado e intencional.",
    description: "Atendimento próximo e humanizado. Criamos conteúdo, orientamos gravações, ajustamos estratégias e auxiliamos na gestão do seu posicionamento.",
  },
  {
    id: "process-4",
    index: 3,
    title: "Distribuição de Impacto",
    subtitle: "Escala com intenção.",
    description: "Criação e distribuição caminhham juntas. Utilizamos tráfego pago de forma integrada, sempre alinhado ao seu posicionamento e objetivos reais.",
  },
]

const HorizontalScrollContent = () => {
  const { scrollYProgress } = useContainerScrollContext()
  
  // Título que desaparece conforme os cards avançam
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -30])

  return (
    <>
      <div className="absolute inset-0 bg-[var(--color-marble-white)] z-[-1]" />
      
      {/* Título Fixo no Início */}
      <motion.div 
        style={{ opacity: titleOpacity, y: titleY }}
        className="absolute top-[15%] left-[6vw] md:left-[10vw] z-0 pointer-events-none"
      >
        <div className="flex flex-col gap-2">
          <p className="text-[0.62rem] font-bold font-sans uppercase tracking-[0.6em] text-[var(--color-category)] mb-2">
            Metodologia
          </p>
          <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-light font-sans tracking-tight text-[#312338] leading-[0.95] uppercase">
              Nosso <span className="serif-luxury italic font-normal text-[var(--color-category)]">Processo</span><br />
              Na Prática.
          </h2>
        </div>
      </motion.div>

      <ContainerSticky className="flex flex-nowrap items-center px-[8vw] md:px-[15vw] gap-12">
        {PROCESS_PHASES.map((phase, index) => (
          <ProcessCard
            key={phase.id}
            index={index}
            itemsLength={PROCESS_PHASES.length}
            variant="heritage"
            className="min-w-[85vw] md:min-w-[50vw] xl:min-w-[40vw] h-fit md:h-[60vh] shadow-[0_40px_100px_-20px_rgba(49,35,56,0.2)]"
          >
            <ProcessCardTitle className="border-b md:border-b-0 md:border-r border-white/10 flex items-center justify-center py-6 md:px-10">
              <div className="rounded-full size-14 md:size-20 bg-white/10 text-white font-serif italic text-2xl md:text-4xl flex justify-center items-center backdrop-blur-md">
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
                <p className="text-white/75 font-light leading-relaxed text-base md:text-lg max-w-[40ch]">
                  {phase.description}
                </p>
              </div>
            </ProcessCardBody>
          </ProcessCard>
        ))}
      </ContainerSticky>
    </>
  )
}

export default function ProcessoHorizontal() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  return (
    <ContainerScroll
      ref={containerRef}
      className="w-full h-[400vh]"
    >
      <HorizontalScrollContent />

      {/* Marca d'água no fim */}
      <div className="absolute bottom-12 right-12 opacity-10 pointer-events-none">
        <BrandAccent />
      </div>
    </ContainerScroll>
  )
}
