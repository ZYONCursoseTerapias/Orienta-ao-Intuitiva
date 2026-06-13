'use client';

// TODO: Substituir com análise diária integrada (PROMPT 2+)
// Implementar: cálculo energético do dia, leitura de Luz e Sombra,
// conselho personalizado baseado nos dados de nascimento do usuário.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';

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
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F5F3F0' }}>
        <div className="text-lg animate-pulse" style={{ color: '#98BE98' }}>Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12" style={{ background: '#F5F3F0' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-sm" style={{ color: '#98BE98' }}>Bem-vinda,</p>
            <h1 className="text-2xl font-bold" style={{ color: '#1E6F30' }}>{user.full_name.split(' ')[0]} ✦</h1>
          </div>
          <button onClick={logout} className="text-sm underline hover:opacity-70 transition" style={{ color: '#1E6F30' }}>
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '✦', title: 'Análise Energética', status: 'Em breve' },
            { icon: '🌟', title: 'Leitura do Dia', status: 'Em breve' },
            { icon: '💫', title: 'Conselho Personalizado', status: 'Em breve' },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl p-6 text-center opacity-60 cursor-not-allowed border"
              style={{ background: '#ffffff', borderColor: '#c8dfc8' }}
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <h3 className="font-semibold mb-1" style={{ color: '#1E6F30' }}>{card.title}</h3>
              <p className="text-xs" style={{ color: '#98BE98' }}>{card.status}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm mt-12" style={{ color: '#98BE98' }}>
          Sua leitura completa do dia estará disponível em breve.
        </p>
      </div>
    </div>
  );
}
