'use client';

//app error boundary
import React from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-24 bg-[#141414] text-white">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-950/40 border border-red-800/40 flex items-center justify-center mx-auto text-[#E50914] shadow-lg shadow-red-950/30">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Something Went Wrong</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            An unexpected error occurred while loading this page. You can try refreshing or return to the homepage.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="bg-[#E50914] hover:bg-[#b81d24] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-red-950/50"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="bg-neutral-800 hover:bg-neutral-700 text-gray-200 hover:text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
