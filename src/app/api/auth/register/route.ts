import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { hashPassword, signToken } from '@/lib/auth';
import { UserRegisterPayload } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body: UserRegisterPayload & { password: string } = await req.json();
    const { full_name, email, password, whatsapp, birth_date, birth_time, birth_place, whatsapp_notifications } = body;

    if (!full_name || !email || !password || !birth_date) {
      return NextResponse.json({ message: 'Campos obrigatórios faltando' }, { status: 400 });
    }

    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ message: 'E-mail já cadastrado', field: 'email' }, { status: 409 });
    }

    const password_hash = await hashPassword(password);

    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, whatsapp, birth_date, birth_time, birth_place, whatsapp_notifications)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, full_name, email, whatsapp, birth_date, birth_time, birth_place, whatsapp_notifications, created_at`,
      [full_name, email, password_hash, whatsapp || null, birth_date, birth_time || null, birth_place || null, whatsapp_notifications ?? false]
    );

    const user = result.rows[0];
    const token = signToken({ userId: user.id, email: user.email });

    return NextResponse.json({ token, user }, { status: 201 });
  } catch (err) {
    console.error('Register error:', err);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}
