import { LightSectionWaves } from '@/components/ui/light-section-waves'

export function Statement() {
  return (
    <section data-theme="dark" className="relative isolate overflow-hidden min-h-screen flex items-center justify-center px-6 snap-start bg-background">
      <LightSectionWaves />
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Venture capital is a people business.<br />
          It always will be.
        </h2>
        <p className="mt-6 text-lg md:text-2xl text-white/90 max-w-5xl mx-auto font-sans leading-relaxed">
          No AI will ever replace what a great investor does: spotting something in a founder that data can&apos;t see. Building relationships. Making the call no one else would make.
        </p>
      </div>
    </section>
  )
}
