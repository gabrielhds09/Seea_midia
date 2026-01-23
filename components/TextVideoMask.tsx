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

                    {/* White/Gray Gradient Text (Background SEEA) */}
                    <h2
                        className="relative text-[16vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] font-black uppercase tracking-tighter select-none"
                        style={{
                            color: 'transparent',
                            backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(180,180,180,0.25))',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        {text}
                    </h2>

                    {/* SVG Mask Definition */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 100 }}>
                        <defs>
                            <mask id="textMask">
                                <rect x="0" y="0" width="100%" height="100%" fill="black" />
                                <text
                                    x="50%"
                                    y="50%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="white"
                                    fontSize="16vw"
                                    className="font-black uppercase tracking-tighter sm:text-[12vw] md:text-[10vw] lg:text-[8vw]"
                                    style={{ fontFamily: 'var(--font-inter)' }}
                                >
                                    {text}
                                </text>
                            </mask>
                        </defs>
                    </svg>

                    {/* Red Gradient (Front SEEA) - MUST BE VISIBLE */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            zIndex: 50,
                            mask: 'url(#textMask)',
                            WebkitMask: 'url(#textMask)',
                            maskSize: 'cover',
                            WebkitMaskSize: 'cover'
                        }}
                    >
                        <div
                            className="w-full h-full bg-gradient-to-br from-[#ed1c24] via-[#ff4d4d] to-[#c41e3a] animate-pulse"
                            style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
