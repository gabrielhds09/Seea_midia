'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Instagram, Mail, MessageCircle } from 'lucide-react'
import ClientLogos from './ClientLogos'
import BentoGridWork from './BentoGridWork'
import ProcessTimeline from './ProcessTimeline'
import TextVideoMask from './TextVideoMask'
import ServicesDetailed from './ServicesDetailed'
import GradualBlur from './ui/GradualBlur'
import SplitTextReveal from './gsap/SplitTextReveal'

import MegaFooter from './MegaFooter'
import ProjectTracks from './ProjectTracks'

// New Nivora-inspired components
import TeamMinimalist from './TeamMinimalist'
import TestimonialsMinimalist from './TestimonialsMinimalist'
import FAQMinimalist from './FAQMinimalist'
import AboutSEEA from './AboutSEEA'


// Shared Section Wrapper for consistent padding/layout
const Section = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <section className={`px-6 py-16 sm:px-12 md:py-24 lg:px-24 ${className}`}>
        <div className="mx-auto max-w-7xl">
            {children}
        </div>
    </section>
)

export default function ContentSections() {
    return (
        <div className="text-white relative overflow-hidden bg-gradient-to-b from-[#1a0d20] via-[#1f1028] to-[#1a0d20]">



            {/* 1.5 SOCIAL PROOF (New) */}
            <ClientLogos />

            {/* 2. ECOSSISTEMA SEEA - 5 Pilares de Serviços */}
            <ServicesDetailed />

            {/* 2.5 PROJECT TRACKS (New - Scroll Flip Effect) */}
            <ProjectTracks />

            {/* 3. VISÃO ALÉM DO AGORA */}
            <Section className="relative overflow-hidden">
                {/* Dynamic Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0f0515] to-[#050505]" />

                {/* Purple Glow */}
                <motion.div
                    animate={{ opacity: [0.2, 0.35, 0.2], y: [0, 30, 0] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#431846] rounded-full blur-[120px] opacity-30"
                />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl font-bold uppercase tracking-tighter sm:text-5xl mb-12">Visão além do agora</h2>
                    <div className="space-y-8 text-xl font-light leading-relaxed text-white/70">
                        <p>
                            Com o tempo, é natural que o profissional se acostume com a própria rotina e deixe de enxergar o valor do que vive diariamente. A SEEA entra exatamente nesse ponto.
                        </p>
                        <p>
                            Otimizamos a rotina do cliente e captamos preciosidades que muitas vezes passam despercebidas por quem está imerso no próprio trabalho. Transformamos o que é vivido todos os dias em conteúdo que comunica posicionamento, proximidade e autoridade.
                        </p>
                    </div>
                </div>
            </Section>

            {/* 4. O CONCEITO SEEA */}
            <Section className="relative overflow-hidden py-40">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#ffffff_0%,transparent_70%)] opacity-10" />
                </div>

                <div className="relative z-10 grid gap-12 lg:grid-cols-2 items-center">
                    <div>
                        {/* New Video Mask Title */}
                        <TextVideoMask text="SEEA" className="mb-4" />

                        <p className="mt-4 text-xl tracking-[0.2em] uppercase text-white/50 font-medium ml-4">
                            Vem de <i>see</i>, enxergar.
                        </p>
                    </div>

                    <div className="space-y-6 text-lg text-white/70 leading-relaxed border-l border-white/20 pl-8">
                        <p className="font-medium text-white text-2xl">Enxergar o que normalmente passa despercebido.</p>
                        <p>
                            Nosso diferencial está no olhar treinado para identificar ângulos, cenas, comportamentos e histórias que merecem ser contadas. Esse olhar não se limita ao conteúdo, mas ao próprio cliente. Cada trajetória é única e carrega valor.
                        </p>
                        <p>
                            Por atuarmos com diferentes segmentos e públicos, conseguimos identificar rapidamente para quem o cliente precisa falar e como comunicar de forma clara, intencional e verdadeira.
                        </p>
                    </div>
                </div>
            </Section>

            {/* 5, 6, 7. METODOLOGIA & PROCESSO (How We Work) */}
            <Section className="relative border-y border-white/5 overflow-hidden">
                {/* Dynamic Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#080808] to-black" />

                {/* Glows */}
                <motion.div
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-1/2 left-0 w-96 h-96 bg-[#431846] rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ opacity: [0.03, 0.08, 0.03] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-0 right-0 w-96 h-96 bg-[#ed1c24] rounded-full blur-[100px]"
                />

                <div className="grid gap-20 lg:grid-cols-2 relative z-10">
                    <div className="lg:sticky lg:top-32 lg:h-fit">
                        <h2 className="text-4xl font-bold uppercase tracking-tight text-white/90 mb-8">
                            Como trabalhamos
                        </h2>
                        <p className="text-lg text-white/60 leading-relaxed mb-6 max-w-md">
                            Nosso processo nasce da convivência com o cliente. Observamos como ele se comunica, como explica, como vende e como se posiciona.
                        </p>
                        <p className="text-lg text-white/60 leading-relaxed mb-12 max-w-md">
                            É dessa vivência que surgem roteiros, legendas e decisões estratégicas. Nossa principal fonte não é o Google. É o próprio cliente. Por isso, mesmo quando atuamos em segmentos semelhantes, cada perfil é único e carrega sua própria essência.
                        </p>

                        {/* Summary of 6 & 7 integrated as key benefits */}
                        <div className="space-y-6 border-t border-white/10 pt-8">
                            <div className="bg-white/5 p-6 rounded-lg border border-white/5">
                                <h4 className="text-lg font-bold text-white mb-2">Acompanhamento Próximo e Humanizado</h4>
                                <p className="text-sm text-white/50">Durante o atendimento, acompanhamos o cliente de forma próxima. Criamos conteúdos, orientamos gravações, ajustamos estratégias e oferecemos suporte contínuo. Também auxiliamos na gestão do direct e na interação com o público, sempre com uma abordagem humanizada e alinhada à imagem e ao posicionamento do cliente.</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-lg border border-white/5">
                                <h4 className="text-lg font-bold text-white mb-2">Conteúdo que Chega nas Pessoas Certas</h4>
                                <p className="text-sm text-white/50">Conteúdo bem construído precisa de estratégia para alcançar quem realmente importa. Por isso, criação e distribuição caminham juntas. Quando faz sentido para o projeto, utilizamos tráfego pago de forma integrada, sempre alinhado ao posicionamento, aos objetivos e à fase de cada cliente.</p>
                            </div>
                        </div>
                    </div>

                    {/* New Visual Timeline */}
                    <div>
                        <ProcessTimeline />
                    </div>
                </div>
            </Section>

            {/* 8. SOBRE A SEEA (Quem Somos) */}
            <AboutSEEA />

            {/* 9. TEAM SECTION (Nivora-inspired) */}
            <TeamMinimalist />

            {/* 8.5 TESTIMONIALS (Nivora-inspired) */}
            <TestimonialsMinimalist />

            {/* 9. FAQ (Nivora-inspired) */}
            <FAQMinimalist />

            <Section className="text-center py-40">
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">Vamos conversar?</h2>
                <p className="text-xl sm:text-2xl text-white/60 font-light mb-16 max-w-2xl mx-auto">
                    Cada projeto começa com uma conversa estratégica.<br />
                    Se fizer sentido para os dois lados, seguimos juntos.
                </p>

                <button className="group relative inline-flex overflow-hidden rounded-full bg-white px-12 py-6 text-sm font-bold tracking-[0.2em] text-[#050505] shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-transform hover:scale-105">
                    <span className="relative z-10 flex items-center gap-3">
                        AGENDAR CONVERSA ESTRATÉGICA <ArrowRight className="w-5 h-5" />
                    </span>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50 group-hover:animate-shine" />
                </button>
            </Section>

            {/* 10. MEGA FOOTER (New) */}
            <MegaFooter />

        </div>
    )
}
