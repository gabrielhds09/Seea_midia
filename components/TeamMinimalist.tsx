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
        image: "/team/aline.png",
        social: { instagram: "#", linkedin: "#" }
    },
    {
        name: "DOUGLAS D.",
        role: "Videomaker",
        bio: "Produção audiovisual com excelência técnica e artística.",
        image: "/team/douglas.png",
        social: { instagram: "#", linkedin: "#" }
    },
    {
        name: "MAISA O.",
        role: "Videomaker",
        bio: "Direção e produção de conteúdo visual estratégico.",
        image: "/team/maisa.png",
        social: { instagram: "#", linkedin: "#" }
    },
    {
        name: "GABRIEL H.",
        role: "Lead Developer",
        bio: "Especialista em experiências digitais de alto impacto.",
        image: "/team/gabriel.png",
        social: { instagram: "#", linkedin: "#" }
    },
    {
        name: "LEONIDAS S.",
        role: "Videomaker",
        bio: "Captura de imagens que contam histórias memoráveis.",
        image: "/team/leonidas.png",
        social: { instagram: "#", linkedin: "#" }
    },
    {
        name: "SABRINA B.",
        role: "Videomaker",
        bio: "Olhar criativo para produções audiovisuais de impacto.",
        image: "/team/sabrina.png",
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
        <section className="relative w-full py-20 md:py-32 overflow-hidden bg-[var(--color-background)]">
            {/* Top hairline */}
            <div className="absolute top-0 left-0 right-0 h-[0.5px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(17,17,17,0.08), transparent)' }} />

            <div className="max-w-[1600px] mx-auto px-6 relative z-10">
                {/* Header & Controls */}
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-[0.62rem] font-bold font-sans uppercase tracking-[0.55em] text-[var(--color-category)] mb-10">Equipe</p>
                        <div className="flex flex-col items-center md:items-start gap-[6px] mb-12">
                            <div className="w-16 h-[2.5px] bg-[var(--color-cta)]/50" />
                            <div className="w-10 h-[2.5px] bg-[var(--color-category)]/50" />
                        </div>
                        <div className="overflow-hidden mb-1">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                                className="font-extralight font-sans tracking-tight text-[var(--color-text)]"
                                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95 }}
                            >
                                <span className="tracking-tight">MENTES </span>
                                <span className="font-serif italic font-normal serif-luxury text-[var(--color-category)]" style={{ fontSize: '1.08em', marginLeft: '0.1em' }}>criativas</span>.
                            </motion.h2>
                        </div>
                    </div>

                    {/* Desktop Navigation Arrows */}
                    <div className="hidden md:flex gap-4">
                        <button
                            onClick={scrollPrev}
                            className="w-16 h-16 rounded-full border border-black/[0.1] flex items-center justify-center hover:bg-[var(--color-background-dark)] hover:text-white transition-all duration-300 group"
                            aria-label="Anterior">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black/50 group-hover:text-white transition-colors">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-16 h-16 rounded-full border border-black/[0.1] flex items-center justify-center hover:bg-[var(--color-background-dark)] hover:text-white transition-all duration-300 group"
                            aria-label="Próximo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black/50 group-hover:text-white transition-colors">
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
                            <motion.div
                                style={{ perspective: 1000 }}
                                onMouseMove={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect()
                                    const x = e.clientX - rect.left - rect.width / 2
                                    const y = e.clientY - rect.top - rect.height / 2
                                    gsap.to(e.currentTarget.querySelector('.card-inner'), {
                                        rotateY: x * 0.05,
                                        rotateX: -y * 0.05,
                                        duration: 0.6,
                                        ease: 'power2.out'
                                    })
                                }}
                                onMouseLeave={(e) => {
                                    gsap.to(e.currentTarget.querySelector('.card-inner'), {
                                        rotateY: 0,
                                        rotateX: 0,
                                        duration: 1,
                                        ease: 'elastic.out(1, 0.3)'
                                    })
                                }}
                                className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-6 bg-[#e8e4dd] border border-black/[0.06] group"
                            >
                                <div className="card-inner relative w-full h-full">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 300px, 400px"
                                    />
                                    {/* Purple overlay effect from reference */}
                                    <div className="absolute inset-0 bg-[var(--color-category)]/15 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-60" />
                                </div>
                            </motion.div>

                            {/* Name & Role - Centered Below */}
                            <div className="text-center">
                                <h3 className="text-2xl md:text-3xl font-bold font-sans text-[var(--color-text)] mb-2 uppercase tracking-wide">
                                    {member.name.split(' ')[0]}
                                </h3>
                                <p className="text-black/40 text-xs md:text-sm font-bold font-sans tracking-[0.2em] uppercase group-hover:text-[var(--color-category)] transition-colors">
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
                                ? 'w-8 bg-[var(--color-category)]'
                                : 'w-2 bg-black/20'
                                }`}
                            aria-label={`Ver membro ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
