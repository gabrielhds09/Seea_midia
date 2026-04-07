import dynamic from 'next/dynamic'
import OverlayNav from '@/components/OverlayNav'
import IntroAnimation from '@/components/ui/scroll-morph-hero'
import GSAPWrapper from '@/components/GSAPWrapper'
import FloatingRecButton from '@/components/FloatingRecButton'

// Lazy load heavy components for better performance
const ContentSections = dynamic(() => import('@/components/ContentSections'), {
  loading: () => <div className="min-h-screen bg-[var(--color-background)]" />
})

import SectionSeparator from '@/components/SectionSeparator'

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-marble-white)] relative">
      <GSAPWrapper />

      <OverlayNav />
      
      {/* Unified Narrative Morph (300vh) */}
      <IntroAnimation />

      <SectionSeparator />

      <div className="relative z-[5]">
        <ContentSections />
      </div>

      {/* Floating REC Button - WhatsApp CTA */}
      <FloatingRecButton
        whatsappNumber="5511913488620"
        message="Olá! Vim pelo site da SEEA e gostaria de agendar uma conversa estratégica."
      />
    </main>
  )
}
