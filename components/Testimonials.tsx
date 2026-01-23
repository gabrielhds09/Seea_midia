'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export default function Testimonials() {
    return (
        <section className="py-24 border-t border-white/5 bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-12">
                            O impacto real<br />de uma visão clara
                        </h2>

                        <div className="space-y-12">
                            {/* Testimonial 1 */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="relative pl-8 border-l border-purple-500/30"
                            >
                                <Quote className="w-8 h-8 text-purple-600 mb-4 opacity-50" />
                                <p className="text-xl md:text-2xl text-white/80 font-serif italic mb-6">
                                    "A SEEA transformou não só meu conteúdo, mas como eu me enxergo como profissional. O posicionamento que criamos mudou meu jogo."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-zinc-800 rounded-full border border-white/10" />
                                    <div>
                                        <div className="text-white font-bold">Fernanda S.</div>
                                        <div className="text-xs text-white/40 uppercase tracking-widest">Arquiteta</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
