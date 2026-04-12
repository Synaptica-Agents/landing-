'use client'

import { useCallback } from "react"
import type { Application } from "@splinetool/runtime"
import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { EmailForm } from "./email-form"

export function Hero() {
  const handleSplineLoad = useCallback((splineApp: Application) => {
    // Make Spline background transparent so stars show through
    splineApp.setBackgroundColor('rgba(0,0,0,0)')

    // --- Customize the robot ---
    const allObjects = splineApp.getAllObjects()

    // Helper to find material layers
    type LayerLike = { type: string; color?: { r: number; g: number; b: number }; alpha?: number; updateTexture?: (src: string) => void }
    function getLayer(obj: unknown, layerType: string): LayerLike | undefined {
      const o = obj as { material?: { layers?: LayerLike[] } }
      return o?.material?.layers?.find((l) => l.type === layerType)
    }

    // 1. Tint body with subtle dark blue
    const body = splineApp.findObjectByName('Body')
    if (body) {
      const bodyColor = getLayer(body, 'color')
      if (bodyColor) bodyColor.color = { r: 0.12, g: 0.12, b: 0.22 }
      const bodyRainbow = getLayer(body, 'rainbow')
      if (bodyRainbow) bodyRainbow.alpha = 0.3
      // Apply logo texture on body chest
      const bodyTex = getLayer(body, 'texture')
      if (bodyTex && bodyTex.updateTexture) {
        bodyTex.alpha = 0.3
        bodyTex.updateTexture('/Logo Synaptica.png')
      }
    }

    // 2. Tint head with dark blue/purple
    const head = splineApp.findObjectByName('Head 2')
    if (head) {
      const headColor = getLayer(head, 'color')
      if (headColor) headColor.color = { r: 0.04, g: 0.04, b: 0.10 }
      const headRainbow = getLayer(head, 'rainbow')
      if (headRainbow) headRainbow.alpha = 0.55
    }

    // 3. Tint all limb/joint meshes with matching dark blue
    const limbParts = ['Cube', 'Cylinder 3', 'Cylinder 4', 'Cylinder',
      'Rectangle 3', 'Rectangle 2', 'Ellipse 3', 'Ellipse 2',
      'Rectangle 9', 'Rectangle 10', 'Rectangle 7', 'Rectangle 8']
    allObjects.forEach((obj) => {
      if (limbParts.includes(obj.name) && (obj as { type?: string }).type === 'Mesh') {
        const col = getLayer(obj, 'color')
        if (col) col.color = { r: 0.10, g: 0.10, b: 0.18 }
        const rb = getLayer(obj, 'rainbow')
        if (rb) rb.alpha = 0.25
      }
    })
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <Card className="w-full max-w-6xl min-h-[500px] bg-black/30 border-white/[0.05] backdrop-blur-sm relative overflow-hidden shadow-none">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        <div className="flex flex-col md:flex-row h-full min-h-[500px]">
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
          <div className="flex-1 relative min-h-[300px] md:min-h-0">
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
