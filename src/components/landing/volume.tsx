import { DealFlowAnimation } from '@/components/ui/deal-flow-animation'

export function Volume() {
  return (
    <section
      data-theme="dark"
      className="relative isolate overflow-hidden min-h-screen flex flex-col items-center justify-center px-6 snap-start bg-background"
    >
      <div className="relative z-10 max-w-3xl mx-auto text-center pt-20">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight pb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-200">
          But the volume is breaking the model.
        </h2>
        <p className="mt-6 text-lg md:text-2xl text-white/90 max-w-2xl mx-auto font-sans leading-relaxed">
          Vibe coding lowered the barrier to building a startup to zero. Anyone with an idea can ship an MVP in a weekend.
        </p>
        <p className="mt-4 text-lg md:text-2xl text-white/90 max-w-2xl mx-auto font-sans leading-relaxed">
          The result: more founders, more decks, more inbound than any investor can meaningfully process.
        </p>
      </div>
      <div className="relative z-10 mt-10 w-full max-w-6xl h-[46vh] md:h-[52vh] mb-10">
        <DealFlowAnimation />
      </div>
    </section>
  )
}
