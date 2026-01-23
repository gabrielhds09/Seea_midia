'use client'

import { motion } from 'framer-motion'
import { Target, Clapperboard, Video, Users, TrendingUp } from 'lucide-react'

const SERVICES = [
    {
        icon: Target,
        number: "01",
        title: "Estratégia & Diagnóstico",
        description: "Definimos posicionamento, arquétipos e planejamento estratégico. Entendemos seus objetivos, valores e próximos passos para que o conteúdo acompanhe sua evolução profissional.",
        tags: ["Posicionamento", "Arquétipos", "Planejamento"],
        color: "from-[#431846] to-[#5a1f5e]"
    },
    {
        icon: Clapperboard,
        number: "02",
        title: "Branding Audiovisual",
        description: "Criamos identidade visual completa, direção de arte consistente e sound design marcante. Cada elemento é pensado para fortalecer sua marca.",
        tags: ["Identidade Visual", "Direção de Arte", "Sound Design"],
        color: "from-[#5a1f5e] to-[#8b2874]"
    },
    {
        icon: Video,
        number: "03",
        title: "Conteúdo Roteirizado",
        description: "Produzimos reels estratégicos, vídeos longos e roteiros de impacto. Conteúdo pensado para o feed, com foco em clareza, autoridade e valor.",
        tags: ["Reels Estratégicos", "Vídeos Longos", "Roteiro de Impacto"],
        color: "from-[#8b2874] to-[#c42c4d]"
    },
    {
        icon: Users,
        number: "04",
        title: "Acompanhamento Presencial",
        description: "Acompanhamos você presencialmente captando lifestyle, stories autênticos e direcionando cenas. Extraímos da rotina conteúdos que comunicam autoridade.",
        tags: ["Direção de Cena", "Stories", "Lifestyle"],
        color: "from-[#c42c4d] to-[#ed1c24]"
    },
    {
        icon: TrendingUp,
        number: "05",
        title: "Gestão Estratégica (Tráfego)",
        description: "Gerenciamos ads manager, distribuição inteligente e análise de dados. Conteúdo bem construído precisa de estratégia para alcançar quem realmente importa.",
        tags: ["Ads Manager", "Distribuição", "Análise de Dados"],
        color: "from-[#ed1c24] to-[#ff4d4d]"
    }
]

export default function WhatWeDo() {
    return (
        <section className="relative w-full min-h-screen py-32 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

            {/* Animated Glows */}
            <motion.div
                animate={{
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#431846] rounded-full blur-[150px] opacity-10"
            />

            <motion.div
                animate={{
                    opacity: [0.1, 0.15, 0.1],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#ed1c24] rounded-full blur-[120px] opacity-10"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        O que fazemos,{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#431846] to-[#ed1c24]">
                            na prática
                        </span>
                    </h2>

                    <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                        Nosso trabalho vai além de gravar vídeos ou alimentar redes sociais. Atuamos de forma próxima, estratégica e personalizada, acompanhando o cliente para construir uma presença forte, coerente e autêntica.
                    </p>
                </motion.div>

                {/* Service Cards */}
                <div className="space-y-6">
                    {SERVICES.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 md:p-10 hover:border-zinc-700 transition-all duration-300"
                        >
                            {/* Gradient overlay on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />

                            <div className="relative flex flex-col md:flex-row gap-8 items-start">
                                {/* Left: Number & Icon */}
                                <div className="flex-shrink-0">
                                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-zinc-800 to-zinc-900 group-hover:from-[#431846] group-hover:to-[#ed1c24] transition-all duration-300">
                                        {service.number}
                                    </div>
                                    <div className={`mt-4 w-16 h-16 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                                        <service.icon className="w-8 h-8 text-white" />
                                    </div>
                                </div>

                                {/* Right: Content */}
                                <div className="flex-1">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#431846] group-hover:to-[#ed1c24] transition-all duration-300">
                                        {service.title}
                                    </h3>

                                    <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-3">
                                        {service.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-full text-xs text-zinc-400 uppercase tracking-wider hover:border-zinc-600 transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Arrow Icon */}
                                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-600 group-hover:border-[#ed1c24] group-hover:text-[#ed1c24] transition-all duration-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>

                            {/* Bottom gradient line */}
                            <motion.div
                                className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r ${service.color} rounded-b-2xl`}
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
