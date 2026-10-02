//footer
import React from 'react';
import Link from 'next/link';
import BrandLogo from '@/components/brand/BrandLogo';

export default function FooterComponents() {
  return (
    <footer className="bg-[#0b0b0b] border-t border-neutral-800 text-gray-400 text-sm mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* brand and info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group">
              <BrandLogo size="md" className="group-hover:scale-105 transition-transform duration-200" />
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              Your ultimate destination for discovering trending movies, reviews, trailers, and ratings.
            </p>
          </div>

          {/* navigation links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#E50914] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/movies" className="hover:text-[#E50914] transition-colors">
                  All Movies
                </Link>
              </li>
              <li>
                <Link href="/movies?category=popular" className="hover:text-[#E50914] transition-colors">
                  Popular Movies
                </Link>
              </li>
              <li>
                <Link href="/movies?category=top_rated" className="hover:text-[#E50914] transition-colors">
                  Top Rated
                </Link>
              </li>
              <li>
                <Link href="/movies?category=upcoming" className="hover:text-[#E50914] transition-colors">
                  Upcoming Releases
                </Link>
              </li>
            </ul>
          </div>

          {/* movie categories */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">
              Genres
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/movies?genre=action-adventure"
                  className="text-gray-400 hover:text-[#E50914] transition-colors inline-block"
                >
                  Action &amp; Adventure
                </Link>
              </li>
              <li>
                <Link
                  href="/movies?genre=animation-family"
                  className="text-gray-400 hover:text-[#E50914] transition-colors inline-block"
                >
                  Animation &amp; Family
                </Link>
              </li>
              <li>
                <Link
                  href="/movies?genre=comedy-romance"
                  className="text-gray-400 hover:text-[#E50914] transition-colors inline-block"
                >
                  Comedy &amp; Romance
                </Link>
              </li>
              <li>
                <Link
                  href="/movies?genre=scifi-fantasy"
                  className="text-gray-400 hover:text-[#E50914] transition-colors inline-block"
                >
                  Sci-Fi &amp; Fantasy
                </Link>
              </li>
              <li>
                <Link
                  href="/movies?genre=horror-thriller"
                  className="text-gray-400 hover:text-[#E50914] transition-colors inline-block"
                >
                  Horror &amp; Thriller
                </Link>
              </li>
            </ul>
          </div>

          {/* platform info */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">
              Cinema Hub
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Stream official high-definition trailers, browse top rated releases, and stay on top of the latest box office trends.
            </p>
          </div>

        </div>

        {/* copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} ISTAD Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-gray-300 transition-colors">
              About Us
            </Link>
            <Link href="/movies" className="hover:text-gray-300 transition-colors">
              Browse Movies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
