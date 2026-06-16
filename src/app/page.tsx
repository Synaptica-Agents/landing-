'use client'

import { KeyboardSnap } from '@/components/ui/smooth-snap'
import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { CTA } from '@/components/landing/cta'
import { Footer } from '@/components/landing/footer'

export default function LandingPage() {
  return (
    <div
      data-slot="snap-scroll"
      className="relative size-full overflow-x-hidden overflow-y-auto h-screen snap-y snap-mandatory bg-background"
    >
      <KeyboardSnap />
      <main className="relative z-10">
        <Navbar />
        <Hero />
        <CTA />
        <Footer />
      </main>
    </div>
  )
}
