'use client'

import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { ArrowUpRight, Target, Zap, Video, Users, MonitorPlay } from 'lucide-react'

const SERVICES = [
    {
        id: "01",
        title: "Estratégia & Diagnóstico",
        icon: Target,
        description: "Análise profunda do seu momento atual. Definimos arquétipos, narrativa e o plano de ação para alinhar sua imagem aos seus objetivos comerciais.",
        tags: ["Posicionamento", "Arquétipos", "Planejamento"],
        accentColor: "#a855f7",
        gradient: "from-purple-600 to-indigo-600"
    },
    {
        id: "02",
        title: "Branding Audiovisual",
        icon: Zap,
        description: "Construção da identidade visual e sonora da sua marca pessoal. Identidade que transmite nobreza, exclusividade e inovação.",
        tags: ["Identidade Visual", "Direção de Arte", "Sound Design"],
        accentColor: "#6366f1",
        gradient: "from-indigo-600 to-purple-600"
    },
    {
        id: "03",
        title: "Conteúdo Roteirizado",
        icon: Video,
        description: "Produção de alto nível com roteiros intencionais (REC). Vídeos que educam, engajam e vendem, sem parecer 'mais do mesmo'.",
        tags: ["Reels Estratégicos", "Vídeos Longos", "Roteiro"],
        accentColor: "#ed1c24",
        gradient: "from-red-600 to-rose-600"
    },
    {
        id: "04",
        title: "Acompanhamento Presencial",
        icon: Users,
        description: "Captura orgânica da sua rotina. Transformamos o dia a dia em conteúdo de autoridade, com direção de cena e olhar treinado em tempo real.",
        tags: ["Direção de Cena", "Stories", "Lifestyle"],
        accentColor: "#ec4899",
        gradient: "from-pink-600 to-purple-600"
    },
    {
        id: "05",
        title: "Gestão Estratégica (Tráfego)",
        icon: MonitorPlay,
        description: "Não basta postar, é preciso distribuir. Amplificamos sua mensagem para o público certo através de tráfego pago inteligente.",
        tags: ["Ads Manager", "Distribuição", "Análise de Dados"],
        accentColor: "#10b981",
        gradient: "from-emerald-600 to-teal-600"
    }
]

function ServiceCard({ service, index }: { service: typeof SERVICES[0], index: number }) {
    const [isHovered, setIsHovered] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
    }

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/10 transition-colors duration-300"
        >
            {/* Mouse Follow Gradient */}
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle, ${service.accentColor}15 0%, transparent 70%)`,
                    left: mouseX,
                    top: mouseY,
                    x: '-50%',
                    y: '-50%'
                }}
            />

            {/* Content */}
            <div className="relative z-10 p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">

                    {/* Left Side */}
                    <div className="flex items-start gap-4 lg:gap-6 lg:w-3/5 w-full relative">
                        {/* Number + Icon */}
                        <div className="flex flex-col items-center gap-3 shrink-0">
                            <span className="text-[10px] lg:text-xs font-mono text-white/20">{service.id}</span>
                            <motion.div
                                className={`w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                                style={{
                                    boxShadow: isHovered ? `0 20px 40px -10px ${service.accentColor}40` : 'none'
                                }}
                                animate={{
                                    scale: isHovered ? 1.1 : 1,
                                    rotate: isHovered ? 5 : 0
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <service.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                            </motion.div>
                        </div>

                        {/* Title + Description */}
                        <div className="flex-1 pr-2"> {/* Added padding right to avoid overlap with tags on very small screens if needed, though tags are top right */}

                            {/* Tags - Absolute Top Right on Mobile with Shine */}
                            <div className="absolute -top-1 -right-1 lg:static lg:flex lg:flex-wrap lg:gap-2 mb-2 lg:mb-4 flex flex-col items-end gap-1">
                                {service.tags.map((tag, i) => (
                                    <motion.span
                                        key={tag}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + i * 0.05 }}
                                        className="relative overflow-hidden text-[9px] lg:text-[10px] uppercase tracking-[0.1em] px-2 py-1 lg:px-3 lg:py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40"
                                    >
                                        <span className="relative z-10">{tag}</span>
                                        {/* Shine Effect */}
                                        <div className="absolute inset-0 z-0 w-full h-full -skew-x-12 opacity-0 animate-shine"
                                            style={{ background: `linear-gradient(90deg, transparent, ${service.accentColor}40, transparent)` }} />
                                    </motion.span>
                                ))}
                            </div>

                            <h3 className="text-xl md:text-3xl font-bold tracking-tight text-white mb-2 lg:mb-4 mt-8 lg:mt-0 leading-tight">
                                {service.title}
                            </h3>

                            {/* Description - Always visible, no layout shifts */}
                            <div className="mt-2 text-sm lg:text-base text-white/60 leading-relaxed pb-2 lg:pb-4">
                                {service.description}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Arrow */}
                    <motion.div
                        className="lg:w-auto flex items-center justify-end"
                        animate={{ x: isHovered ? 5 : 0 }}
                    >
                        <motion.div
                            className="w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-500"
                            style={{
                                borderColor: isHovered ? service.accentColor : 'rgba(255,255,255,0.1)',
                                backgroundColor: isHovered ? service.accentColor : 'rgba(255,255,255,0.02)'
                            }}
                            animate={{ rotate: isHovered ? 45 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ArrowUpRight className="w-5 h-5 text-white" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Accent Line */}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px]"
                style={{ backgroundColor: service.accentColor }}
                initial={{ width: 0 }}
                animate={{ width: isHovered ? '100%' : 0 }}
                transition={{ duration: 0.5 }}
            />
        </motion.div>
    )
}

export default function ServicesDetailed() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [50, -50])

    return (
        <section ref={containerRef} className="relative py-40 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[#1a0d20]" />

            {/* Gradient Orbs */}
            <motion.div
                style={{ y }}
                className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-[#431846]/20 rounded-full blur-[200px] pointer-events-none"
            />
            <motion.div
                className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#ed1c24]/5 rounded-full blur-[150px] pointer-events-none"
            />

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.015]">
                <svg className="w-full h-full">
                    <pattern id="servicesGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#servicesGrid)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <div className="w-12 h-[1px] bg-gradient-to-r from-[#ed1c24] to-transparent" />
                        <span className="text-[#ed1c24] text-xs font-medium tracking-[0.4em] uppercase">
                            Serviços
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6"
                    >
                        <span className="text-white">Ecossistema</span>{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed1c24] via-[#a855f7] to-[#431846]">
                            SEEA
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/50 max-w-2xl font-light"
                    >
                        Uma abordagem 360º que une estratégia, produção de elite e distribuição inteligente.
                    </motion.p>
                </div>

                {/* Services Grid */}
                <div className="space-y-4">
                    {SERVICES.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <p className="text-white/40 text-sm mb-6">
                        Cada projeto é único. Vamos entender o seu?
                    </p>
                    <motion.a
                        href="#contato"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white text-sm font-medium uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Agendar Conversa Estratégica
                        <ArrowUpRight className="w-4 h-4" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    )
}
