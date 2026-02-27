'use client'

import React, { useEffect, useRef, useState } from 'react'

/**
 * SEEA — Custom Cursor
 * Dot (16px) + Ring (40px) trailing with different lerp speeds.
 * Hover state: dot fades, ring scales to 2× with SEEA red tint.
 * Text hover: ring flattens (scaleX wide, scaleY thin).
 */
export default function CursorGlow() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)
    const [hovering, setHovering] = useState(false)
    const [textHovering, setTextHovering] = useState(false)

    useEffect(() => {
        // Only show on non-touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return

        let dotX = 0, dotY = 0
        let ringX = 0, ringY = 0
        let mouseX = 0, mouseY = 0
        let raf: number

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t

        const animate = () => {
            dotX = lerp(dotX, mouseX, 0.38)
            dotY = lerp(dotY, mouseY, 0.38)
            ringX = lerp(ringX, mouseX, 0.12)
            ringY = lerp(ringY, mouseY, 0.12)

            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${dotX - 8}px, ${dotY - 8}px, 0)`
            }
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0) ${hovering ? 'scale(2.2)' : textHovering ? 'scaleX(3) scaleY(0.25)' : 'scale(1)'}`
            }

            raf = requestAnimationFrame(animate)
        }

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
            if (!visible) setVisible(true)
        }

        const onLeave = () => setVisible(false)
        const onEnter = () => setVisible(true)

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const isClickable = target.closest('a, button, [data-cursor="pointer"]')
            const isText = target.closest('p, h1, h2, h3, h4, span, [data-cursor="text"]') && !isClickable
            setHovering(!!isClickable)
            setTextHovering(!!isText)
        }

        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseleave', onLeave)
        window.addEventListener('mouseenter', onEnter)
        window.addEventListener('mouseover', onMouseOver)

        raf = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseleave', onLeave)
            window.removeEventListener('mouseenter', onEnter)
            window.removeEventListener('mouseover', onMouseOver)
            cancelAnimationFrame(raf)
        }
    }, [hovering, textHovering, visible])

    return (
        <>
            {/* Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none select-none"
                style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: hovering ? 'transparent' : '#111111',
                    opacity: visible ? (hovering ? 0 : 1) : 0,
                    transition: 'opacity 0.3s, background 0.3s',
                    willChange: 'transform',
                }}
            />
            {/* Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 z-[9998] pointer-events-none select-none"
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: `1px solid ${hovering ? 'rgba(237,28,36,0.7)' : 'rgba(17,17,17,0.35)'}`,
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.3s, border-color 0.35s, transform 0.55s cubic-bezier(0.19,1,0.22,1)',
                    willChange: 'transform',
                }}
            />
        </>
    )
}
