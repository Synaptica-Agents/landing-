'use client'

import { useEffect, useRef } from 'react'

interface WaveConfig {
  offset: number
  amplitude: number
  frequency: number
  color: string
  haloAlpha: number
  coreAlpha: number
}

export function LightSectionWaves() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const visibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let animationId: number
    let time = 0

    const wavePalette: WaveConfig[] = [
      {
        offset: 0,
        amplitude: 45,
        frequency: 0.003,
        color: '255, 255, 255',
        haloAlpha: 0.12,
        coreAlpha: 0.55,
      },
      {
        offset: Math.PI,
        amplitude: 55,
        frequency: 0.0026,
        color: '147, 197, 253',
        haloAlpha: 0.14,
        coreAlpha: 0.5,
      },
    ]

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const drawWave = (wave: WaveConfig) => {
      const centerY = canvas.height * 0.88

      ctx.beginPath()
      for (let x = 0; x <= canvas.width; x += 6) {
        const y =
          centerY +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45)

        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }

      ctx.lineWidth = 10
      ctx.strokeStyle = `rgba(${wave.color}, ${wave.haloAlpha})`
      ctx.stroke()

      ctx.lineWidth = 2.5
      ctx.strokeStyle = `rgba(${wave.color}, ${wave.coreAlpha})`
      ctx.stroke()
    }

    const animate = () => {
      if (!visibleRef.current) {
        animationId = window.requestAnimationFrame(animate)
        return
      }
      time += 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      wavePalette.forEach(drawWave)
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
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
      io.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
