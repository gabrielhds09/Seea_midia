'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const IMAGES = [
    "https://images.unsplash.com/photo-1758314896569-b3639ee707c4?q=80&w=715&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1671649240322-2124cd07eaae?q=80&w=627&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1673029925648-af80569efc46?q=80&w=687&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1666533099824-abd0ed813f2a?q=80&w=687&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1671105035554-7f8c2a587201?q=80&w=627&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1686750875748-d00684d36b1e?q=80&w=687&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1686844462591-393ceae12be0?q=80&w=764&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1686839181367-febb561faa53?q=80&w=687&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1671199850329-91cae34a6b6d?q=80&w=627&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1685655611311-9f801b43b9fa?q=80&w=627&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1675598468920-878ae1e46f14?q=80&w=764&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1718036094878-ecdce2b1be95?q=80&w=715&auto=format&fit=crop"
]

export default function LoopingGallery() {
    const [isPaused, setIsPaused] = useState(false)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <section className="relative w-full overflow-hidden bg-[#0a0a0a] min-h-screen">
            <style jsx>{`
                .loop-gallery-container {
                    perspective: 1200px;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    background: radial-gradient(ellipse at center, #1a0525 0%, #0a0510 40%, #000 100%);
                }
                .carousel-track {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transform-style: preserve-3d;
                    animation: spin 80s linear infinite;
                    transition: animation-play-state 0.5s ease;
                }
                .carousel-track.paused {
                    animation-play-state: paused;
                }
                .carousel-item {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 220px;
                    height: 320px;
                    margin-left: -110px;
                    margin-top: -160px;
                    transform-style: preserve-3d;
                    transform: rotateY(calc(var(--i) * (360deg / 12))) translateZ(600px);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    -webkit-box-reflect: below 15px linear-gradient(transparent, transparent, rgba(0,0,0,0.3));
                }
                .carousel-item.hovered {
                    transform: rotateY(calc(var(--i) * (360deg / 12))) translateZ(680px) scale(1.15);
                    z-index: 100;
                }
                .carousel-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 16px;
                    border: 2px solid rgba(255,255,255,0.08);
                    box-shadow: 
                        0 0 40px rgba(109, 40, 217, 0.15),
                        0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    transition: all 0.4s ease;
                }
                .carousel-item.hovered img {
                    border-color: rgba(237, 28, 36, 0.5);
                    box-shadow: 
                        0 0 60px rgba(237, 28, 36, 0.3),
                        0 0 100px rgba(109, 40, 217, 0.2),
                        0 35px 60px -15px rgba(0, 0, 0, 0.6);
                }
                .carousel-item .overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%);
                    border-radius: 16px;
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    display: flex;
                    align-items: flex-end;
                    padding: 20px;
                }
                .carousel-item.hovered .overlay {
                    opacity: 1;
                }
                @keyframes spin {
                    from { transform: rotateY(0deg); }
                    to { transform: rotateY(360deg); }
                }
                
                /* Vinheta central para foco */
                .vignette {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.7) 100%);
                    pointer-events: none;
                    z-index: 5;
                }
                
                /* Partículas flutuantes */
                .particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 50%;
                    animation: float 20s infinite ease-in-out;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
                    10% { opacity: 0.5; }
                    50% { transform: translateY(-100vh) translateX(50px); opacity: 0.3; }
                    90% { opacity: 0; }
                }
            `}</style>

            {/* Part 1: The 3D Carousel */}
            <div
                className="loop-gallery-container"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => { setIsPaused(false); setHoveredIndex(null); }}
            >
                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            bottom: `-10%`,
                            animationDelay: `${Math.random() * 20}s`,
                            animationDuration: `${15 + Math.random() * 10}s`
                        }}
                    />
                ))}

                {/* Vinheta de foco */}
                <div className="vignette" />

                <div className={`carousel-track ${isPaused ? 'paused' : ''}`}>
                    {IMAGES.map((src, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${hoveredIndex === index ? 'hovered' : ''}`}
                            style={{ '--i': index + 1 } as React.CSSProperties}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <img src={src} alt={`Gallery ${index}`} loading="lazy" />
                            <div className="overlay">
                                <span className="text-white text-sm font-medium tracking-wide">
                                    Projeto {String(index + 1).padStart(2, '0')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Overlay Text - Enhanced */}
                <motion.div
                    className="absolute inset-x-0 bottom-16 text-center pointer-events-none z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <span className="inline-flex items-center gap-3 text-white/40 text-xs tracking-[0.4em] uppercase">
                        <span className="w-8 h-[1px] bg-white/20" />
                        {isPaused ? 'Explorando' : 'Passe o mouse para pausar'}
                        <span className="w-8 h-[1px] bg-white/20" />
                    </span>
                </motion.div>
            </div>

            {/* Part 2: Feature Section (Improved) */}
            <div className="relative z-10 bg-gradient-to-b from-black via-[#050208] to-[#0a0a0a] py-32 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-8">
                            Experiência <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-red-500 to-purple-500 bg-[length:200%_auto] animate-gradient">
                                Imersiva
                            </span>
                        </h2>
                        <div className="space-y-6 text-xl text-white/60 font-light leading-relaxed">
                            <p>
                                Descubra a magia do movimento contínuo. Na SEEA, cada frame é planejado para capturar a atenção e contar uma história sem interrupções.
                            </p>
                            <p>
                                A animação 3D e os efeitos de perspectiva adicionam profundidade e dinamismo, criando uma vitrine moderna para marcas que ousam ir além do convencional.
                            </p>
                        </div>
                    </motion.div>

                    <div className="grid gap-6">
                        {[
                            { title: "Design Moderno", desc: "Efeitos 3D e animações suaves que elevam a percepção de valor.", icon: "✦" },
                            { title: "Performance", desc: "Otimizado para rodar liso em qualquer dispositivo.", icon: "◈" },
                            { title: "Adaptabilidade", desc: "Perfeito para portfolios, galerias e apresentações de impacto.", icon: "◇" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-8 rounded-2xl hover:bg-white/[0.06] hover:border-purple-500/30 transition-all duration-500 cursor-pointer overflow-hidden"
                            >
                                {/* Glow on hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative flex items-start gap-4">
                                    <span className="text-2xl text-purple-400 group-hover:text-red-400 transition-colors">{item.icon}</span>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{item.title}</h3>
                                        <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                    animation: gradient 4s ease infinite;
                }
            `}</style>
        </section>
    )
}
