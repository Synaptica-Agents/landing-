'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface EmailFormProps {
  source: 'hero' | 'cta'
  variant?: 'default' | 'inline'
}

export function EmailForm({ source }: EmailFormProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [emailConfirm, setEmailConfirm] = useState('')
  const [emailMismatch, setEmailMismatch] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle')

  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen)
    if (newOpen) {
      setName('')
      setCompany('')
      setEmail('')
      setEmailConfirm('')
      setEmailMismatch(false)
      setStatus('idle')
    }
  }

  function handleConfirmBlur() {
    if (emailConfirm && emailConfirm !== email) {
      setEmailMismatch(true)
    } else {
      setEmailMismatch(false)
    }
  }

  const canSubmit =
    name.trim() &&
    company.trim() &&
    email.includes('@') &&
    emailConfirm === email &&
    status !== 'loading'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (email !== emailConfirm) {
      setEmailMismatch(true)
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, source }),
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
        setTimeout(() => setOpen(false), 2000)
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/25 transition-colors'

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {source === 'hero' ? (
        <button
          onClick={() => setOpen(true)}
          className="relative text-base font-medium rounded-full h-14 p-1 ps-8 pe-16 group transition-all duration-500 hover:ps-16 hover:pe-8 w-fit overflow-hidden cursor-pointer bg-white text-black"
        >
          <span className="relative z-10 transition-all duration-500">
            Request a Demo
          </span>
          <span className="absolute right-1 top-1 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-52px)] group-hover:rotate-45">
            <ArrowUpRight size={20} />
          </span>
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer bg-white text-black"
        >
          <span className="relative z-10 transition-all duration-500">
            Request a Demo
          </span>
          <span className="absolute right-1 top-1 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
            <ArrowUpRight size={16} />
          </span>
        </button>
      )}

      <DialogContent className="sm:max-w-md w-[calc(100vw-2rem)] bg-[#0d1117] border-white/10 text-white">
        {status === 'success' ? (
          <div className="py-8 text-center">
            <p className="text-green-400 font-medium text-lg">
              Thank you! We&apos;ll be in touch soon.
            </p>
          </div>
        ) : status === 'duplicate' ? (
          <div className="py-8 text-center">
            <p className="text-yellow-400 font-medium text-lg">
              Already registered! We&apos;ll reach out shortly.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl text-white">Request a Demo</DialogTitle>
              <DialogDescription className="text-neutral-400">
                Tell us about yourself and we&apos;ll get back to you shortly.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm text-neutral-300 mb-1.5 font-sans">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-300 mb-1.5 font-sans">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your company"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-300 mb-1.5 font-sans">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (emailMismatch) setEmailMismatch(false)
                  }}
                  placeholder="your@email.com"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-300 mb-1.5 font-sans">Confirm Email</label>
                <input
                  type="email"
                  value={emailConfirm}
                  onChange={(e) => {
                    setEmailConfirm(e.target.value)
                    if (emailMismatch) setEmailMismatch(false)
                  }}
                  onBlur={handleConfirmBlur}
                  placeholder="Confirm your email"
                  required
                  className={inputClass}
                />
                {emailMismatch && (
                  <p className="text-red-400 text-xs mt-1.5">Emails do not match.</p>
                )}
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full px-6 py-3 rounded-lg bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors disabled:opacity-40 cursor-pointer mt-2"
              >
                {status === 'loading' ? 'Sending...' : 'Submit'}
              </button>

              {status === 'error' && (
                <p className="text-red-400 text-xs text-center">Something went wrong. Please try again.</p>
              )}
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
