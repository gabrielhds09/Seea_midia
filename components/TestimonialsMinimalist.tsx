'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
    {
        quote: 'A SEEA não entrega apenas design; eles esculpem percepções. Nossa marca finalmente respira a autoridade que sempre tivemos no offline.',
        author: 'Dr. Rafael Mendes',
        role: 'Cirurgião Plástico',
    },
    {
        quote: 'Eles entenderam que minha imagem precisava comunicar solidez, não entretenimento. Hoje, meus investidores me veem sob uma nova ótica.',
        author: 'Marina Costa',
        role: 'CEO, Grupo Investimentos MC',
    },
    {
        quote: 'Queria uma equipe que dominasse o universo empresarial com a mesma excelência que domino meus negócios. A SEEA superou o impossível.',
        author: 'Roberto Alves',
        role: 'Setor Imobiliário',
    },
]

export default function TestimonialsMinimalist() {
    const [current, setCurrent] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    useEffect(() => {
        if (!isAutoPlaying) return
        const t = setInterval(() => setCurrent(c => (c + 1) % TESTIMONIALS.length), 6500)
        return () => clearInterval(t)
    }, [isAutoPlaying])

    return (
        <section
            className="relative w-full min-h-[80vh] bg-[#faf9f7] flex flex-col items-center justify-center px-6 sm:px-12 py-32 overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {/* Extremely subtle background texture/noise could go here, but keeping pure clean is also luxury */}

            {/* Tiny Top Label */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center">
                <span className="text-[0.55rem] font-bold uppercase tracking-[0.6em] text-[#431846]/40">
                    Perspectivas
                </span>
            </div>

            <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center justify-center min-h-[400px]">

                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
                        transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
                        className="flex flex-col items-center text-center w-full"
                    >
                        {/* The Editorial Quote */}
                        <blockquote
                            className="font-serif italic font-light text-[#111111] mb-12 max-w-4xl mx-auto"
                            style={{
                                fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)',
                                lineHeight: '1.25',
                                letterSpacing: '-0.02em'
                            }}
                        >
                            {TESTIMONIALS[current].quote}
                        </blockquote>

                        {/* Minimalist Attribution */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-[1px] h-8 bg-[#431846]/30 mb-2"></div>
                            <p className="text-[0.65rem] sm:text-[0.75rem] font-bold tracking-[0.3em] uppercase text-[#111111]">
                                {TESTIMONIALS[current].author}
                            </p>
                            <p className="text-[0.6rem] sm:text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[#431846]/60">
                                {TESTIMONIALS[current].role}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>

            </div>

            {/* Invisible Pagination Area (Clickable but extremely subtle) */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-6">
                <div className="flex gap-4">
                    {TESTIMONIALS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setCurrent(i); setIsAutoPlaying(false) }}
                            aria-label={`Ver depoimento ${i + 1}`}
                            className="group py-4 px-1"
                        >
                            <div
                                className="w-1.5 h-1.5 rounded-full transition-all duration-700"
                                style={{
                                    backgroundColor: i === current ? '#431846' : 'rgba(17,17,17,0.1)',
                                    transform: i === current ? 'scale(1)' : 'scale(0.8)'
                                }}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}
