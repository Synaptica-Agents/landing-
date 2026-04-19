'use client'

import { useEffect, useRef } from 'react'

const NUM_NEURONS = 400
const SPHERE_RADIUS = 250
const NEIGHBOR_RADIUS = 55
const PERSPECTIVE = 400

type Neuron = {
  baseX: number
  baseY: number
  baseZ: number
  x: number
  y: number
  radius: number
  activation: number
  neighbors: number[]
}

type Pulse = {
  startIdx: number
  endIdx: number
  progress: number
  speed: number
}

export function CosmicSynapseBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const visibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId = 0
    let neurons: Neuron[] = []
    let pulses: Pulse[] = []
    let projX = new Float32Array(NUM_NEURONS)
    let projY = new Float32Array(NUM_NEURONS)
    let projScale = new Float32Array(NUM_NEURONS)
    const mouse = { x: 0, y: 0, radius: 150 }
    const targetMouse = { x: 0, y: 0 }

    const buildNeurons = () => {
      neurons = []
      for (let i = 0; i < NUM_NEURONS; i++) {
        const phi = Math.acos(-1 + (2 * i) / NUM_NEURONS)
        const theta = Math.sqrt(NUM_NEURONS * Math.PI) * phi
        const x = SPHERE_RADIUS * Math.cos(theta) * Math.sin(phi)
        const y = SPHERE_RADIUS * Math.sin(phi) * Math.sin(theta)
        const z = SPHERE_RADIUS * Math.cos(phi)
        neurons.push({
          baseX: x,
          baseY: y,
          baseZ: z,
          x,
          y,
          radius: Math.random() * 2 + 1,
          activation: 0,
          neighbors: [],
        })
      }

      const neighborRadiusSq = NEIGHBOR_RADIUS * NEIGHBOR_RADIUS
      for (let i = 0; i < NUM_NEURONS; i++) {
        const a = neurons[i]
        for (let j = i + 1; j < NUM_NEURONS; j++) {
          const b = neurons[j]
          const dx = a.baseX - b.baseX
          const dy = a.baseY - b.baseY
          const dz = a.baseZ - b.baseZ
          if (dx * dx + dy * dy + dz * dz < neighborRadiusSq) {
            a.neighbors.push(j)
            b.neighbors.push(i)
          }
        }
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      mouse.x = canvas.width / 2
      mouse.y = canvas.height / 2
      targetMouse.x = mouse.x
      targetMouse.y = mouse.y
    }

    const firePulse = (idx: number) => {
      const n = neurons[idx]
      if (n.activation > 0.5) return
      n.activation = 1
      for (const neighborIdx of n.neighbors) {
        pulses.push({ startIdx: idx, endIdx: neighborIdx, progress: 0, speed: 0.05 })
      }
    }

    const animate = () => {
      if (!visibleRef.current) {
        animationFrameId = window.requestAnimationFrame(animate)
        return
      }

      mouse.x += (targetMouse.x - mouse.x) * 0.08
      mouse.y += (targetMouse.y - mouse.y) * 0.08

      const halfW = canvas.width / 2
      const halfH = canvas.height / 2
      const rotX = (mouse.y - halfH) * 0.0001
      const rotY = (mouse.x - halfW) * 0.0001
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (Math.random() > 0.985 && neurons.length > 0) {
        firePulse(Math.floor(Math.random() * neurons.length))
      }

      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i]

        const x1 = n.x * cosY - n.baseZ * sinY
        const z1 = n.baseZ * cosY + n.x * sinY
        const y1 = n.y * cosX - z1 * sinX
        const z2 = z1 * cosX + n.y * sinX

        const scale = PERSPECTIVE / (PERSPECTIVE + z2)
        const px = x1 * scale + halfW
        const py = y1 * scale + halfH

        projX[i] = px
        projY[i] = py
        projScale[i] = scale

        const dx = mouse.x - px
        const dy = mouse.y - py
        const dist = Math.hypot(dx, dy) || 0.0001
        const force = Math.max(0, (mouse.radius - dist) / mouse.radius)
        if (force > 0) {
          n.x += (dx / dist) * force * 0.5
          n.y += (dy / dist) * force * 0.5
        }
        n.x += (n.baseX - n.x) * 0.01
        n.y += (n.baseY - n.y) * 0.01

        if (n.activation > 0) n.activation -= 0.01

        ctx.beginPath()
        ctx.arc(px, py, n.radius * scale, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(191, 219, 254, ${0.2 + n.activation * 0.8})`
        ctx.fill()
      }

      const remaining: Pulse[] = []
      for (const p of pulses) {
        p.progress += p.speed
        if (p.progress >= 1) {
          const endN = neurons[p.endIdx]
          endN.activation = Math.min(1, endN.activation + 0.5)
          continue
        }
        remaining.push(p)

        const sx = projX[p.startIdx]
        const sy = projY[p.startIdx]
        const ex = projX[p.endIdx]
        const ey = projY[p.endIdx]
        const ss = projScale[p.startIdx]
        const es = projScale[p.endIdx]

        const px = sx + (ex - sx) * p.progress
        const py = sy + (ey - sy) * p.progress
        const pscale = ss + (es - ss) * p.progress
        const alpha = 1 - p.progress

        ctx.beginPath()
        ctx.arc(px, py, 7 * pscale, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 200, 255, ${alpha * 0.18})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(px, py, 2.5 * pscale, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fill()
      }
      pulses = remaining

      animationFrameId = window.requestAnimationFrame(animate)
    }

    const handleMouseMove = (event: MouseEvent) => {
      targetMouse.x = event.clientX
      targetMouse.y = event.clientY
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
      },
      { threshold: 0.01 },
    )
    if (canvas.parentElement) io.observe(canvas.parentElement)

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)

    resizeCanvas()
    buildNeurons()
    projX = new Float32Array(NUM_NEURONS)
    projY = new Float32Array(NUM_NEURONS)
    projScale = new Float32Array(NUM_NEURONS)
    animate()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      io.disconnect()
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: 0.85 }}
        aria-hidden="true"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(147, 51, 234, 0.08) 0%, transparent 60%)',
        }}
      />
    </>
  )
}
