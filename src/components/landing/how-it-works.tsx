import Image from 'next/image'

type IntegrationRowProps = {
  logo: string
  name: string
  description: string
}

function IntegrationRow({ logo, name, description }: IntegrationRowProps) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-3 border-b border-dashed border-white/[0.08] py-3 last:border-b-0">
      <div className="size-12 rounded-lg bg-white flex items-center justify-center overflow-hidden">
        <Image
          src={logo}
          alt={name}
          width={32}
          height={32}
          className="object-contain"
        />
      </div>
      <div className="space-y-0.5 min-w-0">
        <h3 className="text-sm font-medium text-white">{name}</h3>
        <p className="text-xs text-neutral-400 line-clamp-1 font-sans">{description}</p>
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
        <div className="mx-auto max-w-md [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_70%,transparent_100%)]">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm px-6 pt-3 pb-8 shadow-xl">
            <IntegrationRow
              logo="/logos/Slack.png"
              name="Slack"
              description="Team communication and collaboration hub."
            />
            <IntegrationRow
              logo="/logos/Anthropic.png"
              name="Anthropic"
              description="Claude AI model for advanced reasoning tasks."
            />
            <IntegrationRow
              logo="/logos/Perplexity.avif"
              name="Perplexity"
              description="AI-powered search and research platform."
            />
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-6 text-center">
          <h2 className="text-balance text-3xl md:text-5xl lg:text-6xl font-semibold text-white/90">
            Integrate with your favorite LLMs
          </h2>
          <p className="text-lg md:text-2xl text-neutral-400 font-sans">
            Connect seamlessly with popular platforms and services to enhance your workflow.
          </p>
        </div>
      </div>
    </section>
  )
}
