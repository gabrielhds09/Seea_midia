'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, Clapperboard, Rocket, TrendingUp } from 'lucide-react'

const PROCESS_STEPS = [
    {
        title: "Imersão & Convivência",
        description: "Nosso processo nasce da convivência. Observamos como você se comunica, vende e se posiciona para criar algo autêntico. Nossa principal fonte não é o Google, é o próprio cliente.",
        icon: Search,
        align: "left",
        tags: ["CONVIVÊNCIA", "AUTENTICIDADE", "ESTRATÉGIA"],
    },
    {
        title: "Conteúdo & Autoridade",
        description: "É da vivência que surgem roteiros e decisões. Captamos detalhes que passam despercebidos para transformar o vivido em autoridade real.",
        icon: Clapperboard,
        align: "right",
        tags: ["OLHAR TREINADO", "IDENTIDADE", "AUTORIDADE"],
    },
    {
        title: "Acompanhamento & Suporte",
        description: "Atendimento próximo e humanizado. Criamos conteúdo, orientamos gravações, ajustamos estratégias e auxiliamos até na gestão do seu direct.",
        icon: Rocket,
        align: "left",
        tags: ["SUPORTE HUMANIZADO", "GESTÃO", "PROXIMIDADE"],
    },
    {
        title: "Distribuição Estratégica",
        description: "Criação e distribuição caminham juntas. Utilizamos tráfego pago de forma integrada, sempre alinhado ao seu posicionamento e aos seus objetivos reais.",
        icon: TrendingUp,
        align: "right",
        tags: ["TRÁFEGO PAGO", "ALCANCE", "POSICIONAMENTO"],
    }
]

export default function MethodologyTimeline() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    })

    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <section ref={containerRef} className="relative w-full pb-20 md:pb-48 px-6 overflow-hidden bg-[var(--color-background)]">

            {/* Premium Dynamic Background (Apple/Awwwards inspired) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div 
                    animate={{ 
                        x: [0, 40, 0], 
                        y: [0, -30, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--color-heritage-purple)]/[0.02] rounded-full blur-[120px]" 
                />
                <motion.div 
                    animate={{ 
                        x: [0, -50, 0], 
                        y: [0, 40, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[var(--color-cta)]/[0.015] rounded-full blur-[140px]" 
                />
                
                {/* Floating Glass Orbs */}
                <motion.div 
                    style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
                    className="absolute top-[20%] right-[15%] w-64 h-64 bg-white/10 rounded-full blur-[80px] border border-white/20"
                />
                <motion.div 
                    style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
                    className="absolute bottom-[30%] left-[10%] w-96 h-96 bg-[var(--color-heritage-purple)]/5 rounded-full blur-[100px]"
                />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-24"
                >
                    {/* Standardized Label — rendered by parent ContentSections */}
                    <h2
                        className="font-extralight font-sans tracking-tight text-[var(--color-text)] mb-6 md:mb-8"
                        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
                    >
                        <span className="uppercase">Nosso </span>
                        <span className="font-serif italic font-normal text-[var(--color-category)]" style={{ fontSize: '1.02em' }}>processo</span>
                        <br className="hidden md:block" />
                        <span className="uppercase"> na prática.</span>
                    </h2>
                    <p className="text-[1rem] font-light leading-[1.8] text-black/50 max-w-2xl mx-auto tracking-tight">
                        Da convivência à escala. Uma metodologia proprietária focada em construir autoridade real, onde cada detalhe é esculpido com precisão.
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative">

                    {/* Central Line Background */}
                    <div className="absolute left-[32px] md:left-1/2 top-0 bottom-0 w-[1.5px] bg-[var(--color-category)]/[0.05] md:-translate-x-1/2" />

                    {/* Active Beam Line */}
                    <motion.div
                        style={{ height: height }}
                        className="absolute left-[32px] md:left-1/2 top-0 w-[1.5px] bg-gradient-to-b from-[var(--color-cta)] via-[var(--color-category)] to-[var(--color-cta)] md:-translate-x-1/2 z-20 origin-top"
                    />

                    <div className="space-y-10 md:space-y-32 pb-20">
                        {PROCESS_STEPS.map((step, index) => (
                            <TimelineItem key={index} step={step} index={index} />
                        ))}
                    </div>

                    {/* End Dot */}
                    <div className="absolute bottom-0 left-[32px] md:left-1/2 w-3 h-3 rounded-full bg-[var(--color-category)]/20 md:-translate-x-1/2" />
                </div>

            </div>
        </section>
    )
}

function TimelineItem({ step, index }: { step: typeof PROCESS_STEPS[0], index: number }) {
    const isEven = index % 2 === 0

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -60 : 60, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ 
                duration: 1.4, 
                ease: [0.16, 1, 0.3, 1], 
                delay: index * 0.15 
            }}
            className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >

            {/* Center Node */}
            <div className="absolute left-[32px] md:left-1/2 top-0 md:top-8 w-4.5 h-4.5 rounded-full border-[3px] border-[var(--color-background)] bg-[var(--color-category)] z-30 -translate-x-1/2 shadow-[0_4px_10px_rgba(67,24,70,0.15)]">
                <div className="absolute inset-0 rounded-full bg-[var(--color-cta)] opacity-30 animate-pulse" />
            </div>

            {/* Content Card */}
            <div className={`w-full md:w-1/2 pl-10 pr-3 md:px-0 ${isEven ? 'md:pr-32 md:text-right text-center' : 'md:pl-32 md:text-left text-center'}`}>

                <div className={`relative group p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/20 backdrop-blur-[40px] border border-white/40 hover:border-[var(--color-category)]/30 transition-all duration-700 hover:-translate-y-3 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(67,24,70,0.06)]`}>

                    {/* Highly Refined Glass Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem]" />
                    <div className="absolute inset-0 bg-gradient-to-tl from-[var(--color-cta)]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem]" />

                    <div className={`relative z-10 flex flex-col items-center ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-5 md:mb-8 text-[var(--color-category)] shadow-sm group-hover:bg-[var(--color-category)] group-hover:text-white group-hover:scale-110 transition-all duration-700">
                            <step.icon size={22} strokeWidth={1.5} className="md:hidden" />
                            <step.icon size={30} strokeWidth={1.5} className="hidden md:block" />
                        </div>

                        <h3 className="text-xl md:text-3xl font-bold font-sans text-[var(--color-text)] mb-3 md:mb-5 uppercase tracking-[0.03em] md:tracking-[0.05em]">
                            {step.title}
                        </h3>

                        <p className="text-black/50 text-[0.9rem] md:text-[1.02rem] font-light font-sans leading-relaxed mb-5 md:mb-8 max-w-md">
                            {step.description}
                        </p>

                        {/* Pill Tags */}
                        <div className={`flex flex-wrap gap-2 justify-center ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                            {step.tags.map((tag, ti) => (
                                <motion.span
                                    key={ti}
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 + ti * 0.08 }}
                                    className="inline-block px-4 py-[6px] rounded-full text-[0.65rem] font-bold font-sans uppercase tracking-[0.12em] text-[var(--color-category)] border border-[var(--color-category)]/20 bg-[var(--color-category)]/5 hover:border-[var(--color-cta)]/40 hover:text-white hover:bg-[var(--color-cta)]/20 transition-all duration-400 cursor-default"
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

            {/* Empty space for the other side on desktop */}
            <div className="hidden md:block w-1/2" />

        </motion.div>
    )
}
