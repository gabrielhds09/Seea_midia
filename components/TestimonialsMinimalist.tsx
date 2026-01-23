'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'

const TESTIMONIALS = [
    {
        quote: "Trabalhar com a SEEA foi transformador. Eles não apenas entregaram um produto visual incrível, mas elevaram completamente nossa comunicação de marca.",
        author: "Carlos Mendes",
        role: "CEO @TechBrasil",
        rating: 5
    },
    {
        quote: "A SEEA Mídia transformou completamente nossa presença digital. O resultado superou todas as expectativas. Profissionalismo e criatividade em cada detalhe.",
        author: "Maria Silva",
        role: "Fundadora @InovaCorp",
        rating: 5
    },
    {
        quote: "Criatividade, estratégia e entrega impecável. A melhor agência audiovisual que já trabalhamos. Cada frame conta uma história.",
        author: "Pedro Santos",
        role: "CMO @BrandHub",
        rating: 5
    },
    {
        quote: "O acompanhamento próximo fez toda diferença. Eles realmente entendem o que significa posicionamento estratégico.",
        author: "Ana Costa",
        role: "Diretora Comercial @Nexus",
        rating: 5
    }
]

export default function TestimonialsMinimalist() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const progress = useMotionValue(0)

    const nextTestimonial = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
        progress.set(0)
    }, [progress])

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
        progress.set(0)
    }

    // Auto-advance with progress bar
    useEffect(() => {
        if (!isAutoPlaying) return

        const controls = animate(progress, 100, {
            duration: 6,
            ease: "linear",
            onComplete: nextTestimonial
        })

        return () => controls.stop()
    }, [currentIndex, isAutoPlaying, nextTestimonial, progress])

    const current = TESTIMONIALS[currentIndex]
    const progressWidth = useTransform(progress, [0, 100], ['0%', '100%'])

    return (
        <section
            className="relative w-full min-h-screen bg-[#1a0d20] text-white flex items-center justify-center px-6 py-24 overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#431846]/15 rounded-full blur-[200px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#ed1c24]/5 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-5xl w-full mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-3 text-[#ed1c24] text-xs tracking-[0.4em] uppercase mb-6">
                        <span className="w-8 h-[1px] bg-[#ed1c24]" />
                        Depoimentos
                        <span className="w-8 h-[1px] bg-[#ed1c24]" />
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        O que nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed1c24] to-[#431846]">clientes</span> dizem
                    </h2>
                </motion.div>

                {/* Quote Container */}
                <div className="relative">
                    {/* Large Quote Mark */}
                    <motion.div
                        className="absolute -top-16 left-0 text-[180px] font-serif leading-none text-[#431846]/20 select-none pointer-events-none"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        "
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                            className="text-center"
                        >
                            {/* Quote */}
                            <blockquote className="relative z-10 mb-12">
                                <p className="text-2xl md:text-4xl font-light leading-[1.4] text-white/90 max-w-4xl mx-auto">
                                    "{current.quote}"
                                </p>
                            </blockquote>

                            {/* Author */}
                            <motion.div
                                className="flex flex-col items-center gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {/* Avatar */}
                                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#431846] to-[#ed1c24]" />
                                    <div className="absolute inset-[2px] rounded-full bg-[#0a0515] flex items-center justify-center">
                                        <span className="text-lg font-bold text-white/80">
                                            {current.author.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <p className="text-lg font-semibold text-white">{current.author}</p>
                                    <p className="text-white/40 text-sm">{current.role}</p>
                                </div>

                                {/* Rating Stars */}
                                <div className="flex gap-1 mt-2">
                                    {[...Array(current.rating)].map((_, i) => (
                                        <motion.svg
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3 + i * 0.1 }}
                                            className="w-4 h-4 text-[#ed1c24]"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </motion.svg>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-8 mt-16">
                    {/* Arrows */}
                    <div className="flex gap-3">
                        <motion.button
                            onClick={prevTestimonial}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#431846]/30 hover:border-[#431846] transition-all duration-300 group"
                            aria-label="Depoimento anterior"
                        >
                            <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </motion.button>
                        <motion.button
                            onClick={nextTestimonial}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#ed1c24]/30 hover:border-[#ed1c24] transition-all duration-300 group"
                            aria-label="Próximo depoimento"
                        >
                            <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </div>

                    {/* Dots */}
                    <div className="flex gap-2">
                        {TESTIMONIALS.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => { setCurrentIndex(index); progress.set(0); }}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'w-8 bg-gradient-to-r from-[#431846] to-[#ed1c24]'
                                    : 'w-2 bg-white/20 hover:bg-white/40'
                                    }`}
                                aria-label={`Ir para depoimento ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Counter */}
                    <span className="text-white/30 font-mono text-sm">
                        {String(currentIndex + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-8 max-w-md mx-auto">
                    <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#431846] to-[#ed1c24]"
                            style={{ width: progressWidth }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
