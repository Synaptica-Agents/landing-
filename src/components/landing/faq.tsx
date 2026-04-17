'use client'

import { useState } from 'react'
import { LightSectionWaves } from '@/components/ui/light-section-waves'

const faqs = [
  {
    q: 'Do I need any technical knowledge?',
    a: 'Not at all. We handle the entire setup, configuration, and deployment. You interact with your AI agents through simple messaging apps, just like texting a colleague.',
  },
  {
    q: 'How is my data protected?',
    a: 'All data is hosted on servers in Germany, fully GDPR-compliant. Each customer gets completely isolated infrastructure with encrypted connections and automated daily backups.',
  },
  {
    q: 'What tools can the agents connect to?',
    a: 'We integrate with most popular business tools: Google Calendar, Slack, email, CRM systems, Canva, spreadsheets, and many more. If it has an API, we can likely connect it.',
  },
  {
    q: 'How long until my agents are live?',
    a: 'Most deployments go live within 10 business days. This includes configuration, knowledge base ingestion, tool integrations, testing, and fine-tuning.',
  },
  {
    q: 'What makes Synaptica different from ChatGPT?',
    a: 'ChatGPT is a general-purpose chatbot. Synaptica is a team of specialized agents built for your specific business with long-term memory, tool access, and autonomous collaboration.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="relative isolate overflow-hidden min-h-screen flex items-center justify-center px-6 py-20 snap-start bg-gradient-to-b from-white from-60% via-blue-100 via-85% to-blue-300">
      <LightSectionWaves />
      <div className="relative z-10 max-w-3xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-b from-blue-950 to-slate-500">
          Common questions.
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-slate-200 rounded-lg overflow-hidden bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left text-slate-900 font-sans font-medium text-sm md:text-base hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {faq.q}
                <span className="text-slate-400 text-xl ml-4 shrink-0">
                  {openIndex === i ? '\u2212' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-slate-600 text-sm md:text-base font-sans leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
