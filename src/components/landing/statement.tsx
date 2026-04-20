import { DealFlowAnimation } from '@/components/ui/deal-flow-animation'
import { GlowyWavesBackground } from '@/components/ui/glowy-waves-background'

export function Statement() {
  return (
    <section
      data-theme="dark"
      className="grad-statement relative isolate overflow-hidden min-h-screen flex flex-col items-center justify-end px-6 pt-16 snap-start"
    >
      <div className="absolute inset-x-0 bottom-0 top-1/2 overflow-hidden pointer-events-none">
        <GlowyWavesBackground />
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto text-center mt-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight pb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-200">
          Vibe coding lowered the barrier to building a startup
        </h2>
        <p className="mt-6 text-lg md:text-2xl text-white/90 max-w-5xl mx-auto font-sans leading-relaxed">
          Anyone with an idea can ship an MVP in a weekend. More founders, more decks, more inbound than any investor can meaningfully process.
        </p>
      </div>
      <div className="relative z-10 mt-2 w-full max-w-7xl h-[44vh] md:h-[50vh] mb-6">
        <DealFlowAnimation />
      </div>
    </section>
  )
}
