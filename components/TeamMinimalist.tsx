'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TEAM_MEMBERS = [
    {
        name: "ALINE V.",
        role: "Fundadora & CEO",
        bio: "Profissional do audiovisual desde os 18 anos, criadora do método SEEA.",
        image: "/team/aline.jpg",
        social: { instagram: "#", linkedin: "#" }
    },
    {
        name: "DOUGLAS D.",
        role: "Videomaker",
        bio: "Produção audiovisual com excelência técnica e artística.",
        image: "/team/douglas.jpg",
        social: { instagram: "#", linkedin: "#" }
    },
    {
        name: "MAISA O.",
        role: "Videomaker",
        bio: "Direção e produção de conteúdo visual estratégico.",
        image: "/team/maisa.jpg",
        social: { instagram: "#", linkedin: "#" }
    },
    {
        name: "GABRIEL H.",
        role: "Lead Developer",
        bio: "Especialista em experiências digitais de alto impacto.",
        image: "/team/gabriel.jpg",
        social: { instagram: "#", linkedin: "#" }
    },
    {
        name: "LEONIDAS S.",
        role: "Videomaker",
        bio: "Captura de imagens que contam histórias memoráveis.",
        image: "/team/leonidas.jpg",
        social: { instagram: "#", linkedin: "#" }
    },
    {
        name: "SABRINA B.",
        role: "Videomaker",
        bio: "Olhar criativo para produções audiovisuais de impacto.",
        image: "/team/sabrina.jpg",
        social: { instagram: "#", linkedin: "#" }
    }
]

export default function TeamMinimalist() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Handle scroll for active index
    useEffect(() => {
        const container = scrollRef.current
        if (!container) return

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft
            // Approximate card width + gap for index calculation
            const cardWidth = isMobile ? 140 + 16 : 400 + 24
            const newIndex = Math.round(scrollLeft / cardWidth)
            setActiveIndex(Math.min(newIndex, TEAM_MEMBERS.length - 1))
        }

        container.addEventListener('scroll', handleScroll, { passive: true })
        return () => container.removeEventListener('scroll', handleScroll)
    }, [isMobile])

    // Auto-scroll
    useEffect(() => {
        if (isPaused) return

        const interval = setInterval(() => {
            if (!scrollRef.current) return

            const cardWidth = isMobile ? 140 + 16 : 400 + 24
            const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth
            const currentScroll = scrollRef.current.scrollLeft

            let nextScroll = currentScroll + cardWidth

            // Loop back to start if at end
            if (nextScroll > maxScroll + 10) { // +10 buffer
                nextScroll = 0
            }

            scrollRef.current.scrollTo({
                left: nextScroll,
                behavior: 'smooth'
            })
        }, 3000) // 3 seconds interval

        return () => clearInterval(interval)
    }, [isMobile, isPaused])

    // Scroll to card / navigation
    const scrollToCard = (index: number) => {
        if (!scrollRef.current) return
        const cardWidth = isMobile ? 140 + 16 : 400 + 24
        scrollRef.current.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        })
    }

    const scrollNext = () => {
        if (!scrollRef.current) return
        const cardWidth = isMobile ? 140 + 16 : 400 + 24
        scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' })
    }

    const scrollPrev = () => {
        if (!scrollRef.current) return
        const cardWidth = isMobile ? 140 + 16 : 400 + 24
        scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' })
    }

    return (
        <section className="relative w-full py-20 md:py-32 overflow-hidden bg-[#050505]">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#431846]/30 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#ed1c24]/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-[1600px] mx-auto px-6 relative z-10">
                {/* Header & Controls */}
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]"
                        >
                            <span className="text-white">MENTES</span> <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed1c24] via-[#ff6b6b] to-[#431846]">CRIATIVAS</span>
                        </motion.h2>
                    </div>

                    {/* Desktop Navigation Arrows */}
                    <div className="hidden md:flex gap-4">
                        <button
                            onClick={scrollPrev}
                            className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
                            aria-label="Anterior"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-black transition-colors">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
                            aria-label="Próximo"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-black transition-colors">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Horizontal Scroll Row */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide ps-6 md:ps-12"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Team Members */}
                    {TEAM_MEMBERS.map((member, index) => (
                        <div key={index} className="flex-shrink-0 w-[300px] md:w-[400px] snap-center group">
                            {/* Image - Square */}
                            <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-6 bg-neutral-900 border border-white/5">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 300px, 400px"
                                />
                                {/* Purple overlay effect from reference */}
                                <div className="absolute inset-0 bg-[#431846]/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-60" />
                            </div>

                            {/* Name & Role - Centered Below */}
                            <div className="text-center">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase tracking-wide">
                                    {member.name.split(' ')[0]}
                                </h3>
                                <p className="text-[#888] text-xs md:text-sm font-bold tracking-[0.2em] uppercase group-hover:text-[#ed1c24] transition-colors">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Navigation Dots */}
                <div className="md:hidden flex justify-center gap-2 mt-4">
                    {TEAM_MEMBERS.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToCard(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                ? 'w-8 bg-gradient-to-r from-[#ed1c24] to-[#431846]'
                                : 'w-2 bg-white/20'
                                }`}
                            aria-label={`Ver membro ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
