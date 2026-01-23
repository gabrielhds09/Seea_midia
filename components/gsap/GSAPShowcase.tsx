'use client'

import HorizontalScrollText from './HorizontalScrollText'
import SplitTextReveal from './SplitTextReveal'

export default function GSAPShowcase() {
    return (
        <div className="bg-[#1a0525] text-white">
            {/* Split Text Reveal Demo */}
            <section className="min-h-screen flex items-center justify-center px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <SplitTextReveal
                        text="A SEEA Mídia transforma marcas em experiências visuais inesquecíveis através de design cinematográfico e tecnologia de ponta."
                        className="text-white"
                        duration={0.8}
                        stagger={0.15}
                    />
                </div>
            </section>

            {/* Horizontal Scroll Text Demo */}
            <HorizontalScrollText
                text="SEEA • VISÃO CINEMATOGRÁFICA • DESIGN • MOTION • FUTURO • SEEA •"
                className="bg-gradient-to-r from-purple-900 to-black"
            />

            {/* Another Split Text for variety */}
            <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-black">
                <div className="max-w-3xl mx-auto">
                    <SplitTextReveal
                        text="Cada projeto é único. Cada frame conta uma história. Cada movimento tem propósito."
                        className="text-purple-200"
                        duration={0.6}
                        stagger={0.1}
                    />
                </div>
            </section>
        </div>
    )
}
