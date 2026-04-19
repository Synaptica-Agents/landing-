export function Footer() {
  return (
    <footer data-theme="dark" className="grad-footer border-t border-white/10 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-white/40 text-xs font-sans">
          &copy; 2026 Synaptica. All rights reserved.
        </span>
        <div className="flex items-center gap-6">
          <a href="#" className="text-white/40 text-xs font-sans hover:text-white transition-colors">Privacy</a>
          <a href="#" className="text-white/40 text-xs font-sans hover:text-white transition-colors">Terms</a>
          <a href="mailto:hello@synaptica.ai" className="text-white/40 text-xs font-sans hover:text-white transition-colors">Contact</a>
          <a href="#" className="text-white/40 text-xs font-sans hover:text-white transition-colors">Imprint</a>
        </div>
      </div>
    </footer>
  )
}
