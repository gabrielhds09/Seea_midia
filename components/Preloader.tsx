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
                        className="flex flex-col items-center gap-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        {/* Logo or Text */}
                        <div className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                            SEEA
                        </div>

                        {/* Progress Bar */}
                        <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-red-500"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.8, ease: "easeInOut" }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
