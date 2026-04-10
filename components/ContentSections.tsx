'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import MethodologyTimeline from './MethodologyTimeline'
import ProcessoHorizontal from './ProcessoHorizontal'

import TeamMinimalist from './TeamMinimalist'
import TestimonialsMinimalist from './TestimonialsMinimalist'
import AboutSEEA from './AboutSEEA'
import MegaFooter from './MegaFooter'
import { FocusRail, type FocusRailItem } from './ui/focus-rail'


// Dados do Portfólio (Design Heritage Edition)
const PORTFOLIO_ITEMS: FocusRailItem[] = [
    {
        id: "seea-case-01",
        title: "All In Between",
        meta: "Cinematografia • Especial Carnaval",
        description: "Captura da essência vibrante e movimento orgânico durante a temporada de 2024.",
        imageSrc: '/thumbnails/thumb-01.jpg',
        videoSrc: '/video/video-01.mp4',
        href: "#portfolio",
        priority: true
    },
    {
        id: "seea-case-02",
        title: "Men's House",
        meta: "Lifestyle • Corporate",
        description: "Reposicionamento visual para o Shopping Cidade Jardim com foco em autoridade silenciosa.",
        imageSrc: '/thumbnails/thumb-02.jpg',
        videoSrc: '/video/video-02.mp4',
        href: "#portfolio",
        priority: true
    },
    {
        id: "seea-case-03",
        title: "Marina Costa",
        meta: "Personal Branding",
        description: "Série de retratos cinematográficos que traduzem a sofisticação da imagem pessoal.",
        imageSrc: '/thumbnails/thumb-03.jpg',
        videoSrc: '/video/video-03.mp4',
        href: "#portfolio"
    },
    {
        id: "seea-case-04",
        title: "Heritage Collection",
        meta: "Editorial • Fashion",
        description: "A narrativa por trás das marcas que buscam transcender o tempo através do visual.",
        imageSrc: '/thumbnails/thumb-04.jpg',
        videoSrc: '/video/video-04.mp4',
        href: "#portfolio"
    },
    {
        id: "seea-case-05",
        title: "Douglas Machado",
        meta: "Imersão • Estratégia",
        description: "Documentação do processo criativo e bastidores da autoridade corporativa.",
        imageSrc: '/thumbnails/thumb-05.jpg',
        videoSrc: '/video/video-05.mp4',
        href: "#portfolio"
    },
    {
        id: "seea-case-06",
        title: "Essência Pura",
        meta: "Branding Visual",
        description: "Minimalismo e intenção aplicados a cada frame para destacar o que é essencial.",
        imageSrc: '/thumbnails/thumb-06.jpg',
        videoSrc: '/video/video-06.mp4',
        href: "#portfolio"
    }
];


// Shared Brand Accent (Double Bar)
export const BrandAccent = ({ className = "" }: { className?: string }) => (
    <div className={`flex flex-col gap-[6px] mb-10 ${className}`}>
        <motion.div
            className="w-10 h-[2.5px] bg-[var(--color-cta)]/50"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        />
        <motion.div
            className="w-6 h-[2.5px] bg-[var(--color-category)]/50"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
        />
    </div>
)

// Shared Section Wrapper for consistent padding/layout
const Section = ({ children, className = '', id }: { children: React.ReactNode; className?: string, id?: string }) => (
    <section id={id} className={`px-6 py-32 sm:px-12 lg:px-24 border-b border-[var(--color-secondary)]/10 ${className}`}>
        <div className="mx-auto max-w-7xl">
            {children}
        </div>
    </section>
)

