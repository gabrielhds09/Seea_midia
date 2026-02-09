'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

// STATS kept as visual elements, but titles adjusted if needed. 
// User didn't ask to change stats, so keeping them as is or simplifying.
// Let's keep them as visual interest.
const STATS = [
    { value: "+6", suffix: "anos", label: "De experiência no mercado audiovisual" },
    { value: "100", suffix: "%", label: "Projetos personalizados e únicos" },
    { value: "360", suffix: "°", label: "Acompanhamento completo do cliente" }
]

const VALUES = [
    { icon: "◈", title: "Olhar Treinado", desc: "Identificamos o que normalmente passa despercebido" },
    { icon: "◇", title: "Personalização", desc: "Cada cliente é único, cada projeto é exclusivo" },
    { icon: "✦", title: "Proximidade", desc: "Acompanhamento humanizado em todas as etapas" }
]

export default function AboutSEEA() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -50])
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

    return (
        <section ref={containerRef} className="relative w-full min-h-screen py-20 md:py-40 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a0d20] via-[#1f1028] to-[#1a0d20]" />

            {/* Animated Glows */}
            <motion.div
                style={{ y: y1 }}
                className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-[#ed1c24]/10 rounded-full blur-[200px] pointer-events-none"
            />
            <motion.div
                style={{ y: y2 }}
                className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#431846]/25 rounded-full blur-[150px] pointer-events-none"
            />

            {/* Large Background Text */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                <motion.span
                    style={{ opacity }}
                    className="text-[25vw] font-black uppercase tracking-tighter text-white/[0.015] select-none whitespace-nowrap"
                >
                    SEEA
                </motion.span>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <motion.div
                            className="w-16 h-[1px] bg-gradient-to-r from-[#ed1c24] to-transparent"
                            initial={{ width: 0 }}
                            whileInView={{ width: 64 }}
                            viewport={{ once: true }}
                        />
                        <span className="text-[#ed1c24] text-xs font-medium tracking-[0.4em] uppercase">
                            Sobre Nós
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6">
                        <span className="text-white">Quem</span>{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed1c24] via-[#ff6b6b] to-[#431846]">
                            Somos
                        </span>
                    </h2>

                    <motion.div
                        className="h-1 bg-gradient-to-r from-[#ed1c24] via-[#431846] to-transparent rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: 200 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    />
                </motion.div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-[1.3fr,1fr] gap-20 items-start">

                    {/* Left: Story */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Founder Card */}
                        <div className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
                            {/* Decorative corner */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#ed1c24]/10 to-transparent" />

                            <div className="relative">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#431846] to-[#ed1c24] flex items-center justify-center">
                                        <span className="text-xl font-bold text-white">AV</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Aline Vitória</h3>
                                        <p className="text-white/50 text-sm">Fundadora & CEO</p>
                                    </div>
                                </div>

                                <p className="text-white/80 text-lg leading-relaxed">
                                    A SEEA foi fundada por Aline Vitória, profissional do audiovisual desde os 18 anos, com uma trajetória construída na prática, no atendimento direto a profissionais, empresas e marcas de diferentes segmentos.
                                </p>
                            </div>
                        </div>

                        {/* Philosophy */}
                        <div className="pl-6 border-l-2 border-[#ed1c24]/30 space-y-6">
                            <p className="text-xl text-white/70 leading-relaxed">
                                A empresa nasceu da percepção de que{' '}
                                <strong className="text-white font-semibold">
                                    conteúdo genérico não sustenta autoridade
                                </strong>.
                            </p>

                            <p className="text-lg text-white/60 leading-relaxed">
                                Hoje, a SEEA atua com um <strong className="text-white/80">modelo exclusivo</strong>, desenvolvido e testado ao longo dos anos, baseado em personalização, acompanhamento próximo e leitura estratégica de comportamento.
                            </p>
                        </div>

                        {/* Values - Keeping for visual richness as they align with "Personalização", "Olhar Treinado" etc */}
                        <div className="grid gap-4 pt-8">
                            {VALUES.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="group flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] active:bg-white/[0.05] transition-colors duration-300"
                                >
                                    <span className="text-2xl text-[#ed1c24]/60 group-hover:text-[#ed1c24] transition-colors">
                                        {value.icon}
                                    </span>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">{value.title}</h4>
                                        <p className="text-white/50 text-sm">{value.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="lg:sticky lg:top-32"
                    >
                        <div className="space-y-6">
                            {STATS.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + index * 0.15 }}
                                    className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.06] hover:border-white/10 transition-all duration-500 overflow-hidden"
                                >
                                    {/* Glow on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#ed1c24]/5 via-transparent to-[#431846]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Number */}
                                    <div className="relative flex items-baseline gap-1 mb-4">
                                        <motion.span
                                            className="text-6xl md:text-7xl font-black text-white"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                                        >
                                            {stat.value}
                                        </motion.span>
                                        <span className="text-3xl font-bold text-[#ed1c24]">
                                            {stat.suffix}
                                        </span>
                                    </div>

                                    <p className="relative text-white/50 text-sm uppercase tracking-wider">
                                        {stat.label}
                                    </p>

                                    {/* Index */}
                                    <div className="absolute top-6 right-6 text-white/[0.05] text-4xl font-black">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                            className="mt-8"
                        >
                            <motion.a
                                href="#contato"
                                className="group flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-[#ed1c24]/10 to-[#431846]/10 border border-[#ed1c24]/20 hover:border-[#ed1c24]/40 transition-all duration-300"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div>
                                    <p className="text-white font-semibold mb-1">Vamos conversar?</p>
                                    <p className="text-white/50 text-sm">Inicie sua jornada conosco</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-[#ed1c24] flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <ArrowUpRight className="w-5 h-5 text-white" />
                                </div>
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
