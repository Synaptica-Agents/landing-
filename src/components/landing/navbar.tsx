'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function Navbar() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-theme]')
    if (!sections.length) return

    const ratios = new Map<Element, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target, entry.intersectionRatio)
        }
        let top: HTMLElement | null = null
        let maxRatio = 0
        for (const [el, ratio] of ratios) {
          if (ratio > maxRatio) {
            maxRatio = ratio
            top = el as HTMLElement
          }
        }
        if (top) {
          const t = top.getAttribute('data-theme')
          setTheme(t === 'light' ? 'light' : 'dark')
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed top-0 left-0 z-50 p-6">
      <a href="#">
        <Image
          src="/Logo Synaptica Navy.png"
          alt="Synaptica"
          width={200}
          height={56}
          className="h-14 w-auto transition-all duration-300"
          style={theme === 'dark' ? { filter: 'brightness(0) invert(1)' } : undefined}
          priority
        />
      </a>
    </header>
  )
}
