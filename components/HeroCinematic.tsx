'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function HeroCinematic() {
    const [isLoading, setIsLoading] = useState(true)
    const { scrollY } = useScroll()

    // Parallax Effects
    const yLogo = useTransform(scrollY, [0, 800], [0, 150])
    const opacityHero = useTransform(scrollY, [0, 500], [1, 0])
    const yText = useTransform(scrollY, [0, 500], [0, 100])

    // Loading Simulation & Scroll Reset
    useEffect(() => {
        // Force scroll to top on refresh/load
        window.scrollTo(0, 0)

        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2200) // Tempo para apreciar o logo
        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            {/* === 1. PRELOADER CINEMATOGRÁFICO === */}
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1a0d20]"
                        exit={{
                            y: "-100%",
                            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
                        }}
                    >
                        {/* Logo Pulsante */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="relative"
                        >
                            <img
                                src="/logo-seea.png"
                                alt="SEEA"
                                className="w-48 md:w-64 brightness-200 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                            />

                            {/* Loading Bar Minimalista */}
                            <motion.div
                                className="mt-8 h-[2px] w-full bg-[#1a1a1a] rounded-full overflow-hidden"
                            >
                                <motion.div
                                    className="h-full bg-gradient-to-r from-[#431846] to-[#ed1c24]"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* === 2. HERO SECTION SOPHISTICATED === */}
            <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#1a0d20]">

                {/* BACKGROUND ATMOSFÉRICO SUTIL */}
                <div className="absolute inset-0 z-0 select-none pointer-events-none">
                    {/* Gradiente Base Profundo */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#2a1535] via-[#1a0d20] to-[#1a0d20]" />

                    {/* Glow Central Elegante */}
                    {/* Main Purple Glow */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[700px] bg-[#431846] rounded-full blur-[150px] opacity-[0.35]"
                        animate={{
                            opacity: [0.25, 0.4, 0.25],
                            scale: [1, 1.08, 1],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Top Purple Glow - Creates welcoming atmosphere */}
                    <motion.div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#431846] rounded-full blur-[120px] opacity-[0.25]"
                        animate={{
                            opacity: [0.2, 0.3, 0.2],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Subtle Red Accent Bottom */}
                    <motion.div
                        className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-[#ed1c24] rounded-full blur-[150px] opacity-[0.08]"
                        animate={{
                            opacity: [0.05, 0.1, 0.05],
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {/* CONTEÚDO PRINCIPAL */}
                <div className="relative z-10 w-full max-w-[1400px] px-6 flex flex-col items-center text-center">

                    {/* LOGO - Elegante e Menor */}
                    <motion.div
                        style={{ y: yLogo }}
                        className="mb-16 md:mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    >
                        <img
                            src="/logo-seea.png"
                            alt="SEEA Mídia"
                            className="w-[180px] md:w-[280px] h-auto object-contain drop-shadow-2xl opacity-90"
                        />
                    </motion.div>

                    {/* TEXTO EDITORIAL */}
                    <motion.div
                        style={{ opacity: opacityHero, y: yText }}
                        className="flex flex-col items-center gap-10 w-full"
                    >
                        <h1 className="flex flex-col items-center font-light text-white leading-[1.2] tracking-wide">

                            {/* LINHA 1: Frase inicial elegante */}
                            <div className="overflow-hidden">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    animate={!isLoading ? { y: 0 } : {}}
                                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="block text-2xl md:text-3xl lg:text-4xl text-white/50 uppercase tracking-[0.3em] mb-4"
                                >
                                    Gestão de Carreira
                                </motion.span>
                            </div>

                            {/* LINHA 2: Power Headline */}
                            <div className="overflow-hidden py-2">
                                <motion.div
                                    initial={{ y: "100%", opacity: 0 }}
                                    animate={!isLoading ? { y: 0, opacity: 1 } : {}}
                                    transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-normal text-white"
                                >
                                    e Imagem <span className="font-serif italic text-white/80">para</span>
                                </motion.div>
                            </div>

                            {/* LINHA 3: Quem quer ir além */}
                            <div className="overflow-hidden flex flex-wrap justify-center items-baseline gap-2 md:gap-6 mt-2">
                                <motion.span
                                    initial={{ y: "100%", opacity: 0 }}
                                    animate={!isLoading ? { y: 0, opacity: 1 } : {}}
                                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                                    className="block text-4xl md:text-6xl lg:text-7xl font-light text-white/90"
                                >
                                    quem quer ir
                                </motion.span>

                                <div className="relative px-2">
                                    <motion.span
                                        className="block text-4xl md:text-6xl lg:text-7xl font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-[#ed1c24] to-[#ff4d4d]"
                                        initial={{ opacity: 0 }}
                                        animate={!isLoading ? { opacity: 1 } : {}}
                                        transition={{ duration: 1.2, delay: 0.5 }}
                                    >
                                        além do óbvio
                                    </motion.span>
                                    <motion.div
                                        className="absolute -bottom-2 left-0 h-[1px] bg-[#ed1c24]"
                                        initial={{ opacity: 0, width: "100%" }}
                                        animate={!isLoading ? { opacity: 1 } : {}}
                                        transition={{ duration: 0.8, delay: 0.8 }}
                                    />
                                </div>
                            </div>
                        </h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={!isLoading ? { opacity: 1 } : {}}
                            transition={{ delay: 1.4, duration: 1 }}
                            className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/20 to-white/0 my-2"
                        />

                        {/* SUBTITLE */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 1.6, duration: 1 }}
                            className="text-base md:text-lg text-white/60 max-w-2xl font-light leading-relaxed tracking-wide"
                        >
                            Estratégias audiovisuais que transformam sua rotina em <strong className="text-white font-medium">posicionamento</strong> e sua presença em <strong className="text-white font-medium">autoridade</strong>.
                        </motion.p>

                        {/* CTA - Minimalist Luxury */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 1.8, duration: 1 }}
                            className="mt-6"
                        >
                            <button className="group relative flex items-center gap-4 px-10 py-5 bg-transparent border border-white/20 rounded-full hover:bg-white/5 transition-all duration-500">
                                <span className="text-xs uppercase tracking-[0.2em] font-medium text-white group-hover:text-[#ed1c24] transition-colors">
                                    Agendar Conversa Estratégica
                                </span>
                                <div className="w-2 h-2 rounded-full bg-[#ed1c24] group-hover:scale-150 transition-transform duration-500" />
                            </button>
                        </motion.div>

                    </motion.div>
                </div>

                {/* SCROLL INDICATOR */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-white/30 tracking-[0.3em] uppercase"
                    initial={{ opacity: 0 }}
                    animate={!isLoading ? { opacity: 1 } : {}}
                    transition={{ delay: 2.2, duration: 1 }}
                >
                    Scroll
                </motion.div>

            </section>
        </>
    )
}
