import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
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
          <span className="text-foreground/50 text-xs font-sans">
            &copy; 2026 Synaptica. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-foreground/50 text-xs font-sans hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="text-foreground/50 text-xs font-sans hover:text-foreground transition-colors">Terms</a>
          <a href="mailto:hello@synaptica.ai" className="text-foreground/50 text-xs font-sans hover:text-foreground transition-colors">Contact</a>
          <a href="#" className="text-foreground/50 text-xs font-sans hover:text-foreground transition-colors">Imprint</a>
        </div>
      </div>
    </footer>
  )
}
