import dynamic from 'next/dynamic'
import OverlayNav from '@/components/OverlayNav'
import HeroCinematic from '@/components/HeroCinematic'
import GSAPWrapper from '@/components/GSAPWrapper'
import FloatingRecButton from '@/components/FloatingRecButton'

// Lazy load heavy components for better performance
const ContentSections = dynamic(() => import('@/components/ContentSections'), {
  loading: () => <div className="min-h-screen bg-[#1a0525]" />
})

import SectionSeparator from '@/components/SectionSeparator'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf9f7] relative">
      <GSAPWrapper />

      <OverlayNav />
      <HeroCinematic />

      <SectionSeparator />

      <ContentSections />

      {/* Floating REC Button - WhatsApp CTA */}
      <FloatingRecButton
        whatsappNumber="5511913488620"
        message="Olá! Vim pelo site da SEEA e gostaria de agendar uma conversa estratégica."
      />
    </main>
  )
}
