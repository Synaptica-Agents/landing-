import Image from 'next/image'

type IntegrationRowProps = {
  logo: string
  name: string
  description: string
}

function IntegrationRow({ logo, name, description }: IntegrationRowProps) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-3 md:gap-5 border-b border-dashed border-white/[0.08] py-3 md:py-5 last:border-b-0">
      <div className="size-12 md:size-16 rounded-lg md:rounded-xl bg-white flex items-center justify-center overflow-hidden">
        <Image
          src={logo}
          alt={name}
          width={40}
          height={40}
          className="size-8 md:size-10 object-contain"
        />
      </div>
      <div className="space-y-0.5 md:space-y-1 min-w-0">
        <h3 className="text-sm md:text-lg font-medium text-white">{name}</h3>
        <p className="text-xs md:text-base text-neutral-400 font-sans leading-snug">{description}</p>
      </div>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="min-h-screen flex items-center justify-center px-6 py-20 snap-start"
    >
      <div className="mx-auto max-w-5xl w-full">
        <div className="mx-auto max-w-md md:max-w-2xl [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_70%,transparent_100%)]">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm px-6 pt-3 pb-8 md:px-10 md:pt-5 md:pb-12 shadow-xl">
            <IntegrationRow
              logo="/logos/Slack.png"
              name="Slack"
              description="Your entire team can interact with the AI through your company messaging app, just like texting a colleague."
            />
            <IntegrationRow
              logo="/logos/Anthropic.png"
              name="Anthropic"
              description="One model doesn't fit all. Every task is assigned its own LLM, selected by complexity and requirements."
            />
            <IntegrationRow
              logo="/logos/Perplexity.avif"
              name="Perplexity"
              description="Powered by the best search and research tools. It builds its own long term memory and continuously trains itself on your business."
            />
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-6 text-center">
          <h2 className="text-balance text-3xl md:text-5xl lg:text-6xl font-semibold text-white/90">
            Talk to it like a colleague. It works like one too.
          </h2>
          <div className="space-y-3 text-lg md:text-2xl text-neutral-400 font-sans">
            <p>Smart model routing. Real time research. Semantic memory.</p>
            <p>Built on the best AI infrastructure available, every component is designed to understand, remember, and execute.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
