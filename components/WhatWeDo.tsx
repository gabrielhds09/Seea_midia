'use client'

import { motion } from 'framer-motion'
import { Target, Clapperboard, Video, Users, TrendingUp } from 'lucide-react'

const SERVICES = [
    {
        icon: Target,
        number: "01",
        title: "Gestão de carreira e posicionamento",
        description: "Cuidamos da sua imagem de forma estratégica. Entendemos seus objetivos, seus valores e seus próximos passos para que o conteúdo acompanhe sua evolução profissional e pessoal.",
        tags: ["Gestão de Imagem", "Estratégia", "Evolução"],
        color: "from-[#431846] to-[#5a1f5e]"
    },
    {
        icon: Users,
        number: "02",
        title: "Conteúdo pensado a partir da sua rotina",
        description: "Acompanhamos o cliente presencialmente e extraímos da própria rotina conteúdos que comunicam autoridade. Nosso olhar identifica detalhes, conversas e momentos que se transformam em narrativas relevantes e naturais, mesmo em dias comuns.",
        tags: ["Rotina", "Autoridade", "Narrativas"],
        color: "from-[#5a1f5e] to-[#8b2874]"
    },
    {
        icon: Clapperboard,
        number: "03",
        title: "Conteúdo estratégico e roteirizado",
        description: "Além dos registros do dia a dia, reservamos momentos específicos para gravações mais elaboradas. Vídeos roteirizados, pensados para o feed, com foco em impacto, clareza, autoridade e valor.",
        tags: ["Roteiros", "Impacto", "Clareza"],
        color: "from-[#8b2874] to-[#ed1c24]"
    },
    {
        icon: TrendingUp,
        number: "04",
        title: "Gestão de Aquisição de Clientes",
        description: "Não adianta ter um conteúdo incrível se ele não chega a quem precisa. Gerenciamos seu tráfego pago nas plataformas com estratégia, relatórios detalhados e acompanhamento contínuo para garantir ROI.",
        tags: ["Tráfego Pago", "Dados", "Performance"],
        color: "from-[#ed1c24] to-[#431846]"
    }
]

export default function WhatWeDo() {
    return (
        <section className="relative w-full min-h-screen py-20 md:py-32 px-6 overflow-hidden">
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

                            <div className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start z-10">
                                {/* Left: Icon */}
                                <div className="flex-shrink-0">
                                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-300`}>
                                        <service.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                    </div>
                                </div>

                                {/* Right: Content */}
                                <div className="flex-1">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#ed1c24] transition-colors duration-300" style={{ textShadow: '0 0 20px rgba(237, 28, 36, 0.5)' }}>
                                        {service.title}
                                    </h3>

                                    <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 md:gap-3">
                                        {service.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-3 py-1 md:px-4 md:py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-full text-[10px] md:text-xs text-zinc-400 uppercase tracking-wider hover:border-zinc-600 hover:text-white transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Arrow Icon */}
                                <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full border border-zinc-700 items-center justify-center text-zinc-600 group-hover:border-[#ed1c24] group-hover:text-[#ed1c24] transition-all duration-300">
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
