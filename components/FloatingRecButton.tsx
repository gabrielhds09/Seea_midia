'use client'

import { motion } from 'framer-motion'

interface FloatingRecButtonProps {
    whatsappNumber?: string
    message?: string
}

export default function FloatingRecButton({
    whatsappNumber = "5511913488620",
    message = "Olá! Vim pelo site e gostaria de saber mais sobre os serviços da SEEA."
}: FloatingRecButtonProps) {

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] group"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5, duration: 0.4, type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Iniciar conversa no WhatsApp"
        >
            {/* Heritage Glow — roxo profundo */}
            <div className="absolute inset-0 bg-[#431846] rounded-full blur-lg opacity-25 group-hover:opacity-45 transition-opacity duration-500" />

            {/* Button — Heritage Design System with Liquid Glass */}
            <div className="relative flex items-center gap-2.5 px-5 py-3 bg-[#312338]/80 backdrop-blur-md rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1)] group-hover:shadow-[0_12px_48px_rgba(67,24,70,0.3)] transition-all duration-500 border border-white/10 overflow-hidden group-hover:bg-[#431846]/90">
                
                {/* Subtle Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* Pulsing Dot — Using Heritage Red for 'Recording' feel */}
                <motion.div
                    className="w-2 h-2 bg-heritage-red rounded-full shadow-[0_0_8px_rgba(237,28,36,0.6)]"
                    animate={{ opacity: [1, 0.4, 1], scale: [1, 0.9, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* REC Text — Gold accent */}
                <span className="text-[#F0ECE6] font-bold text-[0.65rem] tracking-[0.2em] uppercase font-sans">
                    REC
                </span>
            </div>
        </motion.a>
    )
}
