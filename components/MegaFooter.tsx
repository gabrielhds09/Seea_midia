'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Linkedin, MessageCircle, Mail, MapPin, ArrowUpRight } from 'lucide-react'

const NAV_LINKS = [
    { label: "Home", href: "#" },
    { label: "Serviços", href: "#servicos" },
    { label: "Projetos", href: "#projetos" },
    { label: "Sobre", href: "#sobre" },
    { label: "FAQ", href: "#faq" },
    { label: "Contato", href: "#contato" }
]

const SOCIAL_LINKS = [
    { label: "Instagram", href: "#", icon: Instagram, color: "#E4405F" },
    { label: "LinkedIn", href: "#", icon: Linkedin, color: "#0A66C2" },
    { label: "WhatsApp", href: "https://wa.me/5511999999999", icon: MessageCircle, color: "#25D366" }
]

export default function MegaFooter() {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null)
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative bg-[#1a0d20] text-white overflow-hidden">

            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ed1c24]/50 to-transparent" />

            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-[800px] h-[600px] bg-[#431846]/10 rounded-full blur-[200px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[#ed1c24]/5 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                {/* Main Footer Content */}
                <div className="pt-24 pb-16">
                    <div className="grid lg:grid-cols-12 gap-16">

                        {/* Left - Brand + CTA */}
                        <div className="lg:col-span-5">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                {/* Logo */}
                                <img
                                    src="/logo-seea.png"
                                    alt="SEEA"
                                    className="h-10 w-auto mb-8 opacity-80"
                                />

                                <p className="text-2xl font-light text-white/70 leading-relaxed mb-8 max-w-md">
                                    Gestão de carreira e imagem para quem quer ir{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ed1c24] to-[#431846] font-medium">
                                        além do óbvio
                                    </span>.
                                </p>

                                {/* CTA Button */}
                                <motion.a
                                    href="https://wa.me/5511999999999"
                                    className="group inline-flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-[#ed1c24] to-[#431846] rounded-full text-white font-semibold tracking-wide shadow-lg shadow-[#ed1c24]/20 hover:shadow-[#ed1c24]/40 transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span>Agendar conversa estratégica</span>
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </motion.a>
                            </motion.div>
                        </div>

                        {/* Right - Navigation + Social */}
                        <div className="lg:col-span-7">
                            <div className="grid sm:grid-cols-2 gap-12">

                                {/* Navigation */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <h4 className="text-xs uppercase tracking-[0.3em] text-white/30 mb-8">
                                        Navegação
                                    </h4>
                                    <ul className="space-y-4">
                                        {NAV_LINKS.map((link, index) => (
                                            <li key={link.label}>
                                                <motion.a
                                                    href={link.href}
                                                    className="group relative inline-flex items-center gap-2 text-lg text-white/60 hover:text-white transition-colors"
                                                    onMouseEnter={() => setHoveredLink(link.label)}
                                                    onMouseLeave={() => setHoveredLink(null)}
                                                    whileHover={{ x: 5 }}
                                                >
                                                    <span className={`w-0 h-[1px] bg-[#ed1c24] transition-all duration-300 ${hoveredLink === link.label ? 'w-4' : ''}`} />
                                                    {link.label}
                                                </motion.a>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>

                                {/* Social + Contact */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h4 className="text-xs uppercase tracking-[0.3em] text-white/30 mb-8">
                                        Conecte-se
                                    </h4>

                                    {/* Social Links */}
                                    <div className="flex gap-3 mb-10">
                                        {SOCIAL_LINKS.map((social) => (
                                            <motion.a
                                                key={social.label}
                                                href={social.href}
                                                className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center hover:border-white/20 transition-all duration-300 group"
                                                whileHover={{
                                                    scale: 1.05,
                                                    backgroundColor: `${social.color}20`,
                                                    borderColor: `${social.color}50`
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                                aria-label={social.label}
                                            >
                                                <social.icon
                                                    className="w-5 h-5 text-white/50 group-hover:text-white transition-colors"
                                                    style={{ color: hoveredLink === social.label ? social.color : undefined }}
                                                />
                                            </motion.a>
                                        ))}
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-4 text-sm text-white/40">
                                        <a href="mailto:contato@seea.com.br" className="flex items-center gap-3 hover:text-white/70 transition-colors">
                                            <Mail className="w-4 h-4" />
                                            contato@seea.com.br
                                        </a>
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-4 h-4" />
                                            São Paulo, Brasil
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/[0.06] py-8">
                    <div className="flex justify-center items-center">



                        {/* Copyright */}
                        <div className="w-full text-center">
                            <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-1">
                                © {currentYear} SEEA Mídia
                            </p>
                            <p className="text-white/20 text-[10px]">
                                Todos os direitos reservados
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Corner Element */}
            <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none">
                <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-[#ed1c24]/20" />
            </div>
        </footer>
    )
}
