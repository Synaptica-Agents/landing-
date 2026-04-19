'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

// ─── Easing ────────────────────────────────────────────────────────────────
const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v))

const Easing = {
  linear: (t: number) => t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInCubic: (t: number) => t * t * t,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
}

// ─── Timeline context ──────────────────────────────────────────────────────
type TimelineValue = { time: number; duration: number }
const TimelineContext = createContext<TimelineValue>({ time: 0, duration: 7 })
const useTime = () => useContext(TimelineContext).time
const useTimeline = () => useContext(TimelineContext)

// ─── Constants (from original design) ──────────────────────────────────────
const ACCENT = '#1e3a8a'
const STAGE_W = 1920
const STAGE_H = 1080
const DURATION = 7

const FUNNEL_X = 820
const FUNNEL_Y = 540

// ─── Document pile ─────────────────────────────────────────────────────────
type DocKind = 'envelope' | 'pdf' | 'message'

const DOC_TYPES: Array<{ kind: DocKind; label: string }> = [
  { kind: 'envelope', label: 'Pitch deck Series A' },
  { kind: 'pdf', label: 'Financials Q3' },
  { kind: 'message', label: 'Founder intro' },
  { kind: 'envelope', label: 'Warm intro' },
  { kind: 'pdf', label: 'Cap table' },
  { kind: 'message', label: 'Follow-up' },
  { kind: 'envelope', label: 'Deck v2' },
  { kind: 'pdf', label: 'Data room' },
  { kind: 'message', label: 'Q3 metrics' },
  { kind: 'envelope', label: 'Cold outreach' },
]

const DOC_LAYOUT = [
  { x: 260, y: 300, rot: -18, delay: 0.00, kind: 0 },
  { x: 400, y: 230, rot: -6, delay: 0.16, kind: 1 },
  { x: 540, y: 270, rot: 8, delay: 0.32, kind: 2 },
  { x: 220, y: 470, rot: 12, delay: 0.48, kind: 3 },
  { x: 360, y: 420, rot: -10, delay: 0.64, kind: 4 },
  { x: 500, y: 480, rot: 4, delay: 0.80, kind: 5 },
  { x: 280, y: 640, rot: -4, delay: 0.96, kind: 6 },
  { x: 440, y: 620, rot: 14, delay: 1.12, kind: 7 },
  { x: 580, y: 410, rot: -14, delay: 1.28, kind: 8 },
  { x: 320, y: 800, rot: 6, delay: 1.44, kind: 9 },
]

function EnvelopeCard({ label }: { label: string }) {
  return (
    <div
      style={{
        width: 180,
        height: 120,
        background: '#fff',
        borderRadius: 6,
        boxShadow:
          '0 8px 24px rgba(15, 23, 42, 0.10), 0 2px 6px rgba(15,23,42,0.06)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
      }}
    >
      <svg
        width="180"
        height="120"
        style={{ position: 'absolute', inset: 0 }}
      >
        <path
          d="M0 0 L90 60 L180 0 Z"
          fill="#f8fafc"
          stroke="#e5e7eb"
          strokeWidth="1"
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 11,
          color: '#64748b',
          fontWeight: 500,
          letterSpacing: '-0.01em',
        }}
      >
        {label}
      </div>
    </div>
  )
}

