import Image from 'next/image'
import { LightSectionWaves } from '@/components/ui/light-section-waves'

type IntegrationRowProps = {
  logo: string
  name: string
  description: string
}

function IntegrationRow({ logo, name, description }: IntegrationRowProps) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-3 md:gap-5 border-b border-dashed border-slate-200 py-3 md:py-5 last:border-b-0">
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
        <h3 className="text-sm md:text-lg font-medium text-slate-900">{name}</h3>
        <p className="text-xs md:text-base text-slate-600 font-sans leading-snug">{description}</p>
      </div>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative isolate overflow-hidden min-h-screen flex items-center justify-center px-6 py-20 snap-start bg-gradient-to-b from-white via-blue-100 to-blue-300"
    >
      <LightSectionWaves />
      <div className="relative z-10 mx-auto max-w-5xl w-full">
        <div className="mx-auto max-w-md md:max-w-2xl [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_70%,transparent_100%)]">
          <div className="rounded-xl border border-slate-200 bg-white px-6 pt-3 pb-8 md:px-10 md:pt-5 md:pb-12 shadow-xl">
            <IntegrationRow
              logo="/logos/Slack.png"
              name="Communication Layer"
              description="Your entire team can interact with the AI through your company messaging app, just like texting a colleague."
            />
            <IntegrationRow
              logo="/logos/Anthropic.png"
              name="Cognitive Core"
              description="One model doesn't fit all. Every task is assigned its own LLM, selected by complexity and requirements."
            />
            <IntegrationRow
              logo="/logos/Perplexity.avif"
              name="Knowledge Engine"
              description="Powered by the best search and research tools. It builds its own long term memory and continuously trains itself on your business."
            />
          </div>
        </div>
      </div>
    </section>
  )
}
