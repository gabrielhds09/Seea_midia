'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQ_ITEMS = [
    {
        question: "Como funciona o processo de produção?",
        answer: "Iniciamos com briefing estratégico para entender sua visão. Depois criamos roteiro, storyboard e planejamento visual. A produção envolve filmagem, motion design e pós-produção. Você acompanha tudo com aprovações em cada etapa.",
        icon: "◈"
    },
    {
        question: "Vocês gravam eventos ou diárias?",
        answer: "Sim! Atendemos tanto eventos corporativos, lançamentos e palestras quanto diárias de acompanhamento para captura de conteúdo orgânico. O formato depende da sua necessidade — podemos gravar pontualmente ou fazer imersões completas na sua rotina.",
        icon: "◇"
    },
    {
        question: "Quanto tempo leva uma produção?",
        answer: "Vídeos institucionais: 2-3 semanas. Campanhas publicitárias: 4-6 semanas. Motion graphics: 1-2 semanas. Conteúdo para social media: entrega semanal contínua. Tudo depende da complexidade e quantidade de revisões.",
        icon: "◆"
    },
    {
        question: "Qual a qualidade dos vídeos?",
        answer: "Trabalhamos com equipamentos profissionais em alta resolução 4K. Todas as produções passam por color grading cinematográfico, tratamento de áudio profissional e finalização em padrão broadcast. Qualidade premium em cada frame.",
        icon: "✦"
    },
    {
        question: "Trabalham com empresas de qual porte?",
        answer: "Atendemos desde startups até grandes corporações. Nosso foco é em marcas que valorizam comunicação visual de alto impacto. Seja para lançamento de produto, institucional ou conteúdo contínuo.",
        icon: "◈"
    },
    {
        question: "Como funciona o acompanhamento presencial?",
        answer: "Nosso time vai até você para capturar sua rotina de forma orgânica e estratégica. Direção de cena em tempo real, olhar treinado para identificar oportunidades de conteúdo, e entrega de material pronto para publicação.",
        icon: "◇"
    }
]

export default function FAQMinimalist() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="relative w-full min-h-screen text-white py-32 px-6 overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-[#1a0d20]" />

            {/* Gradient Orbs */}
            <motion.div
                animate={{
                    opacity: [0.2, 0.35, 0.2],
                    scale: [1, 1.1, 1],
                    x: [0, 30, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-[#431846] rounded-full blur-[200px]"
            />
            <motion.div
                animate={{
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.15, 1],
                    y: [0, -30, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[#ed1c24] rounded-full blur-[180px]"
            />

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.015]">
                <svg className="w-full h-full">
                    <pattern id="faqGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                        <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#faqGrid)" />
                </svg>
            </div>

            <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr,1.2fr] gap-20 relative z-10">

                {/* Left: Title - Sticky */}
                <div className="lg:sticky lg:top-32 h-fit">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <motion.div
                            className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-full mb-8"
                            whileHover={{ scale: 1.02, borderColor: 'rgba(237,28,36,0.3)' }}
                        >
                            <div className="w-2 h-2 rounded-full bg-[#ed1c24] animate-pulse" />
                            <span className="text-white/60 text-xs font-medium tracking-[0.3em] uppercase">
                                Dúvidas Frequentes
                            </span>
                        </motion.div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.9] tracking-tighter uppercase mb-8"
                    >
                        <span className="text-white">PERGUNTAS</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed1c24] via-[#ff6b6b] to-[#431846]">
                            FREQUENTES
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/50 text-lg leading-relaxed max-w-md mb-12"
                    >
                        Entendemos que cada projeto é único. Aqui respondemos as dúvidas mais comuns sobre nosso processo.
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.a
                            href="#contato"
                            className="group inline-flex items-center gap-4"
                            whileHover={{ x: 5 }}
                        >
                            <span className="text-white/60 text-sm uppercase tracking-wider group-hover:text-white transition-colors">
                                Não encontrou sua dúvida?
                            </span>
                            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#ed1c24] group-hover:bg-[#ed1c24]/10 transition-all">
                                <svg className="w-4 h-4 text-white/60 group-hover:text-[#ed1c24] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </motion.a>
                    </motion.div>

                    {/* Decorative Number */}
                    <div className="hidden lg:block mt-20">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.03 }}
                            viewport={{ once: true }}
                            className="text-[20rem] font-black leading-none text-white select-none"
                        >
                            ?
                        </motion.span>
                    </div>
                </div>

                {/* Right: Questions */}
                <div className="space-y-3">
                    {FAQ_ITEMS.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.08 }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`relative group rounded-2xl border transition-all duration-500 overflow-hidden ${openIndex === index
                                ? 'bg-white/[0.04] border-[#ed1c24]/30'
                                : hoveredIndex === index
                                    ? 'bg-white/[0.02] border-white/10'
                                    : 'bg-transparent border-white/[0.05]'
                                }`}
                        >
                            {/* Glow on open */}
                            {openIndex === index && (
                                <div className="absolute inset-0 bg-gradient-to-br from-[#ed1c24]/5 via-transparent to-[#431846]/5 pointer-events-none" />
                            )}

                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full py-7 px-7 flex items-center justify-between text-left relative z-10"
                            >
                                <div className="flex items-center gap-5">
                                    {/* Icon */}
                                    <motion.span
                                        className={`text-2xl transition-colors duration-300 ${openIndex === index ? 'text-[#ed1c24]' : 'text-white/20'
                                            }`}
                                        animate={{
                                            rotate: openIndex === index ? 180 : 0,
                                            scale: openIndex === index ? 1.2 : 1
                                        }}
                                    >
                                        {item.icon}
                                    </motion.span>

                                    {/* Question */}
                                    <span className={`text-base md:text-lg font-medium tracking-tight transition-colors duration-300 ${openIndex === index
                                        ? 'text-white'
                                        : 'text-white/60 group-hover:text-white/90'
                                        }`}>
                                        {item.question}
                                    </span>
                                </div>

                                {/* Toggle Button */}
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 135 : 0 }}
                                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                    className="flex-shrink-0 ml-6"
                                >
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${openIndex === index
                                        ? 'bg-gradient-to-br from-[#ed1c24] to-[#431846] shadow-lg shadow-[#ed1c24]/20'
                                        : 'bg-white/[0.05] group-hover:bg-white/10'
                                        }`}>
                                        <svg
                                            className="w-5 h-5 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                </motion.div>
                            </button>

                            {/* Answer */}
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-7 pb-7">
                                            <motion.div
                                                initial={{ y: -10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.1 }}
                                                className="pl-12 relative"
                                            >
                                                {/* Vertical Line */}
                                                <div className="absolute left-[10px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ed1c24]/50 to-transparent" />

                                                <p className="text-white/70 text-base leading-relaxed">
                                                    {item.answer}
                                                </p>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom Line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ed1c24]/30 to-transparent" />
        </section>
    )
}
