import { EmailForm } from './email-form'

export function CTA() {
  return (
    <section id="cta" className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white/90">
          Meet your new <em>AI-Employee.</em>
        </h2>
        <p className="mt-6 text-lg text-neutral-400 font-sans">
          Your competitors will hire advanced AI agents.
          <br />
          Be the one who hires first.
        </p>
        <div className="mt-10 flex justify-center">
          <EmailForm source="cta" variant="inline" />
        </div>
        <p className="mt-4 text-xs text-neutral-500 font-sans">
          Powered by OpenAI, Claude, Gemini &amp; more. Orchestrated for your business.
        </p>
      </div>
    </section>
  )
}
