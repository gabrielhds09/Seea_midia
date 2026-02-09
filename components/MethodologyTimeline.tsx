'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, Clapperboard, Rocket, TrendingUp } from 'lucide-react'

const PROCESS_STEPS = [
    {
        title: "Imersão & Convivência",
        description: "Não usamos templates. Nosso processo nasce de estar perto. Observamos como você se comunica, como vende e como se posiciona para extrair sua essência real.",
        icon: Search,
        align: "left"
    },
    {
        title: "Produção & Acompanhamento",
        description: "Transformamos a rotina em conteúdo. Orientamos gravações, ajustamos a postura e garantimos que cada material comunique autoridade e intencionalidade.",
        icon: Clapperboard,
        align: "right"
    },
    {
        title: "Distribuição Estratégica",
        description: "Conteúdo sem alcance é apenas arquivo. Definimos para quem falar e usamos tráfego pago inteligente para garantir que sua mensagem chegue às pessoas certas.",
        icon: Rocket,
        align: "left"
    },
    {
        title: "Análise & Otimização",
        description: "O jogo é de longo prazo. Analisamos métricas, ajustamos rotas e otimizamos constantemente para que sua autoridade cresça mês a mês.",
        icon: TrendingUp,
        align: "right"
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
        <section ref={containerRef} className="relative w-full py-20 md:py-48 px-6 overflow-hidden">

            {/* Background Glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#431846]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#ed1c24]/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-32"
                >
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
                        Nosso <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed1c24] to-[#431846]">Processo</span>
                    </h2>
                    <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
                        Da convivência à escala. Uma metodologia proprietária focada em construir autoridade real.
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative">

                    {/* Central Line Background */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2" />

                    {/* Active Beam Line */}
                    <motion.div
                        style={{ height: height }}
                        className="absolute left-[20px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#ed1c24] via-[#431846] to-[#ed1c24] md:-translate-x-1/2 shadow-[0_0_15px_rgba(237,28,36,0.5)] z-20 origin-top"
                    />

                    <div className="space-y-16 md:space-y-32 pb-20">
                        {PROCESS_STEPS.map((step, index) => (
                            <TimelineItem key={index} step={step} index={index} />
                        ))}
                    </div>

                    {/* End Dot */}
                    <div className="absolute bottom-0 left-[20px] md:left-1/2 w-3 h-3 rounded-full bg-[#ed1c24] md:-translate-x-1/2 shadow-[0_0_20px_#ed1c24]" />
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
            <div className="absolute left-[11px] md:left-1/2 top-0 md:top-8 w-5 h-5 rounded-full border-4 border-[#1a0d20] bg-white z-30 md:-translate-x-1/2 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                <div className="absolute inset-0 rounded-full bg-[#ed1c24] opacity-50 animate-ping" />
            </div>

            {/* Content Card */}
            <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-24 md:text-right' : 'md:pl-24 md:text-left'}`}>

                <div className={`relative group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#ed1c24]/30 transition-all duration-500 hover:-translate-y-2`}>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ed1c24]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                    <div className={`relative z-10 flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-[#ed1c24] group-hover:bg-[#ed1c24] group-hover:text-white transition-all duration-500">
                            <step.icon size={28} />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wide">
                            {step.title}
                        </h3>

                        <p className="text-white/60 leading-relaxed">
                            {step.description}
                        </p>
                    </div>

                </div>

            </div>

            {/* Empty space for the other side */}
            <div className="hidden md:block w-1/2" />

        </motion.div>
    )
}
