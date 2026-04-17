import { EmailForm } from './email-form'
import { LightSectionWaves } from '@/components/ui/light-section-waves'

export function CTA() {
  return (
    <section id="cta" className="relative isolate overflow-hidden min-h-screen flex items-center justify-center px-6 snap-start bg-gradient-to-b from-white via-blue-100 to-blue-300">
      <LightSectionWaves />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-blue-950 to-slate-500">
          Meet your new <em>AI-Employee.</em>
        </h2>
        <p className="mt-6 text-lg md:text-2xl text-slate-600 font-sans">
          The next wave of productivity isn&apos;t a tool. It&apos;s a teammate.
          <br />
          Don&apos;t be the last to figure that out.
        </p>
        <div className="mt-10 flex justify-center">
          <EmailForm source="cta" variant="inline" />
        </div>
        <p className="mt-4 text-xs md:text-sm text-slate-500 font-sans">
          Powered by your favorite AI Models. Orchestrated for your business.
        </p>
      </div>
    </section>
  )
}
