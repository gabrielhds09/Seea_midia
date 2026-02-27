'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface SectionSeparatorProps {
    className?: string
    showDiamond?: boolean
}

/**
 * SEEA — Section Separator
 * 3-layer system:
 * 1. Hairline across the width
 * 2. Gradient depth shadow (120px)
 * 3. Centered diamond motif ◆ in SEEA red
 */
export default function SectionSeparator({ className = '', showDiamond = true }: SectionSeparatorProps) {
    return (
        <div className={`relative w-full overflow-hidden ${className}`}>
            {/* Depth Shadow — 120px blur feel */}
            <div
                className="absolute top-0 left-0 w-full h-[120px] pointer-events-none"
                style={{
                    background: 'linear-gradient(180deg, rgba(17,17,17,0.03) 0%, transparent 100%)'
                }}
            />

            {/* Hairline */}
            <div
                className="w-full h-[0.5px]"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(17,17,17,0.08) 50%, transparent 100%)'
                }}
            />

            {/* Diamond Motif */}
            {showDiamond && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                        className="w-2.5 h-2.5 rotate-45 border border-[#431846]/40 bg-[#faf9f7] overflow-hidden group"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="absolute inset-[2.5px] bg-[#431846]/25" />
                        {/* SPECULAR GLINT */}
                        <motion.div
                            className="absolute inset-0 bg-white/80 -skew-x-12 translate-x-[-150%]"
                            animate={{ translateX: ['150%', '-150%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                        />
                    </motion.div>
                </div>
            )}
        </div>
    )
}
