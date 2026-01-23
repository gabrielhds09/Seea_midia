'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

// Placeholder data for case studies
const PROJECTS = [
    {
        id: 1,
        client: "Nebula Stream",
        category: "Brand Positioning",
        color: "from-purple-500 to-blue-600",
        description: "Redefining the visual language for a next-gen streaming platform."
    },
    {
        id: 2,
        client: "Apex Fitness",
        category: "Video Strategy",
        color: "from-emerald-500 to-teal-600",
        description: "A 3-part documentary series increasing conversion by 200%."
    },
    {
        id: 3,
        client: "Velvet Estates",
        category: "Social Authority",
        color: "from-rose-500 to-orange-600",
        description: "Luxury real estate content that sold $15M in properties."
    }
]

export default function FeaturedWork() {
    return (
        <section className="border-t border-white/5 bg-[#050505] py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold uppercase tracking-tighter text-white sm:text-5xl">Selected Work</h2>
                    <p className="mt-4 text-lg text-white/50">Cases que transformaram autoridade em resultados.</p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {PROJECTS.map((project) => (
                        <motion.div
                            key={project.id}
                            className="group relative cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: project.id * 0.1 }}
                        >
                            {/* Image Placeholder */}
                            <div className={`aspect-[4/5] w-full overflow-hidden rounded-xl bg-gradient-to-br ${project.color} opacity-20 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 relative`}>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                                {/* Overlay Content */}
                                <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="flex items-center justify-between border-t border-white/20 pt-4">
                                        <span className="text-sm font-bold uppercase tracking-widest text-white">View Case</span>
                                        <ArrowUpRight className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <p className="text-xs font-bold uppercase tracking-widest text-white/40">{project.category}</p>
                                <h3 className="mt-2 text-2xl font-bold text-white group-hover:text-white/80 transition-colors">{project.client}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/60">{project.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
