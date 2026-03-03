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

            // Calculate total width to scroll
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
                scrub: 1.5, // Increased scrub for iPhone-style inertial feel
                invalidateOnRefresh: true,
                anticipatePin: 1, // Fixes abrupt jumping when pinning
            })

            // Entrance reveal for the whole track to avoid "pop-in"
            gsap.fromTo(track,
                { opacity: 0, x: 100 },
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

            // Parallax effect for images inside the track (Luxury feel)
            const cards = gsap.utils.toArray('.portfolio-card-image-inner') as HTMLElement[]
            cards.forEach((inner) => {
                gsap.to(inner, {
                    xPercent: 20, // Slightly reduced for more natural feel on smaller screens
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: () => `+=${getScrollAmount() * -1}`,
                        scrub: 1.5, // Match main track scrub
                        invalidateOnRefresh: true,
                    }
                })
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [items])

    return (
        <section ref={sectionRef} id="portfolio" className="relative h-[100svh] w-full bg-[#111111] text-[#faf9f7] overflow-hidden flex flex-col justify-center">

            {/* GSAP Horizontal Track Container */}
            <div className="w-full h-full flex items-center">
                <div ref={trackRef} className="flex h-max items-center w-max pl-6 sm:pl-12 lg:pl-20 xl:pl-28 gap-8 md:gap-16">

                    {/* 1. Intro Column (Left Side) - Aligned with SEEA Brand */}
                    <div className="flex flex-col gap-6 w-[35vw] md:w-[32vw] min-w-[300px] flex-shrink-0 pr-12 md:pr-16">
                        <div className="space-y-5">
                            <p className="text-[0.65rem] md:text-[0.75rem] font-bold uppercase tracking-[0.6em] text-[#431846]">
                                Portfólio Seletivo
                            </p>
                            <h2
                                className="font-extralight tracking-tighter text-[#faf9f7]"
                                style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', lineHeight: 0.85 }}
                            >
                                <span className="font-sans uppercase">NOSSO</span><br />
                                <span className="font-serif italic font-normal serif-luxury text-[#431846]" style={{ fontSize: '1.1em' }}>acervo</span>
                            </h2>
                            <div className="w-16 h-[1.5px] bg-[#431846]/40 mt-10 mb-6" />
                            <p className="text-[1.15rem] md:text-[1.4rem] font-light leading-[1.6] text-[#faf9f7]/50 italic font-serif max-w-sm">
                                Profissionais incríveis que passaram pelas nossas lentes.
                            </p>
                        </div>
                    </div>

                    {/* The Portfolio Cards */}
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="portfolio-card group relative h-[52vh] md:h-[65vh] aspect-[3/4.2] overflow-hidden rounded-[2px]"
                            style={{ flexShrink: 0 }}
                        >
                            <div className="absolute inset-0 overflow-hidden bg-[#1a1a1a]">
                                {/* Inner wrapper for horizontal parallax */}
                                <div className="portfolio-card-image-inner absolute inset-0 w-[130%] h-full -left-[15%] origin-center will-change-transform translate-z-0">
                                    {item.video ? (
                                        <video
                                            src={item.video}
                                            className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        />
                                    ) : (
                                        <Image
                                            src={item.src}
                                            alt={item.alt}
                                            fill
                                            className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                                            sizes="(max-width: 768px) 80vw, 40vw"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Refined Minimalist Info (Apple Style) */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.45em] text-[#ed1c24] mb-3">
                                        {item.category || "CASE STUDY"}
                                    </p>
                                    <h3 className="text-2xl md:text-3xl font-light text-white mb-1 font-serif italic tracking-tight">
                                        {item.title || item.alt}
                                    </h3>
                                </div>
                            </div>

                            {/* Subtle border for separation */}
                            <div className="absolute inset-0 border border-white/5 pointer-events-none" />
                        </div>
                    ))}

                    {/* End Spacer */}
                    <div className="w-[15vw] h-full flex items-center justify-center flex-shrink-0" />
                </div>
            </div>
        </section>
    )
}
