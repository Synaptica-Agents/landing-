'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function Navbar() {
  const [overDark, setOverDark] = useState(true)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setOverDark(entry.intersectionRatio >= 0.5),
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed top-0 left-0 z-50 p-6">
      <a href="#">
        <Image
          src="/Logo Synaptica Navy.png"
          alt="Synaptica"
          width={160}
          height={44}
          className="h-11 w-auto transition-all duration-300"
          style={overDark ? { filter: 'brightness(0) invert(1)' } : undefined}
          priority
        />
      </a>
    </header>
  )
}
