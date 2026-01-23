'use client'

import React, { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TextMarqueeProps {
    text: string
    direction?: 'left' | 'right'
    className?: string
}

export default function TextMarquee({ text, direction = 'left', className = '' }: TextMarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const movePercent = direction === 'left' ? -50 : 50

            gsap.to(textRef.current, {
                xPercent: movePercent,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.5
                }
            })
        }, containerRef)
        return () => ctx.revert()
    }, [direction])

    return (
        <div ref={containerRef} className={`relative w-full overflow-hidden py-12 flex items-center ${className}`}>
            <div ref={textRef} className="flex whitespace-nowrap w-max will-change-transform">
                {[...Array(4)].map((_, i) => ( // Repeat 4 times for infinite feel
                    <span
                        key={i}
                        className="text-[6rem] md:text-[10rem] font-black uppercase tracking-tighter opacity-10 px-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent"
                        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}
                    >
                        {text} <span className="text-purple-500 mx-4">•</span>
                    </span>
                ))}
            </div>
        </div>
    )
}
