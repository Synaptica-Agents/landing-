'use client'

import { StarsBackground } from '@/components/ui/stars'
import { SmoothSnap } from '@/components/ui/smooth-snap'
import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { Statement } from '@/components/landing/statement'

import { CTA } from '@/components/landing/cta'
import { FAQ } from '@/components/landing/faq'
import { Footer } from '@/components/landing/footer'

export default function LandingPage() {
  return (
    <StarsBackground className="h-screen bg-[radial-gradient(ellipse_at_bottom,_#0d1117_0%,_#080b14_100%)] snap-y snap-proximity">
      <SmoothSnap />
      <main className="relative z-10">
        <Navbar />
        <Hero />
        <Statement />

        <CTA />
        <FAQ />
        <Footer />
      </main>
    </StarsBackground>
  )
}
