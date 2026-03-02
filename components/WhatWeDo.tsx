'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Target, Clapperboard, Video, Users, TrendingUp } from 'lucide-react'
import { gsap } from 'gsap'

const SERVICES = [
    {
        icon: Target,
        number: "01",
        title: "Gestão de carreira e posicionamento",
        description: "Cuidamos da sua imagem de forma estratégica. Entendemos seus objetivos, seus valores e seus próximos passos para que o conteúdo acompanhe sua evolução profissional e pessoal.",
        tags: ["Posicionamento", "Estratégia", "Imagem"],
        color: "from-[#431846] to-[#5a1f5e]"
    },
    {
        icon: Users,
        number: "02",
        title: "Conteúdo pensado a partir da sua rotina",
        description: "Acompanhamos o cliente presencialmente e extraímos da própria rotina conteúdos que comunicam autoridade. Nosso olhar identifica detalhes, conversas e momentos que se transformam em narrativas relevantes e naturais, mesmo em dias comuns.",
        tags: ["Presença", "Autoridade", "Narrativa"],
        color: "from-[#5a1f5e] to-[#ed1c24]"
    },
    {
        icon: Clapperboard,
        number: "03",
        title: "Conteúdo estratégico e roteirizado",
        description: "Além dos registros do dia a dia, reservamos momentos específicos para gravações mais elaboradas. Vídeos roteirizados, pensados para o feed, com foco em impacto, clareza, autoridade e valor.",
        tags: ["Impacto", "Roteiro", "Valor"],
        color: "from-[#ed1c24] to-[#431846]"
    }
]

export default function WhatWeDo() {
    const containerRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const arrows = containerRef.current!.querySelectorAll('.magnetic-arrow')
            arrows.forEach(arrow => {
                arrow.addEventListener('mousemove', (e: any) => {
                    const rect = arrow.getBoundingClientRect()
                    const x = e.clientX - rect.left - rect.width / 2
                    const y = e.clientY - rect.top - rect.height / 2
                    gsap.to(arrow, {
                        x: x * 0.4,
                        y: y * 0.4,
                        duration: 0.5,
                        ease: 'power2.out'
                    })
                })
                arrow.addEventListener('mouseleave', () => {
                    gsap.to(arrow, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' })
                })
            })
        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative w-full min-h-screen py-24 md:py-40 px-6 overflow-hidden">
            {/* Background — Ethereal Midnight */}
            <div className="absolute inset-0 bg-[#0c0510]" />

            {/* Ambient Depth Glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-[800px] h-[800px] bg-[#431846]/[0.08] rounded-full blur-[140px]" />
                <div className="absolute bottom-1/4 -right-20 w-[800px] h-[800px] bg-[#ed1c24]/[0.05] rounded-full blur-[140px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-28"
                >
                    {/* Standardized Label */}
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.5em] text-white/40 mb-10">
                        Estrutura
                    </p>
                    <div className="flex flex-col items-center gap-[6px] mb-12">
                        <div className="w-16 h-[2.5px] bg-white/20" />
                        <div className="w-10 h-[2.5px] bg-white/20" />
                    </div>

                    <div className="overflow-hidden mb-6">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter text-white mb-6">
                            <span className="font-sans tracking-tight">O QUE FAZEMOS, </span><br className="md:hidden" />
                            <span className="font-serif italic font-light serif-luxury text-white/40" style={{ fontSize: '1.08em', marginLeft: '0.1em' }}>na prática</span>.
                        </h2>
                    </div>

                    <p className="text-[0.95rem] font-light leading-[1.8] text-white/60 max-w-2xl mx-auto">
                        Nosso trabalho vai além de gravar vídeos ou alimentar redes sociais. Atuamos de forma próxima, estratégica e personalizada, construindo uma presença forte e autêntica.
                    </p>
                </motion.div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 gap-8">
                    {SERVICES.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative bg-white/[0.02] backdrop-blur-[20px] border border-white/[0.05] rounded-[40px] p-10 md:p-16 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-700"
                        >
                            {/* Subtle Inner Glow */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.03] rounded-[40px] transition-opacity duration-700`} />

                            <div className="relative flex flex-col lg:flex-row gap-12 items-center lg:items-start text-center lg:text-left">
                                {/* Left: Number & Icon */}
                                <div className="flex-shrink-0 flex flex-col items-center">
                                    <div className="text-7xl font-bold tracking-tighter text-white/5 group-hover:text-white/10 transition-all duration-700">
                                        {service.number}
                                    </div>
                                    <div className={`mt-6 w-20 h-20 rounded-[28px] bg-white/[0.03] border border-white/5 flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:border-white/10 overflow-hidden relative`}>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20`} />
                                        <service.icon className="w-10 h-10 text-white relative z-10" />
                                    </div>
                                </div>

                                {/* Right: Content */}
                                <div className="flex-1 max-w-3xl">
                                    <h3 className="text-2xl font-light text-white mb-4 tracking-tight">
                                        {service.title}
                                    </h3>

                                    <p className="text-[0.95rem] leading-[1.8] text-white/50 mb-8 font-light max-w-2xl">
                                        {service.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                                        {service.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-6 py-2.5 bg-white/[0.03] border border-white/5 rounded-full text-[0.65rem] font-medium text-white/30 uppercase tracking-[0.2em] group-hover:border-white/10 group-hover:text-white/50 transition-all duration-500"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Magnetic Arrow */}
                                <div className="flex-shrink-0 lg:ml-auto">
                                    <div className="magnetic-arrow w-20 h-20 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:border-[#ed1c24] group-hover:text-[#ed1c24] transition-all duration-500 cursor-pointer">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Accent Line */}
                            <motion.div
                                className={`absolute bottom-8 right-12 w-32 h-[1px] bg-gradient-to-r ${service.color} opacity-30`}
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
