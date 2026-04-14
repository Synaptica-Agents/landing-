'use client'

import { useCallback } from "react"
import type { Application } from "@splinetool/runtime"
import { SplineScene } from "@/components/ui/splite"
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

    // Store globally for debugging
    ;(window as unknown as { __splineApp: Application }).__splineApp = splineApp

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
          // Chest, torso → dark neutral with visible texture
          setColor(u, 'nodeU0', 0.08, 0.08, 0.08)
          setColor(u, 'nodeU16', 0.12, 0.12, 0.12) // secondary/texture color
          setNum(u, 'nodeU13', 0.35)   // matcap (more surface detail)
          setNum(u, 'nodeU28', 0.50)   // rainbow/iridescence (subtle shimmer)
        }

        if (mat.name === 'Head') {
          // Head → dark neutral with texture
          setColor(u, 'nodeU0', 0.06, 0.06, 0.06)
          setColor(u, 'nodeU11', 0.14, 0.14, 0.14) // reflection color
          setNum(u, 'nodeU14', 5.0)    // eye light intensity (brighter eyes)
          setNum(u, 'nodeU18', 0.35)   // matcap (more surface detail)
          setNum(u, 'nodeU28', 0.45)   // iridescence (subtle shimmer)
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
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 snap-start">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-4 md:gap-4">
        {/* Spline 3D */}
        <div className="w-full max-w-[320px] h-[380px] mx-auto md:max-w-none md:mx-0 md:flex-[1.2] md:h-[520px] relative overflow-hidden">
          <SplineScene
            scene="https://prod.spline.design/ofSVkzNdOvfRdlLP/scene.splinecode"
            className="w-full h-full scale-110"
            onLoad={handleSplineLoad}
          />
        </div>

        {/* Text content outside Card */}
        <div className="flex-[1.2] flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
            Hire your <em>dream</em><br />employee
          </h1>
          <p className="mt-6 text-neutral-300 max-w-lg text-base md:text-xl leading-relaxed font-sans">
            Built for your industry. Plugged into your tools.
            Designed to act, not just answer.
          </p>
          <p className="mt-3 text-base md:text-xl font-sans">
            <strong className="text-white">A whole new level of automation!</strong>
          </p>

          <div className="mt-8">
            <EmailForm source="hero" />
          </div>

          <p className="mt-4 text-neutral-500 text-xs md:text-sm font-sans">
            Built for European businesses &amp; their workflows
          </p>
          <div className="flex gap-4 mt-3">
            <span className="text-[11px] md:text-sm text-neutral-400 font-mono tracking-wide uppercase">GDPR Compliant</span>
            <span className="text-[11px] md:text-sm text-neutral-400 font-mono tracking-wide uppercase">EU-Hosted</span>
            <span className="text-[11px] md:text-sm text-neutral-400 font-mono tracking-wide uppercase">Encrypted</span>
          </div>
        </div>
      </div>
    </section>
  )
}
