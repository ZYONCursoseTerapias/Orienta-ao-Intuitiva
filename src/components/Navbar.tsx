'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-lg tracking-wide">
          ✦ Sandrä Costa
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-purple-200">
          <Link href="/#sobre" className="hover:text-white transition">Sobre</Link>
          <Link href="/#servicos" className="hover:text-white transition">Serviços</Link>
          <Link href="/login" className="hover:text-white transition">Entrar</Link>
          <Link href="/cadastro" className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition">
            Começar
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm text-purple-200">
          <Link href="/#sobre" onClick={() => setOpen(false)} className="hover:text-white">Sobre</Link>
          <Link href="/#servicos" onClick={() => setOpen(false)} className="hover:text-white">Serviços</Link>
          <Link href="/login" onClick={() => setOpen(false)} className="hover:text-white">Entrar</Link>
          <Link href="/cadastro" onClick={() => setOpen(false)} className="bg-purple-600 text-white px-4 py-2 rounded-lg text-center">
            Começar
          </Link>
        </div>
      )}
    </nav>
  );
}
