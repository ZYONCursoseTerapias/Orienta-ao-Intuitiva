import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { comparePasswords, signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'E-mail e senha são obrigatórios' }, { status: 400 });
    }

    const result = await pool.query(
      `SELECT id, full_name, email, password_hash, whatsapp, birth_date, birth_time, birth_place, whatsapp_notifications, created_at
       FROM users WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
    }

    const user = result.rows[0];
    const valid = await comparePasswords(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
    }

    const { password_hash: _, ...safeUser } = user;
    const token = signToken({ userId: user.id, email: user.email });

    return NextResponse.json({ token, user: safeUser });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}
