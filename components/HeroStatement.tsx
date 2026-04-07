'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroStatement() {
    const statementRef = useRef<HTMLElement>(null)
    const statementRuleRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!statementRef.current) return

        const ctx = gsap.context(() => {
            // Rule animation
            if (statementRuleRef.current) {
                gsap.from(statementRuleRef.current, {
                    scaleX: 0,
                    duration: 1.8,
                    ease: 'expo.inOut',
                    transformOrigin: 'left center',
                    scrollTrigger: {
                        trigger: statementRef.current,
                        start: 'top 90%',
                        toggleActions: 'play none none none',
                    }
                })
            }

            // Reveal lines
            const revealLines = statementRef.current.querySelectorAll('.reveal-line-inner')
            gsap.from(revealLines, {
                yPercent: 100,
                rotateX: 5,
                opacity: 0,
                duration: 2.2,
                stagger: 0.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: statementRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                }
            })

            // Service tags
            const tags = statementRef.current.querySelectorAll('.service-tag')
            gsap.from(tags, {
                opacity: 0,
                scale: 0.95,
                y: 15,
                duration: 1.5,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: statementRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                }
            })

            // Slight parallax for the main content
            gsap.to(statementRef.current.querySelector('.statement-p'), {
                yPercent: -15,
                ease: 'none',
                scrollTrigger: {
                    trigger: statementRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            })

        }, statementRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={statementRef}
            className="relative py-36 sm:py-48 xl:py-64 px-6 sm:px-12 lg:px-20 xl:px-28 overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, var(--color-marble-white) 0%, #dedad5 25%, #b0aaa4 50%, #5a5552 75%, var(--color-stone-black) 100%)',
            }}
        >
            {/* Marble texture */}
            <div
                className="hidden md:block absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='6' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23m)'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'multiply',
                }}
            />

            <div className="relative z-[1] max-w-6xl mx-auto flex flex-col items-center text-center">
                
                {/* Visual Connection Rule */}
                <div
                    ref={statementRuleRef}
                    className="w-48 h-[0.5px] mb-20 origin-center"
                    style={{
                        background: 'linear-gradient(90deg, transparent 0%, #b0aaa4 50%, transparent 100%)',
                    }}
                />

                {/* Final Narrative Reveal: COMO UMA HISTÓRIA. */}
                <div className="mb-20 statement-p">
                    <div className="overflow-hidden mb-2">
                        <div className="reveal-line-inner">
                            <h2 className="text-[clamp(2.2rem,8vw,6.5rem)] leading-[0.95] font-light tracking-[-0.04em] text-stone-900">
                                <span className="font-serif italic font-light text-[var(--color-heritage-purple)]" style={{ fontSize: '1.05em' }}>Como</span>
                                <span className="font-sans uppercase"> uma</span>
                            </h2>
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <div className="reveal-line-inner">
                            <h2 className="text-[clamp(2.2rem,8vw,6.5rem)] leading-[0.95] font-light tracking-[-0.04em] text-stone-900 uppercase">
                                <span className="font-sans">história</span>
                                <span className="text-[var(--color-heritage-red)]">.</span>
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Refined Brand Tags */}
                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 max-w-2xl px-4">
                    {['Curadoria Digital', 'Legado Visual', 'Autoridade Pessoal', 'Presença de Luxo'].map((tag) => (
                        <span
                            key={tag}
                            className="service-tag px-6 py-2 border border-stone-400/20 text-[0.6rem] sm:text-[0.65rem] font-medium uppercase tracking-[0.3em] text-stone-500 transition-all duration-700 hover:border-[var(--color-heritage-purple)] hover:text-[var(--color-heritage-purple)] cursor-default"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}
