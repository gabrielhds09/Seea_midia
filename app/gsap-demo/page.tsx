import GSAPShowcase from '@/components/gsap/GSAPShowcase'
import Link from 'next/link'

export default function GSAPDemoPage() {
    return (
        <main className="min-h-screen bg-[#1a0525]">
            {/* Back button */}
            <div className="fixed top-6 left-6 z-50">
                <Link
                    href="/"
                    className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/20 transition-colors text-sm font-medium"
                >
                    ← Voltar
                </Link>
            </div>

            <GSAPShowcase />
        </main>
    )
}
