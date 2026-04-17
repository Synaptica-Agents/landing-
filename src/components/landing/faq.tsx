'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Do we need to replace our existing CRM or tools?',
    a: 'No. Synaptica works as a layer on top of the tools your team already uses, including CRM, email, notes, and calendar.\n\nNo data export, no migration, no retraining for the team. The agents read, write, and synthesize where your data already lives.',
  },
  {
    q: 'What exactly do the agents handle for our fund?',
    a: 'Synaptica takes over the operational backbone of a modern VC fund.\n\nThe agents triage and score incoming pitches against your ICP, monitor your portfolio through emails and public signals, run market and competitive research, handle deep founder research, and prepare briefings and LP reports.',
  },
  {
    q: 'How is this different from using AI chat tools we already have?',
    a: '1. Synaptica runs continuously in the background and remembers everything across months, including deal context, founder history, and your scoring logic.\n\n2. It integrates directly into your existing tools, so the work happens where your data already lives.\n\n3. It\u2019s built on top of the strongest foundation models available; the system itself is trained and tuned specifically for VC workflows, which means the output is sharper and more relevant than anything a general-purpose chat tool can deliver.',
  },
  {
    q: 'How is our deal-flow data protected?',
    a: 'Every customer gets an isolated container with a dedicated database, so your data never touches another fund\u2019s. EU-hosted, GDPR-compliant, encrypted. Your pipeline data is never used to train models, neither by us nor by our infrastructure providers.',
  },
  {
    q: 'How fast can we go live?',
    a: 'Onboarding takes around 30 minutes. You connect your tools, define your ICP, and activate the first agents. Over the first weeks we tune the scoring logic and workflows together to fit your fund. You get a 30-day pilot, after which you decide whether to continue.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="faq"
      data-theme="dark"
      className="min-h-screen flex items-center justify-center px-6 py-20 snap-start bg-background"
    >
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-semibold leading-tight pb-2 text-center mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-200">
          Common questions.
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.03]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left text-white font-sans font-medium text-sm md:text-base hover:bg-white/5 transition-colors cursor-pointer"
              >
                {faq.q}
                <span className="text-white/40 text-xl ml-4 shrink-0">
                  {openIndex === i ? '\u2212' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-white/70 text-sm md:text-base font-sans leading-relaxed space-y-3">
                  {faq.a.split('\n\n').map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
