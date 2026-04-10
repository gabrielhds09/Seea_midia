"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion"
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack"
import { Search, Clapperboard, Rocket, TrendingUp } from "lucide-react"

const PROCESS_PHASES = [
  {
    id: "process-1",
    number: "01",
    title: "Imersão &\nConvivência",
    description: "Nosso processo nasce da convivência real. Observamos como você se comunica, vende e se posiciona para criar algo autêntico. Nossa principal fonte não é o Google, é o próprio cliente.",
    icon: Search
  },
  {
    id: "process-2",
    number: "02",
    title: "Conteúdo &\nAutoridade",
    description: "É da vivência que surgem roteiros e decisões estratégicas. Captamos os detalhes que passam despercebidos para transformar o vivido em autoridade inquestionável.",
    icon: Clapperboard
  },
  {
    id: "process-3",
    number: "03",
    title: "Acompanhamento &\nSuporte",
    description: "Atendimento próximo e humanizado. Criamos conteúdo, orientamos suas gravações e ajustamos estratégias em tempo real para manter seu posicionamento impecável.",
    icon: Rocket
  },
  {
    id: "process-4",
    number: "04",
    title: "Distribuição\nEstratégica",
    description: "Criação e distribuição caminham juntas. Utilizamos tráfego pago de forma integrada, sempre alinhado ao seu propósito e aos seus objetivos de escala real.",
    icon: TrendingUp
  },
]

export default function ProcessoHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 35,
    restDelta: 0.001
  })

  useEffect(() => { 
    setIsReady(true) 
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[var(--color-marble-white)] px-6 lg:px-24 pt-16 md:pt-24 pb-[30vh] md:pb-12 z-0">
      
      {/* SEEA Atmospheric Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-[var(--color-heritage-purple)]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-[var(--color-gold-precision)]/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-0 lg:gap-24 relative z-10">
        
        {/* Left Content - STICKY ANCHOR ON MOBILE */}
        <div className="lg:w-[40%] sticky top-0 lg:top-32 lg:h-fit self-start z-50 bg-[var(--color-marble-white)]/90 backdrop-blur-md lg:bg-transparent pb-6 lg:pb-0">
           <div className="flex items-center gap-4 mb-4 lg:mb-6">
              <span className="text-[0.55rem] lg:text-[0.62rem] font-bold font-sans uppercase tracking-[0.55em] text-[var(--color-category)]">
                Metodologia Proprietária
              </span>
              <div className="w-8 h-[1px] bg-[var(--color-category)]/20" />
           </div>
           
           <h2 className="text-3xl md:text-6xl font-sans font-extralight text-[var(--color-stone-black)] leading-[1.1] tracking-tighter mb-4 lg:mb-10">
             NOSSO <span className="font-serif italic text-[var(--color-heritage-purple)]">processo</span> <br className="hidden lg:block" />
             <span className="uppercase font-bold tracking-tight">na prática.</span>
           </h2>
           
           <p className="hidden lg:block text-[var(--color-stone-black)]/60 font-sans font-light text-xl leading-[1.7] max-w-sm mb-12">
             Da convivência à escala. Uma jornada esculpida com precisão onde cada detalhe é transformado em autoridade real.
           </p>
        </div>

        <div className="lg:w-[60%] perspective-1000">
           {isReady && (
             <ContainerScroll className="min-h-[160vh] lg:min-h-[220vh] space-y-0 relative z-10"> {/* 160vh: Faster track to prevent trailing whitespace */}
               {PROCESS_PHASES.map((phase, index) => (
                 <ProcessPhaseCard 
                    key={phase.id} 
                    phase={phase} 
                    index={index} 
                    isMobile={isMobile} 
                    scrollYProgress={scrollYProgress} 
                 />
               ))}
             </ContainerScroll>
           )}
        </div>
      </div>
    </div>
  )
}

