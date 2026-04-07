'use client'

import React from 'react'
import { motion } from 'framer-motion'
import CircularTestimonials from './circular-testimonials'

const TESTIMONIALS = [
    {
        quote: 'A SEEA não entrega apenas design; eles esculpem percepções. Nossa marca finalmente respira a autoridade que sempre tivemos no offline.',
        name: 'Dr. Rafael Mendes',
        designation: 'Cirurgião Plástico',
        src: '/testimonials/rafael_mendes.png'
    },
    {
        quote: 'Eles entenderam que minha imagem precisava comunicar solidez, não entretenimento. Hoje, meus investidores me veem sob uma nova ótica.',
        name: 'Marina Costa',
        designation: 'CEO, Grupo Investimentos MC',
        src: '/testimonials/marina_costa.png'
    },
    {
        quote: 'Queria uma equipe que dominasse o universo empresarial com a mesma excelência que domino meus negócios. A SEEA superou o impossível.',
        name: 'Roberto Alves',
        designation: 'Setor Imobiliário',
        src: '/testimonials/roberto_alves.png'
    },
]

export default function TestimonialsMinimalist() {
    return (
        <section
            className="relative w-full min-h-screen bg-[var(--color-background)] flex flex-col items-center justify-center px-6 sm:px-12 py-32 overflow-hidden"
        >
            <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col items-center justify-center">

                {/* Editorial Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <h2
                        className="font-extralight font-sans tracking-tight text-[var(--color-stone-black)]"
                        style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
                    >
                        O que{' '}
                        <span className="serif-luxury font-normal text-[var(--color-heritage-purple)]" style={{ fontSize: '1.02em' }}>dizem.</span>
                    </h2>
                </motion.div>

                {/* Circular Testimonials Component */}
                <div className="w-full flex justify-center">
                    <CircularTestimonials
                        testimonials={TESTIMONIALS}
                        autoplay={true}
                        colors={{
                            name: "var(--color-stone-black)",
                            designation: "var(--color-gold-precision)",
                            testimony: "var(--color-stone-black)",
                            arrowBackground: "var(--color-heritage-purple)",
                            arrowForeground: "var(--color-marble-white)",
                            arrowHoverBackground: "var(--color-heritage-red)",
                        }}
                        fontSizes={{
                            name: "clamp(1.5rem, 3vw, 2.8rem)",
                            designation: "clamp(0.75rem, 1.5vw, 1.25rem)",
                            quote: "clamp(0.95rem, 2vw, 1.5rem)",
                        }}
                    />
                </div>

            </div>

            {/* Background Accents */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[var(--color-heritage-purple)]/3 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[var(--color-heritage-red)]/2 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        </section>
    )
}
