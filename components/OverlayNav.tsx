'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { gsap } from 'gsap'
import StaggerText from './StaggerText'

export default function OverlayNav() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const [scrolled, setScrolled] = useState(false)

    const logoRef = React.useRef<HTMLDivElement>(null)
    const menuRef = React.useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)

        // Intersection Observer for section tracking
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0% -40% 0%', // Trigger when the section is in the middle of the screen
            threshold: 0
        };

        const sectionNames: { [key: string]: string } = {
            'inicio': 'INÍCIO',
            'perspectiva': 'PERSPECTIVA',
            'o-conceito': 'PROPOSTA',
            'nosso-acervo': 'NOSSO ACERVO',
            'metodologia': 'MÉTODO',
            'depoimentos': 'FEEDBACK',
            'quem-somos': 'QUEM SOMOS',
            'time': 'NOSSO TIME'
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(sectionNames[entry.target.id] || '');
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => observer.observe(section));

        // GSAP Intro
        const ctx = gsap.context(() => {
            const hasSeen = sessionStorage.getItem('seea_intro_seen')
            const baseDelay = hasSeen ? 0.8 : 9.6

            gsap.fromTo('.nav-logo',
                { clipPath: 'inset(100% 0 0 0)', y: 20, scale: 1.05, opacity: 0 },
                { clipPath: 'inset(0% 0 0 0)', y: 0, scale: 1, opacity: 1, duration: 2.2, ease: 'expo.out', delay: baseDelay }
            )
            gsap.fromTo('.nav-menu',
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 2.2, ease: 'expo.out', delay: baseDelay + 0.2 }
            )

            // Magnetic Logic
            const makeMagnetic = (el: HTMLElement, strength = 0.3) => {
                const onMouseMove = (e: MouseEvent) => {
                    const rect = el.getBoundingClientRect()
                    const x = e.clientX - rect.left - rect.width / 2
                    const y = e.clientY - rect.top - rect.height / 2
                    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.6, ease: 'power2.out' })
                }
                const onMouseLeave = () => {
                    gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' })
                }
                el.addEventListener('mousemove', onMouseMove)
                el.addEventListener('mouseleave', onMouseLeave)
                return () => {
                    el.removeEventListener('mousemove', onMouseMove)
                    el.removeEventListener('mouseleave', onMouseLeave)
                }
            }

            if (logoRef.current) makeMagnetic(logoRef.current, 0.2)
            if (menuRef.current) makeMagnetic(menuRef.current, 0.4)
        })

        return () => {
            window.removeEventListener('scroll', handleScroll)
            observer.disconnect()
            ctx.revert()
        }
    }, [])

    const menuItems = [
        { label: "Home", href: "#inicio" },
        { label: "O Conceito", href: "#o-conceito" },
        { label: "Acervo", href: "#nosso-acervo" },
        { label: "Metodologia", href: "#metodologia" },
        { label: "Quem Somos", href: "#quem-somos" }
    ]

    return (
        <>
            {/* Valid for all pages - Fixed Header */}
            <header
                className={`fixed top-0 left-0 w-full z-[9999] flex justify-between items-center px-6 md:px-12 py-5 transition-all duration-700 ease-in-out will-change-[backdrop-filter,background-color] ${scrolled ? 'bg-white/[0.08] backdrop-blur-[40px] border-b border-black/[0.03] md:border-none shadow-[0_8px_32px_rgba(0,0,0,0.02)] ring-1 ring-inset ring-white/10' : 'bg-transparent'}`}
                style={{
                    WebkitBackdropFilter: scrolled ? 'blur(40px)' : 'none',
                    transform: 'translateZ(0)' // Force GPU layer and fix positioning context
                }}
            >

                {/* Logo Area */}
                <div ref={logoRef} className="z-50 nav-logo opacity-0 will-change-[transform,opacity,clip-path]">
                    <img
                        src={scrolled ? "/black.svg" : "/black.svg"} 
                        alt="SEEA"
                        className="h-8 sm:h-10 w-auto object-contain transition-all duration-500 origin-bottom"
                    />
                </div>

                {/* Right: Menu Trigger */}
                <div className="flex items-center gap-6 nav-menu opacity-0 will-change-[transform,opacity]">
                    {/* Active Section Indicator */}
                    <AnimatePresence mode="wait">
                        {scrolled && activeSection && (
                            <motion.span
                                key={activeSection}
                                initial={{ opacity: 0, x: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
                                className="hidden md:block text-[0.62rem] font-bold tracking-[0.45em] text-cta"
                            >
                                {activeSection}
                            </motion.span>
                        )}
                    </AnimatePresence>

                    <button
                        ref={menuRef}
                        onClick={() => setIsOpen(true)}
                        aria-label="Abrir menu de navegação"
                        aria-expanded={isOpen}
                        className="group flex items-center gap-3 text-primary z-50"
                    >
                        <span className="hidden md:block text-xs font-bold tracking-[0.2em] uppercase text-primary/45 group-hover:tracking-[0.3em] group-hover:text-cta transition-all">Menu</span>
                        <div className="p-2 border border-primary/[0.12] rounded-full group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all">
                            <Menu className="w-5 h-5" />
                        </div>
                    </button>
                </div>
            </header>

            {/* Full Screen Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ clipPath: 'circle(0% at 94% 6%)' }}
                        animate={{ clipPath: 'circle(150% at 94% 6%)' }}
                        exit={{ clipPath: 'circle(0% at 94% 6%)' }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[10000] bg-primary flex flex-col items-center justify-center text-background"
                    >
                        {/* LUXURY GRAIN OVERLAY */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] grayscale contrast-150 mix-blend-multiply flex"
                            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
                        />

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            aria-label="Fechar menu de navegação"
                            className="absolute top-6 right-6 md:top-12 md:right-12 p-4 text-background/40 hover:text-cta hover:rotate-90 transition-all duration-700 z-[10001]"
                        >
                            <X className="w-10 h-10 font-extralight" />
                        </button>

                        <nav className="flex flex-col gap-8 text-center relative z-10">
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 + (index * 0.08), duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <motion.a
                                        href={item.href}
                                        className="group relative inline-block font-sans font-extralight uppercase tracking-[-0.04em] text-background/30 hover:text-cta transition-colors duration-600"
                                        style={{ fontSize: 'clamp(3rem, 9vw, 6.5rem)' }}
                                        onClick={() => setIsOpen(false)}
                                        whileHover={{ x: 15 }}
                                    >
                                        <span className="relative">
                                            {item.label}
                                            {/* Heritage Dot */}
                                            <motion.span
                                                className="absolute -right-6 bottom-[15%] w-3 h-3 rounded-full bg-heritage-red opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_15px_rgba(237,28,36,0.5)]"
                                                initial={{ scale: 0 }}
                                                whileHover={{ scale: 1.5 }}
                                            />
                                        </span>
                                    </motion.a>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Bottom social links staggered */}
                        <div className="absolute bottom-16 w-full flex justify-center gap-12">
                            {['Instagram', 'LinkedIn', 'Email'].map((label, i) => (
                                <motion.a
                                    key={label}
                                    href="#"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + (i * 0.1), duration: 0.8 }}
                                    className="text-[0.65rem] uppercase tracking-[0.5em] text-background/25 hover:text-cta transition-colors duration-500 font-medium"
                                >
                                    {label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
