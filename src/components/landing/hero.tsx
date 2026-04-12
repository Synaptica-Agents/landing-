'use client'

import { useCallback } from "react"
import type { Application } from "@splinetool/runtime"
import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { EmailForm } from "./email-form"

export function Hero() {
  const handleSplineLoad = useCallback((splineApp: Application) => {
    console.log('[Spline] onLoad fired')

    // Make Spline background transparent so stars show through
    splineApp.setBackgroundColor('rgba(0,0,0,0)')

    // Access the internal Three.js scene to modify shader uniforms directly.
    // The Spline layer API (.color.r = ...) only updates the JS data model
    // but does NOT propagate to WebGL uniforms. We must modify nodeU0.value
    // on each mesh's material.uniforms to actually change rendered colors.
    type ThreeScene = {
      traverse: (cb: (child: ThreeMesh) => void) => void
    }
    type ThreeMesh = {
      isMesh?: boolean
      name: string
      material?: {
        uniforms?: Record<string, { value: { r: number; g: number; b: number } | number }>
      }
      scale?: { x: number; y: number; z: number }
    }

    const scene = (splineApp as unknown as { _scene: ThreeScene })._scene
    if (!scene) {
      console.warn('[Spline] No _scene found — cannot customize robot')
      return
    }

    function applyViaUniforms() {
      let bodyCount = 0
      let darkCount = 0
      let headDone = false

      scene.traverse((child) => {
        if (!child.isMesh || !child.material?.uniforms) return
        const u = child.material.uniforms
        const nodeU0 = u.nodeU0
        if (!nodeU0?.value || typeof nodeU0.value !== 'object' || !('r' in nodeU0.value)) return

        const c = nodeU0.value

        // Head — deep blue/purple tint
        if (child.name === 'Head 2') {
          c.r = 0.06
          c.g = 0.06
          c.b = 0.18
          // Scale head slightly larger
          if (child.scale) {
            child.scale.x = 1.08
            child.scale.y = 1.08
            child.scale.z = 1.08
          }
          headDone = true
          return
        }

        // Body panels (original ~0.308 grey) — blue tint
        if (c.r > 0.25 && c.r < 0.35 && Math.abs(c.r - c.g) < 0.01) {
          c.r = 0.12
          c.g = 0.12
          c.b = 0.28
          bodyCount++
          return
        }

        // Dark/black parts (original ~0.010) — metallic grey
        if (c.r < 0.05 && c.g < 0.05 && c.b < 0.05) {
          c.r = 0.22
          c.g = 0.24
          c.b = 0.28
          darkCount++
          return
        }
      })

      console.log(`[Spline] Uniforms: head=${headDone}, body=${bodyCount}, dark=${darkCount}`)
    }

    // Apply with delay to ensure scene is fully initialized
    setTimeout(applyViaUniforms, 100)
    setTimeout(applyViaUniforms, 1000)
    setTimeout(applyViaUniforms, 2500)
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
