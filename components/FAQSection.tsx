'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const FAQS = [
    {
        question: "Como funciona o acompanhamento presencial?",
        answer: "Nossa equipe acompanha sua rotina in loco, captando momentos reais e dirigindo cenas que transmitem autoridade. Não é apenas 'filmar', é um olhar estratégico sobre o seu dia a dia."
    },
    {
        question: "Vocês atendem fora de São Paulo?",
        answer: "Sim. Temos disponibilidade para projetos pontuais e imersões em outras cidades, com custos de logística alinhados previamente."
    },
    {
        question: "O tráfego pago está incluso?",
        answer: "A gestão de tráfego é um dos pilares do Ecossistema SEEA. Analisamos se é o momento ideal para o seu negócio e integramos a estratégia de distribuição."
    },
    {
        question: "Preciso ter roteiros prontos?",
        answer: "Não. A roteirização estratégica faz parte da nossa entrega. Estudamos seu público e criamos narrativas que conectam e convertem."
    }
]

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section className="py-24 border-t border-white/5 bg-[#050505]">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <h2 className="text-sm font-mono text-center text-white/40 mb-12 uppercase tracking-widest">[ Dúvidas Frequentes ]</h2>

                <div className="space-y-4">
                    {FAQS.map((faq, index) => (
                        <div key={index} className="border border-white/5 rounded-2xl bg-white/[0.02] overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left group"
                            >
                                <span className="text-lg font-medium text-white group-hover:text-purple-400 transition-colors">
                                    {faq.question}
                                </span>
                                <Plus className={`w-6 h-6 text-red-500 transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-white/50 leading-relaxed font-light">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
