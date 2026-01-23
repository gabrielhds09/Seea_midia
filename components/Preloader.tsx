'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Fixed 3 seconds as requested
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 3000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <AnimatePresence mode='wait'>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0514]"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <motion.div
                        className="flex flex-col items-center justify-center gap-8"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* SEEA Mídia Logo */}
                        <div className="relative w-48 h-32">
                            <Image
                                src="/logo-seea.png"
                                alt="SEEA Mídia"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Progress Bar */}
                        <div className="w-64 h-[3px] bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-red-500 via-purple-500 to-pink-500"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2.8, ease: "easeInOut" }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
