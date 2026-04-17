'use client'

import { useEffect } from 'react'

export function KeyboardSnap() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const container = document.querySelector<HTMLElement>('[data-slot="snap-scroll"]')
    if (!container) return

    const getSections = () =>
      Array.from(container.querySelectorAll<HTMLElement>('section')).filter(
        (el) => el.offsetHeight > 200,
      )

    const currentIdx = (sections: HTMLElement[]) => {
      const y = container.scrollTop
      const threshold = container.clientHeight * 0.35
      let idx = 0
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop - threshold <= y) idx = i
      }
      return idx
    }

    const goTo = (direction: 1 | -1) => {
      const sections = getSections()
      if (sections.length === 0) return
      const idx = currentIdx(sections)
      const targetIdx = Math.max(0, Math.min(sections.length - 1, idx + direction))
      sections[targetIdx].scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }
      if (e.code === 'PageDown' || e.code === 'ArrowDown' || e.code === 'Space') {
        e.preventDefault()
        goTo(1)
      } else if (e.code === 'PageUp' || e.code === 'ArrowUp') {
        e.preventDefault()
        goTo(-1)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return null
}
