'use client'

import { useEffect, useRef } from 'react'

interface GradualBlurProps {
    target?: 'parent' | 'fixed'
    position?: 'top' | 'bottom'
    height?: string
    strength?: number
    divCount?: number
    curve?: 'linear' | 'bezier'
    exponential?: boolean
    opacity?: number
}

export default function GradualBlur({
    target = 'parent',
    position = 'bottom',
    height = '7rem',
    strength = 2,
    divCount = 5,
    curve = 'bezier',
    exponential = false,
    opacity = 1,
}: GradualBlurProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const blurLayers = Array.from({ length: divCount }, (_, i) => {
            const div = document.createElement('div')

            let blurValue: number
            if (exponential) {
                blurValue = (strength / divCount) * Math.pow(i + 1, 2)
            } else if (curve === 'bezier') {
                const t = (i + 1) / divCount
                const bezier = t * t * (3 - 2 * t) // Smooth step function
                blurValue = strength * bezier
            } else {
                blurValue = (strength / divCount) * (i + 1)
            }

            div.style.position = 'absolute'
            div.style.width = '100%'
            div.style.height = `${100 / divCount}%`
            div.style[position] = `${(i * 100) / divCount}%`
            div.style.backdropFilter = `blur(${blurValue}px)`
                ; (div.style as any).webkitBackdropFilter = `blur(${blurValue}px)`
            div.style.pointerEvents = 'none'

            return div
        })

        blurLayers.forEach(layer => container.appendChild(layer))

        return () => {
            blurLayers.forEach(layer => layer.remove())
        }
    }, [divCount, strength, curve, exponential, position])

    return (
        <div
            ref={containerRef}
            className={`gradual-blur ${target === 'fixed' ? 'gradual-blur-fixed' : ''}`}
            style={{
                position: target === 'fixed' ? 'fixed' : 'absolute',
                [position]: 0,
                left: 0,
                right: 0,
                height,
                opacity,
                pointerEvents: 'none',
                zIndex: target === 'fixed' ? 1000 : 10,
            }}
        >
            <div className="gradual-blur-inner" style={{ position: 'relative', width: '100%', height: '100%' }} />
        </div>
    )
}
