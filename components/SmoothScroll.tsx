'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5, // Silkier, longer momentum
            easing: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t), // Classic Expo-Out
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1.0,
            smoothTouch: false,
            touchMultiplier: 2.0,
            wheelMultiplier: 1.1, // Slight boost for a "deeper" scroll feel
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
