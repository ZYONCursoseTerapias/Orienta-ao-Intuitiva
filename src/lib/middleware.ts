import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './auth';

export function withAuth(handler: (req: NextRequest, userId: number) => Promise<NextResponse>) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Token não fornecido' }, { status: 401 });
    }

    try {
      const token = authHeader.slice(7);
      const { userId } = verifyToken(token);
      return handler(req, userId);
    } catch {
      return NextResponse.json({ message: 'Token inválido ou expirado' }, { status: 401 });
    }
  };
}
