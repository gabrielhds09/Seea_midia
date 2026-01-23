'use client'

import React from 'react'

interface TextVideoMaskProps {
    text: string
    videoSrc?: string
    className?: string
}

export default function TextVideoMask({ text, videoSrc, className = '' }: TextVideoMaskProps) {
    return (
        <div
            className={`relative overflow-hidden flex items-center justify-center py-8 md:py-12 ${className}`}
        >
            {/* Background Gradient - Purple/Pink/Blue */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500" />

            <div className="relative w-full flex items-center justify-center px-4">
                <div className="relative inline-block">

                    {/* White/Gray SEEA (Background Layer) */}
                    <h2
                        className="relative text-[16vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] font-black uppercase tracking-tighter select-none"
                        style={{
                            color: 'transparent',
                            backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(180,180,180,0.25))',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 0 30px rgba(255,255,255,0.1)'
                        }}
                    >
                        {text}
                    </h2>

                    {/* Red SEEA (Front Layer) - Using CSS background-clip instead of SVG mask */}
                    <h2
                        className="absolute inset-0 text-[16vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] font-black uppercase tracking-tighter select-none animate-pulse"
                        style={{
                            color: 'transparent',
                            backgroundImage: 'linear-gradient(135deg, #ed1c24 0%, #ff4d4d 50%, #c41e3a 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 4px 20px rgba(237, 28, 36, 0.4)'
                        }}
                    >
                        {text}
                    </h2>
                </div>
            </div>
        </div>
    )
}
