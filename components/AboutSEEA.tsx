'use client'

import React, { useRef, useEffect } from 'react'
import { motion, animate, useInView } from 'framer-motion'

const VALUES = [
    { num: '01', title: 'Narrativa', desc: 'Cada cliente tem uma história única. Construímos narrativas que comunicam com precisão, gerando conexão real com o público certo.' },
    { num: '02', title: 'Autoridade', desc: 'Não fabricamos personas. Revelamos e amplificamos a autoridade genuína que já existe no que o cliente faz e sabe.' },
    { num: '03', title: 'Resultados', desc: 'Medimos tudo. Cada ação tem uma lógica e um indicador. A elegância está nos dados bem interpretados.' },
    { num: '04', title: 'Exclusividade', desc: 'Atendemos poucos para atender muito bem. Cada cliente recebe atenção de equipe experiente, com estratégia personalizada.' },
]

const STATS = [
    { value: 200, suffix: '+', label: 'Clientes Atendidos' },
    { value: 5, suffix: '×', label: 'de Retorno Médio' },
    { value: 98, suffix: '%', label: 'de Satisfação' },
]

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
    const ref = useRef<HTMLParagraphElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-10%" })

    useEffect(() => {
        if (isInView && ref.current) {
            const controls = animate(0, value, {
                duration: 2,
                ease: [0.16, 1, 0.3, 1],
                onUpdate(value) {
                    if (ref.current) {
                        ref.current.textContent = Math.round(value).toString()
                    }
                }
            })
            return () => controls.stop()
        }
    }, [isInView, value])

    return (
        <div className="flex flex-col py-6 border-l border-black/[0.05] pl-8 first:border-0 first:pl-0">
            <div className="flex items-baseline gap-1">
                <p
                    ref={ref}
                    className="font-light tracking-[-0.05em] text-[#111111]"
                    style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}
                >
                    0
                </p>
                <span className="text-[#431846]/40 font-serif italic text-[1.8rem] -translate-y-2">{suffix}</span>
            </div>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-black/30 -mt-2">
                {label}
            </p>
        </div>
    )
}

export default function AboutSEEA() {
    const containerRef = useRef<HTMLElement>(null)

    return (
        <section
            ref={containerRef}
            className="relative w-full py-40 md:py-64 px-6 sm:px-12 lg:px-20 xl:px-28 overflow-hidden bg-[#faf9f7]"
        >
            {/* Top hairline */}
            <div className="absolute top-0 left-0 right-0 h-[0.5px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(237,28,36,0.15), rgba(17,17,17,0.04), transparent)' }} />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-12 gap-24 lg:gap-32">

                    {/* Left — content block */}
                    <div className="lg:col-span-12 xl:col-span-12">
                        <div className="grid lg:grid-cols-12 gap-16 lg:gap-32">
                            <div className="lg:col-span-7">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                                >
                                    <div className="mb-20">
                                        <p className="text-[0.62rem] font-bold uppercase tracking-[0.55em] text-[#431846] mb-10">
                                            Nossa Identidade
                                        </p>

                                        {/* Red double-bar accent */}
                                        <div className="flex flex-col gap-[6px] mb-12">
                                            <motion.div
                                                className="w-16 h-[2.5px] bg-[#ed1c24]/50"
                                                initial={{ scaleX: 0 }}
                                                whileInView={{ scaleX: 1 }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                            />
                                            <motion.div
                                                className="w-10 h-[2.5px] bg-[#431846]/50"
                                                initial={{ scaleX: 0 }}
                                                whileInView={{ scaleX: 1 }}
                                                transition={{ duration: 1, delay: 0.7 }}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="overflow-hidden">
                                                <motion.h2
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                                                    className="font-extralight tracking-tight text-[#111111]"
                                                    style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95 }}
                                                >
                                                    <span className="font-sans">SOBRE A </span>
                                                    <span className="font-serif italic font-normal serif-luxury text-[#431846] lowercase" style={{ fontSize: '1.08em', marginLeft: '0.1em' }}>seea</span>
                                                </motion.h2>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-[0.95rem] font-light leading-[1.8] text-black/60 max-w-2xl mb-16 tracking-tight">
                                        {"A SEEA foi fundada por Aline Vitória, profissional do audiovisual desde os 18 anos. A empresa nasceu da percepção de que conteúdo genérico não sustenta autoridade. Hoje, atuamos com um modelo exclusivo, baseado em personalização e leitura estratégica de comportamento.".split(" ").map((word, i) => (
                                            <motion.span
                                                key={i}
                                                className="inline-block mr-[0.25em]"
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: 0.3 + (i * 0.03), ease: [0.19, 1, 0.22, 1] }}
                                            >
                                                {word}
                                            </motion.span>
                                        ))}
                                    </p>

                                    {/* Stats — Horizontal grid */}
                                    <div className="flex gap-12 lg:gap-24 flex-wrap border-t border-black/[0.05] pt-12">
                                        {STATS.map(s => (
                                            <StatItem key={s.label} {...s} />
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right — Values Column */}
                            <div className="lg:col-span-5">
                                <div className="border-t border-black/[0.08]">
                                    {VALUES.map((v, i) => (
                                        <motion.div
                                            key={v.num}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: '-5%' }}
                                            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: i * 0.1 }}
                                            className="relative flex gap-8 py-12 border-b border-black/[0.08] group cursor-default"
                                        >
                                            <span className="flex-shrink-0 text-[0.6rem] font-bold tracking-[0.4em] text-[#431846]/40 group-hover:text-[#431846] transition-colors pt-1.5 duration-500">
                                                {v.num}
                                            </span>
                                            <div className="group-hover:translate-x-1 transition-transform duration-500">
                                                <h3 className="font-sans font-light text-[1.25rem] tracking-tight text-[#111111] mb-3">
                                                    {v.title}
                                                </h3>
                                                <p className="text-[0.85rem] font-light leading-[1.8] text-black/40 group-hover:text-black/60 transition-colors duration-500">
                                                    {v.desc}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
