'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import Button from '@/components/Button';

interface FormData {
  full_name: string;
  email: string;
  password: string;
  whatsapp: string;
  birth_date: string;
  birth_time: string;
  birth_place: string;
  whatsapp_notifications: boolean;
}

interface FieldErrors {
  [key: string]: string;
}

export default function CadastroPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    full_name: '',
    email: '',
    password: '',
    whatsapp: '',
    birth_date: '',
    birth_time: '',
    birth_place: '',
    whatsapp_notifications: false,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  function set(field: keyof FormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  }

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!form.full_name.trim()) next.full_name = 'Nome é obrigatório';
    if (!form.email.trim()) next.email = 'E-mail é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'E-mail inválido';
    if (!form.password) next.password = 'Senha é obrigatória';
    else if (form.password.length < 8) next.password = 'Mínimo 8 caracteres';
    if (!form.birth_date) next.birth_date = 'Data de nascimento é obrigatória';
    if (form.whatsapp && !/^\+55\d{10,11}$/.test(form.whatsapp.replace(/\s/g, ''))) {
      next.whatsapp = 'Formato: +55 (DDD) 9XXXX-XXXX';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.field) setErrors({ [data.field]: data.message });
        else setApiError(data.message || 'Erro ao criar conta');
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
    <div className="min-h-screen bg-[#0d0918] flex items-center justify-center px-4 py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/60 via-transparent to-indigo-950/40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="text-purple-300 text-sm hover:text-white transition">← Voltar</Link>
          <h1 className="text-3xl font-bold text-white mt-4 mb-2">Criar sua conta</h1>
          <p className="text-purple-300 text-sm">Preencha seus dados para acessar sua análise diária</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
          {/* 1. Nome Completo */}
          <Input
            label="Nome Completo *"
            type="text"
            placeholder="Seu nome completo"
            value={form.full_name}
            onChange={(e) => set('full_name', e.target.value)}
            error={errors.full_name}
            autoComplete="name"
          />

          {/* 2. Email */}
          <Input
            label="E-mail *"
            type="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            error={errors.email}
            autoComplete="email"
          />

          {/* Senha */}
          <Input
            label="Senha *"
            type="password"
            placeholder="Mínimo 8 caracteres"
            value={form.password}
            onChange={(e) => set('password', e.target.value)}
            error={errors.password}
            autoComplete="new-password"
          />

          {/* 3. WhatsApp */}
          <Input
            label="WhatsApp"
            type="tel"
            placeholder="+55 11 99999-9999"
            value={form.whatsapp}
            onChange={(e) => set('whatsapp', e.target.value)}
            error={errors.whatsapp}
            autoComplete="tel"
          />

          {/* 4. Data de Nascimento */}
          <Input
            label="Data de Nascimento *"
            type="date"
            value={form.birth_date}
            onChange={(e) => set('birth_date', e.target.value)}
            error={errors.birth_date}
          />

          {/* 5. Hora de Nascimento */}
          <Input
            label="Hora de Nascimento"
            type="time"
            value={form.birth_time}
            onChange={(e) => set('birth_time', e.target.value)}
            error={errors.birth_time}
          />

          {/* 6. Local de Nascimento */}
          <Input
            label="Local de Nascimento"
            type="text"
            placeholder="Cidade, Estado, País"
            value={form.birth_place}
            onChange={(e) => set('birth_place', e.target.value)}
            error={errors.birth_place}
          />

          {/* 7. Checkbox WhatsApp */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.whatsapp_notifications}
              onChange={(e) => set('whatsapp_notifications', e.target.checked)}
              className="mt-1 w-4 h-4 accent-purple-500 cursor-pointer"
            />
            <span className="text-sm text-purple-200 leading-relaxed">
              Aceitar notificações via WhatsApp com análises e mensagens diárias de Sandrä Costa
            </span>
          </label>

          {apiError && (
            <p className="text-sm text-red-400 text-center bg-red-500/10 rounded-lg py-2 px-4">{apiError}</p>
          )}

          <Button type="submit" loading={loading}>
            Criar minha conta
          </Button>

          <p className="text-center text-sm text-purple-400">
            Já tem conta?{' '}
            <Link href="/login" className="text-purple-300 hover:text-white underline underline-offset-2">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
