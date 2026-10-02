//clerk proxy middleware
import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse, type NextRequest, type NextFetchEvent } from 'next/server';

const publishableKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  'pk_test_YnJhdmUtc3VuYmlyZC0yMDc1LmNsZXJrLmFjY291bnRzLmRldiQ';

const secretKey =
  process.env.CLERK_SECRET_KEY ||
  'sk_test_OyUfBsf7truauBDUsJOdItctQh9f9zTu9t3qt6F5Kb';

let handler: any = null;
try {
  handler = clerkMiddleware({
    publishableKey,
    secretKey,
  });
} catch (e) {
  console.error('Failed to initialize clerkMiddleware:', e);
}

export default async function proxy(req: NextRequest, ev: NextFetchEvent) {
  try {
    if (handler) {
      return await handler(req, ev);
    }
  } catch (err) {
    console.error('Clerk proxy execution error:', err);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/:path*',
  ],
};
