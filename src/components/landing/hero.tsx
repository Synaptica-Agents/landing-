'use client'

import { useCallback } from "react"
import type { Application } from "@splinetool/runtime"
import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { EmailForm } from "./email-form"

export function Hero() {
  const handleSplineLoad = useCallback((splineApp: Application) => {
    console.log('[Spline] onLoad fired — applying customizations')

    // Make Spline background transparent so stars show through
    splineApp.setBackgroundColor('rgba(0,0,0,0)')

    // Helper to find material layers
    type LayerLike = {
      type: string
      color?: { r: number; g: number; b: number }
      alpha?: number
      updateTexture?: (src: string) => void
    }
    function getLayer(obj: unknown, layerType: string): LayerLike | undefined {
      const o = obj as { material?: { layers?: LayerLike[] } }
      return o?.material?.layers?.find((l) => l.type === layerType)
    }

    // Store globally for debugging
    ;(window as unknown as { __splineApp: Application }).__splineApp = splineApp

    function applyCustomizations() {
      const allObjects = splineApp.getAllObjects()
      console.log('[Spline] Applying customizations to', allObjects.length, 'objects')

      // Log ALL mesh color values so we can see what we're dealing with
      const colorReport: string[] = []
      allObjects.forEach((obj) => {
        const o = obj as { type?: string; name?: string }
        if (o.type !== 'Mesh') return
        const col = getLayer(obj, 'color')
        if (col?.color) {
          const c = col.color
          colorReport.push(`${o.name}: r=${c.r.toFixed(3)} g=${c.g.toFixed(3)} b=${c.b.toFixed(3)}`)
        }
      })
      console.log('[Spline] All mesh colors:\n' + colorReport.join('\n'))

      // 1. Customize body — blue base
      const body = splineApp.findObjectByName('Body')
      if (body) {
        const bodyColor = getLayer(body, 'color')
        if (bodyColor?.color) {
          bodyColor.color.r = 0.18
          bodyColor.color.g = 0.18
          bodyColor.color.b = 0.35
        }
        const bodyRainbow = getLayer(body, 'rainbow')
        if (bodyRainbow) bodyRainbow.alpha = 0.45
        console.log('[Spline] Body customized, color layer:', JSON.stringify(bodyColor?.color))
      }

      // 2. Head — blue/purple tint, brighter eyes, slightly larger
      const head = splineApp.findObjectByName('Head 2')
      if (head) {
        const headColor = getLayer(head, 'color')
        if (headColor?.color) {
          headColor.color.r = 0.08
          headColor.color.g = 0.08
          headColor.color.b = 0.20
        }
        const headRainbow = getLayer(head, 'rainbow')
        if (headRainbow) headRainbow.alpha = 0.55
        const headLight = getLayer(head, 'light')
        if (headLight) headLight.alpha = 1.5
        const headMatcap = getLayer(head, 'matcap')
        if (headMatcap) headMatcap.alpha = 0.8
        const h = head as unknown as { scale: { x: number; y: number; z: number } }
        h.scale = { x: 1.08, y: 1.08, z: 1.08 }
        console.log('[Spline] Head customized, color layer:', JSON.stringify(headColor?.color))
      }

      // 2b. Brighter Point Light for more eye glow
      const pointLight = splineApp.findObjectByName('Point Light')
      if (pointLight) {
        const pl = pointLight as unknown as { intensity: number }
        pl.intensity = 8
        console.log('[Spline] Point Light set to 8')
      }

      // 3. Turn all dark robot parts to metallic grey (expanded threshold)
      let recolored = 0
      allObjects.forEach((obj) => {
        if ((obj as { type?: string }).type !== 'Mesh') return
        const col = getLayer(obj, 'color')
        if (!col?.color) return
        const c = col.color
        // Expanded threshold to catch dark parts
        if (c.r < 0.15 && c.g < 0.15 && c.b < 0.15) {
          c.r = 0.35
          c.g = 0.37
          c.b = 0.40
          const matcap = getLayer(obj, 'matcap')
          if (matcap) matcap.alpha = 0.7
          recolored++
        }
      })
      console.log('[Spline] Recolored', recolored, 'dark parts to metallic grey')
    }

    // Apply immediately
    applyCustomizations()

    // Re-apply after delays to fight animation system overwrites
    setTimeout(applyCustomizations, 500)
    setTimeout(applyCustomizations, 1500)
    setTimeout(applyCustomizations, 3000)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <Card className="w-full max-w-7xl min-h-[600px] bg-black/30 border-white/[0.05] backdrop-blur-sm relative overflow-visible shadow-none">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        <div className="flex flex-col md:flex-row h-full min-h-[600px]">
          {/* Left content */}
          <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
              The future of business <br />
              automation is <em>here.</em>
            </h1>
            <p className="mt-6 text-neutral-300 max-w-lg text-base md:text-lg leading-relaxed font-sans">
              Your new orchestrated multi-agent system: Specialized in your industry,
              tailored to your business.{' '}
              <strong className="text-white">Completely ready to use!</strong>
            </p>

            <div className="mt-8">
              <EmailForm source="hero" />
            </div>

            <p className="mt-4 text-neutral-500 text-xs font-sans">
              Built for European businesses &amp; their workflows
            </p>
            <div className="flex gap-4 mt-3">
              <span className="text-[11px] text-neutral-400 font-mono tracking-wide uppercase">GDPR Compliant</span>
              <span className="text-[11px] text-neutral-400 font-mono tracking-wide uppercase">EU-Hosted</span>
              <span className="text-[11px] text-neutral-400 font-mono tracking-wide uppercase">Encrypted</span>
            </div>
          </div>

          {/* Right content — Spline 3D */}
          <div className="flex-[1.3] relative min-h-[400px] md:min-h-0">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
              onLoad={handleSplineLoad}
            />
          </div>
        </div>
      </Card>
    </section>
  )
}
