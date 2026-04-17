import { EmailForm } from "./email-form"
import { CosmicSynapseBackground } from "@/components/ui/cosmic-synapse-background"

export function Hero() {
  return (
    <section id="hero" data-theme="dark" className="relative isolate min-h-screen flex items-center justify-center px-6 pt-20 snap-start overflow-hidden">
      <CosmicSynapseBackground />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(8,10,25,0.65) 0%, rgba(8,10,25,0.35) 40%, transparent 75%)',
        }}
      />
      <div className="relative z-10 w-full max-w-3xl lg:max-w-5xl flex flex-col items-center text-center">
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-200 leading-tight"
          style={{ textShadow: '0 2px 18px rgba(0,0,0,0.55)' }}
        >
          Deal Flow Intelligence <span className="lg:block">for Venture Capital Funds</span>
        </h1>
        <p
          className="mt-6 max-w-xl mx-auto text-lg md:text-2xl leading-relaxed font-sans text-white"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}
        >
          AI agents that triage inbound pitches, monitor your portfolio, and generate market intelligence.
        </p>
        <p className="mt-4 text-base md:text-xl font-sans text-neutral-400 font-medium">
          Integrates with your existing stack.
        </p>

        <div className="mt-8">
          <EmailForm source="hero" />
        </div>

        <p className="mt-4 text-foreground/50 text-xs md:text-sm font-sans">
          30-minute onboarding. No migration required.
        </p>
        <div className="flex gap-4 mt-3 justify-center">
          <span className="text-[11px] md:text-sm text-foreground/60 font-mono tracking-wide uppercase">GDPR Compliant</span>
          <span className="text-[11px] md:text-sm text-foreground/60 font-mono tracking-wide uppercase">EU-Hosted</span>
          <span className="text-[11px] md:text-sm text-foreground/60 font-mono tracking-wide uppercase">Encrypted</span>
        </div>
      </div>
    </section>
  )
}
