'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface HeroTextRevealProps {
    children: string;
    className?: string;
    delay?: number;
    lineHeight?: number; // Adjustment if needed
}

export default function HeroTextReveal({ children, className = "", delay = 0 }: HeroTextRevealProps) {
    // Split text into words or keep as lines? 
    // For "Gestão de Carreira", shrinking lines works best.
    // Actually, let's allow the user to pass a string, and we wrap it.

    return (
        <div className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "110%", rotate: 3, opacity: 0 }}
                animate={{ y: "0%", rotate: 0, opacity: 1 }}
                transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1], // Apple-like ease (very premium)
                    delay: delay
                }}
                className="origin-top-left"
            >
                {children}
            </motion.div>
        </div>
    )
}
