import { EmailForm } from './email-form'

export function CTA() {
  return (
    <section id="cta" className="min-h-screen flex items-center justify-center px-6 snap-start">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white/90">
          Meet your new <em>AI-Employee.</em>
        </h2>
        <p className="mt-6 text-lg md:text-2xl text-neutral-400 font-sans">
          The next wave of productivity isn&apos;t a tool. It&apos;s a teammate.
          <br />
          Don&apos;t be the last to figure that out.
        </p>
        <div className="mt-10 flex justify-center">
          <EmailForm source="cta" variant="inline" />
        </div>
        <p className="mt-4 text-xs md:text-sm text-neutral-500 font-sans">
          Powered by your favorite AI Models. Orchestrated for your business.
        </p>
      </div>
    </section>
  )
}
