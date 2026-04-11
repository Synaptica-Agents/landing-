export function Features() {
  return (
    <section id="features" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-16 text-white/90">
          A team that never sleeps and <em>never forgets.</em>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-8 hover:border-white/[0.15] transition-colors">
            <h3 className="text-xl font-semibold text-white mb-3 font-sans">
              Send a <em className="font-heading">message.</em> Team gets to <strong>work.</strong>
            </h3>
            <p className="text-neutral-400 mb-4 font-sans text-sm leading-relaxed">
              Reach your AI agent like a colleague, via <strong className="text-neutral-200">text</strong> or <strong className="text-neutral-200">voice</strong>.
            </p>
            <ul className="space-y-2 text-sm text-neutral-400 font-sans">
              <li className="flex items-start gap-2">
                <span className="text-white/40 mt-1">&#8226;</span>
                A main agent creates a task and delegates it to <strong className="text-neutral-200">ultra specialized subagents</strong>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/40 mt-1">&#8226;</span>
                <strong className="text-neutral-200">Semantic long term memory</strong> that uses <strong className="text-neutral-200">your context every time</strong>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-8 hover:border-white/[0.15] transition-colors">
            <h3 className="text-xl font-semibold text-white mb-3 font-sans">
              Doesn&apos;t just recommend. <em className="font-heading">Executes.</em>
            </h3>
            <p className="text-neutral-400 mb-4 font-sans text-sm leading-relaxed">
              Our agents build workflows around <strong className="text-neutral-200">your business</strong>
            </p>
            <ul className="space-y-2 text-sm text-neutral-400 font-sans">
              <li className="flex items-start gap-2">
                <span className="text-white/40 mt-1">&#8226;</span>
                Daily briefings, smart reminders, and <strong className="text-neutral-200">automated tasks</strong> tailored to your operations
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/40 mt-1">&#8226;</span>
                <strong className="text-neutral-200">Fully integrated</strong> into the tools you already use
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
