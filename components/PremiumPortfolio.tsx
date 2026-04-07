'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export interface PortfolioItem {
    src: string
    alt: string
    video?: string
    title?: string
    category?: string
}

interface PremiumPortfolioProps {
    items: PortfolioItem[]
}

export default function PremiumPortfolio({ items }: PremiumPortfolioProps) {
    const sectionRef = useRef<HTMLElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sectionRef.current || !trackRef.current) return

        const ctx = gsap.context(() => {
            const track = trackRef.current!

            const getScrollAmount = () => {
                const trackWidth = track.scrollWidth
                return -(trackWidth - window.innerWidth)
            }

            const tween = gsap.to(track, {
                x: getScrollAmount,
                ease: 'none',
            })

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: () => `+=${getScrollAmount() * -1}`,
                pin: true,
                animation: tween,
                scrub: 1.5,
                invalidateOnRefresh: true,
                anticipatePin: 1,
            })

            // Entrance reveal
            gsap.fromTo(track,
                { opacity: 0, x: 80 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.5,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [items])

    return (
        <section
            ref={sectionRef}
            id="portfolio"
            className="relative h-[100svh] w-full bg-[var(--color-background)] text-[var(--color-text)] overflow-hidden"
        >
            {/* Textura sutil de fundo */}
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: "radial-gradient(ellipse at 30% 60%, rgba(67,24,70,0.025) 0%, transparent 55%)"
            }} />

            {/* Track container — centralizado verticalmente */}
            <div className="w-full h-full flex items-center">
                <div ref={trackRef} className="flex h-max items-end w-max pl-6 sm:pl-12 lg:pl-20 xl:pl-28 gap-5 md:gap-8 lg:gap-10 pb-8">

                    {/* ═══ INTRO COLUMN ═══ */}
                    <div className="flex flex-col gap-6 w-[38vw] md:w-[30vw] min-w-[300px] flex-shrink-0 pr-8 md:pr-14 self-center">
                        <div className="space-y-5">
                            <p className="text-[0.65rem] md:text-[0.75rem] font-bold font-sans uppercase tracking-[0.6em] text-[var(--color-category)]">
                                Portfólio Seletivo
                            </p>
                            <h2
                                className="font-extralight font-sans tracking-tighter text-[var(--color-text)]"
                                style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', lineHeight: 0.85 }}
                            >
                                <span className="uppercase">NOSSO</span><br />
                                <span className="font-serif italic font-normal serif-luxury text-[var(--color-category)]" style={{ fontSize: '1.1em' }}>acervo</span>
                            </h2>
                            <div className="w-16 h-[1.5px] bg-[var(--color-category)]/40 mt-10 mb-6" />
                            <p className="text-[1.15rem] md:text-[1.4rem] font-light leading-[1.6] text-[var(--color-text)]/60 italic font-serif max-w-sm">
                                Profissionais incríveis que passaram pelas nossas lentes.
                            </p>

                            {/* Scroll hint */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 1.2 }}
                                className="mt-8 flex items-center gap-4 group"
                            >
                                <div className="relative w-[1px] h-12 bg-[var(--color-category)]/40 overflow-hidden">
                                    <div
                                        className="absolute left-0 top-0 w-full bg-[var(--color-cta)]"
                                        style={{
                                            height: '40%',
                                            animation: 'portfolio-scroll-v 2.5s cubic-bezier(0.19, 1, 0.22, 1) infinite'
                                        }}
                                    />
                                </div>
                                <span className="text-[0.6rem] font-bold font-sans uppercase tracking-[0.4em] text-[var(--color-category)]/60 group-hover:text-[var(--color-category)] transition-colors">
                                    Role para explorar
                                </span>
                            </motion.div>
                        </div>
                    </div>

                    {/* ═══ VIDEO CARDS ═══ */}
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="portfolio-card group relative flex-shrink-0 overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem]
                                       shadow-[0_12px_40px_-8px_rgba(49,35,56,0.12)]
                                       hover:shadow-[0_24px_60px_-10px_rgba(49,35,56,0.22)]
                                       transition-all duration-700 ease-out
                                       hover:-translate-y-1"
                            style={{
                                width: 'clamp(200px, 22vw, 320px)',
                                aspectRatio: '9 / 16',
                            }}
                        >
                            {/* Video / Image — proporção garantida, sem distorção */}
                            <div className="absolute inset-0 bg-[#F0ECE6]">
                                {item.video ? (
                                    <video
                                        src={item.video}
                                        className="absolute inset-0 w-full h-full object-cover object-center
                                                   transition-transform duration-[1.8s] ease-[cubic-bezier(0.16,1,0.3,1)]
                                                   group-hover:scale-[1.04]"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        poster={item.src}
                                    />
                                ) : (
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        className="object-cover object-center
                                                   transition-transform duration-[1.8s] ease-[cubic-bezier(0.16,1,0.3,1)]
                                                   group-hover:scale-[1.04]"
                                        sizes="(max-width: 768px) 60vw, 22vw"
                                    />
                                )}
                            </div>

                            {/* Hover overlay — editorial info */}
                            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6
                                           bg-gradient-to-t from-[#312338]/80 via-[#312338]/20 to-transparent
                                           opacity-0 group-hover:opacity-100
                                           transition-opacity duration-500 pointer-events-none">
                                <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                    <p className="text-[0.5rem] font-bold font-sans uppercase tracking-[0.4em] text-[#CA8A04] mb-2">
                                        {item.category || "Case Study"}
                                    </p>
                                    <h3 className="text-lg md:text-xl font-light text-white/90 font-serif italic tracking-tight leading-tight">
                                        {item.title || item.alt}
                                    </h3>
                                </div>
                            </div>

                            {/* Borda sutil de luxo */}
                            <div className="absolute inset-0 rounded-[inherit] border border-[#312338]/[0.06] pointer-events-none" />
                        </div>
                    ))}

                    {/* End spacer */}
                    <div className="w-[10vw] h-full flex-shrink-0" />
                </div>
            </div>
        </section>
    )
}
