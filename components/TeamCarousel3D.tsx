'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'

// Placeholder images from Unsplash (High-End Portraits)
const TEAM_MEMBERS = [
    {
        id: 0,
        name: "Emily Kim",
        role: "Founder",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=3687&auto=format&fit=crop"
    },
    {
        id: 1,
        name: "Michael Steward",
        role: "Creative Director",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=3870&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Emma Rodriguez",
        role: "Lead Developer",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Julia Gimmel",
        role: "UX Designer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Lisa Anderson",
        role: "Marketing Manager",
        image: "https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=900&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "James Wilson",
        role: "Product Manager",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=3687&auto=format&fit=crop"
    }
]

export default function TeamCarousel3D() {
    const [activeIndex, setActiveIndex] = useState(0)

    const updateIndex = useCallback((newIndex: number) => {
        // Handle negative wrapping correctly
        const count = TEAM_MEMBERS.length
        const wrappedIndex = (newIndex % count + count) % count
        setActiveIndex(wrappedIndex)
    }, [])

    const handleNext = () => updateIndex(activeIndex + 1)
    const handlePrev = () => updateIndex(activeIndex - 1)

    // Keydown support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') handlePrev()
            if (e.key === 'ArrowRight') handleNext()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [activeIndex, handleNext, handlePrev])

    // Get position class for a given index relative to active
    const getCardStyle = (index: number) => {
        const count = TEAM_MEMBERS.length
        // Calculate shortest distance in a circular array
        let offset = (index - activeIndex + count) % count

        // Convert to signed distance (-2, -1, 0, 1, 2)
        if (offset > count / 2) offset -= count

        // Base styles
        const baseTrans = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        const activeScale = 1.1
        const sideScale = 0.9
        const farSideScale = 0.8

        if (offset === 0) {
            // CENTER
            return {
                zIndex: 10,
                transform: `scale(${activeScale}) translateZ(0)`,
                opacity: 1,
                filter: 'none',
                transition: baseTrans
            }
        }

        if (offset === 1) {
            // RIGHT 1
            return {
                zIndex: 5,
                transform: `translateX(200px) scale(${sideScale}) translateZ(-100px)`,
                opacity: 0.9,
                filter: 'grayscale(100%)',
                transition: baseTrans
            }
        }

        if (offset === 2) {
            // RIGHT 2
            return {
                zIndex: 1,
                transform: `translateX(400px) scale(${farSideScale}) translateZ(-300px)`,
                opacity: 0.7,
                filter: 'grayscale(100%)',
                transition: baseTrans
            }
        }

        if (offset === -1) {
            // LEFT 1
            return {
                zIndex: 5,
                transform: `translateX(-200px) scale(${sideScale}) translateZ(-100px)`,
                opacity: 0.9,
                filter: 'grayscale(100%)',
                transition: baseTrans
            }
        }

        if (offset === -2) {
            // LEFT 2
            return {
                zIndex: 1,
                transform: `translateX(-400px) scale(${farSideScale}) translateZ(-300px)`,
                opacity: 0.7,
                filter: 'grayscale(100%)',
                transition: baseTrans
            }
        }

        // HIDDEN
        return {
            zIndex: 0,
            opacity: 0,
            pointerEvents: 'none' as const,
            transform: `scale(0.5) translateZ(-500px)`,
            transition: baseTrans
        }
    }

    return (
        <section className="relative w-full py-32 overflow-hidden bg-[#1a0525] flex flex-col items-center justify-center min-h-[90vh]">

            {/* Background Title Faded */}
            <h1 className="absolute top-10 pointer-events-none text-[8vw] md:text-[8rem] font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-blue-900/20 to-transparent tracking-tighter select-none z-0">
                Our Team
            </h1>

            {/* 3D Carousel Container */}
            <div className="relative w-full max-w-6xl h-[450px] flex items-center justify-center perspective-[1000px] mt-20 z-10">

                {/* Left Arrow */}
                <button onClick={handlePrev} className="absolute left-4 md:left-10 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white hover:text-black border border-white/20 flex items-center justify-center transition-all duration-300 backdrop-blur-md text-white">
                    <ChevronLeft size={24} />
                </button>

                {/* Cards Track */}
                <div className="relative w-full h-full flex items-center justify-center preserve-3d">
                    {TEAM_MEMBERS.map((member, index) => (
                        <div
                            key={member.id}
                            onClick={() => updateIndex(index)}
                            className="absolute w-[220px] h-[300px] md:w-[280px] md:h-[380px] bg-white rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                            style={getCardStyle(index)}
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button onClick={handleNext} className="absolute right-4 md:right-10 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white hover:text-black border border-white/20 flex items-center justify-center transition-all duration-300 backdrop-blur-md text-white">
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Member Info (Animated) */}
            <div className="relative z-10 mt-12 text-center h-24">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 relative inline-block">
                            {TEAM_MEMBERS[activeIndex].name}
                            <motion.span
                                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-purple-600 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                            />
                        </h2>
                        <p className="text-xl md:text-2xl text-blue-300/80 font-mono uppercase tracking-[0.2em] mt-4">
                            {TEAM_MEMBERS[activeIndex].role}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-4 mt-8 z-10">
                {TEAM_MEMBERS.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => updateIndex(i)}
                        className={`cursor-pointer transition-all duration-300 rounded-full ${i === activeIndex ? 'w-4 h-4 bg-red-600 scale-125' : 'w-2 h-2 bg-white/20 hover:bg-white/50'}`}
                    />
                ))}
            </div>

        </section>
    )
}
