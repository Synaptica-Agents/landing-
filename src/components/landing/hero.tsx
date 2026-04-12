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

    // Access Three.js scene to modify shader uniforms directly.
    // Spline uses NodeMaterial with only 3 unique materials shared across
    // 80 meshes. The Spline layer API doesn't propagate to WebGL uniforms,
    // so we must modify nodeU* uniform values on the Three.js materials.
    type UniformValue = { r: number; g: number; b: number } | number
    type ThreeMaterial = {
      uuid: string
      name: string
      uniforms?: Record<string, { value: UniformValue }>
    }
    type ThreeMesh = {
      isMesh?: boolean
      name: string
      material?: ThreeMaterial
      scale?: { x: number; y: number; z: number }
    }
    type ThreeScene = { traverse: (cb: (child: ThreeMesh) => void) => void }

    const scene = (splineApp as unknown as { _scene: ThreeScene })._scene
    if (!scene) return

    function setColor(u: Record<string, { value: UniformValue }>, key: string, r: number, g: number, b: number) {
      const v = u[key]?.value
      if (v && typeof v === 'object' && 'r' in v) {
        v.r = r; v.g = g; v.b = b
      }
    }
    function setNum(u: Record<string, { value: UniformValue }>, key: string, val: number) {
      if (u[key] && typeof u[key].value === 'number') {
        u[key].value = val
      }
    }

    function applyCustomizations() {
      const seen = new Set<string>()

      scene.traverse((child) => {
        if (!child.isMesh || !child.material?.uniforms) return
        const mat = child.material
        if (seen.has(mat.uuid)) return
        seen.add(mat.uuid)

        const u = mat.uniforms!

        if (mat.name === 'Parts') {
          // Joints, hands, feet → medium matte grey (brighter than before)
          setColor(u, 'nodeU0', 0.28, 0.28, 0.30)
          setNum(u, 'nodeU2', 3.0)     // matcap multiplier (matte)
          setNum(u, 'nodeU13', 0.40)   // matcap alpha
        }

        if (mat.name === 'Body') {
          // Chest, torso → dark purple, matte
          setColor(u, 'nodeU0', 0.06, 0.03, 0.14)
          setColor(u, 'nodeU16', 0.07, 0.04, 0.14) // secondary color
          setNum(u, 'nodeU13', 0.15)   // matcap
          setNum(u, 'nodeU28', 0.30)   // rainbow/iridescence
        }

        if (mat.name === 'Head') {
          // Head → dark purple, less glow
          setColor(u, 'nodeU0', 0.05, 0.02, 0.12)
          setColor(u, 'nodeU11', 0.10, 0.06, 0.18) // reflection color
          setNum(u, 'nodeU14', 1.8)    // eye light intensity
          setNum(u, 'nodeU18', 0.40)   // matcap (matte)
          setNum(u, 'nodeU28', 0.35)   // iridescence
        }
      })

      // Scale head slightly larger
      scene.traverse((child) => {
        if (child.name === 'Head 2' && child.scale) {
          child.scale.x = 1.08
          child.scale.y = 1.08
          child.scale.z = 1.08
        }
      })

      console.log('[Spline] Customizations applied to', seen.size, 'materials')
    }

    // Apply with delays to ensure scene is fully initialized
    setTimeout(applyCustomizations, 200)
    setTimeout(applyCustomizations, 1500)
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