export default function ContentSections() {
    React.useEffect(() => {
        // Register inside effect to guarantee client-side execution
        const { gsap } = require('gsap')
        const { ScrollTrigger } = require('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        const sections = document.querySelectorAll('.headline-reveal')
        sections.forEach((section) => {
            const masks = section.querySelectorAll('.apple-mask-reveal')
            gsap.to(masks, {
                backgroundPosition: '0% 0',
                stagger: 0.2,
                duration: 2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            })
        })
    }, [])

    return (
        <>
        {/* Bloco 1: Seções antes da Metodologia (overflow-hidden safe) */}
        <div className="text-[var(--color-text)] relative overflow-hidden bg-[var(--color-background)]">
            {/* ═══ SECTION: ABOUT / INTRO ═══ */}

                {/* 1. VISÃO ALÉM DO AGORA — Redesign Editorial & Humanização */}
                <section id="perspectiva" className="relative overflow-hidden py-32 md:py-56 px-6 sm:px-12 lg:px-20 xl:px-28 bg-[var(--color-background)]">
                    <div className="absolute inset-0 bg-[var(--color-background)]" />
                    
                    {/* Subtle horizontal rule glow */}
                    <div className="absolute top-0 left-0 right-0 h-[0.5px]" style={{ background: 'linear-gradient(90deg, transparent 0%, var(--color-heritage-purple-light) 30%, var(--color-background-darker) 70%, transparent 100%)' }} />

                    <div className="relative z-10 max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                            
                            {/* Left: Editorial Content */}
                            <div className="lg:col-span-7">
                                {/* Label */}
                                <p className="text-[0.62rem] font-bold font-sans uppercase tracking-[0.55em] text-[var(--color-category)] mb-12">
                                    Perspectiva
                                </p>

                                {/* Headline */}
                                <div className="mb-14 headline-reveal">
                                    <div className="overflow-hidden mb-1">
                                        <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] font-extralight font-sans tracking-[-0.03em] text-[var(--color-text)] apple-mask-reveal">
                                            <span>VISÃO ALÉM </span>
                                            <span className="font-serif italic font-normal serif-luxury text-[var(--color-heritage-purple)]/70" style={{ fontSize: '1.08em', marginLeft: '0.1em' }}>do</span>
                                        </h2>
                                    </div>
                                    <div className="overflow-hidden">
                                        <h2 className="text-[clamp(1.75rem,8vw,5.5rem)] leading-[1.02] font-extralight font-sans tracking-[-0.03em] apple-mask-reveal">
                                            <span className="text-[var(--color-text)]">AGORA</span>
                                            <span className="text-[var(--color-cta)]">.</span>
                                        </h2>
                                    </div>
                                </div>

                                <div className="space-y-10 max-w-2xl">
                                    <BrandAccent />
                                    
                                    <p className="text-xl sm:text-2xl font-light font-sans leading-[1.7] text-[var(--color-text)]/80 tracking-tight">
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

                                    <div className="pt-8 border-t border-[var(--color-category)]/10">
                                        <p className="text-lg font-light font-sans leading-[1.8] text-[var(--color-text)]/55">
                                            Não inventamos personagens. Revelamos a autoridade que já existe na sua rotina, transformando momentos comuns em narrativas que posicionam, conectam e vendem.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Humanization Frame (Editorial Split) */}
                            <div className="lg:col-span-5 relative">
                                <motion.div 
                                    className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] ring-1 ring-white/10"
                                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
                                >
                                    {/* Video Loading State / Background */}
                                    <div className="absolute inset-0 bg-[#111] animate-pulse" />
                                    
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover"
                                    >
                                        <source src="/video/bastidores.mp4" type="video/mp4" />
                                    </video>

                                    {/* Overlay Gradient for depth */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                                    
                                    {/* Subtle Label */}
                                    <div className="absolute bottom-8 left-8">
                                        <p className="text-[0.55rem] font-bold font-sans uppercase tracking-[0.4em] text-white/40 mb-1">Bastidores</p>
                                        <p className="text-[0.7rem] font-serif italic text-white/80 tracking-widest leading-none">Making-of Cinematic</p>
                                    </div>
                                </motion.div>

                                {/* Floating Detail Item (Editorial Flair) */}
                                <motion.div 
                                    className="absolute -bottom-10 -left-10 md:-left-20 w-32 h-32 md:w-48 md:h-48 rounded-full border border-[var(--color-cta)]/10 flex items-center justify-center backdrop-blur-sm z-20 pointer-events-none"
                                    initial={{ rotate: 0 }}
                                    whileInView={{ rotate: 360 }}
                                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                                >
                                    <div className="w-1 h-1 bg-[var(--color-cta)] rounded-full" />
                                    <svg className="absolute inset-0 w-full h-full fill-[var(--color-cta)]/30" viewBox="0 0 100 100">
                                        <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                                        <text fontSize="6" fontWeight="bold">
                                            <textPath href="#circlePath" spacing="auto" startOffset="0%">
                                                AUTORIDADE • INTENCIONALIDADE • LEGADO • 
                                            </textPath>
                                        </text>
                                    </svg>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>



                {/* 2. SEEA — THE CINEMATIC MANIFESTO (Editorial Redesign) */}
                <section id="o-conceito" className="relative flex flex-col justify-center py-32 md:py-64 bg-[var(--color-background)] overflow-hidden isolate transition-colors duration-1000">

                    {/* 1. Background Atmosphere: Layered Ghost Typography & Grain */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] contrast-125 brightness-110">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    </div>

                    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                        <motion.div
                            className="absolute -left-[10%] top-[10%] text-[50vw] font-black text-[#431846]/[0.015] leading-none tracking-tighter"
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2, ease: "circOut" }}
                        >
                            S
                        </motion.div>
                        <motion.div
                            className="absolute -right-[5%] bottom-[5%] text-[35vw] font-black text-[#431846]/[0.01] leading-none tracking-tighter"
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2.5, ease: "circOut" }}
                        >
                            EEA
                        </motion.div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-28 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-end">
                            
                            {/* 2. Manifesto Text: Left Column */}
                            <div className="lg:col-span-7">
                                <motion.p
                                    className="text-[0.65rem] font-bold font-sans uppercase tracking-[0.8em] text-[var(--color-category)] mb-12 flex items-center gap-4"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1 }}
                                >
                                    <span className="w-8 h-[1px] bg-[var(--color-category)]/30" />
                                    Manifesto
                                </motion.p>

                                <div className="space-y-6 mb-16">
                                    <h2 className="font-extralight font-sans tracking-tight text-[var(--color-text)] headline-reveal">
                                        <div className="overflow-hidden">
                                            <motion.span
                                                className="block text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] apple-mask-reveal"
                                                initial={{ y: "40%", opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                A ESSÊNCIA DA
                                            </motion.span>
                                        </div>
                                        <div className="overflow-hidden py-2">
                                            <motion.span
                                                className="block text-[clamp(3rem,10vw,8.5rem)] leading-[0.9] font-serif italic text-[var(--color-category)] relative text-luxury-glow apple-mask-reveal"
                                                initial={{ y: "40%", skewY: 4, opacity: 0 }}
                                                whileInView={{ y: 0, skewY: 0, opacity: 1 }}
                                                transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                Autoridade Silenciosa
                                            </motion.span>
                                        </div>
                                    </h2>
                                </div>

                                <div className="max-w-xl space-y-12">
                                    <motion.p
                                        className="text-[1.4rem] md:text-[1.8rem] font-light leading-[1.6] text-[var(--color-text)]/80 italic font-serif"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                    >
                                        "Nosso diferencial está no olhar treinado para identificar detalhes e histórias que transcendem o tempo."
                                    </motion.p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <motion.div 
                                            className="space-y-3"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                        >
                                            <p className="text-[0.6rem] uppercase tracking-[0.4em] text-[var(--color-cta)] font-bold">Identidade</p>
                                            <p className="text-[0.95rem] font-light text-[var(--color-text)]/60 leading-relaxed">
                                                Revelamos a autoridade que já existe, mas que muitas vezes opera nos bastidores da excelência.
                                            </p>
                                        </motion.div>
                                        <motion.div 
                                            className="space-y-3"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ duration: 1, delay: 0.6 }}
                                        >
                                            <p className="text-[0.6rem] uppercase tracking-[0.4em] text-[var(--color-cta)] font-bold">Intencionalidade</p>
                                            <p className="text-[0.95rem] font-light text-[var(--color-text)]/60 leading-relaxed">
                                                Cada frame é uma decisão estratégica. Não apenas registramos; nós posicionamos o seu legado.
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Lume Lens: Right Column (Moving Parallax Frame) */}
                            <div className="lg:col-span-5 relative mt-20 lg:mt-0">
                                <motion.div 
                                    className="relative w-full aspect-square md:aspect-[1/1] rounded-full p-4 border border-white/5 bg-white/[0.02] backdrop-blur-3xl overflow-hidden"
                                    initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
                                    whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                                    transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
                                >
                                    <div className="relative w-full h-full rounded-full overflow-hidden">
                                        <video
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="absolute inset-0 w-full h-full object-cover scale-110"
                                        >
                                            <source src="/video/video-13.MP4" type="video/mp4" />
                                        </video>
                                        <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
                                    </div>

                                    {/* Rotating Text around Lens */}
                                    <motion.div 
                                        className="absolute inset-0 pointer-events-none"
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                                    >
                                        <svg className="w-full h-full fill-white/10" viewBox="0 0 100 100">
                                            <path id="lensPath" d="M 50, 50 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" fill="none" />
                                            <text fontSize="4" className="font-sans tracking-[0.6em] uppercase">
                                                <textPath href="#lensPath">
                                                    CINEMATOGRAFIA DE ALTO IMPACTO • SEEA CONCEITO • DESIGN HERITAGE • 
                                                </textPath>
                                            </text>
                                        </svg>
                                    </motion.div>
                                </motion.div>

                                {/* Decorative Dots */}
                                <div className="absolute -top-10 -right-10 flex gap-2">
                                    <div className="w-1 h-1 rounded-full bg-[var(--color-cta)]" />
                                    <div className="w-1 h-1 rounded-full bg-[var(--color-cta)]/40" />
                                    <div className="w-1 h-1 rounded-full bg-[var(--color-cta)]/20" />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Vertical Divider */}
                    <div className="absolute left-[8%] bottom-0 w-[0.5px] h-48 bg-gradient-to-b from-transparent to-[var(--color-category)]/20" />
                </section>



                {/* 4. NOSSO ACERVO (FocusRail Imersivo) */}
                <section id="nosso-acervo" className="relative pt-32 pb-20 bg-[var(--color-background)]">
                    <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-28 mb-12">
                         <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-[0.62rem] font-bold font-sans uppercase tracking-[0.55em] text-[var(--color-category)] mb-6"
                         >
                            Nosso Acervo
                         </motion.p>
                         <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-sans font-extralight tracking-tight text-[var(--color-text)] mb-2">
                             PORTFÓLIO <span className="font-serif italic text-[var(--color-cta)]">seletivo</span>
                         </h2>
                         <div className="w-16 h-[1.5px] bg-[var(--color-cta)]/20 mt-8" />
                    </div>
                    
                    <FocusRail 
                        items={PORTFOLIO_ITEMS} 
                        autoPlay={true} 
                        interval={5000}
                        loop={true} 
                    />
                </section>

        </div>

        {/* ═══ DIVIDER: Portfólio → Metodologia ═══ */}
        <div className="w-full py-1 bg-[var(--color-background)]">
            <div className="max-w-7xl mx-auto flex items-center gap-6 px-6 sm:px-12 lg:px-20">
                <div className="flex-1 h-[0.5px] bg-gradient-to-r from-transparent via-[#CA8A04]/20 to-transparent" />
            </div>
        </div>
        {/* Fim do Bloco 1 */}

        {/* Bloco 2: Metodologia — FORA do overflow-hidden para que sticky funcione */}
        <ProcessoHorizontal />

        {/* ═══ DIVIDER: Metodologia → Depoimentos ═══ */}
        <div className="w-full py-1 bg-[var(--color-background)]">
            <div className="max-w-7xl mx-auto flex items-center gap-6 px-6 sm:px-12 lg:px-20">
                <div className="flex-1 h-[0.5px] bg-gradient-to-r from-transparent via-[#CA8A04]/20 to-transparent" />
            </div>
        </div>

        {/* Bloco 3: Seções após a Metodologia (overflow-hidden safe) */}
        <div className="text-[var(--color-text)] relative overflow-hidden bg-[var(--color-background)]">

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
        {/* Fim do Bloco 3 */}
        </>
    )
}