function ProcessPhaseCard({ phase, index, isMobile, scrollYProgress }: { 
  phase: typeof PROCESS_PHASES[0], 
  index: number, 
  isMobile: boolean,
  scrollYProgress: MotionValue<number>
}) {
  // Dynamic transforms: Tightened for faster response on mobile
  const entryStart = isMobile 
    ? (index === 0 ? 0 : index * 0.1) 
    : index * 0.15;
  const entryEnd = entryStart + (isMobile ? 0.25 : 0.3);
  
  // Transition logic: Reducing initial Y offset to avoid whitespace gaps
  const initialY = isMobile ? 200 : 400;
  const cardY = useTransform(scrollYProgress, [entryStart, entryEnd], [initialY, 0]);
  const cardScale = useTransform(scrollYProgress, [entryStart, entryEnd], [0.88, 1]);
  const cardOpacity = useTransform(scrollYProgress, [entryStart, entryStart + (isMobile ? 0.05 : 0.1)], [0, 1]);
  
  // Exit logic for section end: Triggering EVEN EARLIER to prevent absolute overlap
  const exitOpacity = useTransform(scrollYProgress, [0.7, 0.85], [1, 0]);
  const exitScale = useTransform(scrollYProgress, [0.7, 0.85], [1, 0.8]);

  return (
    <CardSticky
      index={index}
      incrementY={isMobile ? 12 : 32} // Tighter on mobile
      incrementZ={10}
      style={{ 
        top: (index * (isMobile ? 12 : 32)) + (isMobile ? 160 : 32), // More space for sticky header
        zIndex: 10 + index,
        y: cardY,
        scale: cardScale,
        opacity: isMobile ? exitOpacity : cardOpacity, // On mobile, we fade out at the end
      }}
      className="w-full rounded-[2.5rem] border border-[var(--color-heritage-purple)]/10 bg-white shadow-[0_32px_120px_-30px_rgba(67,24,70,0.15)] p-8 md:p-14 overflow-hidden relative min-h-[360px] md:min-h-[460px] flex flex-col justify-center"
    >
       {/* JOINING DECK EDGES: Higher contrast tiered markers */}
       <div className="absolute inset-x-0 top-0 h-[3px] bg-white z-20 pointer-events-none" />
       <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--color-gold-precision)]/50 to-transparent z-30" />
       
       {/* Shadow valley for layer definition */}
       <div className="absolute inset-x-0 top-0 h-[2px] bg-black/5 blur-[1px] z-10" />
       
       {/* Phase Header */}
       <div className="flex justify-between items-start mb-12 relative z-10">
          <div className="flex flex-col gap-2">
             <span className="text-[0.55rem] font-bold font-sans uppercase tracking-[0.4em] text-[var(--color-category)]/50">
               Fase {phase.number}
             </span>
             <h3 className="text-3xl md:text-4xl font-sans font-light text-[var(--color-stone-black)] tracking-tighter leading-tight whitespace-pre-line">
               {phase.title.split('\n').map((line: string, lid: number) => (
                 <span key={lid} className={lid === 1 ? "font-serif italic font-normal text-[var(--color-category)]" : ""}>
                   {line}{lid === 0 ? " " : ""}
                 </span>
               ))}
             </h3>
          </div>
          <span className="text-4xl md:text-5xl font-serif italic text-[var(--color-gold-precision)] opacity-80 select-none">
            {phase.number}
          </span>
       </div>

       {/* Description & Icon */}
       <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[var(--color-heritage-purple)]/5 flex items-center justify-center text-[var(--color-heritage-purple)] shrink-0 border border-[var(--color-heritage-purple)]/10 shadow-sm">
             <phase.icon size={26} strokeWidth={1.2} />
          </div>
          <p className="text-[var(--color-stone-black)]/70 font-sans font-light text-base md:text-lg leading-[1.8] max-w-sm">
            {phase.description}
          </p>
       </div>

       {/* Liquid Aesthetic Polish */}
       <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
    </CardSticky>
  )
}