function PdfCard({ label }: { label: string }) {
  return (
    <div
      style={{
        width: 150,
        height: 170,
        background: '#fff',
        borderRadius: 8,
        boxShadow:
          '0 8px 24px rgba(15, 23, 42, 0.10), 0 2px 6px rgba(15,23,42,0.06)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        padding: 14,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: '#dc2626',
          color: '#fff',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 9,
          fontWeight: 700,
          padding: '3px 6px',
          borderRadius: 3,
          letterSpacing: '0.04em',
        }}
      >
        PDF
      </div>
      <div style={{ marginTop: 26 }}>
        {['70%', '90%', '60%', '80%'].map((w, i) => (
          <div
            key={i}
            style={{
              height: 4,
              background: '#e5e7eb',
              borderRadius: 2,
              marginBottom: 8,
              width: w,
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          left: 14,
          right: 14,
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 10,
          color: '#64748b',
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  )
}

function MessageCard({ label }: { label: string }) {
  return (
    <div
      style={{
        width: 180,
        height: 110,
        background: '#fff',
        borderRadius: 8,
        boxShadow:
          '0 8px 24px rgba(15, 23, 42, 0.10), 0 2px 6px rgba(15,23,42,0.06)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        padding: 12,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 3.5a1.5 1.5 0 011.5-1.5h7A1.5 1.5 0 0112 3.5v5A1.5 1.5 0 0110.5 10H6l-3 2.5V10H3.5A1.5 1.5 0 012 8.5v-5z"
            stroke={ACCENT}
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
        <div
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 10,
            color: '#64748b',
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          Message
        </div>
      </div>
      <div
        style={{
          marginTop: 12,
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 12,
          color: '#1e293b',
          fontWeight: 500,
          letterSpacing: '-0.01em',
        }}
      >
        {label}
      </div>
      <div style={{ marginTop: 10 }}>
        <div
          style={{
            height: 3,
            background: '#e5e7eb',
            borderRadius: 2,
            marginBottom: 5,
            width: '80%',
          }}
        />
        <div
          style={{
            height: 3,
            background: '#e5e7eb',
            borderRadius: 2,
            width: '55%',
          }}
        />
      </div>
    </div>
  )
}

function DocCard({
  type,
  x,
  y,
  rot,
  delay,
}: {
  type: number
  x: number
  y: number
  rot: number
  delay: number
}) {
  const time = useTime()

  const entryStart = delay
  const entryEnd = entryStart + 0.7
  const suckStart = 2.6 + delay * 0.15
  const suckEnd = suckStart + 0.5
  const ghostIn = suckEnd + 0.35

  const docType = DOC_TYPES[type]

  // Ghost placeholder rendered after a doc gets sucked in. Dashed white
  // silhouette at the original position so the viewer remembers this spot
  // held a doc.
  const renderGhost = (gOpacity: number) => {
    const common = {
      position: 'absolute' as const,
      left: x,
      top: y,
      transform: `translate(-50%, -50%) rotate(${rot}deg)`,
      transformOrigin: 'center',
      opacity: gOpacity * 0.9,
      pointerEvents: 'none' as const,
      boxSizing: 'border-box' as const,
    }
    const ghostStroke = 'rgba(255,255,255,0.85)'
    const ghostFill = 'rgba(255,255,255,0.10)'
    const ghostLine = 'rgba(255,255,255,0.55)'

    if (docType.kind === 'envelope') {
      return (
        <div
          style={{
            ...common,
            width: 180,
            height: 120,
            border: `1.5px dashed ${ghostStroke}`,
            borderRadius: 6,
            background: ghostFill,
            overflow: 'hidden',
          }}
        >
          <svg
            width="180"
            height="120"
            style={{ position: 'absolute', inset: 0 }}
          >
            <path
              d="M0 0 L90 60 L180 0"
              fill="none"
              stroke={ghostStroke}
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />
          </svg>
          <div
            style={{
              position: 'absolute',
              bottom: 14,
              left: 10,
              right: 34,
              height: 4,
              background: ghostLine,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              left: 10,
              width: 60,
              height: 3,
              background: ghostLine,
              borderRadius: 2,
              opacity: 0.6,
            }}
          />
        </div>
      )
    }

    if (docType.kind === 'pdf') {
      return (
        <div
          style={{
            ...common,
            width: 150,
            height: 170,
            border: `1.5px dashed ${ghostStroke}`,
            borderRadius: 8,
            background: ghostFill,
            padding: 14,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: 30,
              height: 16,
              border: `1px dashed ${ghostStroke}`,
              borderRadius: 3,
              opacity: 0.8,
            }}
          />
          <div style={{ marginTop: 26 }}>
            {['70%', '90%', '60%', '80%'].map((w, i) => (
              <div
                key={i}
                style={{
                  height: 3,
                  background: ghostLine,
                  borderRadius: 2,
                  marginBottom: 7,
                  width: w,
                }}
              />
            ))}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              left: 14,
              width: 60,
              height: 3,
              background: ghostLine,
              borderRadius: 2,
            }}
          />
        </div>
      )
    }

    return (
      <div
        style={{
          ...common,
          width: 180,
          height: 110,
          border: `1.5px dashed ${ghostStroke}`,
          borderRadius: 8,
          background: ghostFill,
          padding: 12,
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          style={{ display: 'block' }}
        >
          <path
            d="M2 3.5a1.5 1.5 0 011.5-1.5h7A1.5 1.5 0 0112 3.5v5A1.5 1.5 0 0110.5 10H6l-3 2.5V10H3.5A1.5 1.5 0 012 8.5v-5z"
            stroke={ghostStroke}
            strokeWidth="1.2"
            fill="none"
            strokeDasharray="3 2"
          />
        </svg>
        <div style={{ marginTop: 12 }}>
          <div
            style={{
              height: 4,
              background: ghostLine,
              borderRadius: 2,
              marginBottom: 5,
              width: '75%',
            }}
          />
          <div
            style={{
              height: 3,
              background: ghostLine,
              borderRadius: 2,
              marginBottom: 5,
              width: '90%',
              opacity: 0.7,
            }}
          />
          <div
            style={{
              height: 3,
              background: ghostLine,
              borderRadius: 2,
              width: '55%',
              opacity: 0.7,
            }}
          />
        </div>
      </div>
    )
  }

  // After the doc is gone, only the ghost stays at the original spot.
  if (time >= suckEnd) {
    const gT = clamp((time - suckEnd) / (ghostIn - suckEnd), 0, 1)
    return renderGhost(Easing.easeOutCubic(gT))
  }

  let opacity = 0
  let tx = x
  let ty = y
  let tr = rot
  let scale = 1

  if (time < entryStart) {
    opacity = 0
    tx = x - 400
    ty = y - 100
    scale = 0.6
  } else if (time < entryEnd) {
    const t = Easing.easeOutCubic(
      clamp((time - entryStart) / (entryEnd - entryStart), 0, 1),
    )
    opacity = t
    tx = x - 400 * (1 - t)
    ty = y - 100 * (1 - t)
    scale = 0.6 + 0.4 * t
  } else if (time < suckStart) {
    const bob = Math.sin((time - entryEnd) * 2 + delay * 6) * 3
    opacity = 1
    ty = y + bob
    scale = 1
  } else {
    const t = Easing.easeInCubic(
      clamp((time - suckStart) / (suckEnd - suckStart), 0, 1),
    )
    opacity = 1 - t
    tx = x + (FUNNEL_X - x) * t
    ty = y + (FUNNEL_Y - y) * t
    tr = rot * (1 - t)
    scale = 1 - 0.5 * t
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: tx,
        top: ty,
        opacity,
        transform: `translate(-50%, -50%) rotate(${tr}deg) scale(${scale})`,
        transformOrigin: 'center',
        willChange: 'transform, opacity',
      }}
    >
      {docType.kind === 'envelope' && <EnvelopeCard label={docType.label} />}
      {docType.kind === 'pdf' && <PdfCard label={docType.label} />}
      {docType.kind === 'message' && <MessageCard label={docType.label} />}
    </div>
  )
}

function DocumentPile() {
  return (
    <>
      {DOC_LAYOUT.map((d, i) => (
        <DocCard
          key={i}
          type={d.kind}
          x={d.x}
          y={d.y}
          rot={d.rot}
          delay={d.delay}
        />
      ))}
    </>
  )
}

// ─── Analysis boxes ────────────────────────────────────────────────────────
const BOX_W = 280
const BOX_H = 440
const BOX_Y = (STAGE_H - BOX_H) / 2
const BOX_GAP = 28
const BOX_1_X = 980
const BOX_2_X = BOX_1_X + BOX_W + BOX_GAP
const BOX_3_X = BOX_2_X + BOX_W + BOX_GAP

const BOX_1_START = 3.0
const BOX_2_START = 3.4
const BOX_3_START = 3.8

function useCountUp(target: number, start: number, dur = 0.6) {
  const time = useTime()
  if (time < start) return 0
  if (time > start + dur) return target
  const t = Easing.easeOutCubic((time - start) / dur)
  return Math.round(target * t)
}

function useBoxEnterStyle(boxStart: number) {
  const time = useTime()
  const t = clamp((time - boxStart) / 0.5, 0, 1)
  const eased = Easing.easeOutCubic(t)
  return {
    opacity: eased,
    transform: `translateY(${(1 - eased) * 12}px) scale(${0.96 + 0.04 * eased})`,
  }
}

function AnalysisBox({
  x,
  y,
  start,
  children,
}: {
  x: number
  y: number
  start: number
  children: ReactNode
}) {
  const enterStyle = useBoxEnterStyle(start)
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: BOX_W,
        height: BOX_H,
        background: '#fff',
        borderRadius: 14,
        border: '1px solid #e5e7eb',
        boxShadow:
          '0 8px 24px rgba(15,23,42,0.06), 0 2px 6px rgba(15,23,42,0.04)',
        padding: 28,
        boxSizing: 'border-box',
        fontFamily: 'Inter, system-ui, sans-serif',
        willChange: 'transform, opacity',
        ...enterStyle,
      }}
    >
      {children}
    </div>
  )
}

function FounderResearchBox() {
  const time = useTime()
  const contentStart = BOX_1_START + 0.25
  const avatarT = clamp((time - contentStart) / 0.4, 0, 1)
  const bioT = clamp((time - contentStart - 0.15) / 0.5, 0, 1)
  const chartT = clamp((time - contentStart - 0.35) / 0.8, 0, 1)

  const chartPoints: Array<[number, number]> = [
    [10, 58], [35, 50], [55, 54], [80, 42],
    [105, 34], [130, 28], [155, 18], [180, 10],
  ]
  const visiblePts = Math.max(1, Math.floor(chartPoints.length * chartT))
  const shown = chartPoints.slice(0, visiblePts)
  const chartPath = shown
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]} ${p[1]}`)
    .join(' ')
  const areaPath =
    shown.length > 1
      ? chartPath +
        ` L ${shown[shown.length - 1][0]} 70 L ${shown[0][0]} 70 Z`
      : ''

  const tags = ['ex-Stripe', '2× founder', 'YC S23']

  return (
    <AnalysisBox x={BOX_1_X} y={BOX_Y} start={BOX_1_START}>
      <div
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: '#0f172a',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}
      >
        Founder
        <br />
        Research
      </div>

      <div
        style={{
          marginTop: 26,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          opacity: avatarT,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
            border: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="5" r="2.2" stroke="#6366f1" strokeWidth="1.3" />
            <path
              d="M3 12c.8-2 2.3-3 4-3s3.2 1 4 3"
              stroke="#6366f1"
              strokeWidth="1.3"
              fill="none"
            />
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#0f172a',
              letterSpacing: '-0.01em',
            }}
          >
            Sarah Chen
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: '#64748b',
              marginTop: 2,
            }}
          >
            CEO · Acme Labs
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, opacity: bioT }}>
        <div
          style={{
            height: 5,
            background: '#eef2f7',
            borderRadius: 2,
            marginBottom: 5,
            width: `${bioT * 95}%`,
          }}
        />
        <div
          style={{
            height: 5,
            background: '#eef2f7',
            borderRadius: 2,
            marginBottom: 5,
            width: `${bioT * 80}%`,
          }}
        />
        <div
          style={{
            height: 5,
            background: '#eef2f7',
            borderRadius: 2,
            width: `${bioT * 65}%`,
          }}
        />
      </div>

      <div
        style={{
          marginTop: 16,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
        }}
      >
        {tags.map((tag, i) => {
          const tagStart = contentStart + 0.6 + i * 0.08
          const t = clamp((time - tagStart) / 0.3, 0, 1)
          return (
            <div
              key={i}
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: ACCENT,
                background: 'rgba(30,58,138,0.08)',
                padding: '4px 9px',
                borderRadius: 4,
                letterSpacing: '-0.01em',
                opacity: t,
                transform: `scale(${0.9 + 0.1 * t})`,
              }}
            >
              {tag}
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: 22 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            fontSize: 10,
            fontWeight: 500,
            color: '#94a3b8',
            marginBottom: 8,
            letterSpacing: '0.02em',
          }}
        >
          <span>Traction (12mo)</span>
          <span
            style={{
              color: '#059669',
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            +{Math.round(chartT * 284)}%
          </span>
        </div>
        <div style={{ position: 'relative', height: 72 }}>
          <svg
            width="100%"
            height="72"
            viewBox="0 0 200 72"
            preserveAspectRatio="none"
            style={{ overflow: 'visible' }}
          >
            <line x1="0" y1="70" x2="200" y2="70" stroke="#f1f5f9" strokeWidth="1" />
            {areaPath && <path d={areaPath} fill={ACCENT} opacity="0.08" />}
            <path
              d={chartPath}
              stroke={ACCENT}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {shown.length > 0 && (
              <circle
                cx={shown[shown.length - 1][0]}
                cy={shown[shown.length - 1][1]}
                r="3.5"
                fill={ACCENT}
              />
            )}
          </svg>
        </div>
      </div>
    </AnalysisBox>
  )
}

function DealScoringBox() {
  const time = useTime()
  const contentStart = BOX_2_START + 0.25

  const mainScore = useCountUp(78, contentStart, 0.7)
  const s1 = useCountUp(87, contentStart + 0.15, 0.5)
  const s2 = useCountUp(72, contentStart + 0.25, 0.5)
  const s3 = useCountUp(64, contentStart + 0.35, 0.5)

  const barT = (delay: number, target: number) => {
    const t = clamp((time - contentStart - delay) / 0.6, 0, 1)
    return Easing.easeOutCubic(t) * (target / 100)
  }

  const rows = [
    { name: 'Team', label: s1, t: barT(0.15, 87) },
    { name: 'Market', label: s2, t: barT(0.25, 72) },
    { name: 'Product', label: s3, t: barT(0.35, 64) },
  ]

  return (
    <AnalysisBox x={BOX_2_X} y={BOX_Y} start={BOX_2_START}>
      <div
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: '#0f172a',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}
      >
        Deal
        <br />
        Scoring
      </div>
      <div
        style={{
          marginTop: 28,
          display: 'flex',
          alignItems: 'baseline',
          gap: 12,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: ACCENT,
            letterSpacing: '-0.03em',
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1,
          }}
        >
          {mainScore}
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: ACCENT,
            letterSpacing: '-0.01em',
            opacity: clamp((time - contentStart - 0.4) / 0.3, 0, 1),
          }}
        >
          Tier B+
        </div>
      </div>
      <div
        style={{
          marginTop: 6,
          fontSize: 11,
          fontWeight: 500,
          color: '#94a3b8',
          opacity: clamp((time - contentStart - 0.5) / 0.3, 0, 1),
        }}
      >
        Overall confidence score
      </div>
      <div
        style={{
          marginTop: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {rows.map((row, i) => (
          <div key={i}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 11,
                fontWeight: 500,
                color: '#64748b',
                marginBottom: 5,
                letterSpacing: '-0.01em',
              }}
            >
              <span>{row.name}</span>
              <span
                style={{
                  color: '#0f172a',
                  fontWeight: 600,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {row.label}
              </span>
            </div>
            <div
              style={{
                height: 6,
                background: '#eef2f7',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${row.t * 100}%`,
                  height: '100%',
                  background: ACCENT,
                  borderRadius: 3,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </AnalysisBox>
  )
}

