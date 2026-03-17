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
            easing: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
            wheelMultiplier: 1.1,
            touchMultiplier: 1.8,
            infinite: false,
        } as any)

        // Prevent artificial scroll delay
        gsap.ticker.lagSmoothing(0)

        function update(time: number) {
            lenis.raf(time * 1000)
        }

        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.add(update)

        return () => {
            gsap.ticker.remove(update)
            lenis.destroy()
        }
    }, [])

    return null
}
