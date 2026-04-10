'use client'

import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

/**
 * SEEA PRELOADER — Heritage Luxury Update
 *
 * Estilo: Liquid Editorial (Marble White)
 * Tempo: ~4.5s total para fluidez premium.
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
    },const PHRASE_SHOW = 1200
const FADE_TIME = 600
const MIN_DISPLAY_TIME = 3500 // Min visual time for branding

// Assets to preload for a "Zero-Blank-Frame" experience
const CRITICAL_ASSETS = [
    '/black.png',
    '/thumbnails/thumb-01.jpg',
    '/thumbnails/thumb-02.jpg',
    '/thumbnails/thumb-03.jpg',
    '/thumbnails/thumb-04.jpg',
    '/thumbnails/thumb-05.jpg',
    '/thumbnails/thumb-06.jpg',
    '/thumbnails/thumb-07.jpg',
    '/thumbnails/thumb-08.jpg',
    '/thumbnails/thumb-09.jpg',
    '/thumbnails/thumb-10.jpg',
    '/thumbnails/thumb-13.JPG', // Mapping case sensitive
]

export default function Preloader() {
    const [visible, setVisible] = useState(true)
    const [exiting, setExiting] = useState(false)
    const [activePhrase, setActivePhrase] = useState(0)
    const [phraseVisible, setPhraseVisible] = useState(false)
    const [loadProgress, setLoadProgress] = useState(0)
    const [isReturning, setIsReturning] = useState(false)
    const [assetsLoaded, setAssetsLoaded] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const logoRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const barRef = useRef<HTMLDivElement>(null)

    // Actual Asset Preloading
    useEffect(() => {
        let loadedCount = 0;
        const totalCount = CRITICAL_ASSETS.length;

        const updateProgress = () => {
            loadedCount++;
            const progress = (loadedCount / totalCount) * 100;
            setLoadProgress(progress);
            if (loadedCount === totalCount) {
                setAssetsLoaded(true);
            }
        };

        CRITICAL_ASSETS.forEach(src => {
            const img = new window.Image();
            img.onload = updateProgress;
            img.onerror = updateProgress; // Continue anyway if one fails
            img.src = src;
        });
    }, []);

    // GSAP entrance
    useEffect(() => {
        if (!containerRef.current || !logoRef.current) return

        const ctx = gsap.context(() => {
            window.scrollTo(0, 0);

            const hasSeen = sessionStorage.getItem('seea_intro_seen')
            if (hasSeen) setIsReturning(true)

            const handleBeforeUnload = () => window.scrollTo(0, 0);
            window.addEventListener('pagehide', handleBeforeUnload);

            const tl = gsap.timeline({ delay: 0.3 })

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
        }, containerRef)

        return () => ctx.revert()
    }, [])

    // Smooth Bar Animation tied to actual progress
    useEffect(() => {
        if (barRef.current) {
            gsap.to(barRef.current, {
                scaleX: loadProgress / 100,
                duration: 0.8,
                ease: 'power2.out',
            });
        }
    }, [loadProgress]);

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
    }, [visible, exiting, isReturning])

    // Coordinated Exit
    useEffect(() => {
        if (assetsLoaded) {
            // Stay at least MIN_DISPLAY_TIME to show phrases
            const minimumTimer = isReturning ? 2000 : MIN_DISPLAY_TIME;
            const timer = setTimeout(() => {
                setExiting(true)
                sessionStorage.setItem('seea_intro_seen', 'true')
                setTimeout(() => setVisible(false), 1400)
            }, minimumTimer)
            return () => clearTimeout(timer)
        }
    }, [assetsLoaded, isReturning])

    if (!visible) return null

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden"
            style={{
                background: 'var(--color-background)',
                transform: exiting ? 'translateY(-100%)' : 'translateY(0)',
                transition: 'transform 1.4s cubic-bezier(0.77, 0, 0.175, 1)',
                pointerEvents: 'auto',
                opacity: 1,
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
            
            {/* Warm radial center */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(202, 138, 4, 0.04) 0%, transparent 100%)',
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-6">

                {/* Logo — brand hero moment (Updated to black.png) */}
                <div ref={logoRef} className="mb-14 relative w-[200px] sm:w-[240px] h-24">
                    <Image
                        src="/black.png"
                        alt="SEEA Mídia"
                        fill
                        className="object-contain"
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
                    className="text-center min-h-[2.5rem]"
                    style={{
                        opacity: phraseVisible ? 1 : 0,
                        transform: phraseVisible ? 'translateY(0)' : 'translateY(6px)',
                        transition: 'opacity 0.9s cubic-bezier(0.19,1,0.22,1), transform 0.9s cubic-bezier(0.19,1,0.22,1)',
                    }}
                >
                    <p className="text-[0.68rem] sm:text-[0.75rem] leading-[1.8] tracking-[0.28em] text-neutral-400">
                        {PHRASES[activePhrase].parts.map((part, i) => (
                            <span 
                                key={i} 
                                className={part.type === 'serif' ? "font-serif italic tracking-[0.12em] text-neutral-500" : "font-sans font-light"}
                            >
                                {part.text}
                            </span>
                        ))}
                    </p>
                </div>

                {/* Loading bar */}
                <div
                    className="mt-12 w-[120px] sm:w-[150px] h-[0.5px] bg-neutral-200/20 overflow-hidden"
                >
                    <div
                        ref={barRef}
                        className="h-full origin-left bg-gradient-to-r from-[var(--color-cta)] to-[var(--color-heritage-purple)]"
                        style={{ scaleX: 0 }}
                    />
                </div>
                
                {/* Progress Text (Subtle) */}
                <p className="mt-4 text-[0.5rem] tracking-[0.3em] uppercase text-stone-500/40">
                    Sincronizando Legado Digital...
                </p>
            </div>
        </div>
    )
}
    )
}
