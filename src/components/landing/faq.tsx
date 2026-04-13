'use client'

import { useState } from 'react'

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
    <section id="faq" className="min-h-screen flex items-center justify-center px-6 py-20 snap-center">
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-12 text-white/90">
          Common questions.
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-white/[0.08] rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left text-white font-sans font-medium text-sm md:text-base hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                {faq.q}
                <span className="text-white/40 text-xl ml-4 shrink-0">
                  {openIndex === i ? '\u2212' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-neutral-400 text-sm md:text-base font-sans leading-relaxed">
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
