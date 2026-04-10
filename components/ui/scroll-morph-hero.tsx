"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useScroll, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";

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
    const [videoLoaded, setVideoLoaded] = useState(false);

    const isMobile = containerSize.width < 768;
    
    // 1. Phase 1: Circle
    const circleRadius = isMobile 
        ? containerSize.width * 0.52 
        : Math.min(containerSize.width * 0.42, containerSize.height * 0.48, 540);
    const circleAngle = (index / total) * 360;
    const circleRad = (circleAngle * Math.PI) / 180;
    const circleX = Math.cos(circleRad) * circleRadius;
    const circleY = Math.sin(circleRad) * circleRadius;
    const circleRot = circleAngle + 90;

    // 2. Phase 2: Arc
    const baseRadius = containerSize.width * (isMobile ? 1.05 : 1.25);
    const arcApexY = containerSize.height * (isMobile ? 0.32 : 0.28);
    const arcCenterY = arcApexY + baseRadius;
    const spreadAngle = isMobile ? 135 : 135;
    const startAngle = -90 - (spreadAngle / 2);
    const currentArcAngle = startAngle + (index * (spreadAngle / (total - 1)));
    const arcRad = (currentArcAngle * Math.PI) / 180;
    const arcX = Math.cos(arcRad) * baseRadius;
    const arcY = Math.sin(arcRad) * baseRadius + arcCenterY;
    const arcRot = currentArcAngle + 90;

    // 3. Phase 3: Final Dispersal
    const stripeX = (index / (total - 1)) * containerSize.width - containerSize.width / 2;
    const finalX = stripeX * (isMobile ? 1.25 : 1.15);
    const finalY = containerSize.height * (isMobile ? 0.45 : 0.45);

    const x = useTransform(progress, [0, 0.4, 0.55, 1], [circleX, arcX, arcX, finalX]);
    const y = useTransform(progress, [0, 0.4, 0.55, 1], [circleY, arcY, arcY, finalY]);
    const rotate = useTransform(progress, [0, 0.4, 0.55, 1], [circleRot, arcRot, arcRot, 0]);
    const scale = useTransform(progress, [0, 0.4, 0.55, 1], [1, isMobile ? 1.05 : 1.8, isMobile ? 1.05 : 1.8, 0.9]);
    const opacity = useTransform(progress, [0, 0.45, 0.85, 1], [1, 1, 0.15, 0.05]);

    // Thumbnail Mapping Logic
    const thumbSrc = useMemo(() => {
        // Extrai o número do vídeo: /video/video-XX.mp4 -> XX
        const match = src.match(/video-(\d+)/i);
        const num = match ? match[1] : "01";
        
        // Fallback for missing assets (Verified in filesystem: 11 and 12 are missing)
        if (num === "11") return `/thumbnails/thumb-07.jpg`; 
        if (num === "12") return `/thumbnails/thumb-05.jpg`;
        
        // thumb-13 is uppercase .JPG in filesystem
        if (num === "13") return `/thumbnails/thumb-13.JPG`;
        
        return `/thumbnails/thumb-${num}.jpg`;
    }, [src]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0.2;
            videoRef.current.onloadeddata = () => setVideoLoaded(true);
        }
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
                {/* FRONT FACE: DUAL MEDIA (Image + Video) */}
                <div className="absolute inset-0 h-full w-full overflow-hidden rounded-lg shadow-xl bg-[var(--color-marble-white)] border border-stone-200/50" style={{ backfaceVisibility: "hidden" }}>
                    
                    {/* Fallback Image Layer (Instant Load) */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={thumbSrc}
                            alt="Project Thumbnail"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100px, 200px"
                        />
                    </div>

                    {/* Video Layer (Fade in when ready) */}
                    <video 
                        ref={videoRef} 
                        src={src} 
                        className={`absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                        muted 
                        loop 
                        playsInline 
                        preload="auto" 
                    />
                    
                    <div className="absolute inset-0 z-20 bg-stone-900/5 transition-opacity group-hover:opacity-0" />
                </div>

                {/* BACK FACE: LEGACY INFO */}
                <div className="absolute inset-0 h-full w-full overflow-hidden rounded-lg shadow-xl bg-[var(--color-marble-white)] flex items-center justify-center p-2 border border-[var(--color-gold-precision)]/20" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                    <p className="text-[8px] font-sans font-bold uppercase tracking-widest text-[#431846]">Impacto</p>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Constants (Normalized for case sensitivity) ---
const VIDEOS = [
    "/video/video-01.mp4", "/video/video-07.mp4", "/video/video-03.mp4", "/video/video-11.mp4",
    "/video/video-05.mp4", "/video/video-12.mp4", "/video/video-09.mp4", "/video/video-13.MP4",
    "/video/video-02.mp4", "/video/video-08.mp4", "/video/video-04.mp4", "/video/video-10.mp4",
    "/video/video-06.mp4", "/video/video-03.mp4", "/video/video-12.mp4", "/video/video-07.mp4",
    "/video/video-01.mp4"
].slice(0, 17);

export default function UnifiedHeroMorph() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    
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

    const cardSize = useMemo(() => {
        if (isMobile) return { width: 56, height: 78 }; 
        return { width: 85, height: 120 };
    }, [isMobile]);

    const visibleVideos = useMemo(() => {
        if (!isMobile) return VIDEOS;
        return VIDEOS.slice(0, 12);
    }, [isMobile]);

    const total = visibleVideos.length;

    const bgGradient = useTransform(smoothProgress, [0.7, 1], ["var(--color-marble-white)", "#FAFAF9"]);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-[var(--color-marble-white)]">
            <motion.div style={{ backgroundColor: bgGradient }} className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
                
                {/* Step 0: Initial Logo Reveal (Updated to black.png) */}
                <motion.div
                    style={{ 
                        opacity: useTransform(smoothProgress, [0, 0.18, 0.25], [1, 1, 0]),
                        scale: useTransform(smoothProgress, [0, 0.28], [1, 0.85]),
                        filter: useTransform(smoothProgress, [0.18, 0.28], ["blur(0px)", "blur(10px)"]),
                        y: useTransform(smoothProgress, [0, 0.25], [0, -30])
                    }}
                    className="absolute z-30 flex flex-col items-center pointer-events-none"
                >
                    <div className="relative w-[180px] sm:w-[240px] h-32 mb-12">
                        <Image
                            src="/black.png"
                            alt="SEEA Mídia"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    
                    <motion.div 
                        style={{ opacity: useTransform(smoothProgress, [0, 0.08], [1, 0]) }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-[0.6rem] font-bold tracking-[0.4em] uppercase text-stone-400">Rolar para vivenciar</span>
                        <motion.div
                            className="w-2 h-2 bg-heritage-red rounded-full shadow-[0_0_8px_rgba(237,28,36,0.6)]"
                            animate={{ opacity: [1, 0.4, 1], scale: [1, 0.9, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div 
                            animate={{ height: [40, 60, 40], opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-[1px] bg-gradient-to-b from-stone-400 to-transparent" 
                        />
                    </motion.div>
                </motion.div>

                {/* Narrative Stages (Legacy Text Layers) */}
                <motion.div 
                    style={{ 
                        opacity: useTransform(smoothProgress, [0.25, 0.35, 0.45, 0.52], [0, 1, 1, 0]), 
                        scale: useTransform(smoothProgress, [0.25, 0.35, 0.52], [0.95, 1, 1.05]),
                        y: useTransform(smoothProgress, [0.25, 0.52], [20, -20])
                    }}
                    className="absolute z-10 flex flex-col items-center text-center pointer-events-none drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]"
                >
                    <h1 className="text-[clamp(1.6rem,5.5vw,4.5rem)] font-light tracking-tight text-stone-900 uppercase">
                        UM <span className="serif-luxury italic font-normal text-[var(--color-heritage-purple)] capitalize">time</span> QUE
                    </h1>
                    <div className="mt-8 flex flex-col items-center gap-2">
                        <div className="w-16 h-[0.5px] bg-stone-300" />
                    </div>
                </motion.div>

                <motion.div 
                    style={{ 
                        opacity: useTransform(smoothProgress, [0.55, 0.65, 0.78, 0.85], [0, 1, 1, 0]),
                        y: useTransform(smoothProgress, [0.55, 0.85], [20, -40]) 
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

                <motion.div 
                    style={{ 
                        opacity: useTransform(smoothProgress, [0.88, 0.97], [0, 1]),
                        y: useTransform(smoothProgress, [0.88, 1], [40, 0])
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
                         <span className="hidden md:block text-[0.62rem] font-bold tracking-[0.55em] text-cta uppercase underline-offset-4 decoration-cta/30">SEEA MÍDIA</span>
                         <div className="w-12 h-[0.5px] bg-stone-300" />
                    </div>
                </motion.div>

                {/* --- Cards Implementation --- */}
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
