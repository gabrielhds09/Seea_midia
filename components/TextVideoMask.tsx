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
            {/* The Text acting as a Mask */}
            <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 text-[12vw] leading-[0.85] font-black uppercase tracking-tighter text-transparent bg-clip-text select-none"
                style={{
                    backgroundImage: 'url(/noise.png), linear-gradient(to bottom, #fff, #888)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    // Fallback if video mix-blend doesn't work perfectly in all browsers
                    color: 'transparent'
                }}
            >
                {text}
            </motion.h2>

            {/* Video Background Layer - Only visible where text overlays if we use screen/multiply logic, 
                OR we can use strictly SVG masking for better browser support. 
                
                For this premium effect, utilizing 'mix-blend-mode: overlay' or 'screen' 
                on white text over a video is often smoother than background-clip: text 
                with video which can be buggy.
                
                Let's try the modern CSS 'mix-blend-mode: darken' approach with a white text over video?
                Actually, simpler: Video absolute, Title absolute with 'mix-blend-mode: multiply' (black text) 
                to cut out? No, we want video INSIDE text.
                
                Best method: 
                1. Text with black fill, white background.
                2. Video behind.
                3. Mix-blend-mode: screen on the text layer? No.
                
                Let's stick to the cleanest method: 'background-clip: text' on the container? 
                No, video can't be a background-image easily.
                
                Method B: SVG Mask.
            */}

            <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-100">
                <motion.div style={{ y }} className="w-full h-[120%] -mt-[10%] relative">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-80"
                    >
                        <source src="/feature-reel.mp4" type="video/mp4" />
                    </video>
                    {/* Fallback gradient if video fails */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 mix-blend-multiply" />
                </motion.div>
            </div>

            {/* 
               Correction: To make video appear INSIDE text without complex SVG:
               We render the video, coverage full div.
               We render the Text on top with `color: black` and `background: white`.
               We Apply `mix-blend-mode: screen` to the TEXT container.
               
               If background is black:
               Text should be White. Background Black.
               Video Behind.
               Mix-blend-mode: multiply on text? 
               
               Let's go with the "Knockout" text effect using `mix-blend-mode: multiply`.
               1. Container bg = Black (site bg).
               2. Video Layer.
               3. Text Layer = Text BLACK, Background BLACK? No.
               
               Let's try the WebkitBackgroundClip text approach with a GIF/Video workaround 
               or simply use the "mix-blend-mode: lighten" approach.
               
               Layer 1 (Bottom): Video
               Layer 2 (Top): Text (Color: Black, Bg: #050505) with `mix-blend-mode: lighten`? 
               This will make the Black text transparent (showing video) and the dark BG stays dark?
               No, lighten keeps the lightest.
               
               Actually, pure CSS `background-clip: text` works with gradients, but not elements.
               
               Alternative: Use `mix-blend-mode: darken`.
               Layer 1: Video.
               Layer 2: Text (Color: White, Bg: Black).
               Overlay: darken.
               White text becomes the video (if video is brighter).
               
               Let's try the SVG Mask method. It's robust.
            */}

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
                            style={{ fontFamily: 'var(--font-inter)' }} // Ensure font matches
                        >
                            {text}
                        </text>
                    </mask>
                </defs>
            </svg>

            {/* Actual Visible Video masked by the text */}
            <div className="absolute inset-0 z-10" style={{ mask: `url(#mask-${text.replace(/\s/g, '')})`, WebkitMask: `url(#mask-${text.replace(/\s/g, '')})` }}>
                {/* Fallback Gradient if video missing - Replacing the video tag with a nice animated gradient */}
                <div className="w-full h-full bg-gradient-to-br from-[#431846] via-[#ed1c24] to-[#2a1535] animate-gradient-xy" />
            </div>

            {/* Ghost Text for Layout / Height */}
            <h2 className="opacity-0 relative z-0 text-[12vw] leading-[0.85] font-black uppercase tracking-tighter w-full text-center">
                {text}
            </h2>

        </div>
    )
}
