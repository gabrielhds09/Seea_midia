'use client'

import { useEffect, useRef, useState } from 'react'

interface VariableProximityProps {
    label: string
    className?: string
    fromFontVariationSettings?: string
    toFontVariationSettings?: string
    containerRef: React.RefObject<HTMLElement | HTMLDivElement | null>
    radius?: number
    falloff?: 'linear' | 'exponential'
}

export default function VariableProximity({
    label,
    className = '',
    fromFontVariationSettings = "'wght' 400, 'opsz' 9",
    toFontVariationSettings = "'wght' 1000, 'opsz' 40",
    containerRef,
    radius = 100,
    falloff = 'linear',
}: VariableProximityProps) {
    const textRef = useRef<HTMLSpanElement>(null)
    const [chars, setChars] = useState<string[]>([])

    useEffect(() => {
        setChars(label.split(''))
    }, [label])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!textRef.current || !containerRef.current) return

            const container = containerRef.current.getBoundingClientRect()
            const mouseX = e.clientX
            const mouseY = e.clientY

            const spans = textRef.current.querySelectorAll('span')

            spans.forEach((span) => {
                const rect = span.getBoundingClientRect()
                const centerX = rect.left + rect.width / 2
                const centerY = rect.top + rect.height / 2

                const distance = Math.sqrt(
                    Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
                )

                let intensity = 0
                if (distance < radius) {
                    if (falloff === 'exponential') {
                        intensity = Math.pow(1 - distance / radius, 2)
                    } else {
                        intensity = 1 - distance / radius
                    }
                }

                // Interpolate font variation settings
                const from = parseFontSettings(fromFontVariationSettings)
                const to = parseFontSettings(toFontVariationSettings)

                const interpolated = Object.keys(from).map(key => {
                    const fromValue = from[key]
                    const toValue = to[key] || fromValue
                    const value = fromValue + (toValue - fromValue) * intensity
                    return `'${key}' ${Math.round(value)}`
                }).join(', ')

                    ; (span as HTMLElement).style.fontVariationSettings = interpolated
            })
        }

        document.addEventListener('mousemove', handleMouseMove)
        return () => document.removeEventListener('mousemove', handleMouseMove)
    }, [containerRef, radius, falloff, fromFontVariationSettings, toFontVariationSettings])

    return (
        <span ref={textRef} className={`variable-proximity ${className}`} aria-label={label}>
            {chars.map((char, i) => (
                <span
                    key={i}
                    style={{
                        fontVariationSettings: fromFontVariationSettings,
                        transition: 'font-variation-settings 0.1s ease-out'
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
            <span className="sr-only">{label}</span>
        </span>
    )
}

function parseFontSettings(settings: string): Record<string, number> {
    const result: Record<string, number> = {}
    const parts = settings.split(',').map(s => s.trim())

    parts.forEach(part => {
        const match = part.match(/'(\w+)'\s+(\d+)/)
        if (match) {
            result[match[1]] = parseInt(match[2])
        }
    })

    return result
}
