import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const cookie = req.headers.get('cookie');

  const url = req.nextUrl.clone();

  if (cookie && url.pathname.includes('/signin')) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
