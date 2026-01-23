'use client'

import React, { useRef, useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Play } from 'lucide-react'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

// Extended data for tracks
const PROJECTS = [
    { client: "Nebula Stream", category: "Brand", color: "from-purple-900 to-slate-900", accentColor: "#a855f7", video: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-263-large.mp4" },
    { client: "Apex Fitness", category: "Strategy", color: "from-emerald-900 to-slate-900", accentColor: "#10b981", video: "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-lines-2770-large.mp4" },
    { client: "Velvet Estates", category: "Social", color: "from-rose-900 to-slate-900", accentColor: "#f43f5e", video: "https://assets.mixkit.co/videos/preview/mixkit-red-ink-swirl-underwater-2166-large.mp4" },
    { client: "Lumina Tech", category: "Launch", color: "from-amber-900 to-slate-900", accentColor: "#f59e0b", video: null },
    { client: "Urban Pulse", category: "Identity", color: "from-cyan-900 to-blue-900", accentColor: "#06b6d4", video: null },
    { client: "Zenith AI", category: "Product", color: "from-fuchsia-900 to-purple-900", accentColor: "#d946ef", video: null },
    { client: "Horizon", category: "Web", color: "from-orange-900 to-red-900", accentColor: "#f97316", video: null },
    { client: "Echo Sound", category: "Audio", color: "from-teal-900 to-green-900", accentColor: "#14b8a6", video: null }
]

export default function ProjectTracks() {
    const containerRef = useRef<HTMLDivElement>(null)
    const row1Ref = useRef<HTMLDivElement>(null)
    const row2Ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Row 1: Moves Left with subtle rotation
            gsap.to(row1Ref.current, {
                xPercent: -25,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            })

            // Row 2: Moves Right
            gsap.fromTo(row2Ref.current,
                { xPercent: -25 },
                {
                    xPercent: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5
                    }
                }
            )

            // Parallax depth effect on cards
            gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
                gsap.fromTo(card,
                    {
                        y: (i % 2 === 0) ? 30 : -30,
                        rotateX: 5
                    },
                    {
                        y: (i % 2 === 0) ? -30 : 30,
                        rotateX: -5,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 2
                        }
                    }
                )
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    const ProjectCard = ({ item, index }: { item: typeof PROJECTS[0], index: number }) => {
        const [isHovered, setIsHovered] = useState(false)

        return (
            <motion.div
                className="project-card group relative flex-shrink-0 w-[280px] h-[180px] sm:w-[360px] sm:h-[240px] md:w-[520px] md:h-[320px] rounded-2xl sm:rounded-3xl overflow-hidden mx-3 sm:mx-5 cursor-pointer"
                style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{
                    scale: 1.03,
                    rotateY: 2,
                    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                }}
            >
                {/* Glowing border on hover */}
                <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{
                        background: `linear-gradient(135deg, ${item.accentColor}40, transparent)`,
                        filter: 'blur(20px)',
                        transform: 'scale(1.1)'
                    }}
                />

                {/* Card Container */}
                <div className="absolute inset-[1px] rounded-3xl overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.08] group-hover:border-white/20 transition-all duration-500 backdrop-blur-sm">

                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-50 group-hover:opacity-70 transition-opacity duration-700`} />

                    {/* Video (if available) */}
                    {item.video && (
                        <video
                            src={item.video}
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-50 transition-opacity duration-700 scale-110 group-hover:scale-100"
                            style={{ transition: 'opacity 0.7s, transform 1s ease-out' }}
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => {
                                e.currentTarget.pause();
                                e.currentTarget.currentTime = 0;
                            }}
                        />
                    )}

                    {/* Noise Texture Overlay */}
                    <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }} />

                    {/* Content */}
                    <div className="absolute inset-0 p-7 flex flex-col justify-between z-10">
                        <div className="flex justify-between items-start">
                            <motion.span
                                className="px-4 py-1.5 rounded-full border text-[10px] uppercase tracking-[0.15em] font-medium backdrop-blur-md"
                                style={{
                                    borderColor: `${item.accentColor}40`,
                                    backgroundColor: 'rgba(0,0,0,0.4)',
                                    color: item.accentColor
                                }}
                                whileHover={{ scale: 1.05 }}
                            >
                                {item.category}
                            </motion.span>

                            <motion.div
                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/30 backdrop-blur-sm group-hover:border-white/30 transition-all"
                                whileHover={{ scale: 1.1, rotate: 45 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            >
                                {item.video ? (
                                    <Play className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                                ) : (
                                    <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                                )}
                            </motion.div>
                        </div>

                        <div>
                            {/* Number */}
                            <span
                                className="text-[80px] font-black leading-none opacity-[0.08] absolute bottom-4 right-6"
                                style={{ color: item.accentColor }}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </span>

                            <h3
                                className="text-3xl font-bold text-white mb-2 transition-colors duration-300"
                                style={{
                                    textShadow: isHovered ? `0 0 30px ${item.accentColor}60` : 'none'
                                }}
                            >
                                {item.client}
                            </h3>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div
                                    className="w-8 h-[2px] rounded-full"
                                    style={{ backgroundColor: item.accentColor }}
                                />
                                <span className="text-white/50 text-xs uppercase tracking-wider">Ver Projeto</span>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        )
    }

    return (
        <section ref={containerRef} className="relative py-40 overflow-hidden w-full bg-[#0c0510]">

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-900/15 rounded-full blur-[120px]" />
            </div>

            {/* Header */}
            <div className="mb-24 px-6 max-w-7xl mx-auto text-center relative z-10">
                <motion.span
                    className="inline-block text-red-500 text-xs uppercase tracking-[0.3em] mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Portfolio
                </motion.span>
                <motion.h2
                    className="text-3xl sm:text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Projetos <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-red-500">Em Destaque</span>
                </motion.h2>
                <motion.div
                    className="flex items-center justify-center gap-4"
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-red-500" />
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-red-500" />
                </motion.div>
            </div>

            {/* Track 1 */}
            <div ref={row1Ref} className="flex whitespace-nowrap mb-16 w-max pl-[15vw]" style={{ willChange: 'transform' }}>
                {[...PROJECTS, ...PROJECTS].map((item, i) => (
                    <ProjectCard key={`r1-${i}`} item={item} index={i % PROJECTS.length} />
                ))}
            </div>

            {/* Track 2 */}
            <div ref={row2Ref} className="flex whitespace-nowrap w-max" style={{ willChange: 'transform' }}>
                {[...PROJECTS].reverse().concat([...PROJECTS].reverse()).map((item, i) => (
                    <ProjectCard key={`r2-${i}`} item={item} index={(PROJECTS.length - 1) - (i % PROJECTS.length)} />
                ))}
            </div>

        </section>
    )
}
