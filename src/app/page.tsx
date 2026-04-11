import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { Statement } from '@/components/landing/statement'
import { Features } from '@/components/landing/features'
import { Integrations } from '@/components/landing/integrations'
import { CTA } from '@/components/landing/cta'
import { FAQ } from '@/components/landing/faq'
import { Footer } from '@/components/landing/footer'

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Statement />
      <Features />
      <Integrations />
      <CTA />
      <FAQ />
      <Footer />
    </main>
  )
}
