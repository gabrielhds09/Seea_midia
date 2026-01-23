'use client'

import { motion } from 'framer-motion'

interface FloatingRecButtonProps {
    whatsappNumber?: string
    message?: string
}

export default function FloatingRecButton({
    whatsappNumber = "5511999999999",
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
            {/* Subtle Glow */}
            <div className="absolute inset-0 bg-[#ed1c24] rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />

            {/* Button - Minimalist */}
            <div className="relative flex items-center gap-2 px-4 py-2.5 bg-[#ed1c24] rounded-full shadow-md group-hover:shadow-lg group-hover:shadow-[#ed1c24]/20 transition-all duration-300">

                {/* Pulsing Dot */}
                <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* REC Text */}
                <span className="text-white font-semibold text-xs tracking-wider">
                    REC
                </span>
            </div>
        </motion.a>
    )
}
