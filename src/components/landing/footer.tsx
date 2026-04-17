export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8 px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-slate-500 text-xs font-sans">
          &copy; 2026 Synaptica. All rights reserved.
        </span>
        <div className="flex items-center gap-6">
          <a href="#" className="text-slate-500 text-xs font-sans hover:text-slate-900 transition-colors">Privacy</a>
          <a href="#" className="text-slate-500 text-xs font-sans hover:text-slate-900 transition-colors">Terms</a>
          <a href="mailto:hello@synaptica.ai" className="text-slate-500 text-xs font-sans hover:text-slate-900 transition-colors">Contact</a>
          <a href="#" className="text-slate-500 text-xs font-sans hover:text-slate-900 transition-colors">Imprint</a>
        </div>
      </div>
    </footer>
  )
}
