'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Instagram, Linkedin, MessageCircle, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'

const NAV_LINKS = [
    { label: 'Home', href: '#inicio' },
    { label: 'O Conceito', href: '#o-conceito' },
    { label: 'Projetos', href: '#nosso-acervo' },
    { label: 'Metodologia', href: '#metodologia' },
    { label: 'Quem Somos', href: '#quem-somos' },
    { label: 'Contato', href: 'https://wa.me/5511913488620' },
]

const SOCIAL_LINKS = [
    { label: 'Instagram', href: 'https://instagram.com/seeamidia', icon: Instagram },
    { label: 'LinkedIn', href: '#', icon: Linkedin },
    { label: 'WhatsApp', href: 'https://wa.me/5511913488620', icon: MessageCircle },
]

export default function MegaFooter() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative bg-[var(--color-stone-black)] text-[var(--color-marble-white)] overflow-hidden">
            {/* LARGE WATERMARK BACKGROUND */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden">
                <span
                    className="text-[30vw] font-sans font-black text-white/[0.03] leading-none tracking-[-0.08em]"
                    style={{ transform: 'translateY(15%)' }}
                >
                    SEEA
                </span>
            </div>

            {/* Top hairline */}
            <div className="absolute top-0 left-0 right-0 h-[0.5px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(237,28,36,0.25), rgba(17,17,17,0.05), transparent)' }} />

            <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-28 relative z-10">

                {/* Main Content */}
                <div className="pt-32 pb-24">
                    <div className="grid lg:grid-cols-12 gap-24">

                        {/* Left — Brand + CTA */}
                        <div className="lg:col-span-5">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                            >
                                {/* Logo */}
                                <img
                                    src="/white.svg"
                                    alt="SEEA Mídia"
                                    className="h-10 w-auto mb-12 select-none"
                                />

                                {/* Red double-bar */}
                                <div className="flex flex-col gap-[6px] mb-12">
                                    <div className="w-16 h-[2.5px] bg-[var(--color-category)]/50" />
                                    <div className="w-10 h-[2.5px] bg-[var(--color-cta)]/50" />
                                </div>

                                <p className="text-[0.95rem] font-light font-sans leading-[1.8] text-white/60 mb-12 max-w-sm">
                                    Gestão de carreira e imagem para quem quer ir{' '}
                                    <span className="text-white/80 font-normal italic font-serif">além do óbvio</span>.
                                </p>

                                {/* Minimal CTA with Shimmer */}
                                <motion.a
                                    href="https://wa.me/5511913488620"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseMove={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect()
                                        const x = e.clientX - rect.left - rect.width / 2
                                        const y = e.clientY - rect.top - rect.height / 2
                                        gsap.to(e.currentTarget, { x: x * 0.2, y: y * 0.2, duration: 0.6, ease: 'power2.out' })
                                    }}
                                    onMouseLeave={(e) => {
                                        gsap.to(e.currentTarget, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' })
                                    }}
                                    className="animate-shimmer group inline-flex items-center gap-6 py-6 px-10 border border-white/[0.08] rounded-full transition-all duration-500 hover:border-[var(--color-bg-gold)]/40 hover:bg-white/5 backdrop-blur-md"
                                >
                                    <span className="text-[0.8rem] font-medium font-sans uppercase tracking-[0.4em] text-white/60 group-hover:text-white transition-colors">
                                        Agendar conversa estratégica
                                    </span>
                                    <ArrowUpRight className="w-4.5 h-4.5 text-[var(--color-bg-gold)]/40 group-hover:text-[var(--color-cta)] transition-all duration-500" />
                                </motion.a>
                            </motion.div>
                        </div>

                        {/* Right — Navigation + Social + Contact */}
                        <div className="lg:col-span-12 xl:lg:col-span-7">
                            <div className="grid sm:grid-cols-2 gap-20">

                                {/* Navigation */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
                                >
                                    <p className="text-[0.62rem] font-semibold font-sans uppercase tracking-[0.5em] text-[var(--color-gold-precision)]/50 mb-10">
                                        Navegação
                                    </p>
                                    <ul className="space-y-5">
                                        {NAV_LINKS.map((link) => (
                                            <li key={link.label}>
                                                <a
                                                    href={link.href}
                                                    className="group text-[0.95rem] font-light font-sans text-white/50 hover:text-white transition-colors duration-400 flex items-center gap-3"
                                                >
                                                    <span className="w-0 h-[0.5px] bg-[var(--color-category)]/50 transition-all duration-500 group-hover:w-6" />
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>

                                {/* Social + Contact */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
                                >
                                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.5em] text-[var(--color-heritage-purple)]/70 mb-10">
                                        Conecte-se
                                    </p>

                                    <div className="flex gap-4 mb-12">
                                        {SOCIAL_LINKS.map((s) => (
                                            <motion.a
                                                key={s.label}
                                                href={s.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-12 h-12 rounded-full border border-white/[0.1] flex items-center justify-center text-white/40 hover:border-[var(--color-bg-gold)]/40 hover:text-[var(--color-bg-gold)] hover:bg-white/[0.02] transition-colors duration-500"
                                                aria-label={s.label}
                                                whileHover={{ y: -5, scale: 1.05 }}
                                                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                            >
                                                <s.icon className="w-4.5 h-4.5" />
                                            </motion.a>
                                        ))}
                                    </div>

                                    <div className="space-y-5">
                                        <a
                                            href="mailto:contato@seea.com.br"
                                            className="flex items-center gap-4 text-[0.88rem] font-light font-sans text-white/45 hover:text-[var(--color-bg-gold)]/70 transition-colors"
                                        >
                                            <Mail className="w-4 h-4 opacity-50" />
                                            contato@seea.com.br
                                        </a>
                                        <div className="flex items-center gap-4 text-[0.85rem] font-light font-sans text-white/35">
                                            <MapPin className="w-4 h-4 opacity-40" />
                                            São Paulo, Brasil
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/[0.1] py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="text-white/35 text-[0.7rem] uppercase font-sans tracking-[0.3em]">
                        © {currentYear} SEEA Mídia
                    </p>
                    <p className="text-white/20 text-[0.65rem] uppercase font-sans tracking-[0.25em]">
                        Elevating Digital Authority
                    </p>
                </div>
            </div>

            {/* Bottom-right corner motif */}
            <div className="absolute bottom-0 right-0 pointer-events-none opacity-10">
                <div className="w-32 h-32 border-r border-b border-[#431846]/20" />
            </div>
        </footer>
    )
}
