'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import TextVideoMask from './TextVideoMask'

import MethodologyTimeline from './MethodologyTimeline'

import TeamMinimalist from './TeamMinimalist'
import TestimonialsMinimalist from './TestimonialsMinimalist'
import AboutSEEA from './AboutSEEA'
import MegaFooter from './MegaFooter'
import PremiumPortfolio from './PremiumPortfolio'

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
    },
    {
        src: '/thumbnails/thumb-01.jpg',
        alt: 'Campaign 11',
        video: '/video/video-11.mp4'
    },
    {
        src: '/thumbnails/thumb-02.jpg',
        alt: 'Campaign 12',
        video: '/video/video-12.mp4'
    },
    {
        src: '/thumbnails/thumb-13.JPG',
        alt: 'Campaign 13',
        video: '/video/video-13.MP4'
    }
];


// Shared Section Wrapper for consistent padding/layout
const Section = ({ children, className = '', id }: { children: React.ReactNode; className?: string, id?: string }) => (
    <section id={id} className={`px-6 py-32 sm:px-12 lg:px-24 ${className}`}>
        <div className="mx-auto max-w-7xl">
            {children}
        </div>
    </section>
)

export default function ContentSections() {
    return (
        <div className="text-[#111111] relative overflow-hidden bg-[#faf9f7]">
            {/* Visual Charm Layer — Subtle brand orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] -left-20 w-[600px] h-[600px] bg-[#431846]/[0.02] rounded-full blur-[120px]" />
                <div className="absolute top-[40%] -right-20 w-[500px] h-[500px] bg-[#431846]/[0.015] rounded-full blur-[100px]" />
                <div className="absolute top-[70%] -left-10 w-[400px] h-[400px] bg-[#431846]/[0.02] rounded-full blur-[80px]" />
            </div>

            {/* 1. VISÃO ALÉM DO AGORA — Ultra-Editorial */}
            <section id="perspectiva" className="relative overflow-hidden py-32 md:py-48 px-6 sm:px-12 lg:px-20 xl:px-28">
                <div className="absolute inset-0 bg-[#f2f0ec]" />

                {/* Subtle horizontal rule glow */}
                <div className="absolute top-0 left-0 right-0 h-[0.5px]" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(67,24,70,0.25) 30%, rgba(17,17,17,0.04) 70%, transparent 100%)' }} />

                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Label */}
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.55em] text-[#431846] mb-16">
                        Perspectiva
                    </p>

                    {/* Headline — editorial split */}
                    <div className="mb-20 max-w-5xl">
                        <div className="overflow-hidden mb-2">
                            <h2 className="text-[clamp(2rem,6vw,5.5rem)] leading-[1.04] font-extralight tracking-[-0.03em] text-[#111111]">
                                <span className="font-sans">VISÃO ALÉM </span>
                                <span className="font-serif italic font-normal serif-luxury text-[#431846]/70" style={{ fontSize: '1.08em', marginLeft: '0.1em' }}>do</span>
                            </h2>
                        </div>
                        <div className="overflow-hidden">
                            <h2 className="text-[clamp(2rem,6vw,5.5rem)] leading-[1.04] font-extralight tracking-[-0.03em]">
                                <span className="font-sans text-[#111111]">AGORA</span>
                                <span className="text-[#431846]">.</span>
                            </h2>
                        </div>
                    </div>

                    {/* Body — two columns */}
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-start">
                        <div className="space-y-8">
                            {/* Red accent bar — from the S letterform */}
                            <div className="flex flex-col gap-[6px] mb-10">
                                <motion.div
                                    className="w-10 h-[2.5px] bg-[#ed1c24]/50"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                                />
                                <motion.div
                                    className="w-6 h-[2.5px] bg-[#431846]/50"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                                />
                            </div>

                            <p className="text-xl sm:text-2xl font-light leading-[1.7] text-black/60 tracking-tight">
                                {"Muitos profissionais de alto nível caem na armadilha da rotina: a excelência se torna hábito e deixa de ser notada por quem está imerso nela. Você faz muito, mas o mundo vê pouco.".split(" ").map((word, i) => (
                                    <motion.span
                                        key={i}
                                        className="inline-block mr-[0.25em]"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: i * 0.03, ease: [0.19, 1, 0.22, 1] }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </p>
                        </div>
                        <div className="lg:pt-14">
                            <p className="text-lg sm:text-xl font-light leading-[1.8] text-black/40 mb-10">
                                {"Não inventamos personagens. Revelamos a autoridade que já existe na sua rotina, transformando momentos comuns em narrativas que posicionam, conectam e vendem.".split(" ").map((word, i) => (
                                    <motion.span
                                        key={i}
                                        className="inline-block mr-[0.25em]"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.5 + (i * 0.02) }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </p>
                            <motion.p
                                className="text-[0.85rem] font-bold uppercase tracking-[0.55em] text-[#431846]"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 1.5 }}
                            >
                                É aqui que a SEEA entra.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>



            {/* 2. SEEA — THE CINEMATIC MANIFESTO (Editorial Refinement) */}
            <section id="o-conceito" className="relative flex flex-col justify-center py-32 md:py-48 bg-[#faf9f7] overflow-hidden isolate transition-colors duration-1000">

                {/* 1. Background Atmosphere: Layered Ghost Typography & Grain */}
                <div className="hidden md:block absolute inset-0 pointer-events-none opacity-[0.03] contrast-125 brightness-110 mix-blend-multiply">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                </div>

                <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                    {/* Ghost "S" */}
                    <motion.div
                        className="absolute -left-[5%] top-[10%] text-[45vw] font-black text-[#431846]/[0.015] leading-none tracking-tighter will-change-transform"
                        style={{ y: '-20%', translateZ: 0 }}
                        animate={{ y: '20%' }}
                        transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                    >
                        S
                    </motion.div>
                    {/* Ghost "EEA" */}
                    <motion.div
                        className="absolute -right-[15%] bottom-[10%] text-[40vw] font-black text-[#431846]/[0.01] leading-none tracking-tighter will-change-transform"
                        style={{ x: '10%', translateZ: 0 }}
                        animate={{ x: '-10%' }}
                        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                    >
                        EEA
                    </motion.div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-28 w-full">
                    <div className="flex flex-col gap-24">

                        {/* 2. Headline: The "Olhar Treinado" Reveal */}
                        <div className="max-w-5xl">
                            <motion.p
                                className="text-[0.65rem] font-bold uppercase tracking-[0.8em] text-[#431846] mb-12 flex items-center gap-4"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <span className="w-8 h-[1px] bg-[#431846]/30" />
                                O Conceito
                            </motion.p>

                            <h2 className="font-extralight tracking-tight text-[#111111] space-y-2">
                                <div className="overflow-hidden">
                                    <motion.span
                                        className="block text-[clamp(2.5rem,6vw,4.8rem)] leading-[1.05] opacity-90"
                                        initial={{ y: "100%" }}
                                        whileInView={{ y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        Nosso diferencial está
                                    </motion.span>
                                </div>
                                <div className="overflow-hidden">
                                    <motion.span
                                        className="block text-[clamp(2.5rem,6vw,4.8rem)] leading-[1.05] opacity-90 mb-4"
                                        initial={{ y: "100%" }}
                                        whileInView={{ y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        precisamente no
                                    </motion.span>
                                </div>
                                <div className="overflow-hidden py-4 -ml-1 md:-ml-3">
                                    <motion.span
                                        className="block text-[clamp(5.5rem,13vw,11rem)] leading-[0.85] font-serif italic text-[#431846] relative text-luxury-glow"
                                        initial={{ y: "100%", skewY: 5 }}
                                        whileInView={{ y: 0, skewY: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        o conceito seea
                                    </motion.span>
                                </div>
                            </h2>
                        </div>

                        {/* 3. Narrative Details: Asymmetric Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
                            <div className="md:col-start-7 md:col-span-5 space-y-12">
                                <div className="relative">
                                    <motion.div
                                        className="absolute -left-12 top-4 w-8 h-[1px] bg-[#431846]/20 hidden md:block"
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    />
                                    <motion.p
                                        className="text-[1.35rem] md:text-[1.6rem] font-light leading-[1.7] text-[#111111]/80 italic font-serif"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.4 }}
                                    >
                                        Nosso diferencial está no olhar treinado para identificar detalhes e histórias que merecem ser contadas. Um olhar que não se limita ao conteúdo, mas ao próprio cliente.
                                    </motion.p>
                                </div>

                                <div className="pt-12 border-t border-[#431846]/10 max-w-sm">
                                    <motion.div
                                        className="space-y-4"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 1, delay: 0.6 }}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#ed1c24]/40" />
                                            <p className="text-[0.65rem] uppercase tracking-[0.4em] text-[#111111]/40 font-bold">Essência</p>
                                        </div>
                                        <p className="text-[1.1rem] font-light leading-relaxed text-[#111111]/80">
                                            Identificamos para quem você precisa falar e como comunicar de forma intencional e verdadeira. Cada trajetória é única e carrega valor.
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Line - Vertical connection */}
                <motion.div
                    className="absolute left-1/2 bottom-0 w-[1px] h-32 bg-gradient-to-b from-transparent to-[#111111]/10 md:to-[#111111]/20"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 1.5 }}
                />
            </section>

            {/* 3.5 TRANSITIONAL SPACER (Luxury Breathing Room) */}
            <div className="relative h-[15vh] md:h-[20vh] bg-[#faf9f7] overflow-hidden">
                {/* Smooth fade-out to black */}
                <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-[#111111]" />

                {/* Subtle brand motif */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]">
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.8em] text-[#431846]">SEEA</p>
                </div>
            </div>


            {/* 4. NOSSO PORTFÓLIO ($50k GSAP Horizontal Scroll) */}
            <section id="nosso-acervo" className="relative">
                <PremiumPortfolio items={PORTFOLIO_ITEMS} />
            </section>

            {/* 5. NOSSO PROCESSO (Methodology Timeline) */}
            <section id="metodologia">
                <MethodologyTimeline />
            </section>

            {/* 6. PROVA SOCIAL (Testimonials) - Validation */}
            <section id="depoimentos">
                <TestimonialsMinimalist />
            </section>

            {/* 7. QUEM SOMOS (About) - Personal Connection */}
            <section id="quem-somos">
                <AboutSEEA />
            </section>

            {/* 8. TIME (Team) - Trust */}
            <section id="time">
                <TeamMinimalist />
            </section>


            {/* 10. FOOTER */}
            <MegaFooter />

        </div>
    )
}
