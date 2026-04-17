'use client'

import { SmoothSnap } from '@/components/ui/smooth-snap'
import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { Statement } from '@/components/landing/statement'
import { HowItWorks } from '@/components/landing/how-it-works'

import { CTA } from '@/components/landing/cta'
import { FAQ } from '@/components/landing/faq'
import { Footer } from '@/components/landing/footer'

export default function LandingPage() {
  return (
    <div
      data-slot="snap-scroll"
      className="relative size-full overflow-x-hidden overflow-y-auto h-screen snap-y snap-mandatory bg-background"
    >
      <SmoothSnap />
      <main className="relative z-10">
        <Navbar />
        <Hero />
        <Statement />
        <HowItWorks />

        <CTA />
        <FAQ />
        <Footer />
      </main>
    </div>
  )
}
