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

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden flex items-center justify-center min-h-[50vh] md:min-h-[60vh] py-16 md:py-20 ${className}`}
        >
            {/* Background Gradient - Vivid Purple/Pink/Blue */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 z-0" />

            <div className="relative w-full max-w-7xl mx-auto px-6">
                <div className="relative overflow-hidden">

                    {/* Main Text with Noise Texture Gradient */}
                    <h2
                        className="relative z-10 text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] font-black uppercase tracking-tighter text-transparent bg-clip-text select-none text-center"
                        style={{
                            backgroundImage: 'url(/noise.png), linear-gradient(to bottom, #fff, #888)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent'
                        }}
                    >
                        {text}
                    </h2>

                    {/* Video Background Layer with Blend Mode */}
                    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-100">
                        <motion.div
                            className="w-full h-[120%] -mt-[10%] relative"
                            style={{ y }}
                        >
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover opacity-80"
                            >
                                <source src="/feature-reel.mp4" type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 mix-blend-multiply" />
                        </motion.div>
                    </div>

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
                                    className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-black uppercase tracking-tighter"
                                    style={{ fontFamily: 'var(--font-inter)' }}
                                >
                                    {text}
                                </text>
                            </mask>
                        </defs>
                    </svg>

                    {/* Animated Gradient with Mask Applied */}
                    <div
                        className="absolute inset-0 z-10"
                        style={{
                            mask: `url(#mask-${text.replace(/\s/g, '')})`,
                            WebkitMask: `url(#mask-${text.replace(/\s/g, '')})`
                        }}
                    >
                        <div className="w-full h-full bg-gradient-to-br from-[#431846] via-[#ed1c24] to-[#2a1535] animate-pulse" />
                    </div>

                    {/* Ghost Text for Layout Spacing */}
                    <h2 className="opacity-0 relative z-0 text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] font-black uppercase tracking-tighter w-full text-center">
                        {text}
                    </h2>
                </div>

                {/* Tagline */}
                <motion.p
                    className="mt-4 text-base md:text-xl tracking-[0.2em] uppercase text-white/60 font-medium text-center md:text-left md:ml-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    Vem de <i className="italic not-italic">see</i>, enxergar.
                </motion.p>
            </div>
        </div>
    )
}
