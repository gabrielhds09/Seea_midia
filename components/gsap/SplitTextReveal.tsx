'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface SplitTextRevealProps {
    text: string
    className?: string
    duration?: number
    stagger?: number
}

export default function SplitTextReveal({
    text,
    className = '',
    duration = 0.6,
    stagger = 0.1
}: SplitTextRevealProps) {
    const textRef = useRef<HTMLHeadingElement>(null)
    const [isReady, setIsReady] = useState(false)

    const splitTextIntoLines = () => {
        if (!textRef.current) return

        const element = textRef.current
        const words = text.split(' ')

        // Create temporary container to measure line breaks
        element.innerHTML = words.map(word =>
            `<span class="word" style="display:inline-block; margin-right:0.3em">${word}</span>`
        ).join('')

        const wordElements = Array.from(element.querySelectorAll('.word')) as HTMLElement[]
        const lines: HTMLElement[][] = []
        let currentLine: HTMLElement[] = []
        let currentTop = -1

        wordElements.forEach(word => {
            const top = word.offsetTop
            if (top !== currentTop) {
                if (currentLine.length > 0) {
                    lines.push(currentLine)
                }
                currentLine = [word]
                currentTop = top
            } else {
                currentLine.push(word)
            }
        })
        if (currentLine.length > 0) {
            lines.push(currentLine)
        }

        // Wrap each line in a container with overflow hidden
        element.innerHTML = ''
        lines.forEach((lineWords, lineIndex) => {
            const lineWrapper = document.createElement('div')
            lineWrapper.className = 'line-wrapper'
            lineWrapper.style.overflow = 'hidden'
            lineWrapper.style.display = 'block'

            const lineInner = document.createElement('div')
            lineInner.className = 'line-inner'
            lineInner.style.display = 'flex'
            lineInner.style.flexWrap = 'nowrap'
            lineInner.innerHTML = lineWords.map(w => w.outerHTML).join('')

            lineWrapper.appendChild(lineInner)
            element.appendChild(lineWrapper)
        })

        setIsReady(true)
    }

    const animate = () => {
        if (!textRef.current || !isReady) return

        const lines = textRef.current.querySelectorAll('.line-inner')

        gsap.from(lines, {
            duration,
            yPercent: 100,
            opacity: 0,
            stagger,
            ease: 'expo.out',
        })
    }

    useEffect(() => {
        // Wait for fonts to load
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                splitTextIntoLines()
            })
        } else {
            setTimeout(splitTextIntoLines, 100)
        }
    }, [text])

    useEffect(() => {
        if (isReady) {
            animate()
        }
    }, [isReady])

    const replay = () => {
        if (!textRef.current) return
        const lines = textRef.current.querySelectorAll('.line-inner')

        gsap.killTweensOf(lines)
        gsap.set(lines, { yPercent: 100, opacity: 0 })

        gsap.to(lines, {
            duration: duration * 2, // Slower replay
            yPercent: 0,
            opacity: 1,
            stagger: stagger * 1.5,
            ease: 'expo.out',
        })
    }

    return (
        <div className="flex flex-col items-center gap-8">
            <h1
                ref={textRef}
                className={`text-4xl md:text-6xl font-bold leading-tight ${className}`}
                style={{ opacity: isReady ? 1 : 0 }}
            >
                {text}
            </h1>
            <button
                onClick={replay}
                className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors font-medium"
            >
                Replay Slowly
            </button>
        </div>
    )
}
