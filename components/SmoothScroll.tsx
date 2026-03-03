'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.1, // Even snappier
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1.0,
            smoothTouch: false,
            touchMultiplier: 2.5, // High snappiness for Apple touch
            infinite: false,
        } as any)

        function update(time: number) {
            lenis.raf(time * 1000)
        }

        lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add(update)
        // Remove lagSmoothing to avoid artificial delays
        // gsap.ticker.lagSmoothing(0) 

        return () => {
            gsap.ticker.remove(update)
            lenis.destroy()
        }
    }, [])

    return null
}
