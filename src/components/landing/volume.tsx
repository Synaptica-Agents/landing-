const ACCENT = 'oklch(74% 0.14 68)'
const NAVY_900 = '#0a1f44'
const NAVY_950 = '#08132b'
const NAVY_500 = '#3f6bb2'
const PAPER = '#f7f5f1'

type SideItem = { name: string; badge: string; active?: boolean }
type SideGroup = { label: string; items: SideItem[] }

const SIDE_GROUPS: SideGroup[] = [
  {
    label: 'Pipeline',
    items: [
      { name: 'Inbound', badge: '247', active: true },
      { name: 'Active diligence', badge: '12' },
      { name: 'Passed', badge: '1.8k' },
      { name: 'Portfolio', badge: '38' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { name: 'Market briefs', badge: 'new' },
      { name: 'Competitor radar', badge: '' },
      { name: 'Thesis library', badge: '' },
    ],
  },
  {
    label: 'Sync',
    items: [
      { name: 'Affinity', badge: 'live' },
      { name: 'Gmail', badge: 'live' },
      { name: 'Notion', badge: 'live' },
    ],
  },
]

type Deal = {
  logo: string
  name: string
  loc: string
  thesis: string
  stage: string
  amount: string
  score: number
}

const DEALS: Deal[] = [
  {
    logo: 'HX',
    name: 'Helix Bio',
    loc: 'Series A · Oxford, UK',
    thesis: 'Computational antibody design; fits your Q4 platform-bio thesis.',
    stage: 'series-a',
    amount: '$12M',
    score: 94,
  },
  {
    logo: 'OM',
    name: 'Orbital Mesh',
    loc: 'Seed · Munich, DE',
    thesis: 'LEO satellite routing; overlaps Astranis (portfolio) — flagged.',
    stage: 'seed',
    amount: '€3.5M',
    score: 89,
  },
  {
    logo: 'TN',
    name: 'Tern',
    loc: 'Seed · Zurich, CH',
    thesis: 'Climate MRV for soil carbon — thin moat, strong founders.',
    stage: 'seed',
    amount: '€2M',
    score: 76,
  },
  {
    logo: 'FS',
    name: 'Farside Labs',
    loc: 'Pre-seed · Berlin, DE',
    thesis: 'Developer tooling, pre-revenue; team ex-Datadog.',
    stage: 'pre-seed',
    amount: '€1.2M',
    score: 72,
  },
  {
    logo: 'NB',
    name: 'Nodebook AI',
    loc: 'Series A · São Paulo, BR',
    thesis: 'Outside geography mandate — auto-pass drafted.',
    stage: 'series-a',
    amount: '$8M',
    score: 22,
  },
]

type SigRow = { k: string; v: string; pip?: boolean }
const SIG_ROWS: SigRow[] = [
  { k: 'thesis match', v: '0.91', pip: true },
  { k: 'founder signal', v: 'senior · repeat', pip: true },
  { k: 'market (5y TAM)', v: '$14.2B' },
  { k: 'competitors', v: '7 tracked' },
  { k: 'portfolio conflict', v: 'none' },
  { k: 'round status', v: 'active', pip: true },
  { k: 'sources', v: '12 cited' },
]

export function Volume() {
  return (
    <section
      data-theme="dark"
      className="grad-volume relative isolate overflow-hidden min-h-screen flex items-center justify-center px-6 py-24 snap-start"
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto">
        {/* ── Section head ───────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-10 mb-10 md:mb-12">
          <div>
            <span className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-slate-500 inline-flex items-center gap-2">
              <span className="text-slate-900 font-medium">03</span>
              <span>· The product</span>
            </span>
            <h2
              className="mt-3 font-sans font-medium tracking-[-0.035em] leading-[1.05] text-slate-900"
              style={{ fontSize: 'clamp(28px, 3.4vw, 46px)' }}
            >
              A second desk for your{' '}
              <em
                className="font-heading italic font-normal"
                style={{ color: ACCENT }}
              >
                investment team.
              </em>
            </h2>
          </div>
          <p className="text-slate-700 max-w-[52ch] text-base leading-[1.55]">
            Ranked queue. One-click CRM push. Every verdict explainable, every
            source traceable. Synaptica doesn&rsquo;t make investment decisions
            — it makes sure every decision is backed by the work of a full
            associate, on every deal.
          </p>
        </div>

        {/* ── App shell (product UI mockup) ──────────────────────────── */}
        <div
          aria-hidden="true"
          className="rounded-2xl border border-white/10 overflow-hidden shadow-[0_40px_80px_rgba(10,20,50,0.25)]"
          style={{
            background: `linear-gradient(to bottom, ${NAVY_900}, ${NAVY_950})`,
          }}
        >
          {/* topbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-[11px] h-[11px] rounded-full bg-white/[0.16]"
                />
              ))}
            </div>
            <div className="hidden sm:block font-mono text-[11.5px] text-white/55 bg-white/[0.04] border border-white/[0.06] rounded-md px-3 py-1">
              app.synaptica-agents.com / inbound / this-week
            </div>
            <div className="font-mono text-[11px] text-white/55">
              fund: Helvetica Ventures
            </div>
          </div>

          {/* body */}
          <div
            className="grid grid-cols-1 lg:grid-cols-[220px_1fr_320px]"
            style={{ minHeight: 560 }}
          >
            {/* ─ sidebar ─ */}
            <aside className="border-b lg:border-b-0 lg:border-r border-white/[0.06] p-5 text-[13px] text-white/70">
              {SIDE_GROUPS.map((group, gi) => (
                <div key={gi}>
                  <div
                    className={`font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/35 px-2 mb-2 ${gi === 0 ? 'mt-0' : 'mt-[18px]'}`}
                  >
                    {group.label}
                  </div>
                  {group.items.map((item, ii) => (
                    <a
                      key={ii}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-md ${item.active ? 'bg-white/[0.06]' : ''}`}
                      style={{ color: item.active ? PAPER : 'rgba(255,255,255,0.7)' }}
                    >
                      <span>{item.name}</span>
                      <span
                        className="font-mono text-[10px]"
                        style={{
                          color: item.active ? ACCENT : 'rgba(255,255,255,0.5)',
                        }}
                      >
                        {item.badge}
                      </span>
                    </a>
                  ))}
                </div>
              ))}
            </aside>

            {/* ─ main ─ */}
            <div className="p-5 md:p-6 border-b lg:border-b-0 lg:border-r border-white/[0.06] overflow-x-auto">
              <div className="flex justify-between items-center mb-4 min-w-[540px]">
                <h4 className="m-0 text-base font-medium text-white">
                  Inbound · week of Apr 14
                </h4>
                <div className="flex gap-1 font-mono text-[11px]">
                  <span
                    className="px-2.5 py-1 rounded-md bg-white/[0.08]"
                    style={{ color: PAPER }}
                  >
                    Ranked
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-white/50">
                    All 247
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-white/50">
                    Flagged
                  </span>
                </div>
              </div>

              <div className="min-w-[540px]">
                {DEALS.map((deal, i) => (
                  <div
                    key={i}
                    className="grid gap-3.5 items-center px-2.5 py-3"
                    style={{
                      gridTemplateColumns: '24px 1.1fr .8fr 72px 110px 26px',
                      borderTop:
                        i === 0
                          ? '1px solid rgba(255,255,255,0.12)'
                          : '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div className="w-6 h-6 rounded-md bg-white/[0.08] grid place-items-center font-mono text-[10px] text-white/70">
                      {deal.logo}
                    </div>
                    <div>
                      <div className="font-medium" style={{ color: PAPER }}>
                        {deal.name}
                      </div>
                      <small className="block text-white/45 font-mono text-[10.5px] mt-0.5">
                        {deal.loc}
                      </small>
                    </div>
                    <div className="text-white/65 text-[12.5px] leading-[1.4]">
                      {deal.thesis}
                    </div>
                    <div className="font-mono text-[10.5px] text-white/50 text-right">
                      {deal.stage}
                      <br />
                      {deal.amount}
                    </div>
                    <div>
                      <div
                        className="font-mono text-[10.5px] mb-1 text-right"
                        style={{ color: ACCENT }}
                      >
                        {deal.score}
                      </div>
                      <div className="h-1.5 rounded bg-white/[0.08] relative overflow-hidden">
                        <span
                          className="absolute inset-y-0 left-0 block"
                          style={{
                            width: `${deal.score}%`,
                            background: `linear-gradient(90deg, ${NAVY_500}, ${ACCENT})`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-white/35 font-mono text-center">⋯</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ─ right panel ─ */}
            <aside className="p-5 md:p-6 bg-white/[0.015]">
              <h5 className="m-0 mb-1.5 text-sm font-medium text-white">
                Helix Bio
              </h5>
              <div className="font-mono text-[10.5px] text-white/50 uppercase tracking-[0.08em] mb-4">
                Swarm verdict · 12 sources
              </div>

              <div className="border border-white/10 rounded-[10px] p-3.5 mb-3.5 bg-white/[0.02]">
                <div className="flex justify-between items-baseline mb-2.5">
                  <b
                    className="font-medium tracking-[-0.02em]"
                    style={{ color: PAPER, fontSize: 28 }}
                  >
                    94 / 100
                  </b>
                  <span
                    className="font-mono text-[10.5px] uppercase tracking-[0.08em]"
                    style={{ color: ACCENT }}
                  >
                    Strong fit
                  </span>
                </div>
                <p className="m-0 text-[12.5px] text-white/70 leading-[1.5]">
                  Platform-bio thesis match (0.91). Lead authors cited 4× in
                  your prior IC memos. No portfolio conflict. Recommend partner
                  review within 48h — competing term sheet likely.
                </p>
              </div>

              {SIG_ROWS.map((row, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2.5 font-mono text-[11px]"
                  style={{
                    borderTop:
                      i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <span className="text-white/50">{row.k}</span>
                  <span style={{ color: PAPER }}>
                    {row.pip && (
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle"
                        style={{ background: ACCENT }}
                      />
                    )}
                    {row.v}
                  </span>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
