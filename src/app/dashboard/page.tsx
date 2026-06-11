'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  full_name: string;
  email: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }

    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => { if (d.user) setUser(d.user); else router.push('/login'); })
      .catch(() => router.push('/login'));
  }, [router]);

  function logout() {
    localStorage.removeItem('token');
    router.push('/');
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0d0918] flex items-center justify-center">
        <div className="text-purple-300 text-lg animate-pulse">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0918] px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-purple-400 text-sm">Bem-vinda,</p>
            <h1 className="text-2xl font-bold text-white">{user.full_name.split(' ')[0]} ✦</h1>
          </div>
          <button onClick={logout} className="text-sm text-purple-400 hover:text-white transition underline">
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '♈', title: 'Astrologia', status: 'Em breve' },
            { icon: '✦', title: 'Numerologia', status: 'Em breve' },
            { icon: '🌙', title: 'Tarot do Dia', status: 'Em breve' },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center opacity-60 cursor-not-allowed"
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <h3 className="text-white font-semibold mb-1">{card.title}</h3>
              <p className="text-purple-400 text-xs">{card.status}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-purple-500 text-sm mt-12">
          Análise diária personalizada estará disponível em breve.
        </p>
      </div>
    </div>
  );
}
