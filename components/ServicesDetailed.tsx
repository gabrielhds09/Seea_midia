'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const SERVICES = [
    {
        id: '01',
        title: 'ESTRATÉGIA',
        subtitle: '& diagnóstico',
        description: 'Análise profunda do seu momento atual. Definimos arquétipos, narrativa e o plano de ação para alinhar sua imagem aos seus objetivos comerciais.',
        tags: ['Posicionamento', 'Arquétipos', 'Planejamento'],
    },
    {
        id: '02',
        title: 'BRANDING',
        subtitle: 'audiovisual',
        description: 'Construção da identidade visual e sonora da sua marca pessoal. Identidade que transmite nobreza, exclusividade e inovação.',
        tags: ['Identidade Visual', 'Direção de Arte', 'Sound Design'],
    },
    {
        id: '03',
        title: 'CONTEÚDO',
        subtitle: 'roteirizado',
        description: 'Produção de alto nível com roteiros intencionais (REC). Vídeos que educam, engajam e vendem, sem parecer "mais do mesmo".',
        tags: ['Reels Estratégicos', 'Vídeos Longos', 'Roteiro'],
    },
    {
        id: '04',
        title: 'ACOMPANHAMENTO',
        subtitle: 'presencial',
        description: 'Captura orgânica da sua rotina. Transformamos o dia a dia em conteúdo de autoridade, com direção de cena e olhar treinado em tempo real.',
        tags: ['Direção de Cena', 'Stories', 'Lifestyle'],
    },
    {
        id: '05',
        title: 'GESTÃO',
        subtitle: 'estratégica (tráfego)',
        description: 'Não basta postar, é preciso distribuir. Amplificamos sua mensagem para o público certo através de tráfego pago inteligente.',
        tags: ['Ads Manager', 'Distribuição', 'Análise de Dados'],
    },
]

function ServiceRow({ service, index }: { service: typeof SERVICES[0]; index: number }) {
    const [hovered, setHovered] = useState(false)
    const arrowRef = useRef<HTMLDivElement>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!arrowRef.current) return
        const rect = arrowRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Magnetic pull factor
        const pullX = (e.clientX - centerX) * 0.35
        const pullY = (e.clientY - centerY) * 0.35
        setMousePos({ x: pullX, y: pullY })
    }

    const handleMouseLeave = () => {
        setHovered(false)
        setMousePos({ x: 0, y: 0 })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
            onMouseEnter={() => setHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative border-b border-black/[0.06] cursor-pointer overflow-hidden"
        >
            {/* ── BACKGROUND SWEEP ── */}
            <motion.div
                className="absolute inset-0 bg-[#f4f2ee] -z-10 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hovered ? 1 : 0 }}
                transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            />

            <div className="flex items-start gap-8 py-8 sm:py-10 relative z-10 px-0 group-hover:px-4 transition-all duration-700">
                {/* Number */}
                <span className="flex-shrink-0 pt-1 text-[0.6rem] font-medium tracking-[0.4em] text-[#431846]/50 group-hover:text-[#431846] transition-colors">
                    {service.id}
                </span>

                {/* Title + sub */}
                <div className="flex-1 min-w-0">
                    <div className="mb-4">
                        <span
                            className="font-sans font-extralight tracking-[-0.02em] text-[#111111]"
                            style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)' }}
                        >
                            {service.title}
                        </span>{' '}
                        <span
                            className="font-serif italic text-black/20 group-hover:text-black/35 transition-colors"
                            style={{ fontSize: 'clamp(1rem, 2.2vw, 1.8rem)' }}
                        >
                            {service.subtitle}
                        </span>
                    </div>

                    <p className="text-[0.85rem] font-light leading-[1.8] text-black/45 group-hover:text-black/60 max-w-2xl mb-5 transition-colors">
                        {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-[0.6rem] font-medium uppercase tracking-[0.18em] px-3.5 py-1.5 border border-black/[0.06] text-black/30 group-hover:border-[#431846]/20 group-hover:text-black/50 transition-all duration-500"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── MAGNETIC ARROW ── */}
                <motion.div
                    ref={arrowRef}
                    className="flex-shrink-0 w-12 h-12 rounded-full border border-black/[0.08] flex items-center justify-center text-black/20 transition-colors duration-500 mt-1"
                    animate={{
                        x: hovered ? mousePos.x : 0,
                        y: hovered ? mousePos.y : 0,
                        borderColor: hovered ? 'rgba(67,24,70,0.5)' : 'rgba(0,0,0,0.08)',
                        color: hovered ? '#431846' : 'rgba(0,0,0,0.2)'
                    }}
                    transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                >
                    <ArrowUpRight className="w-5 h-5" />
                </motion.div>
            </div>

            {/* Red accent hairline */}
            <motion.div
                className="absolute bottom-0 left-0 h-[1.5px] bg-[#431846] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hovered ? 1 : 0 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            />
        </motion.div>
    )
}

export default function ServicesDetailed() {
    return (
        <section className="relative py-40 overflow-hidden bg-[#faf9f7] px-6 sm:px-12 lg:px-20 xl:px-28">

            {/* Top hairline */}
            <div className="absolute top-0 left-0 right-0 h-[0.5px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(17,17,17,0.08), transparent)' }} />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="mb-24 max-w-4xl">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.5em] text-[#431846]/40 mb-10">
                        Serviços
                    </p>
                    <div className="flex flex-col gap-[6px] mb-12">
                        <div className="w-16 h-[2.5px] bg-[#431846]/50" />
                        <div className="w-10 h-[2.5px] bg-[#431846]/50" />
                    </div>
                    <div className="overflow-hidden mb-1">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                            className="font-extralight tracking-tight text-[#111111]"
                            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95 }}
                        >
                            <span className="font-sans">UM ECOSSISTEMA </span>
                            <span className="font-serif italic font-normal serif-luxury text-[#431846]/70" style={{ fontSize: '1.08em', marginLeft: '0.1em' }}>completo</span>
                        </motion.h2>
                    </div>
                    <div className="overflow-hidden mt-2">
                        <h2 className="font-extralight tracking-tight text-[#111111]"
                            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95 }}>
                            <span className="font-sans">SEEA</span>
                            <span className="text-[#431846]">.</span>
                        </h2>
                    </div>
                    <p className="mt-8 text-[0.95rem] font-light leading-[1.8] text-black/60 max-w-2xl">
                        Uma abordagem 360° que une estratégia, produção de elite e distribuição inteligente.
                    </p>
                </div>

                {/* Services list */}
                <div className="border-t border-black/[0.07]">
                    {SERVICES.map((service, i) => (
                        <ServiceRow key={service.id} service={service} index={i} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 flex items-center justify-between gap-8 flex-wrap">
                    <p className="text-[0.78rem] font-light text-black/40 max-w-xs">
                        Cada projeto é único. Vamos entender o seu?
                    </p>
                    <a
                        href="https://wa.me/5511999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 py-4 border-b border-black/[0.12] transition-all duration-500 hover:border-black/30"
                    >
                        <span className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-black/45 group-hover:text-[#111111] transition-colors">
                            Agendar conversa
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-black/25 group-hover:text-[#431846] transition-colors" />
                    </a>
                </div>
            </div>
        </section>
    )
}
