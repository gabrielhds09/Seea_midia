"use client"

import React from "react"
import { motion } from "framer-motion"
import { HoverSlider, HoverSliderImage, HoverSliderImageWrap, TextStaggerHover, useHoverSliderContext } from "@/components/ui/animated-slideshow"
import { BrandAccent } from "./ContentSections"

const SLIDES = [
    {
        id: "imersao-convivencia",
        title: "Imersão & Convivência",
        subtitle: "A base de tudo é o vivido.",
        description: "Nosso processo nasce da convivência. Observamos como você se comunica, vende e se posiciona para criar algo autêntico. Nossa principal fonte não é o Google, é o próprio cliente.",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
    },
    {
        id: "conteudo-autoridade",
        title: "Conteúdo & Autoridade",
        subtitle: "Transformando o comum em extraordinário.",
        description: "É da vivência que surgem roteiros e decisões. Captamos detalhes que passam despercebidos para transformar o cotidiano em autoridade real.",
        imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2342&auto=format&fit=crop"
    },
    {
        id: "acompanhamento-suporte",
        title: "Suporte & Estratégia",
        subtitle: "Próximo, humanizado e intencional.",
        description: "Atendimento próximo e humanizado. Criamos conteúdo, orientamos gravações, ajustamos estratégias e auxiliamos até na gestão do seu posicionamento.",
        imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2374&auto=format&fit=crop"
    },
    {
        id: "distribuicao-estratégica",
        title: "Distribuição de Impacto",
        subtitle: "Escala com intenção.",
        description: "Criação e distribuição caminham juntas. Utilizamos tráfego pago de forma integrada, sempre alinhado ao seu posicionamento e aos seus objetivos reais.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
    }
]

function SlideDescription({ index, slide }: { index: number; slide: typeof SLIDES[0] }) {
    const { activeSlide } = useHoverSliderContext();
    const isActive = activeSlide === index;

    return (
        <motion.div
            initial={false}
            animate={{ 
                opacity: isActive ? 1 : 0, 
                height: isActive ? 'auto' : 0,
                marginTop: isActive ? 8 : 0
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden md:max-w-md"
        >
            <p className="text-[0.6rem] md:text-[0.623rem] font-bold tracking-[0.3em] uppercase text-[var(--color-category)] mb-2">
                {slide.subtitle}
            </p>
            <p className="text-xs md:text-[1rem] font-light font-sans leading-relaxed text-stone-600/80 pr-4">
                {slide.description}
            </p>
        </motion.div>
    );
}

export default function MetodologiaPremium() {
    return (
        <HoverSlider className="relative py-20 md:py-48 px-4 sm:px-12 lg:px-20 xl:px-28 bg-[var(--color-marble-white)] overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 items-start">
                
                {/* Left Side: Content & Typography */}
                <div className="flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="mb-8 md:mb-12"
                    >
                        <p className="text-[0.62rem] font-bold font-sans uppercase tracking-[0.55em] text-[var(--color-category)] mb-6 md:mb-8">
                            Metodologia
                        </p>
                        <BrandAccent className="mb-8 md:mb-12" />
                        <h2 className="text-[clamp(1.75rem,5.5vw,4.5rem)] font-light font-sans tracking-tight text-stone-900 leading-[0.95] uppercase">
                            Nosso <span className="serif-luxury italic font-normal text-[var(--color-category)]">Processo</span><br />
                            Na Prática.
                        </h2>
                    </motion.div>

                    {/* Interactive Grid on mobile */}
                    <div className="grid grid-cols-[1fr_85px] sm:grid-cols-[1fr_150px] md:flex flex-col gap-y-8 md:gap-y-12">
                        
                        {/* Column 1: Textual Steps */}
                        <div className="flex flex-col space-y-6 md:space-y-12 pr-4 md:pr-0">
                            {SLIDES.map((slide, index) => (
                                <div key={slide.id} className="flex flex-col gap-2">
                                    <TextStaggerHover
                                        index={index}
                                        className="cursor-pointer text-base sm:text-2xl md:text-5xl font-bold uppercase tracking-tight text-[var(--color-stone-black)]/80 transition-colors duration-500 hover:text-[var(--color-category)]"
                                        text={slide.title}
                                    />
                                    <SlideDescription index={index} slide={slide} />
                                </div>
                            ))}
                        </div>

                        {/* Column 2 (Mobile only): Floating Jewelry Image */}
                        <div className="md:hidden sticky top-24 h-[120px] sm:h-[180px] w-full mt-4">
                             <HoverSliderImageWrap className="relative w-full h-full shadow-[0_30px_60px_-15px_rgba(67,24,70,0.15)] rounded-2xl overflow-hidden bg-white/20">
                                <div className="absolute inset-0 border border-stone-200/40 rounded-2xl z-20 pointer-events-none" />
                                {SLIDES.map((slide, index) => (
                                    <HoverSliderImage
                                        key={slide.id}
                                        index={index}
                                        imageUrl={slide.imageUrl}
                                        src={slide.imageUrl}
                                        alt={slide.title}
                                        className="size-full object-cover grayscale-[10%] sepia-[5%] brightness-105"
                                        loading="eager"
                                        decoding="async"
                                    />
                                ))}
                            </HoverSliderImageWrap>
                        </div>

                    </div>
                </div>

                {/* Right Side (Desktop only): Immersive Image (Floating Jewelry Box) */}
                <div className="hidden md:flex sticky top-1/4 h-[600px] items-center justify-center">
                    <HoverSliderImageWrap className="relative w-full h-full max-w-lg shadow-[0_50px_100px_-20px_rgba(67,24,70,0.12)] rounded-3xl overflow-hidden bg-white/20">
                        <div className="absolute inset-0 border border-stone-200/50 rounded-3xl z-20 pointer-events-none" />
                        {SLIDES.map((slide, index) => (
                            <HoverSliderImage
                                key={slide.id}
                                index={index}
                                imageUrl={slide.imageUrl}
                                src={slide.imageUrl}
                                alt={slide.title}
                                className="size-full object-cover grayscale-[10%] sepia-[5%] brightness-105 rounded-3xl"
                                loading="eager"
                                decoding="async"
                            />
                        ))}
                    </HoverSliderImageWrap>
                    
                    {/* Decorative Background Orbs (Heritage Branding) */}
                    <div className="absolute -z-10 w-full h-full">
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--color-category)] opacity-[0.03] blur-[120px] rounded-full"
                        />
                    </div>
                </div>

            </div>
            
            {/* Smooth transition indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-marble-white)] to-transparent pointer-events-none" />
        </HoverSlider>
    )
}
