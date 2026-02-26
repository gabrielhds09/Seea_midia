'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function TeamSection() {
    return (
        <section className="relative py-32 bg-[#f2f0ec] overflow-hidden">


            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mb-20 text-center">
                    <span className="text-[#431846] tracking-[0.3em] uppercase text-xs font-bold mb-4 block">Our People</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#111111]">
                        Mentes por trás<br />da <span className="text-[#431846]">tampa</span>.
                    </h2>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Main Founder Portrait */}
                    <motion.div
                        className="lg:col-span-12 relative group"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Placeholder for Aline's Photo */}
                        <div className="relative aspect-[21/9] w-full bg-[#e8e4dd] rounded-[2rem] overflow-hidden border border-black/[0.06]">
                            {/* <img src="/aline-team-bg.jpg" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" /> */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#f2f0ec] via-transparent to-transparent opacity-70" />

                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-2xl">
                                <h3 className="text-3xl md:text-5xl font-bold text-[#111111] mb-2">Aline Vitória</h3>
                                <p className="text-[#431846] font-mono text-sm tracking-widest uppercase mb-6">Founder &amp; Creative Director</p>
                                <p className="text-xl text-black/55 font-light leading-relaxed">
                                    "Acredito que o audiovisual é a ferramenta mais poderosa para conectar pessoas e propósitos. Na SEEA, não entregamos apenas vídeos, entregamos visão."
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Additional Team Members (can be added later to grid) */}
                </div>
            </div>
        </section>
    )
}
