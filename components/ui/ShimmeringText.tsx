'use client'

import { useEffect, useRef } from 'react'

interface ShimmeringTextProps {
    text: string
    className?: string
    wave?: boolean
    duration?: number
}

export default function ShimmeringText({
    text,
    className = '',
    wave = true,
    duration = 2,
}: ShimmeringTextProps) {
    const textRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (!textRef.current) return

        const chars = text.split('')
        textRef.current.innerHTML = chars
            .map((char, i) => {
                const delay = wave ? i * 0.05 : 0
                return `<span style="
          display: inline-block;
          animation: shimmer ${duration}s ease-in-out ${delay}s infinite;
        ">${char === ' ' ? '&nbsp;' : char}</span>`
            })
            .join('')
    }, [text, wave, duration])

    return (
        <>
            <style jsx>{`
        @keyframes shimmer {
          0%, 100% {
            opacity: 1;
            filter: brightness(1);
          }
          50% {
            opacity: 0.7;
            filter: brightness(1.5);
          }
        }
      `}</style>
            <span ref={textRef} className={`shimmering-text ${className}`} />
        </>
    )
}
