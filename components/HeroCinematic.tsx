'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroBackgroundCanvas from './HeroBackgroundCanvas'

gsap.registerPlugin(ScrollTrigger)

/**
 * SEEA HERO — White Marble + Clean Dark Bridge
 *
 * Hero: white marble textured background, dark editorial typography.
 * Statement section: gradient bridge white → clean dark (#111111).
 * Animation delay aligned with Preloader (~9.6s).
 */

const LuxuryLineText = ({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) => (
    <span className={`inline-block overflow-hidden pt-2 pb-4 -mb-4 -mt-2 ${className || ''}`} style={style}>
        <span className="hero-line inline-block will-change-transform translate-y-[120%] rotate-[2deg] translate-z-0">
            {text}
        </span>
    </span>
)

export default function HeroCinematic() {
    const heroRef = useRef<HTMLElement>(null)
    const headlineRef = useRef<HTMLDivElement>(null)
    const metaLeftRef = useRef<HTMLDivElement>(null)
    const metaRightRef = useRef<HTMLDivElement>(null)
    const ruleRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLAnchorElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const statementRef = useRef<HTMLDivElement>(null)
    const statementRuleRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!heroRef.current || !headlineRef.current) return

        const ctx = gsap.context(() => {
            // Smart Intro detection
            const hasSeen = typeof window !== 'undefined' && sessionStorage.getItem('seea_intro_seen')
            const introDelay = hasSeen ? 8.0 : 10.5

            const tl = gsap.timeline({
                delay: introDelay,
                defaults: { ease: 'expo.out' },
            })

            if (ruleRef.current) {
                tl.from(ruleRef.current, {
                    scaleX: 0,
                    duration: 1.8,
                    ease: 'power3.inOut',
                    transformOrigin: 'left center',
                })
            }

            const lines = headlineRef.current!.querySelectorAll('.hero-line')
            tl.to(lines,
                { y: '0%', rotation: 0, opacity: 1, duration: 2.2, stagger: 0.15, ease: 'power4.out' },
                '-=1.2'
            )

            if (metaLeftRef.current) {
                tl.from(metaLeftRef.current, { opacity: 0, y: 15, duration: 1.5 }, '-=1.2')
            }
            if (metaRightRef.current) {
                tl.from(metaRightRef.current, { opacity: 0, y: 15, duration: 1.5 }, '-=1.3')
            }
            if (ctaRef.current) {
                tl.from(ctaRef.current, { opacity: 0, scale: 0.95, y: 15, duration: 1.5 }, '-=0.9')
            }
            if (scrollRef.current) {
                tl.from(scrollRef.current, { opacity: 0, y: -10, duration: 1.2 }, '-=0.5')
            }

            // ═══ LIVING MAGNETIC DOT ═══
            const dot = headlineRef.current!.querySelector('.signature-dot')
            const glow = headlineRef.current!.querySelector('.living-glow')

            if (dot) {
                let isReady = false;

                // Wait for the timeline to completely finish the 3D text entry
                tl.call(() => {
                    isReady = true;
                    // Ultra-slow Breathing Life starts ONLY after landing
                    gsap.to(dot, { scale: 1.05, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
                    if (glow) {
                        gsap.to(glow, { opacity: 0.3, scale: 2.2, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
                    }
                })

                // Magnetism
                window.addEventListener('mousemove', (e) => {
                    if (!isReady) return; // Ignore mouse hover while letters are 3D-folding

                    const { clientX, clientY } = e
                    const rect = dot.getBoundingClientRect()
                    const centerX = rect.left + rect.width / 2
                    const centerY = rect.top + rect.height / 2
                    const distanceX = clientX - centerX
                    const distanceY = clientY - centerY
                    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

                    if (distance < 200) {
                        gsap.to(dot, {
                            x: distanceX * 0.2,
                            y: distanceY * 0.2,
                            duration: 0.6,
                            ease: 'power2.out',
                            overwrite: 'auto'
                        })
                    } else {
                        gsap.to(dot, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.3)', overwrite: 'auto' })
                    }
                })
            }

            // ═══ PARALLAX ═══
            gsap.to(headlineRef.current!, {
                yPercent: -12,
                autoAlpha: 0.8,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
            })

            // ═ STATEMENT PARALLAX ═
            if (statementRef.current) {
                gsap.to(statementRef.current.querySelector('h2'), {
                    yPercent: -15,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: statementRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                })
            }

            // ═══ STATEMENT — ScrollTrigger ═══
            if (statementRef.current) {
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

                const revealLines = statementRef.current.querySelectorAll('.reveal-line-inner')
                gsap.from(revealLines, {
                    yPercent: 100,
                    rotateX: 5,
                    opacity: 0,
                    duration: 2,
                    stagger: 0.12,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: statementRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                })

                const tags = statementRef.current.querySelectorAll('.service-tag')
                gsap.from(tags, {
                    opacity: 0,
                    scale: 0.9,
                    y: 12,
                    duration: 1.2,
                    stagger: 0.08,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: statementRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none none',
                    }
                })
            }

        }, heroRef)

        return () => {
            ctx.revert()
            window.removeEventListener('mousemove', () => { })
        }
    }, [])

    return (
        <>
            {/* ════════════════════════════════
                HERO — White Marble
            ════════════════════════════════ */}
            <section
                ref={heroRef}
                className="relative flex flex-col justify-center min-h-[100dvh] overflow-hidden"
                style={{
                    background: 'linear-gradient(175deg, var(--color-seea-bg) 0%, var(--color-seea-bg-warm) 100%)',
                }}
            >
                {/* ── INTERACTIVE SILK BACKGROUND ── */}
                <div className="absolute inset-0 z-0">
                    <div className="block md:hidden absolute inset-0 apple-mirror-static" />
                    <div className="hidden md:block absolute inset-0">
                        <HeroBackgroundCanvas />
                    </div>
                </div>

                {/* Warm radial warmth — center */}
                <div
                    className="absolute inset-0 pointer-events-none z-[1]"
                    style={{
                        background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,252,248,0.3) 0%, transparent 100%)',
                    }}
                />

                {/* BRAND CHARM LIGHTS — Subtle purple flares */}
                <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
                    <div className="absolute top-[20%] -right-32 w-[600px] h-[600px] bg-[#431846]/[0.015] rounded-full blur-[160px]" />
                    <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-[#431846]/[0.012] rounded-full blur-[120px]" />
                </div>

                {/* ── Layout Grid ── */}
                <div className="relative z-[2] w-full px-6 sm:px-12 lg:px-20 xl:px-28 pt-[18vh] sm:pt-[22vh] pb-16">

                    {/* Top Rule */}
                    <div
                        ref={ruleRef}
                        className="w-full h-[0.5px] mb-10 sm:mb-14 origin-left"
                        style={{
                            background: 'linear-gradient(90deg, #c0bbb4 0%, transparent 100%)',
                        }}
                    />

                    {/* ── HEADLINE ── */}
                    <div ref={headlineRef} className="mb-12 sm:mb-16">
                        <h1 className="text-[clamp(2.6rem,8.5vw,7.5rem)] leading-[0.95] font-light tracking-[-0.04em] flex flex-wrap gap-x-[0.22em] gap-y-[0.1em] items-end">
                            <LuxuryLineText text="UM TIME" className="font-sans text-[#111111]" />
                            <div className="basis-full h-0" />
                            <LuxuryLineText text="QUE" className="font-sans text-[#111111]" />
                            <LuxuryLineText text="enxerga cada" className="font-serif italic font-normal serif-luxury text-[#431846]/90 relative" style={{ fontSize: '1.08em', top: '0.12em' }} />
                            <div className="basis-full h-0" />
                            <LuxuryLineText text="PROJETO" className="font-sans text-[#111111]" />
                            <LuxuryLineText text="como uma" className="font-serif italic font-normal serif-luxury text-[#431846]/90 relative" style={{ fontSize: '1.08em', top: '0.12em' }} />
                            <div className="basis-full h-0" />
                            <LuxuryLineText text="HISTÓRIA" className="font-sans text-[#111111]" />

                            {/* Living Dot */}
                            <span className="inline-block overflow-hidden pt-4 pb-4 -mt-4 -mb-4">
                                <span
                                    className="signature-dot hero-line inline-block text-[#431846] font-bold relative will-change-transform z-10 cursor-default translate-y-[120%]"
                                    style={{ transformOrigin: '50% 100%' }}
                                >
                                    .
                                    <span className="living-glow absolute left-1/2 bottom-[0.25em] -translate-x-1/2 w-[0.25em] h-[0.25em] bg-[#431846] rounded-full blur-[4px] opacity-0 -z-10 pointer-events-none"></span>
                                </span>
                            </span>
                        </h1>
                    </div>


                    {/* ── Bottom Meta — Split ── */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 sm:gap-4">

                        {/* Left: Services */}
                        <div ref={metaLeftRef} className="flex flex-col gap-3">
                            <p className="text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.55em] text-[#431846]">
                                O que fazemos
                            </p>
                            <div className="flex flex-wrap gap-x-5 gap-y-1">
                                {['Branding', 'Conteúdo', 'Estratégia', 'Tráfego'].map((s) => (
                                    <span
                                        key={s}
                                        className="text-[0.72rem] sm:text-[0.78rem] font-light tracking-[0.15em] uppercase text-neutral-400 hover:text-[#431846] transition-colors cursor-default"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Right: CTA + Meta */}
                        <div ref={metaRightRef} className="flex flex-col items-start sm:items-end gap-4">
                            <p className="text-[0.62rem] font-bold uppercase tracking-[0.55em] text-[#431846]">
                                SÃO PAULO — BRASIL / EST. 2024
                            </p>
                            <a
                                ref={ctaRef}
                                href="https://wa.me/5511999999999?text=Olá! Vim pelo site da SEEA e gostaria de agendar uma conversa estratégica."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center gap-3 text-[0.75rem] sm:text-[0.8rem] font-medium uppercase tracking-[0.25em] text-neutral-700 transition-all duration-700 hover:text-neutral-900 animate-shimmer"
                            >
                                <span className="relative">
                                    Agendar Conversa
                                    <span className="absolute left-0 bottom-[-3px] w-0 h-[1px] bg-neutral-700 transition-all duration-700 group-hover:w-full" />
                                </span>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    className="transition-transform duration-600 group-hover:translate-x-1.5"
                                >
                                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* ── REFINED SCROLL INDICATOR ── */}
                <div
                    ref={scrollRef}
                    className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
                >
                    <div className="flex items-center gap-2">
                        <span className="text-[0.5rem] text-[#431846] opacity-40">[</span>
                        <span className="text-[0.55rem] font-medium uppercase tracking-[0.5em] text-neutral-400">
                            Scroll
                        </span>
                        <span className="text-[0.5rem] text-[#431846] opacity-40">]</span>
                    </div>
                    <div className="w-[1px] h-12 bg-neutral-200 relative overflow-hidden">
                        <div
                            className="absolute top-0 left-0 w-full"
                            style={{
                                height: '35%',
                                background: 'linear-gradient(180deg, transparent, #431846)',
                                animation: 'scrollLine 3.2s cubic-bezier(0.19, 1, 0.22, 1) infinite',
                            }}
                        />
                    </div>
                </div>

                <style jsx>{`
                    @keyframes scrollLine {
                        0% { transform: translateY(-100%); opacity: 0; }
                        20% { opacity: 1; }
                        80% { opacity: 1; }
                        100% { transform: translateY(300%); opacity: 0; }
                    }
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-33.33%); }
                    }
                    .animate-marquee {
                        animation: marquee 35s linear infinite;
                    }
                `}</style>
            </section>

            {/* ════════════════════════════════
                STATEMENT — Gradient Bridge
                White marble → clean dark (#111111)
            ════════════════════════════════ */}
            <section
                className="relative py-36 sm:py-48 xl:py-60 px-6 sm:px-12 lg:px-20 xl:px-28 overflow-hidden"
                style={{
                    background: 'linear-gradient(180deg, #f3f0ec 0%, #dedad5 22%, #b0aaa4 42%, #5a5552 60%, #222020 78%, #111111 100%)',
                }}
            >
                {/* Marble texture — fades out with background */}
                <div
                    className="hidden md:block absolute inset-0 pointer-events-none opacity-[0.04]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='6' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23m)'/%3E%3C/svg%3E")`,
                        mixBlendMode: 'multiply',
                    }}
                />

                <div ref={statementRef} className="relative z-[1] max-w-6xl mx-auto">
                    {/* Rule — starts neutral, reads white at bottom */}
                    <div
                        ref={statementRuleRef}
                        className="w-full h-[0.5px] mb-14 sm:mb-20 origin-left"
                        style={{
                            background: 'linear-gradient(90deg, #b0aaa4 0%, transparent 70%)',
                        }}
                    />

                    {/* Statement text — white, legible against darkening bg */}
                    <div className="mb-16 sm:mb-24">
                        <div className="overflow-hidden mb-2">
                            <div className="reveal-line-inner">
                                <h2 className="text-[clamp(1.8rem,5vw,4.5rem)] leading-[1.06] font-extralight tracking-[-0.03em] text-white">
                                    <span className="font-sans uppercase">Gestão de carreira </span>
                                    <span className="font-serif italic font-light text-white/40" style={{ fontSize: '0.85em', marginLeft: '0.1em' }}>e</span>
                                </h2>
                            </div>
                        </div>
                        <div className="overflow-hidden mb-2">
                            <div className="reveal-line-inner">
                                <h2 className="text-[clamp(1.8rem,5vw,4.5rem)] leading-[1.06] font-extralight tracking-[-0.03em] text-white uppercase">
                                    <span className="font-sans">imagem</span>
                                </h2>
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <div className="reveal-line-inner">
                                <h2 className="text-[clamp(1.8rem,5vw,4.5rem)] leading-[1.06] font-extralight tracking-[-0.03em] text-white">
                                    <span className="font-serif italic font-light text-white/40 lowercase" style={{ fontSize: '0.9em' }}>para quem quer ir </span>
                                    <span className="font-sans uppercase">além do óbvio</span>
                                    <span className="text-[#431846]">.</span>
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* Service tags */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        {['Gestão de Carreira', 'Branding Pessoal', 'Conteúdo Estratégico', 'Tráfego Pago', 'Roteiro'].map((tag) => (
                            <span
                                key={tag}
                                className="service-tag px-5 py-2.5 rounded-full border border-white/15 text-[0.65rem] sm:text-[0.7rem] font-medium uppercase tracking-[0.22em] text-white/40 transition-all duration-500 hover:border-white/30 hover:text-white/65 cursor-default"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
            <GlowFrame />
        </>
    )
}

function GlowFrame() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[8000] overflow-hidden">
            <div className="absolute inset-0 border-[0.5px] border-white/5 box-content" />
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(17,17,17,0.08)] opacity-40" />
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/10 to-transparent opacity-10" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/5 to-transparent opacity-10" />
        </div>
    )
}
