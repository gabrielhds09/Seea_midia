'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false, // Default native touch is usually better, but if user wants "butter", we can try. 
            touchMultiplier: 2, // Faster response on touch
        } as any)

        function update(time: number) {
            lenis.raf(time * 1000)
        }

        lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add(update)
        gsap.ticker.lagSmoothing(0)

        return () => {
            gsap.ticker.remove(update)
            lenis.destroy()
        }
    }, [])

    return null
}
