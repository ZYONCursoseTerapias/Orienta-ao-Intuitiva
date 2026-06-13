'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import Button from '@/components/Button';
import TimeInput from '@/components/TimeInput';
import CityAutocomplete from '@/components/CityAutocomplete';
import { normalizeWhatsApp, isValidEmail, isValidTime } from '@/lib/validation';

interface FormData {
  full_name: string;
  email: string;
  password: string;
  whatsapp: string;
  birth_date: string;
  birth_time: string;
  birth_location: string;
}

type FieldErrors = Partial<Record<keyof FormData, string>>;

export default function CadastroPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    full_name: '',
    email: '',
    password: '',
    whatsapp: '',
    birth_date: '',
    birth_time: '',
    birth_location: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const next: FieldErrors = {};

    if (!form.full_name.trim())
      next.full_name = 'Nome completo é obrigatório';

    if (!form.email.trim())
      next.email = 'E-mail é obrigatório';
    else if (!isValidEmail(form.email))
      next.email = 'E-mail inválido';

    if (!form.password)
      next.password = 'Senha é obrigatória';
    else if (form.password.length < 8)
      next.password = 'Mínimo 8 caracteres';

    if (!form.whatsapp.trim())
      next.whatsapp = 'WhatsApp é obrigatório';
    else if (!normalizeWhatsApp(form.whatsapp))
      next.whatsapp = 'Formato inválido. Ex: (11) 99999-9999 ou +5511999999999';

    if (!form.birth_date)
      next.birth_date = 'Data de nascimento é obrigatória';

    if (!form.birth_time)
      next.birth_time = 'Hora de nascimento é obrigatória';
    else if (!isValidTime(form.birth_time))
      next.birth_time = 'Hora inválida. Use HH:MM (ex: 23:55)';

    if (!form.birth_location.trim())
      next.birth_location = 'Cidade de nascimento é obrigatória';

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError('');

    try {
      const payload = {
        ...form,
        whatsapp: normalizeWhatsApp(form.whatsapp) ?? form.whatsapp,
      };

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
    <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ background: '#F5F3F0' }}>
      <div className="relative z-10 w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="text-sm hover:opacity-70 transition" style={{ color: '#1E6F30' }}>← Voltar</Link>
          <h1 className="text-3xl font-bold mt-4 mb-2" style={{ color: '#1E6F30' }}>Criar sua conta</h1>
          <p className="text-sm" style={{ color: '#98BE98' }}>Preencha seus dados para acessar sua Orientação Intuitiva diária</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl p-8 space-y-5 border" style={{ background: '#ffffff', borderColor: '#c8dfc8' }}>
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

          {/* 2. E-mail */}
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
            label="WhatsApp *"
            type="tel"
            placeholder="(11) 99999-9999"
            value={form.whatsapp}
            onChange={(e) => set('whatsapp', e.target.value)}
            error={errors.whatsapp}
            hint="+55 (DDD) número — será normalizado automaticamente"
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
          <TimeInput
            label="Hora de Nascimento"
            value={form.birth_time}
            onChange={(v) => set('birth_time', v)}
            error={errors.birth_time}
            required
          />

          {/* 6. Cidade de Nascimento */}
          <CityAutocomplete
            label="Cidade de Nascimento"
            value={form.birth_location}
            onChange={(v) => set('birth_location', v)}
            error={errors.birth_location}
            required
          />

          {apiError && (
            <p className="text-sm text-red-400 text-center bg-red-500/10 rounded-lg py-2 px-4">
              {apiError}
            </p>
          )}

          <Button type="submit" loading={loading}>
            Criar minha conta
          </Button>

          <p className="text-center text-sm" style={{ color: '#98BE98' }}>
            Já tem conta?{' '}
            <Link href="/login" className="underline underline-offset-2 hover:opacity-70" style={{ color: '#1E6F30' }}>
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
