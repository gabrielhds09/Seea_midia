'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Monitor, Smartphone, Video, Mic2, Radio, Tv, Globe, Camera } from 'lucide-react'

// Placeholder logos using Lucide icons to represent different industries
const LOGOS = [
    { id: 1, icon: Monitor, name: "TechCorp" },
    { id: 2, icon: Smartphone, name: "AppStudio" },
    { id: 3, icon: Video, name: "MediaHouse" },
    { id: 4, icon: Mic2, name: "AudioLab" },
    { id: 5, icon: Radio, name: "Broadcast" },
    { id: 6, icon: Tv, name: "Channel 1" },
    { id: 7, icon: Globe, name: "GlobalNet" },
    { id: 8, icon: Camera, name: "Visionary" },
]

// Duplicate for infinite loop
const MARQUEE_LOGOS = [...LOGOS, ...LOGOS, ...LOGOS]

export default function ClientLogos() {
    return (
        <section className="relative overflow-hidden py-12">
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] pointer-events-none" />

            <div className="mb-8 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                    Quem Confia na SEEA
                </p>
            </div>

            <div className="flex overflow-hidden grayscale opacity-40 transition-opacity duration-300 hover:opacity-100 hover:grayscale-0">
                <motion.div
                    className="flex min-w-full gap-16 px-8 items-center"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                >
                    {MARQUEE_LOGOS.map((logo, index) => (
                        <div key={`${logo.id}-${index}`} className="flex items-center gap-3 flex-shrink-0 group cursor-pointer px-8 border-r border-white/10">
                            <logo.icon className="h-6 w-6 text-white/60 transition-transform group-hover:scale-110 group-hover:text-purple-400" />
                            <span className="text-lg font-medium tracking-tight text-white/40 group-hover:text-white transition-colors">{logo.name}</span>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    className="flex min-w-full gap-16 px-8 items-center"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                >
                    {MARQUEE_LOGOS.map((logo, index) => (
                        <div key={`${logo.id}-${index}-dbl`} className="flex items-center gap-3 flex-shrink-0 group cursor-pointer px-8 border-r border-white/10">
                            <logo.icon className="h-6 w-6 text-white/60 transition-transform group-hover:scale-110 group-hover:text-purple-400" />
                            <span className="text-lg font-medium tracking-tight text-white/40 group-hover:text-white transition-colors">{logo.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
