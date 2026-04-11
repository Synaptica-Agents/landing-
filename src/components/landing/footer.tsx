import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a href="#">
            <Image
              src="/Logo Synaptica.png"
              alt="Synaptica"
              width={120}
              height={28}
              className="h-7 w-auto"
              style={{ mixBlendMode: 'screen' }}
            />
          </a>
          <span className="text-neutral-500 text-xs font-sans">
            &copy; 2026 Synaptica. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-neutral-500 text-xs font-sans hover:text-white transition-colors">Privacy</a>
          <a href="#" className="text-neutral-500 text-xs font-sans hover:text-white transition-colors">Terms</a>
          <a href="mailto:hello@synaptica.ai" className="text-neutral-500 text-xs font-sans hover:text-white transition-colors">Contact</a>
          <a href="#" className="text-neutral-500 text-xs font-sans hover:text-white transition-colors">Imprint</a>
        </div>
      </div>
    </footer>
  )
}
