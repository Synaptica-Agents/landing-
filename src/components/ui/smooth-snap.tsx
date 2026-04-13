'use client'

import { useEffect } from 'react'

const DURATION_MS = 900

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function SmoothSnap() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const container = document.querySelector<HTMLElement>('[data-slot="stars-background"]')
    if (!container) return

    let raf: number | null = null
    let animating = false

    const getSections = () =>
      Array.from(container.querySelectorAll<HTMLElement>('section')).filter(
        (el) => el.offsetHeight > 200,
      )

    const currentIdx = (sections: HTMLElement[]) => {
      const y = container.scrollTop
      const mid = y + container.clientHeight / 2
      let idx = 0
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= mid) idx = i
      }
      return idx
    }

    const animateTo = (to: number) => {
      if (raf !== null) cancelAnimationFrame(raf)
      const from = container.scrollTop
      const dist = to - from
      if (Math.abs(dist) < 2) return
      const start = performance.now()
      animating = true
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION_MS)
        container.scrollTop = from + dist * easeInOutCubic(t)
        if (t < 1) {
          raf = requestAnimationFrame(step)
        } else {
          raf = null
          animating = false
        }
      }
      raf = requestAnimationFrame(step)
    }

    const goTo = (direction: 1 | -1) => {
      const sections = getSections()
      if (sections.length === 0) return
      const idx = currentIdx(sections)
      const targetIdx = Math.max(0, Math.min(sections.length - 1, idx + direction))
      animateTo(sections[targetIdx].offsetTop)
    }

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 4) return
      e.preventDefault()
      if (animating) return
      goTo(e.deltaY > 0 ? 1 : -1)
    }

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return
      }
      if (e.code === 'PageDown' || e.code === 'ArrowDown' || e.code === 'Space') {
        e.preventDefault()
        if (!animating) goTo(1)
      } else if (e.code === 'PageUp' || e.code === 'ArrowUp') {
        e.preventDefault()
        if (!animating) goTo(-1)
      }
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)

    return () => {
      container.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
