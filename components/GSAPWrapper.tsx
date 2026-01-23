'use client'

import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GSAPWrapper() {
    useEffect(() => {
        // Find all elements with data-speed attribute
        const parallaxElements = document.querySelectorAll('[data-speed]')

        parallaxElements.forEach((el) => {
            const speed = parseFloat(el.getAttribute('data-speed') || '1')

            // Apply GSAP parallax effect
            gsap.to(el, {
                y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed * 0.1,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0,
                    invalidateOnRefresh: true
                }
            })
        })

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill())
        }
    }, [])

    return null // Pure logic component
}