function PipelineBox() {
  const time = useTime()
  const contentStart = BOX_3_START + 0.25

  const rows = [
    { startup: 'Acme Labs', stage: 'Process', tier: 'B+' },
    { startup: 'Lumen AI', stage: 'Diligence', tier: 'A' },
    { startup: 'Nortix', stage: 'Screen', tier: 'B' },
    { startup: 'Parabola', stage: 'Process', tier: 'B+' },
    { startup: 'Helio', stage: 'Screen', tier: 'C' },
    { startup: 'Vector Co.', stage: 'Diligence', tier: 'A-' },
  ]

  return (
    <AnalysisBox x={BOX_3_X} y={BOX_Y} start={BOX_3_START}>
      <div
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: '#0f172a',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}
      >
        Pipeline
      </div>
      <div
        style={{
          marginTop: 26,
          display: 'grid',
          gridTemplateColumns: '1fr auto 28px',
          gap: 8,
          fontSize: 10,
          fontWeight: 600,
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          paddingBottom: 10,
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <div>Startup</div>
        <div>Stage</div>
        <div style={{ textAlign: 'right' }}>Tier</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {rows.map((row, i) => {
          const rowStart = contentStart + i * 0.1
          const t = clamp((time - rowStart) / 0.35, 0, 1)
          const eased = Easing.easeOutCubic(t)
          return (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 28px',
                gap: 8,
                alignItems: 'center',
                fontSize: 12,
                fontWeight: 500,
                color: '#0f172a',
                padding: '11px 0',
                borderBottom:
                  i < rows.length - 1 ? '1px solid #f1f5f9' : 'none',
                opacity: eased,
                transform: `translateX(${(1 - eased) * 8}px)`,
                letterSpacing: '-0.01em',
              }}
            >
              <div>{row.startup}</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>{row.stage}</div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: ACCENT,
                  textAlign: 'center',
                  background: 'rgba(30,58,138,0.08)',
                  padding: '3px 0',
                  borderRadius: 4,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {row.tier}
              </div>
            </div>
          )
        })}
      </div>
    </AnalysisBox>
  )
}

