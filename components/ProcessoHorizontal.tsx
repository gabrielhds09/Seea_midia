"use client"

import React from "react"
import { ContainerScroll, ContainerSticky, ProcessCard, ProcessCardBody, ProcessCardTitle } from "@/components/ui/process-timeline"
import { BrandAccent } from "./ContentSections"

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
    return (
        <ContainerScroll
            className="w-full h-[350vh] md:h-[400vh] bg-[var(--color-marble-white)] pt-24 md:pt-48"
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-28 mb-16 md:mb-32">
                <div className="flex flex-col gap-4">
                    <p className="text-[0.62rem] font-bold font-sans uppercase tracking-[0.55em] text-[var(--color-category)] mb-4">
                        Metodologia
                    </p>
                    <BrandAccent className="mb-8" />
                    <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-light font-sans tracking-tight text-[#312338] leading-[0.95] uppercase">
                        Nosso <span className="serif-luxury italic font-normal text-[var(--color-category)]">Processo</span><br />
                        Na Prática.
                    </h2>
                    <p className="max-w-[45ch] text-stone-500/80 font-light mt-6 text-sm md:text-base leading-relaxed">
                        Uma jornada linear focada em construir autoridade real, onde cada detalhe é esculpido com precisão cinematográfica e estratégia de alto nível.
                    </p>
                </div>
            </div>

            <ContainerSticky className="top-32 md:top-40 flex flex-nowrap gap-6 md:gap-12 px-6 md:px-28">
                {PROCESS_PHASES.map((phase, index) => (
                    <ProcessCard
                        key={phase.id}
                        itemsLength={PROCESS_PHASES.length}
                        index={index}
                        variant="heritage"
                        className="min-w-[85%] md:min-w-[40%] xl:min-w-[35%] h-fit shadow-[0_40px_80px_-20px_rgba(49,35,56,0.15)]"
                    >
                        <ProcessCardTitle className="border-r border-white/10 flex items-center justify-center min-w-[70px]">
                            <div className="rounded-full size-12 bg-white/10 text-white font-serif italic text-xl flex justify-center items-center backdrop-blur-md">
                                {String(index + 1).padStart(2, "0")}
                            </div>
                        </ProcessCardTitle>
                        <ProcessCardBody className="flex flex-col gap-6 md:gap-8 flex-1">
                            <div>
                                <span className="text-[0.6rem] font-bold tracking-[0.3em] uppercase text-[var(--color-category)] opacity-60 mb-2 block">
                                    {phase.subtitle}
                                </span>
                                <h3 className="text-2xl md:text-4xl font-bold leading-tight text-white mb-4">
                                    {phase.title}
                                </h3>
                                <p className="text-white/60 font-light leading-relaxed text-sm md:text-base">
                                    {phase.description}
                                </p>
                            </div>
                        </ProcessCardBody>
                    </ProcessCard>
                ))}
            </ContainerSticky>
        </ContainerScroll>
    )
}
