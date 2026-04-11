import Image from 'next/image'

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 p-6">
      <a href="#">
        <Image
          src="/Logo Synaptica.png"
          alt="Synaptica"
          width={160}
          height={44}
          className="h-11 w-auto"
          style={{ mixBlendMode: 'screen' }}
          priority
        />
      </a>
    </header>
  )
}
