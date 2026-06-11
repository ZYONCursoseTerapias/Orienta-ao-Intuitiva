import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { withAuth } from '@/lib/middleware';

export const GET = withAuth(async (_req: NextRequest, userId: number) => {
  const result = await pool.query(
    `SELECT id, full_name, email, whatsapp, birth_date, birth_time, birth_place, whatsapp_notifications, created_at
     FROM users WHERE id = $1`,
    [userId]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
  }

  return NextResponse.json({ user: result.rows[0] });
});
