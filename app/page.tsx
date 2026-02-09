import dynamic from 'next/dynamic'
import OverlayNav from '@/components/OverlayNav'
import HeroCinematic from '@/components/HeroCinematic'
import GSAPWrapper from '@/components/GSAPWrapper'
import FloatingRecButton from '@/components/FloatingRecButton'

// Lazy load heavy components for better performance
const ContentSections = dynamic(() => import('@/components/ContentSections'), {
  loading: () => <div className="min-h-screen bg-[#1a0525]" />
})

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a0d20] relative selection:bg-purple-500 selection:text-white">
      <GSAPWrapper />

      <OverlayNav />
      <HeroCinematic />

      <ContentSections />

      {/* Floating REC Button - WhatsApp CTA */}
      <FloatingRecButton
        whatsappNumber="5511999999999"
        message="Olá! Vim pelo site da SEEA e gostaria de agendar uma conversa estratégica."
      />
    </main>
  )
}
