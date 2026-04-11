import Image from 'next/image'

export function Integrations() {
  return (
    <section id="integrations" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto w-full text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-16 text-white/90 max-w-3xl mx-auto">
          This isn&apos;t another AI platform, it&apos;s a system that connects and works with all your existing tools.
        </h2>

        <div className="relative max-w-[700px] mx-auto">
          <Image
            src="/LOGOS - Transparent.png"
            alt="Integration logos"
            width={700}
            height={700}
            className="w-full h-auto opacity-80"
          />

          {/* Agent Network SVG Overlay */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="agentGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="centerGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="particleGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="2" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="0.55"/>
                <stop offset="60%" stopColor="white" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="subGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="0.45"/>
                <stop offset="70%" stopColor="white" stopOpacity="0.12"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </radialGradient>
            </defs>

            {/* Orbital rings */}
            <circle cx="250" cy="250" r="130" fill="none" stroke="white" strokeOpacity="0.06" strokeWidth="0.8" strokeDasharray="4 6">
              <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="120s" repeatCount="indefinite"/>
            </circle>
            <circle cx="250" cy="250" r="160" fill="none" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" strokeDasharray="2 8">
              <animateTransform attributeName="transform" type="rotate" from="360 250 250" to="0 250 250" dur="90s" repeatCount="indefinite"/>
            </circle>

            {/* Connection lines */}
            {[[250,115],[385,115],[400,250],[385,385],[250,385],[115,385],[100,250],[115,115]].map(([x, y], i) => (
              <line key={`line-${i}`} x1="250" y1="250" x2={x} y2={y} stroke="white" strokeOpacity="0.12" strokeWidth="1.2">
                <animate attributeName="stroke-opacity" values="0.08;0.3;0.08" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite"/>
              </line>
            ))}

            {/* Traveling particles */}
            {[[250,115],[385,115],[400,250],[385,385],[250,385],[115,385],[100,250],[115,115]].map(([x, y], i) => (
              <circle key={`particle-${i}`} r="3" fill="white" filter="url(#particleGlow)">
                <animate attributeName="opacity" values="0;1;0" dur="2.5s" begin={`${i * 0.35}s`} repeatCount="indefinite"/>
                <animate attributeName="cx" values={`250;${x}`} dur="2.5s" begin={`${i * 0.35}s`} repeatCount="indefinite"/>
                <animate attributeName="cy" values={`250;${y}`} dur="2.5s" begin={`${i * 0.35}s`} repeatCount="indefinite"/>
              </circle>
            ))}

            {/* Sub-agent nodes */}
            {[[250,115,22],[385,115,28],[400,250,22],[385,385,28],[250,385,22],[115,385,28],[100,250,22],[115,115,28]].map(([cx, cy, r], i) => (
              <g key={`agent-${i}`} filter="url(#agentGlow)">
                <circle cx={cx} cy={cy} r={r} fill="url(#subGrad)" stroke="white" strokeOpacity="0.35" strokeWidth="1.2"/>
                <circle cx={cx} cy={cy} r={r === 28 ? 10 : 8} fill="white" fillOpacity="0.2" stroke="white" strokeOpacity="0.5" strokeWidth="0.8"/>
                <circle cx={cx} cy={cy} r={r === 28 ? 4 : 3.5} fill="white" fillOpacity="0.6">
                  <animate attributeName="fill-opacity" values="0.4;0.8;0.4" dur="2.5s" begin={`${i * 0.3}s`} repeatCount="indefinite"/>
                </circle>
              </g>
            ))}

            {/* Central coordinator */}
            <g filter="url(#centerGlow)">
              <circle cx="250" cy="250" r="80" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="1.8">
                <animate attributeName="r" values="78;95;78" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="stroke-opacity" values="0.25;0.06;0.25" dur="3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="250" cy="250" r="65" fill="url(#hubGrad)" stroke="white" strokeOpacity="0.5" strokeWidth="1.8"/>
              <polygon points="250,200 293.3,225 293.3,275 250,300 206.7,275 206.7,225" fill="white" fillOpacity="0.03" stroke="white" strokeOpacity="0.4" strokeWidth="1.2"/>
              <circle cx="250" cy="250" r="25" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.2" strokeWidth="0.8"/>
              <circle cx="250" cy="250" r="11" fill="white" fillOpacity="0.8">
                <animate attributeName="fill-opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="r" values="10;13;10" dur="2s" repeatCount="indefinite"/>
              </circle>
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}
