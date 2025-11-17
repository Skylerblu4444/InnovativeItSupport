// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextFetchEvent } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  const protectedPaths = ['/portal', '/admin', '/profile', '/invoices', '/api/stripe/checkout', '/api/invoices'];
  const pathname = req.nextUrl.pathname;

  // If the request is to a protected path and there is no session — redirect to /signin
  const requiresAuth = protectedPaths.some((p) => pathname.startsWith(p));
  if (requiresAuth && !session) {
    const signInUrl = new URL('/signin', req.url);
    signInUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return res;
}

export const config = {
  matcher: ['/portal/:path*', '/admin/:path*', '/profile/:path*', '/invoices/:path*', '/api/secure/:path*']
};
