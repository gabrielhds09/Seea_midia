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
                    {/* NO LOGO - Just Progress Bar */}
                    <motion.div
                        className="flex flex-col items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {/* Progress Bar Only */}
                        <div className="w-64 h-[3px] bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-red-500 via-purple-500 to-pink-500"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
