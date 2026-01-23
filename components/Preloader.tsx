'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading time or wait for window load
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000) // 2 seconds minimum display

        const handleLoad = () => setIsLoading(false)

        if (document.readyState === 'complete') {
            // If already loaded, wait for timer
        } else {
            window.addEventListener('load', handleLoad)
        }

        return () => {
            clearTimeout(timer)
            window.removeEventListener('load', handleLoad)
        }
    }, [])

    return (
        <AnimatePresence mode='wait'>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <motion.div
                        className="flex flex-col items-center justify-between h-[80vh] relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {/* Center Logo */}
                        <div className="flex-1 flex items-center justify-center">
                            <motion.div
                                className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                SEEA
                            </motion.div>
                        </div>

                        {/* Bottom Text */}
                        <motion.div
                            className="text-white/40 text-xs tracking-[0.2em] uppercase mb-10"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            Carregando experiência SEEA
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
