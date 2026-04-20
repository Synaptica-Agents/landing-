import { EmailForm } from './email-form'
import { GlowyWavesBackground } from '@/components/ui/glowy-waves-background'

export function CTA() {
  return (
    <section
      id="cta"
      data-theme="light"
      className="grad-cta relative isolate overflow-hidden min-h-screen flex items-center justify-center px-6 snap-start"
    >
      <GlowyWavesBackground />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight pb-2 bg-clip-text text-transparent bg-gradient-to-b from-blue-300 to-blue-800">
          Your team. Amplified.
        </h2>
        <p className="mt-6 text-lg md:text-2xl text-white max-w-4xl mx-auto font-sans leading-relaxed pb-1">
          We handle the research, the triage, and the monitoring, so your judgment is always backed by better data.
        </p>
        <div className="mt-10 flex justify-center">
          <EmailForm source="cta" variant="inline" />
        </div>
        <p className="mt-4 text-xs md:text-sm text-white/50 font-sans">
          30-minute onboarding. Works with your existing stack.
        </p>
      </div>
    </section>
  )
}
