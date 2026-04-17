import { EmailForm } from "./email-form"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 snap-start">
      <div className="w-full max-w-3xl flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
          Deal Flow Intelligence for Modern VC Funds
        </h1>
        <p className="mt-6 text-neutral-300 max-w-xl mx-auto text-base md:text-xl leading-relaxed font-sans">
          AI agents that triage inbound pitches, monitor your portfolio, and generate market intelligence. Running autonomously inside the tools your team already uses.
        </p>

        <div className="mt-8">
          <EmailForm source="hero" />
        </div>

        <p className="mt-4 text-neutral-500 text-xs md:text-sm font-sans">
          Integrates with your existing stack.<br />
          30-minute onboarding. No migration required.
        </p>
        <div className="flex gap-4 mt-3 justify-center">
          <span className="text-[11px] md:text-sm text-neutral-400 font-mono tracking-wide uppercase">GDPR Compliant</span>
          <span className="text-[11px] md:text-sm text-neutral-400 font-mono tracking-wide uppercase">EU-Hosted</span>
          <span className="text-[11px] md:text-sm text-neutral-400 font-mono tracking-wide uppercase">Encrypted</span>
        </div>
      </div>
    </section>
  )
}
