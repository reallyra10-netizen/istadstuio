//404 not found page
import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-24 bg-[#141414] text-white">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-950/40 border border-red-800/40 flex items-center justify-center mx-auto text-[#E50914] shadow-lg shadow-red-950/30">
          <span className="text-xl font-black tracking-wider">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Page Not Found</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            The page or movie you are looking for doesn’t exist or has been moved.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/movies"
            className="bg-[#E50914] hover:bg-[#b81d24] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-red-950/50"
          >
            Browse Movies
          </Link>
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
