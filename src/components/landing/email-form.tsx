'use client'

import { useState } from 'react'

interface EmailFormProps {
  source: 'hero' | 'cta'
  variant?: 'default' | 'inline'
}

export function EmailForm({ source, variant = 'default' }: EmailFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        return
      }

      if (data.message === 'Already registered!') {
        setStatus('duplicate')
      } else {
        setStatus('success')
        setEmail('')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-green-400 font-medium text-sm">
        Thank you! We&apos;ll be in touch soon.
      </p>
    )
  }

  if (status === 'duplicate') {
    return (
      <p className="text-yellow-400 font-medium text-sm">
        Already registered! We&apos;ll reach out shortly.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={variant === 'inline' ? 'flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto' : 'flex flex-col sm:flex-row gap-3 w-full max-w-md'}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address..."
        required
        className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/25 transition-colors"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 rounded-lg bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer"
      >
        {status === 'loading' ? 'Sending...' : 'Request a Demo \u2192'}
      </button>
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-1">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}
