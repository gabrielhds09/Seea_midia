'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, Clapperboard, Rocket, TrendingUp } from 'lucide-react'

const PROCESS_STEPS = [
    {
        title: "Imersão & Convivência",
        description: "Não usamos templates. Nosso processo nasce de estar perto. Observamos como você se comunica, como vende e como se posiciona para extrair sua essência real.",
        icon: Search,
        align: "left",
        tags: ["GESTÃO DE CARREIRA", "BRANDING PESSOAL", "CONTEÚDO ESTRATÉGICO"],
    },
    {
        title: "Produção & Acompanhamento",
        description: "Transformamos a rotina em conteúdo. Orientamos gravações, ajustamos a postura e garantimos que cada material comunique autoridade e intencionalidade.",
        icon: Clapperboard,
        align: "right",
        tags: ["DIREÇÃO DE ARTE", "ROTEIRO AUTORAL", "CAPTAÇÃO PROFISSIONAL"],
    },
    {
        title: "Distribuição Estratégica",
        description: "Conteúdo sem alcance é apenas arquivo. Definimos para quem falar e usamos tráfego pago inteligente para garantir que sua mensagem chegue às pessoas certas.",
        icon: Rocket,
        align: "right",
        tags: ["TRÁFEGO PAGO", "SEGMENTAÇÃO", "ALCANCE QUALIFICADO"],
    },
    {
        title: "Análise & Otimização",
        description: "O jogo é de longo prazo. Analisamos métricas, ajustamos rotas e otimizamos constantemente para que sua autoridade cresça mês a mês.",
        icon: TrendingUp,
        align: "right",
        tags: ["MÉTRICAS", "PERFORMANCE", "CRESCIMENTO CONTÍNUO"],
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
        <section ref={containerRef} className="relative w-full py-20 md:py-48 px-6 overflow-hidden bg-[#faf9f7]">

            {/* Background Glows (Subtle for Light Mode) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#431846]/[0.03] rounded-full blur-[140px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#ed1c24]/[0.02] rounded-full blur-[140px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-32"
                >
                    {/* Standardized Label */}
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.5em] text-[#431846]/35 mb-8">
                        Metodologia
                    </p>

                    <h2
                        className="font-extralight tracking-tight text-[#111111] mb-6 uppercase"
                        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95 }}
                    >
                        <span className="font-sans">NOSSO </span>
                        <span className="font-serif italic font-normal serif-luxury text-[#431846]/70 lowercase" style={{ fontSize: '1.08em', margin: '0 0.1em' }}>processo,</span>
                        <span className="font-sans"> NA PRÁTICA.</span>
                    </h2>
                    <p className="text-[0.95rem] font-light leading-[1.8] text-black/60 max-w-2xl mx-auto tracking-tight">
                        Da convivência à escala. Uma metodologia proprietária focada em construir autoridade real.
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative">

                    {/* Central Line Background */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1.5px] bg-[#431846]/[0.05] md:-translate-x-1/2" />

                    {/* Active Beam Line */}
                    <motion.div
                        style={{ height: height }}
                        className="absolute left-[20px] md:left-1/2 top-0 w-[1.5px] bg-gradient-to-b from-[#ed1c24] via-[#431846] to-[#ed1c24] md:-translate-x-1/2 z-20 origin-top"
                    />

                    <div className="space-y-16 md:space-y-32 pb-20">
                        {PROCESS_STEPS.map((step, index) => (
                            <TimelineItem key={index} step={step} index={index} />
                        ))}
                    </div>

                    {/* End Dot */}
                    <div className="absolute bottom-0 left-[20px] md:left-1/2 w-3 h-3 rounded-full bg-[#431846]/20 md:-translate-x-1/2" />
                </div>

            </div>
        </section>
    )
}

function TimelineItem({ step, index }: { step: typeof PROCESS_STEPS[0], index: number }) {
    const isEven = index % 2 === 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >

            {/* Center Node */}
            <div className="absolute left-[11px] md:left-1/2 top-0 md:top-8 w-4.5 h-4.5 rounded-full border-[3px] border-[#faf9f7] bg-[#431846] z-30 md:-translate-x-1/2 shadow-[0_4px_10px_rgba(67,24,70,0.15)]">
                <div className="absolute inset-0 rounded-full bg-[#ed1c24] opacity-30 animate-pulse" />
            </div>

            {/* Content Card */}
            <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-24 md:text-right' : 'md:pl-24 md:text-left'}`}>

                <div className={`relative group p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-[#431846]/[0.06] hover:border-[#431846]/20 transition-all duration-500 hover:-translate-y-2 shadow-[0_10px_30px_rgba(67,24,70,0.02)]`}>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#431846]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                    <div className={`relative z-10 flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                        <div className="w-14 h-14 rounded-2xl bg-[#431846]/[0.04] flex items-center justify-center mb-6 text-[#431846] group-hover:bg-[#431846] group-hover:text-white transition-all duration-500">
                            <step.icon size={28} />
                        </div>

                        <h3 className="text-2xl font-bold text-[#111111] mb-4 uppercase tracking-wide">
                            {step.title}
                        </h3>

                        <p className="text-black/50 leading-relaxed mb-6">
                            {step.description}
                        </p>

                        {/* Pill Tags */}
                        <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                            {step.tags.map((tag, ti) => (
                                <motion.span
                                    key={ti}
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 + ti * 0.08 }}
                                    className="inline-block px-4 py-[6px] rounded-full text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#431846] border border-[#431846]/20 bg-[#431846]/5 hover:border-[#ed1c24]/40 hover:text-white hover:bg-[#ed1c24]/20 transition-all duration-400 cursor-default"
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

            {/* Empty space for the other side */}
            <div className="hidden md:block w-1/2" />

        </motion.div>
    )
}
