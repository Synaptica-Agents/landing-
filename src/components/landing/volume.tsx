import { DealFlowAnimation } from '@/components/ui/deal-flow-animation'

export function Volume() {
  return (
    <section
      data-theme="dark"
      className="grad-volume relative isolate overflow-hidden min-h-screen flex flex-col items-center justify-center px-6 snap-start"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto text-center pt-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight pb-2 lg:whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-200">
          But the volume is breaking the model.
        </h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6 md:gap-12 max-w-4xl mx-auto">
          <p className="text-base md:text-lg text-white/90 font-sans leading-relaxed md:text-left">
            Vibe coding lowered the barrier to building a startup to zero. Anyone with an idea can ship an MVP in a weekend.
          </p>
          <p className="text-base md:text-lg text-white/90 font-sans leading-relaxed md:text-left">
            The result: more founders, more decks, more inbound than any investor can meaningfully process.
          </p>
        </div>
      </div>
      <div className="relative z-10 mt-6 w-full max-w-7xl h-[55vh] md:h-[62vh] mb-10">
        <DealFlowAnimation />
      </div>
    </section>
  )
}
