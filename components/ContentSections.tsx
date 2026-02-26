'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
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
    },
    {
        src: '/thumbnails/thumb-01.jpg', // Missing real thumb-11 for now
        alt: 'Campaign 11',
        video: '/video/video-11.mp4'
    },
    {
        src: '/thumbnails/thumb-02.jpg', // Missing real thumb-12 for now
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
const Section = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <section className={`px-6 py-16 sm:px-12 md:py-24 lg:px-24 ${className}`}>
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

            {/* 1. O PROBLEMA — Ultra-Editorial */}
            <section className="relative overflow-hidden py-24 md:py-32 px-6 sm:px-12 lg:px-20 xl:px-28">
                <div className="absolute inset-0 bg-[#f2f0ec]" />

                {/* Subtle horizontal rule glow */}
                <div className="absolute top-0 left-0 right-0 h-[0.5px]" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(67,24,70,0.25) 30%, rgba(17,17,17,0.04) 70%, transparent 100%)' }} />

                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Label */}
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.5em] text-[#431846]/35 mb-16">
                        O Diagnóstico
                    </p>

                    {/* Headline — editorial split */}
                    <div className="mb-20 max-w-5xl">
                        <div className="overflow-hidden mb-2">
                            <h2 className="text-[clamp(2rem,6vw,5.5rem)] leading-[1.04] font-extralight tracking-[-0.03em] text-[#111111]">
                                <span className="font-sans">O PONTO CEGO </span>
                                <span className="font-serif italic font-normal serif-luxury text-[#431846]/70" style={{ fontSize: '1.08em', marginLeft: '0.1em' }}>da sua</span>
                            </h2>
                        </div>
                        <div className="overflow-hidden">
                            <h2 className="text-[clamp(2rem,6vw,5.5rem)] leading-[1.04] font-extralight tracking-[-0.03em]">
                                <span className="font-sans text-[#111111]">EXCELÊNCIA</span>
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
                                    className="w-10 h-[2.5px] bg-[#431846]/50"
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
                                className="text-[0.85rem] font-bold uppercase tracking-[0.4em] text-[#431846]"
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

            {/* 3. SEEA — BRAND MANIFESTO usando elementos da logo */}
            <section className="relative overflow-hidden py-0">
                <div className="absolute inset-0 bg-[#faf9f7]" />
                {/* Top rule */}
                <div className="absolute top-0 left-0 right-0 h-[0.5px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(17,17,17,0.07), transparent)' }} />

                <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-28 py-40">
                    <div className="grid lg:grid-cols-2 gap-20 xl:gap-32 items-center">

                        {/* LEFT — S E E A logo-inspired lettermark */}
                        <div className="relative">
                            {/* Large SEEA using brand color split */}
                            <div className="relative select-none">
                                {/* Label above */}
                                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.5em] text-[#431846]/35 mb-8">
                                    O Conceito
                                </p>

                                {/* OFFICIAL LOGO CINEMATIC MASK */}
                                <div className="mb-12 max-w-[500px]">
                                    <TextVideoMask
                                        maskSrc="/SEEA-dark-tip.png"
                                        videoSrc="/video/video-01.mp4"
                                        className="opacity-95"
                                    />
                                </div>

                                {/* Thin rule separator */}
                                <div className="mt-10 w-full h-[0.5px]" style={{ background: 'linear-gradient(90deg, rgba(67,24,70,0.35) 0%, rgba(17,17,17,0.05) 60%, transparent 100%)' }} />

                                {/* Etymology */}
                                <div className="mt-8">
                                    <p className="text-[0.8rem] sm:text-[0.88rem] font-light leading-[1.9] text-black/45">
                                        Vem de <span className="font-serif italic font-normal serif-luxury text-[#431846]/70">see</span>, enxergar.
                                    </p>
                                    <p className="text-[0.8rem] sm:text-[0.88rem] font-light text-black/30">
                                        Enxergar o que normalmente passa despercebido.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT — Manifesto text */}
                        <div className="flex flex-col gap-12 border-l border-black/[0.06] pl-0 lg:pl-16">
                            <div>
                                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.5em] text-[#431846]/35 mb-10">
                                    Olhar Treinado
                                </p>
                                <p className="text-xl sm:text-2xl font-light leading-[1.7] text-black/60 tracking-tight">
                                    {"Nosso diferencial está no olhar treinado para identificar ângulos, cenas, comportamentos e histórias que merecem ser contadas.".split(" ").map((word, i) => (
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
                            <div>
                                <div className="flex flex-col gap-[6px] mb-10">
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                                        className="w-10 h-[2.5px] bg-[#431846]/50 origin-left"
                                    />
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                                        className="w-6 h-[2.5px] bg-[#431846]/50 origin-left"
                                    />
                                </div>
                                <p className="text-lg sm:text-xl font-light leading-[1.8] text-black/40">
                                    {"Por atuarmos com diferentes segmentos e públicos, conseguimos identificar rapidamente para quem o cliente precisa falar e como comunicar de forma clara, intencional e verdadeira.".split(" ").map((word, i) => (
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
                            </div>
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 1.5 }}
                                className="text-[0.85rem] font-bold uppercase tracking-[0.4em] text-[#431846]"
                            >
                                Esse olhar não se limita ao conteúdo, mas ao próprio cliente.
                            </motion.p>
                        </div>

                    </div>
                </div>
            </section>


            {/* 4.5. NOSSO PORTFÓLIO (Dome Gallery) */}
            <section id="portfolio" className="relative w-full h-screen bg-[#e8e4dd] overflow-hidden flex flex-col">
                <div className="absolute top-0 left-0 w-full z-10 pt-4 md:pt-8 px-6 text-center pointer-events-none">
                    <h2
                        className="font-extralight tracking-tight text-[#111111] mb-2 md:mb-4"
                        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95 }}
                    >
                        <span className="font-sans uppercase">NOSSO </span>
                        <span className="font-serif italic font-normal serif-luxury text-[#431846]/70 lowercase" style={{ fontSize: '1.08em', marginLeft: '0.1em' }}>portfólio</span>
                    </h2>
                    <p className="text-[0.95rem] font-light leading-[1.8] text-black/60 max-w-2xl mx-auto mb-16 tracking-tight">Explore nossas produções em 360°</p>
                </div>
                <div className="flex-1 w-full h-full relative z-0">
                    <DomeGallery
                        images={PORTFOLIO_ITEMS}
                        fit={0.85} // Retornando para um fit mais envolvente e natural
                        segments={20} // Reduzindo segmentos para limpar o visual
                        minRadius={500} // Aumentando raio mínimo para evitar distorção no mobile
                        maxRadius={1100} // Aumentando raio máximo para desktop imersivo
                        openedImageWidth="90vw"
                        openedImageHeight="85vh"
                        imageBorderRadius="12px"
                        openedImageBorderRadius="20px"
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
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 text-[#111111]">Vamos conversar?</h2>
                <p className="text-xl sm:text-2xl text-black/45 font-light mb-16 max-w-2xl mx-auto">
                    Cada projeto começa com uma conversa estratégica.<br />
                    Se fizer sentido para os dois lados, seguimos juntos.
                </p>

                <a
                    href="https://wa.me/5511999999999?text=Olá! Vim pelo site da SEEA e gostaria de agendar uma conversa estratégica."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex overflow-hidden rounded-full bg-[#111111] px-12 py-6 text-sm font-bold tracking-[0.2em] text-white shadow-[0_4px_32px_rgba(17,17,17,0.15)] transition-transform hover:scale-105"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        AGENDAR CONVERSA ESTRATÉGICA
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 group-hover:animate-shine" />
                </a>
            </Section>

            {/* 10. FOOTER */}
            <MegaFooter />

        </div>
    )
}
