'use client';

//navbar
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BrandLogo from '@/components/brand/BrandLogo';
import { Movie } from '@/types/movie';
import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from '@clerk/nextjs';

export default function NavbarComponents() {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [liveResults, setLiveResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  //handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/movies?search=${encodeURIComponent(search.trim())}`);
      setShowDropdown(false);
      setMenuOpen(false);
    }
  };

  //live search for movies whose title starts with input query
  useEffect(() => {
    if (!search.trim()) {
      setLiveResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const apiKey = '0e42297fbdb49b4a24879c7d54325351';
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search.trim())}&api_key=${apiKey}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const raw: Movie[] = data.results || [];
          const q = search.trim().toLowerCase();

          // Prioritize movies whose title starts with user input
          const directStarts = raw.filter((m) =>
            (m.title || '').toLowerCase().startsWith(q)
          );
          const articleStarts = raw.filter((m) => {
            const t = (m.title || '').toLowerCase();
            const withoutArticle = t.replace(/^(the|a|an)\s+/i, '');
            return !t.startsWith(q) && withoutArticle.startsWith(q);
          });
          const wordStarts = raw.filter((m) => {
            const t = (m.title || '').toLowerCase();
            const words = t.split(/\s+/);
            return !t.startsWith(q) && words.some((w) => w.startsWith(q));
          });

          const matched = [...directStarts, ...articleStarts, ...wordStarts];
          const seen = new Set<number>();
          const unique = matched.filter((m) => {
            if (seen.has(m.id)) return false;
            seen.add(m.id);
            return true;
          });

          setLiveResults(unique.length > 0 ? unique.slice(0, 6) : raw.slice(0, 6));
          setShowDropdown(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [search]);



  return (
    <header className="sticky top-0 z-50 bg-[#141414]/95 backdrop-blur-md border-b border-neutral-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* logo */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 shrink-0">
            <Link href="/" className="flex items-center shrink-0 group py-1">
              <BrandLogo size="md" className="group-hover:scale-105 transition-transform duration-200" />
            </Link>

            {/* desktop links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link
                href="/"
                className="text-gray-200 hover:text-[#E50914] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/faq"
                className="text-gray-200 hover:text-[#E50914] transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/request-drama"
                className="text-gray-200 hover:text-[#E50914] transition-colors"
              >
                Request Drama
              </Link>
              <Link
                href="/about"
                className="text-gray-200 hover:text-[#E50914] transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-200 hover:text-[#E50914] transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* search bar and clerk auth */}
          <div className="hidden sm:flex items-center gap-3">
            <div ref={searchContainerRef} className="relative">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={search}
                  onFocus={() => {
                    if (search.trim() && liveResults.length > 0) setShowDropdown(true);
                  }}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-40 lg:w-56 bg-neutral-900 border border-neutral-700 rounded-full py-1.5 pl-4 pr-10 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#E50914] transition-all"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E50914]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>

              {/* Live search results matching starting text */}
              {showDropdown && search.trim() && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-[#181818] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-50 py-2">
                  <div className="px-3.5 py-1.5 border-b border-neutral-800/80 flex items-center justify-between text-[11px] text-gray-400 font-semibold">
                    <span>Titles starting with &ldquo;{search.trim()}&rdquo;</span>
                    {isSearching && (
                      <span className="w-3 h-3 border-2 border-[#E50914] border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>

                  {liveResults.length === 0 && !isSearching ? (
                    <div className="p-4 text-center text-xs text-gray-400">
                      No movies found starting with &ldquo;{search.trim()}&rdquo;
                    </div>
                  ) : (
                    <div className="max-h-80 overflow-y-auto divide-y divide-neutral-800/60">
                      {liveResults.map((movie) => {
                        const title = movie.title || '';
                        const lowerTitle = title.toLowerCase();
                        const lowerQ = search.trim().toLowerCase();
                        const matchIdx = lowerTitle.indexOf(lowerQ);

                        return (
                          <button
                            key={movie.id}
                            type="button"
                            onClick={() => {
                              router.push(`/movies/${movie.id}`);
                              setShowDropdown(false);
                              setSearch('');
                            }}
                            className="w-full px-3.5 py-2.5 flex items-center gap-3 text-left hover:bg-neutral-900 transition-colors group"
                          >
                            <div className="w-9 h-12 rounded bg-neutral-900 overflow-hidden shrink-0 relative border border-neutral-800">
                              {movie.poster_path ? (
                                <Image
                                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                  alt={title}
                                  fill
                                  sizes="36px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500 font-bold">
                                  🎬
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-white group-hover:text-[#E50914] transition-colors truncate">
                                {matchIdx !== -1 ? (
                                  <>
                                    {title.slice(0, matchIdx)}
                                    <span className="text-[#E50914] font-black underline decoration-red-500/50">
                                      {title.slice(matchIdx, matchIdx + search.trim().length)}
                                    </span>
                                    {title.slice(matchIdx + search.trim().length)}
                                  </>
                                ) : (
                                  title
                                )}
                              </p>
                              <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5">
                                <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
                                <span>&bull;</span>
                                <span className="text-amber-400 font-semibold">★ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div className="p-2 border-t border-neutral-800 bg-neutral-950/80">
                    <button
                      type="button"
                      onClick={(e) => {
                        handleSearch(e);
                        setShowDropdown(false);
                      }}
                      className="w-full text-center py-1.5 text-xs text-[#E50914] hover:text-white font-bold transition-colors"
                    >
                      See all search results for &ldquo;{search}&rdquo; →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* clerk authentication */}
            <Show when="signed-out">
              <div className="flex items-center gap-2">
                <SignInButton mode="modal">
                  <button className="text-gray-200 hover:text-white hover:bg-neutral-800/80 text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full transition-all">
                    Log In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-[#E50914] hover:bg-[#b81d24] text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-lg shadow-red-950/60 transition-all duration-200 hover:scale-105 active:scale-95">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </Show>

            <Show when="signed-in">
              <div className="flex items-center gap-3 pl-2">
                <UserButton />
              </div>
            </Show>
          </div>

          {/* mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <Show when="signed-in">
              <UserButton />
            </Show>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* mobile dropdown */}
        {menuOpen && (
          <div className="sm:hidden border-t border-neutral-800 py-4 space-y-3">
            <div ref={mobileSearchRef} className="px-2 relative">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={search}
                  onFocus={() => {
                    if (search.trim() && liveResults.length > 0) setShowDropdown(true);
                  }}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-md py-2 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#E50914]"
                />
              </form>

              {/* Mobile live search dropdown */}
              {showDropdown && search.trim() && (
                <div className="mt-2 bg-[#181818] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden py-2">
                  <div className="px-3 py-1.5 border-b border-neutral-800/80 flex items-center justify-between text-[11px] text-gray-400 font-semibold">
                    <span>Titles starting with &ldquo;{search.trim()}&rdquo;</span>
                  </div>
                  {liveResults.length === 0 && !isSearching ? (
                    <div className="p-3 text-center text-xs text-gray-400">
                      No movies found starting with &ldquo;{search.trim()}&rdquo;
                    </div>
                  ) : (
                    <div className="max-h-60 overflow-y-auto divide-y divide-neutral-800/60">
                      {liveResults.map((movie) => {
                        const title = movie.title || '';
                        const lowerTitle = title.toLowerCase();
                        const lowerQ = search.trim().toLowerCase();
                        const matchIdx = lowerTitle.indexOf(lowerQ);

                        return (
                          <button
                            key={movie.id}
                            type="button"
                            onClick={() => {
                              router.push(`/movies/${movie.id}`);
                              setShowDropdown(false);
                              setMenuOpen(false);
                              setSearch('');
                            }}
                            className="w-full px-3 py-2 flex items-center gap-2.5 text-left hover:bg-neutral-900 transition-colors"
                          >
                            <span className="text-xs font-bold text-white truncate flex-1">
                              {matchIdx !== -1 ? (
                                <>
                                  {title.slice(0, matchIdx)}
                                  <span className="text-[#E50914] font-black underline decoration-red-500/50">
                                    {title.slice(matchIdx, matchIdx + search.trim().length)}
                                  </span>
                                  {title.slice(matchIdx + search.trim().length)}
                                </>
                              ) : (
                                title
                              )}
                            </span>
                            <span className="text-[10px] text-gray-400 shrink-0">
                              {movie.release_date?.split('-')[0] || ''}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-2 px-2 text-sm">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-gray-200 hover:text-[#E50914] py-1"
              >
                Home
              </Link>
              <Link
                href="/faq"
                onClick={() => setMenuOpen(false)}
                className="text-gray-200 hover:text-[#E50914] py-1"
              >
                FAQ
              </Link>
              <Link
                href="/request-drama"
                onClick={() => setMenuOpen(false)}
                className="text-gray-200 hover:text-[#E50914] py-1"
              >
                Request Drama
              </Link>
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="text-gray-200 hover:text-[#E50914] py-1"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="text-gray-200 hover:text-[#E50914] py-1"
              >
                Contact
              </Link>

              {/* mobile clerk auth */}
              <Show when="signed-out">
                <div className="pt-2 flex flex-col gap-2">
                  <SignInButton mode="modal">
                    <button className="w-full text-center bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-2.5 rounded-lg transition-colors">
                      Log In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="w-full text-center bg-[#E50914] hover:bg-[#b81d24] text-white font-bold py-2.5 rounded-lg shadow-lg shadow-red-950/60 transition-all">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </Show>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
