'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface HorizontalScrollTextProps {
    text: string
    className?: string
}

export default function HorizontalScrollText({
    text,
    className = ''
}: HorizontalScrollTextProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        if (!wrapperRef.current || !textRef.current) return

        const wrapper = wrapperRef.current
        const textElement = textRef.current

        // Split text into characters manually
        const chars = text.split('').map((char, i) => {
            const span = document.createElement('span')
            span.textContent = char === ' ' ? '\u00A0' : char
            span.style.display = 'inline-block'
            return span
        })

        textElement.innerHTML = ''
        chars.forEach(char => textElement.appendChild(char))

        // Main horizontal scroll
        const scrollTween = gsap.to(textElement, {
            xPercent: -100,
            ease: 'none',
            scrollTrigger: {
                trigger: wrapper,
                pin: true,
                end: '+=5000px',
                scrub: true,
            }
        })

        // Animate each character
        chars.forEach((char) => {
            gsap.from(char, {
                yPercent: gsap.utils.random(-200, 200),
                opacity: 0,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: char,
                    containerAnimation: scrollTween,
                    start: 'left right',
                    end: 'left center',
                    scrub: true,
                }
            })
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [text])

    return (
        <section
            ref={wrapperRef}
            className={`overflow-hidden h-screen flex items-center ${className}`}
        >
            <div className="container mx-auto">
                <h3
                    ref={textRef}
                    className="flex w-max whitespace-nowrap gap-[4vw] pl-[100vw] text-[clamp(2rem,10vw,12rem)] font-semibold leading-tight"
                >
                    {text}
                </h3>
            </div>
        </section>
    )
}
