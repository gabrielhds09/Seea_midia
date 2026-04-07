"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useScroll, useSpring, MotionValue } from "framer-motion";

// --- Types ---
interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    progress: MotionValue<number>;
    containerSize: { width: number; height: number };
    cardSize: { width: number; height: number };
}

// --- FlipCard Component (Premium UX & Spacing) ---
function FlipCard({ src, index, total, progress, containerSize, cardSize }: FlipCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const isMobile = containerSize.width < 768;
    
    // 1. Phase 1: Circle (UX Expansion for Breathing Room)
    // Mobile: Expandimos o raio para 52% da largura para afastar do texto
    const circleRadius = isMobile ? containerSize.width * 0.52 : 420;
    const circleAngle = (index / total) * 360;
    const circleRad = (circleAngle * Math.PI) / 180;
    const circleX = Math.cos(circleRad) * circleRadius;
    const circleY = Math.sin(circleRad) * circleRadius;
    const circleRot = circleAngle + 90;

    // 2. Phase 2: Arc (Responsive Jewelry Display)
    const baseRadius = containerSize.width * (isMobile ? 1.05 : 1.25);
    const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.28);
    const arcCenterY = arcApexY + baseRadius;
    const spreadAngle = isMobile ? 120 : 135;
    const startAngle = -90 - (spreadAngle / 2);
    const currentArcAngle = startAngle + (index * (spreadAngle / (total - 1)));
    const arcRad = (currentArcAngle * Math.PI) / 180;
    const arcX = Math.cos(arcRad) * baseRadius;
    const arcY = Math.sin(arcRad) * baseRadius + arcCenterY;
    const arcRot = currentArcAngle + 90;

    // 3. Phase 3: Final Dispersal
    const stripeX = (index / (total - 1)) * containerSize.width - containerSize.width / 2;
    const finalX = stripeX * (isMobile ? 1.25 : 1.15);
    const finalY = containerSize.height * (isMobile ? 0.42 : 0.45);

    const x = useTransform(progress, [0, 0.5, 0.6, 1], [circleX, arcX, arcX, finalX]);
    const y = useTransform(progress, [0, 0.5, 0.6, 1], [circleY, arcY, arcY, finalY]);
    const rotate = useTransform(progress, [0, 0.5, 0.6, 1], [circleRot, arcRot, arcRot, 0]);
    const scale = useTransform(progress, [0, 0.5, 0.6, 1], [1, isMobile ? 1.05 : 1.8, isMobile ? 1.05 : 1.8, 0.9]);
    const opacity = useTransform(progress, [0, 0.6, 0.9, 1], [1, 1, 0.15, 0.05]);

    useEffect(() => {
        if (videoRef.current) videoRef.current.currentTime = 0.2;
    }, [src]);

    useEffect(() => {
        if (videoRef.current && isHovered) {
            videoRef.current.play().catch(() => {});
        } else if (videoRef.current) {
            videoRef.current.pause();
        }
    }, [isHovered]);

    return (
        <motion.div
            style={{ x, y, rotate, scale, opacity, position: "absolute", width: cardSize.width, height: cardSize.height, transformStyle: "preserve-3d", perspective: "1000px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="cursor-pointer group z-20"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.8 }}
                whileHover={{ rotateY: 180 }}
            >
                <div className="absolute inset-0 h-full w-full overflow-hidden rounded-lg shadow-xl bg-[var(--color-marble-white)] border border-stone-200/50" style={{ backfaceVisibility: "hidden" }}>
                    <video ref={videoRef} src={src} className="h-full w-full object-cover" muted loop playsInline preload="metadata" />
                    <div className="absolute inset-0 bg-stone-900/5 transition-opacity group-hover:opacity-0" />
                </div>
                <div className="absolute inset-0 h-full w-full overflow-hidden rounded-lg shadow-xl bg-[var(--color-marble-white)] flex items-center justify-center p-2 border border-[var(--color-gold-precision)]/20" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                    <p className="text-[8px] font-sans font-bold uppercase tracking-widest text-[#431846]">Impacto</p>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Constants ---
const VIDEOS = [
    "/video/video-01.mp4", "/video/video-02.mp4", "/video/video-03.mp4", "/video/video-04.mp4",
    "/video/video-05.mp4", "/video/video-06.mp4", "/video/video-07.mp4", "/video/video-08.mp4",
    "/video/video-09.mp4", "/video/video-10.mp4", "/video/video-11.mp4", "/video/video-12.mp4",
    "/video/video-13.MP4", "/video/video-01.mp4", "/video/video-02.mp4", "/video/video-03.mp4",
    "/video/video-04.mp4", "/video/video-13.MP4", "/video/video-02.mp4", "/video/video-03.mp4"
];

export default function UnifiedHeroMorph() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    
    // Snappiness Adjustment: Mais stiffness e menos damping para resposta imediata
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 30 });

    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        const updateSize = () => { setContainerSize({ width: window.innerWidth, height: window.innerHeight }); };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const isMobile = containerSize.width > 0 && containerSize.width < 768;

    // --- Responsive Scaling (UX Pro Max Skill) ---
    const cardSize = useMemo(() => {
        if (isMobile) return { width: 56, height: 78 }; // ~25% menor no mobile
        return { width: 75, height: 105 }; // Escala desktop premium
    }, [isMobile]);

    const visibleVideos = useMemo(() => {
        if (!isMobile) return VIDEOS;
        return VIDEOS.slice(0, 13); // Mantendo 13 para impacto, mas reduzindo escala individual
    }, [isMobile]);

    const total = visibleVideos.length;

    const bgGradient = useTransform(smoothProgress, [0.7, 1], ["var(--color-marble-white)", "#FAFAF9"]);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-[var(--color-marble-white)]">
            <motion.div style={{ backgroundColor: bgGradient }} className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
                
                {/* Stage 1: UM TIME QUE (Com Glow de Legibilidade) */}
                <motion.div 
                    style={{ opacity: useTransform(smoothProgress, [0, 0.25, 0.35], [1, 1, 0]), scale: useTransform(smoothProgress, [0, 0.35], [1, 0.95]) }}
                    className="absolute z-10 flex flex-col items-center text-center pointer-events-none drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]"
                >
                    <h1 className="text-[clamp(1.6rem,5.5vw,4.5rem)] font-light tracking-tight text-stone-900">
                        UM <span className="serif-luxury italic font-normal text-[var(--color-heritage-purple)]">TIME</span> QUE
                    </h1>
                    <div className="mt-8 flex flex-col items-center gap-2">
                        <span className="text-[0.6rem] font-bold tracking-[0.4em] uppercase text-stone-400">Rolar para vivenciar</span>
                        <div className="w-[1px] h-10 bg-gradient-to-b from-stone-400 to-transparent" />
                    </div>
                </motion.div>

                {/* Stage 2: Enxerga cada PROJETO */}
                <motion.div 
                    style={{ 
                        opacity: useTransform(smoothProgress, [0.35, 0.45, 0.6, 0.7], [0, 1, 1, 0]),
                        y: useTransform(smoothProgress, [0.35, 0.7], [20, -40]) 
                    }}
                    className="absolute z-10 top-[22%] flex flex-col items-center text-center pointer-events-none px-6"
                >
                    <h2 className="text-[clamp(1.6rem,5.5vw,4.5rem)] font-light text-stone-900 tracking-tight mb-4 uppercase">
                        Enxerga cada <span className="serif-luxury italic capitalize text-[var(--color-heritage-purple)]">projeto</span>
                    </h2>
                    <p className="text-[0.6rem] sm:text-[0.75rem] font-bold text-stone-500 tracking-[0.3em] uppercase max-w-md">
                        Onde a estratégia encontra a alma das marcas.
                    </p>
                </motion.div>

                {/* Stage 3: Como uma HISTÓRIA. */}
                <motion.div 
                    style={{ 
                        opacity: useTransform(smoothProgress, [0.75, 0.85], [0, 1]),
                        y: useTransform(smoothProgress, [0.75, 1], [40, 0])
                    }}
                    className="absolute z-10 flex flex-col items-center text-center pointer-events-none px-4"
                >
                    <h2 className="text-[clamp(2.3rem,7.5vw,6rem)] leading-[0.95] font-light tracking-[-0.04em] text-stone-900">
                        <span className="serif-luxury italic text-[var(--color-heritage-purple)]" style={{ fontSize: '1.05em' }}>Como</span>
                        <span className="font-sans uppercase"> uma</span>
                    </h2>
                    <h2 className="text-[clamp(2.3rem,7.5vw,6rem)] leading-[0.95] font-light tracking-[-0.04em] text-stone-900 uppercase mt-2">
                        <span className="font-sans">história</span>
                        <span className="text-[var(--color-heritage-red)]">.</span>
                    </h2>
                    <div className="mt-12 flex items-center gap-4">
                         <div className="w-12 h-[0.5px] bg-stone-300" />
                         <span className="text-[0.55rem] font-bold tracking-[0.5em] text-stone-400 uppercase">SEEA MÍDIA</span>
                         <div className="w-12 h-[0.5px] bg-stone-300" />
                    </div>
                </motion.div>

                {/* --- Cards Implementation (Reactive Pattern) --- */}
                {hasMounted && containerSize.width > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                        <div className="relative w-full h-full flex items-center justify-center">
                            {visibleVideos.map((src, i) => (
                                <FlipCard 
                                    key={`${src}-${i}`} 
                                    src={src} 
                                    index={i} 
                                    total={total} 
                                    progress={smoothProgress} 
                                    containerSize={containerSize} 
                                    cardSize={cardSize}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='6'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23m)'/%3E%3C/svg%3E")` }} />
            </motion.div>
        </section>
    );
}
