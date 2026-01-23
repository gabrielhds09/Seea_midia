'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, PlayCircle } from 'lucide-react'

// Placeholder data simulating high-end case studies
const BENTO_ITEMS = [
    {
        id: 1,
        client: "Nebula Stream",
        category: "Brand Positioning",
        description: "Redefining the visual language for a next-gen streaming platform.",
        gridSpan: "md:col-span-2 md:row-span-2",
        color: "from-purple-900 to-slate-900",
        video: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-263-large.mp4"
    },
    {
        id: 2,
        client: "Apex Fitness",
        category: "Video Strategy",
        description: "Documentary series increasing conversion by 200%.",
        gridSpan: "md:col-span-1 md:row-span-1",
        color: "from-emerald-900 to-slate-900",
        video: "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-lines-2770-large.mp4"
    },
    {
        id: 3,
        client: "Velvet Estates",
        category: "Social Authority",
        description: "Luxury real estate content that sold $15M in properties.",
        gridSpan: "md:col-span-1 md:row-span-2",
        color: "from-rose-900 to-slate-900",
        video: "https://assets.mixkit.co/videos/preview/mixkit-red-ink-swirl-underwater-2166-large.mp4"
    },
    {
        id: 4,
        client: "Lumina Tech",
        category: "Product Launch",
        description: "Introducing the future of light.",
        gridSpan: "md:col-span-1 md:row-span-1",
        color: "from-amber-900 to-slate-900",
        video: null
    }
]

export default function BentoGridWork() {
    return (
        <section className="relative z-10 py-24 sm:py-32 px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-12">
                <h2 className="text-3xl font-bold uppercase tracking-tighter sm:text-6xl mb-4">Projetos<br />Em Destaque</h2>
                <div className="h-1 w-24 bg-red-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                {BENTO_ITEMS.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className={`group relative overflow-hidden rounded-3xl bg-[#ffffff]/5 backdrop-blur-sm border border-white/10 hover:border-red-500/50 transition-colors duration-500 ${item.gridSpan}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        {/* Background (Gradient or Video) */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 transition-all duration-700 group-hover:scale-105 group-hover:opacity-40`} />

                        {/* Video Layer (Reveals on Hover if video exists) */}
                        {item.video && (
                            <video
                                src={item.video}
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                                onMouseEnter={(e) => e.currentTarget.play()}
                                onMouseLeave={(e) => {
                                    e.currentTarget.pause();
                                    e.currentTarget.currentTime = 0;
                                }}
                            />
                        )}

                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                            <div className="flex justify-between items-start">
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                                    <ArrowUpRight className="w-5 h-5" />
                                </span>
                                <span className="px-3 py-1 rounded-full border border-white/10 text-[10px] uppercase tracking-widest bg-black/20 backdrop-blur-sm text-white/70 group-hover:text-white group-hover:border-red-500/30 transition-colors">
                                    {item.category}
                                </span>
                            </div>

                            <div className="transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">{item.client}</h3>
                                <p className="text-sm text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>

                        {/* Hover Overlay 'View Case' */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-500" />
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
