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

    // Store globally for debugging
    const w = window as unknown as { __splineApp: Application }
    w.__splineApp = splineApp

    function applyViaUniforms() {
      let changed = 0

      scene.traverse((child) => {
        if (!child.isMesh || !child.material?.uniforms) return
        const uniforms = child.material.uniforms

        // Iterate ALL uniforms and find ones with rgb color values
        Object.keys(uniforms).forEach((key) => {
          const u = uniforms[key]
          const val = u?.value
          if (!val || typeof val !== 'object' || !('r' in val) || !('g' in val)) return

          const c = val as { r: number; g: number; b: number }

          // Skip if already customized (not grey-ish neutral)
          // We detect original colors: black (~0), dark (~0.01), body grey (~0.308), matcap grey (~0.2)
          const isNeutral = Math.abs(c.r - c.g) < 0.02 && Math.abs(c.g - c.b) < 0.02

          if (!isNeutral) return // Already has color or is a light/fog color

          // Head gets special treatment
          if (child.name === 'Head 2') {
            if (c.r < 0.05) {
              // Base color → deep blue
              c.r = 0.05
              c.g = 0.05
              c.b = 0.16
              changed++
            } else if (c.r >= 0.15 && c.r <= 0.25) {
              // Matcap/reflection → blue-tinted reflection
              c.r = 0.12
              c.g = 0.14
              c.b = 0.25
              changed++
            }
            return
          }

          // Body panels (Cylinder 3, Cube 3, Cube 2, etc.) — original ~0.308
          if (c.r > 0.25 && c.r < 0.35) {
            c.r = 0.10
            c.g = 0.10
            c.b = 0.25
            changed++
            return
          }

          // Dark/black parts — original ~0.000-0.015
          if (c.r < 0.05) {
            c.r = 0.18
            c.g = 0.20
            c.b = 0.26
            changed++
            return
          }

          // Mid-grey parts (matcap highlights ~0.2)
          if (c.r >= 0.15 && c.r <= 0.25) {
            c.r = 0.15
            c.g = 0.17
            c.b = 0.25
            changed++
          }
        })

        // Scale head
        if (child.name === 'Head 2' && child.scale) {
          child.scale.x = 1.08
          child.scale.y = 1.08
          child.scale.z = 1.08
        }
      })

      console.log(`[Spline] Changed ${changed} uniform color values`)
    }

    // Apply with delays — scene animation may overwrite on first frames
    setTimeout(applyViaUniforms, 200)
    setTimeout(applyViaUniforms, 1500)
    setTimeout(applyViaUniforms, 3000)
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
