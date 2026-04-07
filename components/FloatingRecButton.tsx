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

            {/* Button — Heritage Design System */}
            <div className="relative flex items-center gap-2.5 px-5 py-3 bg-gradient-to-r from-[#312338] to-[#431846] rounded-full shadow-[0_8px_24px_-4px_rgba(49,35,56,0.3)] group-hover:shadow-[0_12px_32px_-4px_rgba(49,35,56,0.4)] transition-all duration-500 border border-white/[0.08]">

                {/* Pulsing Gold Dot */}
                <motion.div
                    className="w-2 h-2 bg-[#CA8A04] rounded-full shadow-[0_0_6px_rgba(202,138,4,0.4)]"
                    animate={{ opacity: [1, 0.3, 1], scale: [1, 0.85, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* REC Text — Gold accent */}
                <span className="text-[#F0ECE6] font-bold text-[0.65rem] tracking-[0.2em] uppercase font-sans">
                    REC
                </span>
            </div>
        </motion.a>
    )
}
