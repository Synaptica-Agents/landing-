import Image from 'next/image'

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 p-6">
      <a href="#">
        <Image
          src="/Logo Synaptica Navy.png"
          alt="Synaptica"
          width={200}
          height={56}
          className="h-14 w-auto"
          style={{ filter: 'brightness(0) invert(1)' }}
          priority
        />
      </a>
    </header>
  )
}
