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
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
            {/* The Text acting as a Mask - Now purely transparent reference or simplified */}
            <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 text-[12vw] leading-[0.85] font-black uppercase tracking-tighter text-transparent select-none pointer-events-none"
                style={{
                    // Removed background clips that might cause artifacts on mobile
                    color: 'transparent'
                }}
            >
                {text}
            </motion.h2>

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
            <div className="absolute inset-0 z-10" style={{ mask: `url(#mask-${text.replace(/\s/g, '')})`, WebkitMask: `url(#mask-${text.replace(/\s/g, '')})` }}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/feature-reel.mp4" type="video/mp4" />
                </video>
                {/* Fallback Gradient if video fails or loads slow - Dark/Black for premium feel (No Red) */}
                <div className="absolute inset-0 bg-[#050505] -z-10" />
            </div>

            {/* Ghost Text for Layout / Height */}
            <h2 className="opacity-0 relative z-0 text-[12vw] leading-[0.85] font-black uppercase tracking-tighter w-full text-center">
                {text}
            </h2>

        </div >
    )
}
