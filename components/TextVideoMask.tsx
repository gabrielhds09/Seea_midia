'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface TextVideoMaskProps {
    text: string
    videoSrc?: string
    className?: string
}

export default function TextVideoMask({ text, videoSrc, className = '' }: TextVideoMaskProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "7%"])

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden flex items-center justify-center py-12 md:py-16 ${className}`}
        >
            {/* ONLY Background Gradient - Vivid Purple/Pink/Blue */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 z-0" />

            <div className="relative w-full flex items-center justify-center">
                <div className="relative">

                    {/* White/Gray Gradient Text (Background SEEA) */}
                    <h2
                        className="relative z-10 text-[18vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] font-black uppercase tracking-tighter text-transparent bg-clip-text select-none"
                        style={{
                            backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(136,136,136,0.3))',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                        }}
                    >
                        {text}
                    </h2>

                    {/* SVG Mask for Red Animated Gradient */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <defs>
                            <mask id={`mask-${text.replace(/\s/g, '')}`}>
                                <rect x="0" y="0" width="100%" height="100%" fill="black" />
                                <text
                                    x="50%"
                                    y="50%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="white"
                                    className="text-[18vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] font-black uppercase tracking-tighter"
                                    style={{ fontFamily: 'var(--font-inter)' }}
                                >
                                    {text}
                                </text>
                            </mask>
                        </defs>
                    </svg>

                    {/* Red Animated Gradient (Front SEEA) */}
                    <div
                        className="absolute inset-0 z-20"
                        style={{
                            mask: `url(#mask-${text.replace(/\s/g, '')})`,
                            WebkitMask: `url(#mask-${text.replace(/\s/g, '')})`
                        }}
                    >
                        <div className="w-full h-full bg-gradient-to-br from-[#ed1c24] via-[#ff4d4d] to-[#ed1c24] animate-pulse" />
                    </div>

                    {/* Ghost Text for Spacing */}
                    <h2 className="opacity-0 relative z-0 text-[18vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] font-black uppercase tracking-tighter">
                        {text}
                    </h2>
                </div>
            </div>
        </div>
    )
}
