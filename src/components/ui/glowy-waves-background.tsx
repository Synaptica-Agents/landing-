'use client'

import { useEffect, useRef } from 'react'

type Point = {
  x: number
  y: number
}

interface WaveConfig {
  offset: number
  amplitude: number
  frequency: number
  haloColor: string
  coreColor: string
}

export function GlowyWavesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseRef = useRef<Point>({ x: 0, y: 0 })
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 })
  const visibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let animationId: number
    let time = 0

    const computeThemeColors = () => {
      const rootStyles = getComputedStyle(document.documentElement)
      const tempEl = document.createElement('div')
      tempEl.style.position = 'absolute'
      tempEl.style.visibility = 'hidden'
      tempEl.style.width = '1px'
      tempEl.style.height = '1px'
      document.body.appendChild(tempEl)

      const resolve = (variables: string[], alpha = 1): string => {
        for (const variable of variables) {
          const raw = rootStyles.getPropertyValue(variable).trim()
          if (!raw) continue
          const css =
            alpha >= 1
              ? `var(${variable})`
              : `color-mix(in srgb, var(${variable}) ${Math.round(
                  alpha * 100,
                )}%, transparent)`
          tempEl.style.backgroundColor = ''
          tempEl.style.backgroundColor = css
          const computed = getComputedStyle(tempEl).backgroundColor
          if (computed && computed !== 'rgba(0, 0, 0, 0)') {
            return computed
          }
        }
        return `rgba(255, 255, 255, ${alpha})`
      }

      const result = {
        backgroundTop: resolve(['--background'], 1),
        backgroundBottom: resolve(['--muted', '--background'], 0.95),
        wavePalette: [
          {
            offset: 0,
            amplitude: 70,
            frequency: 0.003,
            haloColor: resolve(['--secondary'], 0.12),
            coreColor: resolve(['--secondary'], 0.45),
          },
          {
            offset: Math.PI / 2,
            amplitude: 90,
            frequency: 0.0026,
            haloColor: resolve(['--accent', '--secondary'], 0.1),
            coreColor: resolve(['--accent', '--secondary'], 0.35),
          },
          {
            offset: Math.PI,
            amplitude: 60,
            frequency: 0.0034,
            haloColor: resolve(['--secondary', '--foreground'], 0.08),
            coreColor: resolve(['--secondary', '--foreground'], 0.3),
          },
          {
            offset: Math.PI * 1.5,
            amplitude: 80,
            frequency: 0.0022,
            haloColor: resolve(['--primary-foreground', '--foreground'], 0.06),
            coreColor: resolve(['--primary-foreground', '--foreground'], 0.25),
          },
          {
            offset: Math.PI * 2,
            amplitude: 55,
            frequency: 0.004,
            haloColor: resolve(['--foreground'], 0.05),
            coreColor: resolve(['--foreground'], 0.2),
          },
        ] satisfies WaveConfig[],
      }

      document.body.removeChild(tempEl)
      return result
    }

    let themeColors = computeThemeColors()

    const handleThemeMutation = () => {
      themeColors = computeThemeColors()
    }

    const observer = new MutationObserver(handleThemeMutation)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const mouseInfluence = prefersReducedMotion ? 10 : 70
    const influenceRadius = prefersReducedMotion ? 160 : 320
    const smoothing = prefersReducedMotion ? 0.04 : 0.1

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const recenterMouse = () => {
      const centerPoint = { x: canvas.width / 2, y: canvas.height / 2 }
      mouseRef.current = centerPoint
      targetMouseRef.current = centerPoint
    }

    const handleResize = () => {
      resizeCanvas()
      recenterMouse()
    }

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current = { x: event.clientX, y: event.clientY }
    }

    const handleMouseLeave = () => {
      recenterMouse()
    }

    resizeCanvas()
    recenterMouse()

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    const drawWave = (wave: WaveConfig) => {
      ctx.beginPath()
      for (let x = 0; x <= canvas.width; x += 6) {
        const dx = x - mouseRef.current.x
        const dy = canvas.height / 2 - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - distance / influenceRadius)
        const mouseEffect =
          influence *
          mouseInfluence *
          Math.sin(time * 0.001 + x * 0.01 + wave.offset)

        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) *
            wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) *
            (wave.amplitude * 0.45) +
          mouseEffect

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.lineWidth = 12
      ctx.strokeStyle = wave.haloColor
      ctx.stroke()

      ctx.lineWidth = 2.5
      ctx.strokeStyle = wave.coreColor
      ctx.stroke()
    }

    const animate = () => {
      if (!visibleRef.current) {
        animationId = window.requestAnimationFrame(animate)
        return
      }
      time += 1

      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * smoothing
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * smoothing

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      themeColors.wavePalette.forEach(drawWave)

      animationId = window.requestAnimationFrame(animate)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
      },
      { threshold: 0.01 },
    )
    if (canvas.parentElement) io.observe(canvas.parentElement)

    animationId = window.requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationId)
      observer.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-foreground/[0.06] blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-foreground/[0.05] blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full bg-secondary/[0.05] blur-[150px]" />
      </div>
    </>
  )
}
