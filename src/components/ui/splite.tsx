'use client'

import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import type { Application } from '@splinetool/runtime'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: (splineApp: Application) => void
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)
  const [everLoaded, setEverLoaded] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setInView(entry.isIntersecting)
        }
      },
      { rootMargin: '200px 0px', threshold: 0 },
    )
    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (inView) setEverLoaded(true)
  }, [inView])

  return (
    <div ref={hostRef} className={className}>
      {inView ? (
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <span className="loader"></span>
            </div>
          }
        >
          <Spline scene={scene} className="w-full h-full" onLoad={onLoad} />
        </Suspense>
      ) : everLoaded ? null : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      )}
    </div>
  )
}
