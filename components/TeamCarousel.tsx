'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const TEAM_MEMBERS = [
    { name: "Gabriel H.", role: "Lead Developer", image: "/team/gabriel.jpg", color: "from-purple-600 to-blue-600" },
    { name: "Aline V.", role: "Founder", image: "/team/aline.jpg", color: "from-red-600 to-orange-600" },
    { name: "Lucas M.", role: "Creative Director", image: "/team/lucas.jpg", color: "from-emerald-600 to-teal-600" },
    { name: "Sofia R.", role: "UX Designer", image: "/team/sofia.jpg", color: "from-pink-600 to-rose-600" },
    { name: "Rafael C.", role: "Marketing Manager", image: "/team/rafael.jpg", color: "from-amber-600 to-yellow-600" },
    { name: "Julia S.", role: "Product Manager", image: "/team/julia.jpg", color: "from-cyan-600 to-blue-600" }
]

export default function TeamCarousel() {
    const containerRef = useRef<HTMLDivElement>(null)
    const wheelRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const totalRotation = 360 * 2 // Spin twice for effect

            // The Windmill Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=2000", // Scroll distance
                    pin: true,
                    scrub: 1,
                    onUpdate: (self) => {
                        const progress = self.progress
                        const totalSteps = TEAM_MEMBERS.length * 2
                        const currentStep = Math.floor(progress * totalSteps) % TEAM_MEMBERS.length
                        setActiveIndex(currentStep)
                    }
                }
            })

            // Rotate the wheel counter-clockwise
            tl.to(wheelRef.current, {
                rotateZ: -totalRotation,
                ease: "none"
            })

            // Counter-rotate items so they stay upright
            gsap.to(".team-member-item", {
                rotateZ: totalRotation,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=2000",
                    scrub: 1
                }
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#1a0525] flex items-center justify-center">

            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4a148c_0%,#1a0525_70%)] opacity-30" />

            {/* Central Info */}
            <div className="absolute z-10 text-center pointer-events-none mix-blend-screen">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center"
                    >
                        <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-2">
                            {TEAM_MEMBERS[activeIndex].role}
                        </h3>
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white">
                            {TEAM_MEMBERS[activeIndex].name}
                        </h2>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* The Windmill Wheel */}
            <div
                ref={wheelRef}
                className="relative w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] rounded-full border border-white/5 flex items-center justify-center"
            >
                {TEAM_MEMBERS.map((member, index) => {
                    const angle = (index / TEAM_MEMBERS.length) * 360

                    return (
                        <div
                            key={index}
                            className="team-member-item absolute w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#1a0525] shadow-2xl origin-center transform"
                            style={{
                                top: '50%',
                                left: '50%',
                                marginTop: '-6rem', // Half height
                                marginLeft: '-6rem', // Half width
                                transform: `rotate(${angle}deg) translate(${380}px) rotate(-${angle}deg)`
                            }}
                        >
                            <div className={`w-full h-full bg-gradient-to-br ${member.color} p-1`}>
                                <div className="w-full h-full relative bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white/20">
                                        {member.name.charAt(0)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-xs uppercase tracking-widest animate-pulse">
                Scroll to Spin
            </div>
        </section>
    )
}
