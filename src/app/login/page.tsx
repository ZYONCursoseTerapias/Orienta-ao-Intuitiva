'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = 'E-mail é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'E-mail inválido';
    if (!password) next.password = 'Senha é obrigatória';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setApiError(data.message || 'Credenciais inválidas');
        return;
      }

      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch {
      setApiError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0918] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/60 via-transparent to-indigo-950/40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-purple-300 text-sm hover:text-white transition">← Voltar</Link>
          <div className="text-4xl mt-4 mb-2">✦</div>
          <h1 className="text-3xl font-bold text-white mb-2">Bem-vinda de volta</h1>
          <p className="text-purple-300 text-sm">Entre para acessar sua análise diária</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
            error={errors.email}
            autoComplete="email"
          />

          <Input
            label="Senha"
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
            error={errors.password}
            autoComplete="current-password"
          />

          {apiError && (
            <p className="text-sm text-red-400 text-center bg-red-500/10 rounded-lg py-2 px-4">{apiError}</p>
          )}

          <Button type="submit" loading={loading}>
            Entrar
          </Button>

          <p className="text-center text-sm text-purple-400">
            Não tem conta?{' '}
            <Link href="/cadastro" className="text-purple-300 hover:text-white underline underline-offset-2">
              Criar conta gratuita
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
