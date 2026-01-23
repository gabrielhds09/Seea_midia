'use client'

import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface TextVideoMaskProps {
    text: string
    videoSrc?: string // Optional, defaults to a texture if not provided
    className?: string
}

export default function TextVideoMask({ text, videoSrc, className = '' }: TextVideoMaskProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

    return (
        <div ref={containerRef} className={`relative overflow-hidden flex items-center justify-center ${className}`}>

            {/* Layer 1: Vivid Gradient Background (Visible behind everything) */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-red-900/40 to-black z-0" />

            {/* Layer 2: The "Ghost" SEEA (White/Silver Backing) */}
            <motion.h2
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute z-10 text-[13vw] leading-[0.85] font-black uppercase tracking-tighter text-white/10 select-none blur-[1px] transform -translate-y-2 translate-x-2"
                style={{ filter: 'blur(2px)' }}
            >
                {text}
            </motion.h2>

            {/* Layer 3: The Main Masked Video/Text (Front) */}
            <div className="relative z-20 w-full">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative text-[12vw] leading-[0.85] font-black uppercase tracking-tighter text-transparent select-none pointer-events-none w-full text-center"
                >
                    {text}
                </motion.h2>

                {/* SVG Mask Definition */}
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
                                className="text-[12vw] font-black uppercase tracking-tighter"
                                style={{ fontFamily: 'var(--font-inter)' }}
                            >
                                {text}
                            </text>
                        </mask>
                    </defs>
                </svg>

                {/* Actual Visible Video masked by the text */}
                <div className="absolute inset-0 z-30" style={{ mask: `url(#mask-${text.replace(/\s/g, '')})`, WebkitMask: `url(#mask-${text.replace(/\s/g, '')})` }}>
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="/feature-reel.mp4" type="video/mp4" />
                    </video>
                    {/* Fallback Gradient - Vivid Red/Purple for the "Red SEEA" look if video loads slow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ed1c24] via-[#a855f7] to-[#431846] animate-gradient-xy -z-10" />
                </div>
            </div>
        </div >
    )
}
