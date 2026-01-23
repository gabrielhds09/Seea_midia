'use client'

import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
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

// Mobile Card (vertical layout with info below)
function MobileTeamCard({ member, isActive }: { member: typeof TEAM_MEMBERS[0], isActive: boolean }) {
    return (
        <motion.div
            className="flex-shrink-0 w-[140px] snap-center flex flex-col items-center"
            animate={{ opacity: isActive ? 1 : 0.6, scale: isActive ? 1 : 0.95 }}
            transition={{ duration: 0.3 }}
        >
            {/* Image Container - Vertical & Taller */}
            <div className="relative w-full h-[180px] overflow-hidden rounded-xl bg-gradient-to-br from-[#431846] to-[#1a0d20] border border-white/[0.1] mb-3 shadow-lg">
                {/* Image */}
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center"
                    sizes="140px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
            </div>

            {/* Info Below Image - Clean Typography */}
            <div className="text-center w-full px-1">
                <h3 className="text-sm font-bold text-white tracking-tight leading-none mb-1">
                    {member.name}
                </h3>
                <p className="text-[#ed1c24] text-[10px] font-medium uppercase tracking-wider">{member.role}</p>
            </div>
        </motion.div>
    )
}

// Desktop Card (with 3D tilt)
function DesktopTeamCard({ member, index }: { member: typeof TEAM_MEMBERS[0], index: number }) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 300, damping: 30 })
    const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 300, damping: 30 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        x.set(e.clientX - centerX)
        y.set(e.clientY - centerY)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
        setIsHovered(false)
    }

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative group cursor-pointer"
        >
            {/* Glow */}
            <motion.div
                className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{
                    background: 'linear-gradient(135deg, rgba(237,28,36,0.2), rgba(67,24,70,0.2))',
                    filter: 'blur(20px)'
                }}
            />

            {/* Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] group-hover:border-white/20 transition-all duration-500">
                {/* Image Container */}
                <div className="relative h-[400px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#431846] to-[#1a0d20]" />

                    {/* Number */}
                    <motion.div
                        initial={{ opacity: 0.05 }}
                        animate={{ opacity: isHovered ? 0.15 : 0.05 }}
                        className="absolute top-6 left-6 text-white text-8xl font-black select-none"
                    >
                        {String(index + 1).padStart(2, '0')}
                    </motion.div>

                    {/* Frame Corners */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#ed1c24]/60" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#ed1c24]/60" />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />

                    {/* Bio Reveal */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute inset-0 flex items-center justify-center p-8 bg-black/60 backdrop-blur-sm"
                            >
                                <p className="text-white/80 text-center text-lg leading-relaxed font-light">
                                    "{member.bio}"
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Info */}
                <div className="p-6 flex items-center justify-between bg-black/40">
                    <div>
                        <motion.h3
                            className="text-xl font-bold text-white tracking-tight mb-1"
                            animate={{ color: isHovered ? '#ed1c24' : '#ffffff' }}
                        >
                            {member.name}
                        </motion.h3>
                        <p className="text-white/40 text-sm tracking-wide">{member.role}</p>
                    </div>
                    <motion.div
                        animate={{ rotate: isHovered ? 45 : 0 }}
                        className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-[#ed1c24]/50 group-hover:text-[#ed1c24] transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default function TeamMinimalist() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

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
        if (!container || !isMobile) return

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft
            const cardWidth = 140 + 16 // card width + gap
            const newIndex = Math.round(scrollLeft / cardWidth)
            setActiveIndex(Math.min(newIndex, TEAM_MEMBERS.length - 1))
        }

        container.addEventListener('scroll', handleScroll, { passive: true })
        return () => container.removeEventListener('scroll', handleScroll)
    }, [isMobile])

    // Scroll to card
    const scrollToCard = (index: number) => {
        if (!scrollRef.current) return
        const cardWidth = 140 + 16
        scrollRef.current.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        })
    }

    return (
        <section className="relative w-full min-h-screen bg-[#1a0d20] text-white py-20 md:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#431846]/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#ed1c24]/8 rounded-full blur-[120px]" />
            </div>

            {/* Header */}
            <div className="max-w-[1400px] mx-auto mb-12 md:mb-24 px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-6"
                >
                    <div className="w-8 md:w-12 h-[1px] bg-gradient-to-r from-[#ed1c24] to-transparent" />
                    <span className="text-[#ed1c24] text-xs font-medium tracking-[0.3em] uppercase">
                        Nosso Time
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase"
                >
                    <span className="text-white">MENTES</span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed1c24] via-[#ff6b6b] to-[#431846]">
                        CRIATIVAS
                    </span>
                </motion.h2>
            </div>

            {/* Mobile: Horizontal Scroll */}
            <div className="md:hidden relative z-10">
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 pb-8"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {TEAM_MEMBERS.map((member, index) => (
                        <MobileTeamCard
                            key={index}
                            member={member}
                            isActive={index === activeIndex}
                        />
                    ))}
                </div>

                {/* Dots Navigation */}
                <div className="flex justify-center gap-2 mt-6">
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

                {/* Counter */}
                <div className="text-center mt-4">
                    <span className="text-white/30 font-mono text-sm">
                        {String(activeIndex + 1).padStart(2, '0')} / {String(TEAM_MEMBERS.length).padStart(2, '0')}
                    </span>
                </div>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden md:block max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                    {TEAM_MEMBERS.map((member, index) => (
                        <DesktopTeamCard key={index} member={member} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
