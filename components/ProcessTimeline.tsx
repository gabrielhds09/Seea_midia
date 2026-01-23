'use client'

import React from 'react'
import { motion } from 'framer-motion'

const STEPS = [
    {
        id: "01",
        title: "Imersão & Diagnóstico",
        description: "Mergulhamos na sua rotina e negócio. Não usamos templates; entendemos quem você é, como fala e o que precisa ser dito."
    },
    {
        id: "02",
        title: "Estratégia & Roteiro",
        description: "Transformamos a vivência em narrativa. Criamos roteiros intencionais que equilibram sua verdade com o que a audiência precisa ouvir."
    },
    {
        id: "03",
        title: "Produção & Direção",
        description: "Filmamos com equipamentos de cinema, mas o segredo está na direção. Orientamos postura, tom de voz e intenção para garantir naturalidade."
    },
    {
        id: "04",
        title: "Pós-Produção Premium",
        description: "Edição que retém, sound design que envolve e color grading que traz a estética de cinema para o seu posicionamento digital."
    },
    {
        id: "05",
        title: "Análise & Otimização",
        description: "O trabalho não acaba no post. Acompanhamos a performance, ajustamos a rota e garantimos que a autoridade esteja sendo construída."
    }
]

export default function ProcessTimeline() {
    return (
        <div className="relative border-l border-white/10 ml-4 md:ml-8 pl-8 md:pl-16 space-y-16">
            {STEPS.map((step, index) => (
                <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                >
                    {/* Timeline Dot */}
                    <div className="absolute -left-[41px] md:-left-[73px] top-2 h-5 w-5 rounded-full border border-white/20 bg-[#050505] transition-all duration-300 group-hover:border-purple-500 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full opacity-0 transition-opacity group-hover:opacity-100 bg-red-500" />
                    </div>

                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-2 block font-mono group-hover:text-purple-400 transition-colors">
                        Step {step.id}
                    </span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-red-400 transition-all duration-300">
                        {step.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/60 group-hover:text-white/80 transition-colors">
                        {step.description}
                    </p>
                </motion.div>
            ))}
        </div>
    )
}
