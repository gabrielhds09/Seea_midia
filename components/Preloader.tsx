'use client'

import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

/**
 * SEEA PRELOADER — Ultra-Luxury Marble White
 *
 * White marble texture entry, fast and deliberate.
 * Total ~4.2s. Logo in, 2 elegant phrases, clean exit.
 */

const PHRASES = [
    {
        parts: [
            { text: 'A ELEGÂNCIA ', type: 'caps' },
            { text: 'mora nos', type: 'serif' },
            { text: ' DETALHES', type: 'caps' },
            { text: '.', type: 'caps' },
        ]
    },
    {
        parts: [
            { text: 'SUA PRESENÇA ', type: 'caps' },
            { text: 'é o seu', type: 'serif' },
            { text: ' MAIOR ATIVO', type: 'caps' },
            { text: '.', type: 'caps' },
        ]
    },
    {
        parts: [
            { text: 'NÓS ENXERGAMOS ', type: 'caps' },
            { text: 'o que os outros', type: 'serif' },
            { text: ' APENAS VÊEM', type: 'caps' },
            { text: '.', type: 'caps' },
        ]
    },
]

const PHRASE_SHOW = 3000
const FADE_TIME = 1000
const DEFAULT_TOTAL = PHRASES.length * (PHRASE_SHOW + FADE_TIME) + 2500

export default function Preloader() {
    const [visible, setVisible] = useState(true)
    const [exiting, setExiting] = useState(false)
    const [activePhrase, setActivePhrase] = useState(0)
    const [phraseVisible, setPhraseVisible] = useState(false)
    const [duration, setDuration] = useState(DEFAULT_TOTAL)
    const [isReturning, setIsReturning] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const logoRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const barRef = useRef<HTMLDivElement>(null)

    // GSAP entrance
    useEffect(() => {
        if (!containerRef.current || !logoRef.current) return

        const ctx = gsap.context(() => {
            // Scroll to top on refresh
            window.scrollTo(0, 0);

            const hasSeen = sessionStorage.getItem('seea_intro_seen')
            if (hasSeen) {
                setDuration(8000) // Restore time for phrases even on repeat - ~8s total
                setIsReturning(true)
            }

            const handleBeforeUnload = () => window.scrollTo(0, 0);
            window.addEventListener('pagehide', handleBeforeUnload);

            const tl = gsap.timeline({ delay: 0.3 })

            // Stunning logo reveal: slide up + scale down + fade in, much more editorial
            tl.from(logoRef.current!, {
                opacity: 0,
                y: 35,
                scale: 1.05,
                duration: 2.2,
                ease: 'expo.out',
            })

            if (lineRef.current) {
                tl.from(lineRef.current, {
                    scaleX: 0,
                    duration: 1.6,
                    ease: 'power3.inOut',
                }, '-=1.4')
            }

            if (barRef.current) {
                gsap.fromTo(barRef.current,
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: (duration - 500) / 1000,
                        ease: 'power1.inOut',
                        transformOrigin: 'left center',
                        delay: 0.5,
                    }
                )
            }
        }, containerRef)

        return () => ctx.revert()
    }, [duration])

    // Phrase rotation
    useEffect(() => {
        if (!visible || exiting) return
        const initialDelay = isReturning ? 800 : 1500
        const t0 = setTimeout(() => setPhraseVisible(true), initialDelay)
        const interval = setInterval(() => {
            setPhraseVisible(false)
            setTimeout(() => {
                setActivePhrase((prev) => prev < PHRASES.length - 1 ? prev + 1 : prev)
                setPhraseVisible(true)
            }, FADE_TIME)
        }, PHRASE_SHOW + FADE_TIME)
        return () => { clearTimeout(t0); clearInterval(interval) }
    }, [visible, exiting])

    // Exit
    useEffect(() => {
        const timer = setTimeout(() => {
            setExiting(true)
            sessionStorage.setItem('seea_intro_seen', 'true')
            setTimeout(() => setVisible(false), 1000)
        }, duration)
        return () => clearTimeout(timer)
    }, [duration])

    if (!visible) return null

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden"
            style={{
                background: 'linear-gradient(170deg, var(--color-seea-bg) 0%, var(--color-seea-bg-warm) 100%)',
                transform: exiting ? 'translateY(-100%)' : 'translateY(0)',
                transition: 'transform 1.4s cubic-bezier(0.77, 0, 0.175, 1)',
                pointerEvents: exiting ? 'none' : 'auto',
                opacity: 1, // Retain opacity to act as a solid curtain
            }}
        >
            {/* Marble texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='6' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23m)'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'multiply',
                }}
            />
            {/* Fine grain */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
                }}
            />
            {/* Warm radial center */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,252,248,0.6) 0%, transparent 100%)',
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-6">

                {/* Logo — brand hero moment */}
                <div ref={logoRef} className="mb-14">
                    <Image
                        src="/logo-seea-dark.png"
                        alt="SEEA Mídia"
                        width={400}
                        height={130}
                        className="w-[220px] sm:w-[280px] h-auto object-contain"
                        priority
                    />
                </div>

                {/* Separator */}
                <div
                    ref={lineRef}
                    className="w-14 h-[0.5px] mb-10 origin-center"
                    style={{ background: 'linear-gradient(90deg, transparent, #c8c2bc, transparent)' }}
                />

                {/* Phrase */}
                <div
                    className="text-center min-h-[2rem]"
                    style={{
                        opacity: phraseVisible ? 1 : 0,
                        transform: phraseVisible ? 'translateY(0)' : 'translateY(6px)',
                        transition: 'opacity 0.9s cubic-bezier(0.19,1,0.22,1), transform 0.9s cubic-bezier(0.19,1,0.22,1)',
                    }}
                >
                    <p className="text-[0.68rem] sm:text-[0.75rem] leading-[1.8] tracking-[0.28em] text-neutral-400">
                        {PHRASES[activePhrase].parts.map((part, i) => {
                            if (part.type === 'serif') {
                                return (
                                    <span key={i} className="font-serif italic tracking-[0.12em] text-neutral-500">
                                        {part.text}
                                    </span>
                                )
                            }
                            return (
                                <span key={i} className="font-sans font-light">
                                    {part.text}
                                </span>
                            )
                        })}
                    </p>
                </div>

                {/* Loading bar */}
                <div
                    className="mt-12 w-[120px] sm:w-[150px] h-[0.5px] rounded-full overflow-hidden"
                    style={{ background: '#e0dcd8' }}
                >
                    <div
                        ref={barRef}
                        className="h-full rounded-full origin-left"
                        style={{
                            transform: 'scaleX(0)',
                            background: 'linear-gradient(90deg, #c8a882 0%, #431846 100%)',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
