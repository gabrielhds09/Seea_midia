'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

interface StaggerTextProps {
    text: string
    className?: string
    delay?: number
}

export default function StaggerText({ text, className = '', delay = 0 }: StaggerTextProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    const onMouseEnter = () => {
        if (!containerRef.current) return
        const chars = containerRef.current.querySelectorAll('.char-item')
        gsap.to(chars, {
            y: '-100%',
            opacity: 0,
            duration: 0.3,
            stagger: 0.02,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.set(chars, { y: '100%' })
                gsap.to(chars, {
                    y: '0%',
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.02,
                    ease: "power2.out"
                })
            }
        })
    }

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden inline-block cursor-pointer ${className}`}
            onMouseEnter={onMouseEnter}
        >
            <div className="flex">
                {text.split('').map((char, i) => (
                    <span
                        key={i}
                        className="char-item inline-block whitespace-pre transition-colors duration-300"
                    >
                        {char}
                    </span>
                ))}
            </div>
            {/* Auxiliary layer for the seamless loop appearance can be added here if needed, 
                but GSAP set/to handles the "re-entry" cleanly for this $10k feel. */}
        </div>
    )
}
