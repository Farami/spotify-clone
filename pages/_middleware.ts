import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest & NextApiRequest) {
  const { pathname } = req.nextUrl;

  // token exists when user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
