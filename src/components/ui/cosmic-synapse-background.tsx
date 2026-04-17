'use client'

import { useEffect, useRef } from 'react'

type Projection = { x: number; y: number; scale: number }

class Neuron {
  x: number
  y: number
  z: number
  baseX: number
  baseY: number
  baseZ: number
  radius: number
  activation: number
  neighbors: Neuron[]

  constructor(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
    this.baseX = x
    this.baseY = y
    this.baseZ = z
    this.radius = Math.random() * 2 + 1
    this.activation = 0
    this.neighbors = []
  }

  project(
    canvas: HTMLCanvasElement,
    mouse: { x: number; y: number },
    perspective: number,
  ): Projection {
    const rotX = (mouse.y - canvas.height / 2) * 0.0001
    const rotY = (mouse.x - canvas.width / 2) * 0.0001

    const cosY = Math.cos(rotY)
    const sinY = Math.sin(rotY)
    const cosX = Math.cos(rotX)
    const sinX = Math.sin(rotX)

    const x1 = this.x * cosY - this.z * sinY
    const z1 = this.z * cosY + this.x * sinY
    const y1 = this.y * cosX - z1 * sinX
    const z2 = z1 * cosX + this.y * sinX

    const scale = perspective / (perspective + z2)
    return {
      x: x1 * scale + canvas.width / 2,
      y: y1 * scale + canvas.height / 2,
      scale,
    }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    mouse: { x: number; y: number },
    perspective: number,
  ) {
    const { x, y, scale } = this.project(canvas, mouse, perspective)
    ctx.beginPath()
    ctx.arc(x, y, this.radius * scale, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(191, 219, 254, ${0.2 + this.activation * 0.8})`
    ctx.fill()
  }

  update(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    mouse: { x: number; y: number; radius: number },
    perspective: number,
  ) {
    const { x: projectedX, y: projectedY } = this.project(canvas, mouse, perspective)
    const dx = mouse.x - projectedX
    const dy = mouse.y - projectedY
    const dist = Math.hypot(dx, dy) || 0.0001
    const force = Math.max(0, (mouse.radius - dist) / mouse.radius)

    this.x += (dx / dist) * force * 0.5
    this.y += (dy / dist) * force * 0.5

    this.x += (this.baseX - this.x) * 0.01
    this.y += (this.baseY - this.y) * 0.01

    if (this.activation > 0) this.activation -= 0.01
    this.draw(ctx, canvas, mouse, perspective)
  }

  fire(pulses: Pulse[]) {
    if (this.activation > 0.5) return
    this.activation = 1
    for (const neighbor of this.neighbors) {
      pulses.push(new Pulse(this, neighbor))
    }
  }
}

class Pulse {
  start: Neuron
  end: Neuron
  progress: number
  speed: number

  constructor(start: Neuron, end: Neuron) {
    this.start = start
    this.end = end
    this.progress = 0
    this.speed = 0.05
  }

  update(): boolean {
    this.progress += this.speed
    if (this.progress >= 1) {
      this.end.activation = Math.min(1, this.end.activation + 0.5)
      return true
    }
    return false
  }

  draw(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    mouse: { x: number; y: number },
    perspective: number,
  ) {
    const startPos = this.start.project(canvas, mouse, perspective)
    const endPos = this.end.project(canvas, mouse, perspective)

    const x = startPos.x + (endPos.x - startPos.x) * this.progress
    const y = startPos.y + (endPos.y - startPos.y) * this.progress
    const scale = startPos.scale + (endPos.scale - startPos.scale) * this.progress

    ctx.beginPath()
    ctx.arc(x, y, 2.5 * scale, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${1 - this.progress})`
    ctx.shadowColor = 'white'
    ctx.shadowBlur = 10
    ctx.fill()
    ctx.shadowBlur = 0
  }
}

// Hardcoded navy for the motion-trail fill. Using a direct hex keeps the
// canvas visibly navy — resolving --background/--card at runtime returns a
// LAB color that converges to near-black in the alpha-accumulated trail.
const TRAIL_COLOR = 'rgba(20, 28, 66, 0.18)'

export function CosmicSynapseBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId = 0
    let neurons: Neuron[] = []
    let pulses: Pulse[] = []
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, radius: 150 }
    const perspective = 400


    const init = () => {
      neurons = []
      const numNeurons = 1000
      const radius = 250
      for (let i = 0; i < numNeurons; i++) {
        const phi = Math.acos(-1 + (2 * i) / numNeurons)
        const theta = Math.sqrt(numNeurons * Math.PI) * phi
        const x = radius * Math.cos(theta) * Math.sin(phi)
        const y = radius * Math.sin(phi) * Math.sin(theta)
        const z = radius * Math.cos(phi)
        neurons.push(new Neuron(x, y, z))
      }

      for (const neuron of neurons) {
        for (const other of neurons) {
          if (neuron === other) continue
          const dist = Math.hypot(
            neuron.x - other.x,
            neuron.y - other.y,
            neuron.z - other.z,
          )
          if (dist < 40) neuron.neighbors.push(other)
        }
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    const animate = () => {
      ctx.fillStyle = TRAIL_COLOR
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (Math.random() > 0.99 && neurons.length > 0) {
        neurons[Math.floor(Math.random() * neurons.length)].fire(pulses)
      }

      for (const n of neurons) n.update(ctx, canvas, mouse, perspective)

      pulses = pulses.filter((p) => !p.update())
      for (const p of pulses) p.draw(ctx, canvas, mouse, perspective)

      animationFrameId = window.requestAnimationFrame(animate)
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    }

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)

    resizeCanvas()
    animate()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
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
