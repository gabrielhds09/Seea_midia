'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function OverlayNav() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const menuItems = [
        { label: "Home", href: "#" },
        { label: "Projetos", href: "#" },
        { label: "Serviços", href: "#" },
        { label: "Sobre", href: "#" },
        { label: "Contato", href: "#" }
    ]

    return (
        <>
            {/* Valid for all pages - Fixed Header */}
            <header className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-md py-4' : 'bg-transparent'}`}>

                {/* Logo Area */}
                <div className="text-xl font-bold tracking-tighter text-white z-50 mix-blend-difference">
                    SEEA
                </div>

                {/* Right: Menu Trigger */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="group flex items-center gap-3 text-white z-50 mix-blend-difference"
                >
                    <span className="hidden md:block text-xs font-bold tracking-[0.2em] uppercase group-hover:tracking-[0.3em] transition-all">Menu</span>
                    <div className="p-2 border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-colors">
                        <Menu className="w-5 h-5" />
                    </div>
                </button>
            </header>

            {/* Full Screen Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[60] bg-[#0a0a0a] flex flex-col items-center justify-center text-white"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 md:top-12 md:right-12 p-4 text-white hover:rotate-90 transition-transform duration-500"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <nav className="flex flex-col gap-6 text-center">
                            {menuItems.map((item, index) => (
                                <motion.a
                                    key={index}
                                    href={item.href}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                                    className="text-5xl md:text-7xl font-black uppercase tracking-tighter hover:text-purple-500 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                        </nav>

                        <div className="absolute bottom-12 w-full flex justify-center gap-8 text-sm text-white/40 uppercase tracking-widest font-mono">
                            <span>Instagram</span>
                            <span>LinkedIn</span>
                            <span>Email</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
