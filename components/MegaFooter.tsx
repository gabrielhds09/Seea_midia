'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Instagram, Linkedin, MessageCircle, Mail, MapPin, ArrowUpRight } from 'lucide-react'

const NAV_LINKS = [
    { label: 'Home', href: '#' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contato', href: '#contato' },
]

const SOCIAL_LINKS = [
    { label: 'Instagram', href: '#', icon: Instagram },
    { label: 'LinkedIn', href: '#', icon: Linkedin },
    { label: 'WhatsApp', href: 'https://wa.me/5511999999999', icon: MessageCircle },
]

export default function MegaFooter() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative bg-[#f2f0ec] text-[#111111] overflow-hidden">
            {/* LARGE WATERMARK BACKGROUND */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden">
                <span
                    className="text-[30vw] font-sans font-black text-black/[0.02] leading-none tracking-[-0.08em]"
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
                                <Image
                                    src="/logo-seea-dark.png"
                                    alt="SEEA Mídia"
                                    width={120}
                                    height={40}
                                    className="h-10 w-auto mb-12 opacity-80"
                                />

                                {/* Red double-bar */}
                                <div className="flex flex-col gap-[6px] mb-12">
                                    <div className="w-16 h-[2.5px] bg-[#431846]/50" />
                                    <div className="w-10 h-[2.5px] bg-[#431846]/50" />
                                </div>

                                <p className="text-[0.95rem] font-light leading-[1.8] text-black/60 mb-12 max-w-sm">
                                    Gestão de carreira e imagem para quem quer construir autoridade e ir{' '}
                                    <span className="text-black/80 font-normal italic">além do óbvio</span>.
                                </p>

                                {/* Minimal CTA with Shimmer */}
                                <motion.a
                                    href="https://wa.me/5511999999999"
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
                                    className="animate-shimmer group inline-flex items-center gap-6 py-6 px-10 border border-black/[0.08] rounded-full transition-all duration-500 hover:border-[#431846]/40 hover:bg-white/50 backdrop-blur-md"
                                >
                                    <span className="text-[0.8rem] font-medium uppercase tracking-[0.4em] text-black/60 group-hover:text-[#111111] transition-colors">
                                        Agendar agora
                                    </span>
                                    <ArrowUpRight className="w-4.5 h-4.5 text-[#431846]/40 group-hover:text-[#ed1c24] transition-all duration-500" />
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
                                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.5em] text-[#431846]/35 mb-10">
                                        Navegação
                                    </p>
                                    <ul className="space-y-5">
                                        {NAV_LINKS.map((link) => (
                                            <li key={link.label}>
                                                <a
                                                    href={link.href}
                                                    className="group text-[0.95rem] font-light text-black/50 hover:text-[#111111] transition-colors duration-400 flex items-center gap-3"
                                                >
                                                    <span className="w-0 h-[0.5px] bg-[#431846]/50 transition-all duration-500 group-hover:w-6" />
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
                                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.5em] text-[#431846]/35 mb-10">
                                        Conecte-se
                                    </p>

                                    <div className="flex gap-4 mb-12">
                                        {SOCIAL_LINKS.map((s) => (
                                            <motion.a
                                                key={s.label}
                                                href={s.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-12 h-12 rounded-full border border-black/[0.1] flex items-center justify-center text-black/40 hover:border-[#431846]/40 hover:text-[#431846] hover:bg-[#431846]/[0.02] transition-colors duration-500"
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
                                            className="flex items-center gap-4 text-[0.88rem] font-light text-black/45 hover:text-[#431846]/70 transition-colors"
                                        >
                                            <Mail className="w-4 h-4 opacity-50" />
                                            contato@seea.com.br
                                        </a>
                                        <div className="flex items-center gap-4 text-[0.85rem] font-light text-black/35">
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
                <div className="border-t border-black/[0.1] py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="text-black/35 text-[0.7rem] uppercase tracking-[0.3em]">
                        © {currentYear} SEEA Mídia
                    </p>
                    <p className="text-black/20 text-[0.65rem] uppercase tracking-[0.25em]">
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