// ─── Connector line ────────────────────────────────────────────────────────
function Connector() {
  const time = useTime()

  const drawStart = 2.4
  const drawEnd = 3.2
  const t = clamp((time - drawStart) / (drawEnd - drawStart), 0, 1)
  const eased = Easing.easeInOutCubic(t)

  const startX = FUNNEL_X + 20
  const startY = FUNNEL_Y
  const midX = BOX_1_X - 40
  const endX = BOX_3_X - 4
  const boxCenterY = BOX_Y + BOX_H / 2

  const totalLen =
    midX - startX + Math.abs(boxCenterY - startY) + (endX - midX)

  const pathD = `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${boxCenterY} L ${endX} ${boxCenterY}`

  return (
    <svg
      width={STAGE_W}
      height={STAGE_H}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <defs>
        <filter
          id="connector-glow-desktop"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="4" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Outer soft blue glow layer */}
      <path
        d={pathD}
        stroke="#60a5fa"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLen}
        strokeDashoffset={totalLen * (1 - eased)}
        opacity={0.55}
        filter="url(#connector-glow-desktop)"
      />
      {/* Main bright white core line */}
      <path
        d={pathD}
        stroke="#ffffff"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLen}
        strokeDashoffset={totalLen * (1 - eased)}
        opacity={1}
      />
    </svg>
  )
}

