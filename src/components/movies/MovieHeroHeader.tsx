'use client';

//header hero
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';

export type MovieHeroProps = {
  movie?: Movie | null;
  movies?: Movie[];
};

const TMDB_GENRES: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

export default function MovieHeroHeader({ movie, movies }: MovieHeroProps) {
  //movie list
  const movieList = movies && movies.length > 0 ? movies : movie ? [movie] : [];

  //current slide index
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  //touch and drag state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isDragging = useRef(false);

  //next slide
  const nextSlide = useCallback(() => {
    if (movieList.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % movieList.length);
  }, [movieList.length]);

  //prev slide
  const prevSlide = useCallback(() => {
    if (movieList.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + movieList.length) % movieList.length);
  }, [movieList.length]);

  //auto change banner timer
  useEffect(() => {
    if (movieList.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [movieList.length, isPaused, nextSlide]);

  //touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 50) {
        nextSlide();
      } else if (diff < -50) {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  //mouse swipe handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsPaused(true);
    touchStartX.current = e.clientX;
    touchEndX.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      isDragging.current = false;
      setIsPaused(false);
      if (touchStartX.current !== null && touchEndX.current !== null) {
        const diff = touchStartX.current - touchEndX.current;
        if (diff > 50) {
          nextSlide();
        } else if (diff < -50) {
          prevSlide();
        }
      }
      touchStartX.current = null;
      touchEndX.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
    }
    setIsPaused(false);
  };

  if (movieList.length === 0) {
    return null;
  }

  const currentMovie = movieList[currentIndex];

  //image url
  const backdropUrl = currentMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`
    : currentMovie.poster_path
    ? `https://image.tmdb.org/t/p/original${currentMovie.poster_path}`
    : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1280&auto=format&fit=crop&q=80';

  const releaseYear = currentMovie.release_date ? currentMovie.release_date.split('-')[0] : '';
  const primaryGenre =
    currentMovie.genre_ids && currentMovie.genre_ids.length > 0 && TMDB_GENRES[currentMovie.genre_ids[0]]
      ? TMDB_GENRES[currentMovie.genre_ids[0]]
      : null;

  return (
    <div
      className="relative w-full h-[58vh] min-h-[440px] max-h-[640px] bg-black overflow-hidden flex items-end select-none group cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* backdrop image animation */}
      {movieList.map((m, idx) => {
        const bgUrl = m.backdrop_path
          ? `https://image.tmdb.org/t/p/original${m.backdrop_path}`
          : m.poster_path
          ? `https://image.tmdb.org/t/p/original${m.poster_path}`
          : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1280&auto=format&fit=crop&q=80';

        const isActive = idx === currentIndex;

        return (
          <div
            key={m.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src={bgUrl}
              alt={m.title || 'Movie Banner'}
              fill
              priority={idx === 0}
              className={`object-cover object-center transition-transform duration-7000 ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        );
      })}

      {/* gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-black/40 to-transparent z-[1]" />

      {/* hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
        <div key={currentMovie.id} className="max-w-2xl space-y-4 animate-fade-in transition-all duration-500">
          {/* badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-[#E50914] text-white text-xs font-black px-2.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
              Featured
            </span>
            <span className="text-amber-400 font-bold text-xs sm:text-sm flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded border border-amber-500/20 backdrop-blur-sm">
              ★ {currentMovie.vote_average ? currentMovie.vote_average.toFixed(1) : 'N/A'}
            </span>
            {releaseYear && (
              <span className="text-gray-300 text-xs sm:text-sm bg-black/60 px-2 py-0.5 rounded border border-neutral-700 backdrop-blur-sm">
                {releaseYear}
              </span>
            )}
            {primaryGenre && (
              <span className="text-[#E50914] text-xs font-semibold bg-black/60 px-2.5 py-0.5 rounded border border-[#E50914]/30 backdrop-blur-sm">
                {primaryGenre}
              </span>
            )}
          </div>

          {/* title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-lg line-clamp-2">
            {currentMovie.title}
          </h1>

          {/* overview */}
          <p className="text-gray-300 text-xs sm:text-sm md:text-base line-clamp-3 leading-relaxed drop-shadow">
            {currentMovie.overview}
          </p>

          {/* action buttons */}
          <div className="pt-2 flex items-center gap-4">
            <Link
              href={`/movies/${currentMovie.id}`}
              className="inline-flex items-center gap-2 bg-[#E50914] hover:bg-[#b81d24] text-white text-sm font-bold px-6 py-3 rounded shadow-lg shadow-red-950/60 transition-all hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              View Movie Details
            </Link>

            <Link
              href="/movies"
              className="inline-flex items-center gap-2 bg-neutral-800/80 hover:bg-neutral-700/80 backdrop-blur-md text-white text-sm font-semibold px-5 py-3 rounded border border-neutral-600 transition-all hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Browse All
            </Link>
          </div>
        </div>
      </div>

      {/* prev slide button */}
      {movieList.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          aria-label="Previous Banner"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* next slide button */}
      {movieList.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          aria-label="Next Banner"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* banner pagination dots */}
      {movieList.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {movieList.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(dotIndex);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIndex === currentIndex ? 'w-8 bg-[#E50914]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${dotIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
