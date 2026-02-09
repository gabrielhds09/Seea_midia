'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ClientLogos from './ClientLogos'
import TextVideoMask from './TextVideoMask'
import WhatWeDo from './WhatWeDo'
import MethodologyTimeline from './MethodologyTimeline'

import TeamMinimalist from './TeamMinimalist'
import TestimonialsMinimalist from './TestimonialsMinimalist'
import AboutSEEA from './AboutSEEA'
import MegaFooter from './MegaFooter'
import DomeGallery from './DomeGallery'

// Dados do Portfólio (Edite aqui)
const PORTFOLIO_ITEMS = [
    {
        src: '/thumbnails/thumb-01.jpg',
        alt: 'Campaign 01',
        video: '/video/video-01.mp4'
    },
    {
        src: '/thumbnails/thumb-02.jpg',
        alt: 'Campaign 02',
        video: '/video/video-02.mp4'
    },
    {
        src: '/thumbnails/thumb-03.jpg',
        alt: 'Campaign 03',
        video: '/video/video-03.mp4'
    },
    {
        src: '/thumbnails/thumb-04.jpg',
        alt: 'Campaign 04',
        video: '/video/video-04.mp4'
    },
    {
        src: '/thumbnails/thumb-05.jpg',
        alt: 'Campaign 05',
        video: '/video/video-05.mp4'
    },
    {
        src: '/thumbnails/thumb-06.jpg',
        alt: 'Campaign 06',
        video: '/video/video-06.mp4'
    },
    {
        src: '/thumbnails/thumb-07.jpg',
        alt: 'Campaign 07',
        video: '/video/video-07.mp4'
    },
    {
        src: '/thumbnails/thumb-08.jpg',
        alt: 'Campaign 08',
        video: '/video/video-08.mp4'
    },
    {
        src: '/thumbnails/thumb-09.jpg',
        alt: 'Campaign 09',
        video: '/video/video-09.mp4'
    },
    {
        src: '/thumbnails/thumb-10.jpg',
        alt: 'Campaign 10',
        video: '/video/video-10.mp4'
    }
];


// Shared Section Wrapper for consistent padding/layout
const Section = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <section className={`px-6 py-16 sm:px-12 md:py-24 lg:px-24 ${className}`}>
        <div className="mx-auto max-w-7xl">
            {children}
        </div>
    </section>
)

export default function ContentSections() {
    return (
        <div className="text-white relative overflow-hidden bg-gradient-to-b from-[#1a0d20] via-[#1f1028] to-[#1a0d20]">

            {/* 1. SOCIAL PROOF (Logos) - Authority First */}
            <ClientLogos />

            {/* 2. O PROBLEMA / VISÃO (Visão Além do Agora) - The Hook */}
            <Section className="relative overflow-hidden">
                {/* Dynamic Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0f0515] to-[#050505]" />

                {/* Purple Glow */}
                <motion.div
                    animate={{ opacity: [0.2, 0.35, 0.2], y: [0, 30, 0] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#431846] rounded-full blur-[120px] opacity-30"
                />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl font-bold uppercase tracking-tighter sm:text-5xl mb-12">
                        O Ponto Cego da <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed1c24] to-[#431846]">Excelência</span>
                    </h2>
                    <div className="space-y-8 text-xl font-light leading-relaxed text-white/70">
                        <p>
                            Muitos profissionais de alto nível caem na armadilha da rotina: a excelência se torna hábito e deixa de ser notada por quem está imerso nela. Você faz muito, mas o mundo vê pouco.
                        </p>
                        <p>
                            <strong className="text-white font-medium">É aqui que a SEEA entra.</strong>
                        </p>
                        <p>
                            Não inventamos personagens. Revelamos a autoridade que já existe na sua rotina, transformando momentos "comuns" em narrativas que posicionam, conectam e vendem.
                        </p>
                    </div>
                </div>
            </Section>

            {/* 3. A SOLUÇÃO (O Conceito SEEA) */}
            <Section className="relative overflow-hidden py-40">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#ffffff_0%,transparent_70%)] opacity-10" />
                </div>

                <div className="relative z-10 grid gap-12 lg:grid-cols-2 items-center">
                    <div>
                        {/* New Video Mask Title */}
                        <TextVideoMask text="SEEA" className="mb-4" />

                        <div className="mt-8 ml-4 border-l-2 border-[#ed1c24] pl-6">
                            <p className="text-2xl font-medium text-white mb-2">
                                Vem de <i>see</i>, enxergar.
                            </p>
                            <p className="text-xl text-white/60">
                                Enxergar o que normalmente passa despercebido.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 text-lg text-white/70 leading-relaxed border-l border-white/20 pl-8">
                        <p>
                            Nosso diferencial está no olhar treinado para identificar ângulos, cenas, comportamentos e histórias que merecem ser contadas. Esse olhar não se limita ao conteúdo, mas ao próprio cliente. Cada trajetória é única e carrega valor.
                        </p>
                        <p>
                            Por atuarmos com diferentes segmentos e públicos, conseguimos identificar rapidamente para quem o cliente precisa falar e como comunicar de forma clara, intencional e verdadeira.
                        </p>
                    </div>
                </div>
            </Section>

            {/* 4. A ENTREGA (O Que Fazemos) */}
            <WhatWeDo />

            {/* 4.5. NOSSO PORTFÓLIO (Dome Gallery) */}
            <section className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col py-16 md:py-0">
                <div className="absolute top-0 left-0 w-full z-10 pt-8 md:pt-16 px-6 text-center pointer-events-none">
                    <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-2 md:mb-4">
                        <span className="text-white">NOSSO</span>{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed1c24] to-[#431846]">PORTFÓLIO</span>
                    </h2>
                    <p className="text-white/60 text-base md:text-xl font-light">Explore nossas produções em 360°</p>
                </div>
                <div className="flex-1 w-full h-full relative z-0 min-h-[600px] md:min-h-screen">
                    <DomeGallery
                        images={PORTFOLIO_ITEMS}
                        fit={0.7}
                        minRadius={800}
                        maxRadius={1200}
                        openedImageWidth="90vw"
                        openedImageHeight="85vh"
                        imageBorderRadius="16px"
                        openedImageBorderRadius="24px"
                        grayscale={true}
                    />
                </div>
            </section>

            {/* 5. O MÉTODO (Como Trabalhamos) */}
            <MethodologyTimeline />

            {/* 6. PROVA SOCIAL (Testimonials) - Validation */}
            <TestimonialsMinimalist />

            {/* 7. QUEM SOMOS (About) - Personal Connection */}
            <AboutSEEA />

            {/* 8. TIME (Team) - Trust */}
            <TeamMinimalist />

            {/* 9. CTA FINAL */}
            <Section className="text-center py-40">
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">Vamos conversar?</h2>
                <p className="text-xl sm:text-2xl text-white/60 font-light mb-16 max-w-2xl mx-auto">
                    Cada projeto começa com uma conversa estratégica.<br />
                    Se fizer sentido para os dois lados, seguimos juntos.
                </p>

                <button className="group relative inline-flex overflow-hidden rounded-full bg-white px-12 py-6 text-sm font-bold tracking-[0.2em] text-[#050505] shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-transform hover:scale-105">
                    <span className="relative z-10 flex items-center gap-3">
                        AGENDAR CONVERSA ESTRATÉGICA <ArrowRight className="w-5 h-5" />
                    </span>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50 group-hover:animate-shine" />
                </button>
            </Section>

            {/* 10. FOOTER */}
            <MegaFooter />

        </div>
    )
}
