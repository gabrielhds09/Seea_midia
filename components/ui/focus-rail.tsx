"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo, usePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc: string;
  videoSrc?: string;
  href?: string;
  meta?: string;
  priority?: boolean;
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const BASE_SPRING = {
  type: "spring" as const,
  stiffness: 100, // Mais suave para reduzir oscilações de layout
  damping: 35,
  mass: 1.5,
};

const TAP_SPRING = {
  type: "spring" as const,
  stiffness: 400,
  damping: 20,
  mass: 1,
};

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = true,
  interval = 5000,
  className,
}: FocusRailProps) {
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);
  const [multiplier, setMultiplier] = React.useState(340); // Safe default for SSR
  const [hasMounted, setHasMounted] = React.useState(false);
  const lastWheelTime = React.useRef<number>(0);

  const count = items.length;
  const activeIndex = wrap(0, count, active);
  const activeItem = items[activeIndex];

  // Update multiplier on mount and resize
  React.useEffect(() => {
    setHasMounted(true);
    const updateMultiplier = () => {
      setMultiplier(Math.min(window.innerWidth * 0.28, 380));
    };
    updateMultiplier();
    window.addEventListener("resize", updateMultiplier);
    return () => window.removeEventListener("resize", updateMultiplier);
  }, []);

  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  const onWheel = React.useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 500) return;

      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.deltaY;

      if (Math.abs(delta) > 30) {
        if (delta > 0) handleNext();
        else handlePrev();
        lastWheelTime.current = now;
      }
    },
    [handleNext, handlePrev]
  );

  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

  const onDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) handleNext();
    else if (swipe > swipeConfidenceThreshold) handlePrev();
  };

  const visibleIndices = [-2, -1, 0, 1, 2];

  return (
    <div
      className={cn(
        "group relative flex h-[620px] md:h-[750px] w-full flex-col overflow-hidden bg-[var(--color-background)] text-[var(--color-text)] outline-none select-none overflow-x-hidden",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
    >
      {/* Background Atmosphere - Optimized (No real-time filters) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-color-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-[var(--color-heritage-purple)]"
          />
        </AnimatePresence>
        
        {/* Heritage Gradient Overlay (Deep depth without blur) */}
        <div className="absolute inset-0 bg-radial-[at_50%_50%] from-transparent via-[var(--color-background)]/40 to-[var(--color-background)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-[var(--color-background)]" />
        {/* Ghost Typography - SEEA Identity */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
            <span className="text-[40vw] font-serif italic text-[var(--color-category)]">seea</span>
        </div>
      </div>

      {/* Main Stage */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8">
        
        {/* DRAGGABLE RAIL CONTAINER */}
        <motion.div
          className="relative mx-auto flex h-[480px] w-full max-w-[1400px] items-center justify-center perspective-[2000px] cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12} // Mais precisão no drag
          onDragEnd={onDragEnd}
          style={{ willChange: "transform" }} // GPU acceleration
        >
          {hasMounted && visibleIndices.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter = offset === 0;
            const dist = Math.abs(offset);

            // Responsive multipliers - Dynamic calculation for "pleasant" view
            const xOffset = offset * multiplier * (isCenter ? 1 : 0.95);
            const zOffset = isCenter ? 0 : -350 - (dist * 150);
            const scale = isCenter ? 1 : 0.78;
            const rotateY = offset * -20;

            const opacity = isCenter ? 1 : Math.max(0.2, 0.9 - dist * 0.3); // Mais presença visual (0.6 min aprox)
            const blur = isCenter ? 0 : dist * 3; // Menos "sujeira", mais foco
            const brightness = isCenter ? 1 : 0.6; // Maior visibilidade lateral

            return (
              <motion.div
                key={absIndex}
                className={cn(
                  "absolute aspect-[9/16] w-[240px] md:w-[280px] lg:w-[320px] rounded-[2rem] border border-white/10 bg-neutral-100/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] transition-shadow duration-500 overflow-hidden",
                  isCenter ? "z-20 shadow-[0_40px_80px_-16px_rgba(49,35,56,0.3)] ring-1 ring-[var(--color-cta)]/20" : "z-10"
                )}
                initial={false}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  scale: scale,
                  rotateY: rotateY,
                  opacity: opacity,
                  brightness: brightness, // Propriedade personalizada ou via filter sem blur
                }}
                transition={{
                  ...BASE_SPRING,
                  scale: TAP_SPRING,
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity",
                  filter: `brightness(${brightness})`, // Removido o blur reativo
                }}
                onClick={() => {
                  if (offset !== 0) setActive((p) => p + offset);
                }}
              >
                {/* Media Layer */}
                <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                  {isCenter && item.videoSrc ? (
                    <video
                      src={item.videoSrc}
                      className="h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={item.imageSrc}
                    />
                  ) : (
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="object-cover pointer-events-none"
                      sizes="(max-width: 768px) 70vw, 30vw"
                      priority={item.priority}
                    />
                  )}
                </div>

                {/* Lighting Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-category)]/40 via-transparent to-white/5 pointer-events-none" />
                
                {/* Edge Glow for center card */}
                {isCenter && (
                    <motion.div 
                        className="absolute inset-0 border border-[var(--color-cta)]/30 rounded-[inherit] pointer-events-none"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* ═══ Heritage Floating Navigation ═══ */}
        <div className="absolute inset-x-4 md:inset-x-12 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-30">
            <button
                onClick={handlePrev}
                className="pointer-events-auto h-12 w-12 md:h-16 md:w-16 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-[var(--color-text)]/40 hover:text-[var(--color-cta)] hover:border-[var(--color-cta)]/30 hover:scale-110 transition-all duration-500 group"
                aria-label="Anterior"
            >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 stroke-[1.2px] group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
                onClick={handleNext}
                className="pointer-events-auto h-12 w-12 md:h-16 md:w-16 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-[var(--color-text)]/40 hover:text-[var(--color-cta)] hover:border-[var(--color-cta)]/30 hover:scale-110 transition-all duration-500 group"
                aria-label="Próximo"
            >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 stroke-[1.2px] group-hover:translate-x-0.5 transition-transform" />
            </button>
        </div>

        {/* Navigation Dots - Minimalist center bottom */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
            {items.map((_, i) => (
                <div 
                    key={i}
                    className={cn(
                        "h-1 rounded-full transition-all duration-700",
                        i === activeIndex ? "w-8 bg-[var(--color-cta)]" : "w-2 bg-[var(--color-category)]/20"
                    )}
                />
            ))}
        </div>
      </div>
    </div>
  );
}