// ─── Scene ─────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 70% 50%, rgba(30,58,138,0.025) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />
      <DocumentPile />
      <Connector />
      <FounderResearchBox />
      <DealScoringBox />
      <PipelineBox />
    </>
  )
}

// ─── Stage ─────────────────────────────────────────────────────────────────
export function DealFlowAnimation() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [time, setTime] = useState(0)
  const [scale, setScale] = useState(1)
  const rafRef = useRef<number | null>(null)
  const lastTsRef = useRef<number | null>(null)
  const visibleRef = useRef(true)

  // Auto-scale to fit the wrapper
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const measure = () => {
      const s = Math.min(el.clientWidth / STAGE_W, el.clientHeight / STAGE_H)
      setScale(Math.max(0.05, s))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // IntersectionObserver gating
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
      },
      { threshold: 0.01 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Animation loop
  useEffect(() => {
    const step = (ts: number) => {
      if (!visibleRef.current) {
        lastTsRef.current = ts
        rafRef.current = requestAnimationFrame(step)
        return
      }
      if (lastTsRef.current == null) lastTsRef.current = ts
      const dt = (ts - lastTsRef.current) / 1000
      lastTsRef.current = ts
      setTime((t) => {
        const next = t + dt
        return next >= DURATION ? next % DURATION : next
      })
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastTsRef.current = null
    }
  }, [])

  const ctxValue = useMemo<TimelineValue>(
    () => ({ time, duration: DURATION }),
    [time],
  )

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: STAGE_W,
          height: STAGE_H,
          marginLeft: -STAGE_W / 2,
          marginTop: -STAGE_H / 2,
          transform: `scale(${scale})`,
          transformOrigin: 'center',
        }}
      >
        <div
          style={{
            width: STAGE_W,
            height: STAGE_H,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <TimelineContext.Provider value={ctxValue}>
            <Scene />
          </TimelineContext.Provider>
        </div>
      </div>
    </div>
  )
}
