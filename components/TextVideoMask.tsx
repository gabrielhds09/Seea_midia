'use client'

import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

interface TextVideoMaskProps {
    maskSrc?: string
    videoSrc?: string
    className?: string
    aspectRatio?: string
}

export default function TextVideoMask({
    maskSrc = '/SEEA-dark-tip.png',
    videoSrc = '/video/video-01.mp4',
    className = '',
    aspectRatio = 'aspect-[500/160]'
}: TextVideoMaskProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        // Subtle floating movement for the logo mask
        gsap.to(containerRef.current, {
            y: -8,
            duration: 4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        })

        // Slight rotation for organic feel
        gsap.to(containerRef.current, {
            rotate: 1,
            duration: 5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 1
        })
    }, [])

    return (
        <div className={`relative ${aspectRatio} w-full ${className}`}>
            <motion.div
                ref={containerRef}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full flex items-center justify-center"
            >
                {/* 1. Base Logo — Solid and recognizable */}
                <div
                    className="absolute inset-0 z-0 bg-contain bg-center bg-no-repeat opacity-[0.95]"
                    style={{ backgroundImage: `url(${maskSrc})` }}
                />

                {/* 2. Effect Layer — Atmospheric Video strictly inside the logo shape */}
                <div
                    className="absolute inset-0 z-10 w-full h-full opacity-40 mix-blend-soft-light"
                    style={{
                        WebkitMaskImage: `url(${maskSrc})`,
                        maskImage: `url(${maskSrc})`,
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                    }}
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover scale-150 grayscale"
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                </div>

                {/* 3. Luxury Polish — Subtle reflection sweep */}
                <div
                    className="absolute inset-0 z-20 pointer-events-none opacity-[0.15]"
                    style={{
                        WebkitMaskImage: `url(${maskSrc})`,
                        maskImage: `url(${maskSrc})`,
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                        background: 'linear-gradient(135deg, white 0%, rgba(255,255,255,0.8) 50%, white 100%)',
                    }}
                />
            </motion.div>
        </div>
    )
}
