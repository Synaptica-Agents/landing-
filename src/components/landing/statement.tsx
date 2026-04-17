import { LightSectionWaves } from '@/components/ui/light-section-waves'

export function Statement() {
  return (
    <section className="relative isolate overflow-hidden min-h-screen flex items-center justify-center px-6 snap-start bg-gradient-to-b from-white from-60% via-blue-100 via-85% to-blue-300">
      <LightSectionWaves />
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-blue-950 to-slate-500">
          Venture capital is a people business.<br />
          It always will be.
        </h2>
        <p className="mt-6 text-lg md:text-2xl text-slate-700 max-w-5xl mx-auto font-sans leading-relaxed">
          No AI will ever replace what a great investor does: spotting something in a founder that data can&apos;t see. Building relationships. Making the call no one else would make.
        </p>
      </div>
    </section>
  )
}
