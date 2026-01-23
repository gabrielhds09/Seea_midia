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

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden flex items-center justify-center min-h-[50vh] md:min-h-[70vh] py-20 ${className}`}
        >

            {/* Layer 1: Vivid Gradient Background - BRIGHT and VISIBLE */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-800 z-0" />

            {/* Layer 2: White/Silver "Ghost" SEEA - CLEARLY VISIBLE */}
            <motion.h2
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute z-10 text-[15vw] sm:text-[13vw] md:text-[12vw] leading-[0.85] font-black uppercase tracking-tighter text-white/30 select-none"
                style={{
                    textShadow: '0 0 40px rgba(255,255,255,0.3)'
                }}
            >
                {text}
            </motion.h2>

            {/* Layer 3: Red "Main" SEEA - SOLID and CLEAR */}
            <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                className="relative z-20 text-[14vw] sm:text-[12vw] md:text-[11vw] leading-[0.85] font-black uppercase tracking-tighter text-center"
                style={{
                    color: '#ed1c24',
                    textShadow: '0 4px 20px rgba(237, 28, 36, 0.4), 0 0 60px rgba(237, 28, 36, 0.2)'
                }}
            >
                {text}
            </motion.h2>

            {/* Subtle tagline below */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm md:text-base text-white/60 uppercase tracking-[0.3em] z-30"
            >
                Vem de <em className="italic font-serif">see</em>, enxergar.
            </motion.p>
        </div>
    )
}
