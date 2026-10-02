'use client';

//movie detail container
import React, { useEffect, useState } from 'react';
import MovieDetailComponent, { MovieDetailType } from './MovieDetailComponent';

type MovieIDProps = {
  id: number;
};

export default function MovieListDetailComponent(props: MovieIDProps) {
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //fetch all real movie details from tmdb api
  useEffect(() => {
    async function fetchAllMovieDetails() {
      setLoading(true);
      setError(null);
      try {
        const apiKey = '0e42297fbdb49b4a24879c7d54325351';

        //fetch detail, videos, credits simultaneously
        const [detailRes, videoRes, creditRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${props.id}?api_key=${apiKey}`),
          fetch(`https://api.themoviedb.org/3/movie/${props.id}/videos?api_key=${apiKey}`),
          fetch(`https://api.themoviedb.org/3/movie/${props.id}/credits?api_key=${apiKey}`),
        ]);

        if (!detailRes.ok) {
          throw new Error('Movie not found');
        }

        const detailData = await detailRes.json();

        //extract real youtube trailer
        let trailerKey = null;
        if (videoRes.ok) {
          const videoData = await videoRes.json();
          const trailer = videoData.results?.find(
            (v: { site: string; type: string; key: string }) =>
              v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
          );
          if (trailer) {
            trailerKey = trailer.key;
          }
        }

        //extract real director and top cast from tmdb credits
        let director = null;
        let cast = [];
        if (creditRes.ok) {
          const creditData = await creditRes.json();
          const directorObj = creditData.crew?.find(
            (c: { job: string; name: string }) => c.job === 'Director'
          );
          if (directorObj) {
            director = directorObj.name;
          }

          if (creditData.cast && Array.isArray(creditData.cast)) {
            cast = creditData.cast.slice(0, 8);
          }
        }

        //generate fake episodes
        const episodeTitles = [
          'The Beginning',
          'Shadows of the Past',
          'Breaking the Silence',
          'The Turning Point',
          'Whispers in the Dark',
          'The Final Battle',
        ];

        const fakeEpisodes = episodeTitles.map((title, i) => ({
          id: `${detailData.id}-ep-${i + 1}`,
          episodeNumber: i + 1,
          title: `Episode ${i + 1}: ${title}`,
          duration: `${40 + ((i * 4) % 15)}m`,
          overview: `Following unexpected events, new conflicts rise as characters confront deep secrets and alliances.`,
          still_path: detailData.backdrop_path || detailData.poster_path,
        }));

        //combine all real api details
        setMovie({
          ...detailData,
          trailerKey: trailerKey,
          director: director,
          cast: cast,
          episodes: fakeEpisodes,
        });
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Unable to load movie details. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    if (props.id) {
      fetchAllMovieDetails();
    }
  }, [props.id]);

  //loading state
  if (loading) {
    return (
      <div className="py-32 text-center bg-[#141414]">
        <div className="inline-block w-12 h-12 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-400 text-sm">Loading verified movie data...</p>
      </div>
    );
  }

  //error state
  if (error || !movie) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-20 bg-[#141414]">
        <div className="max-w-md w-full text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-red-950/40 border border-red-800/40 flex items-center justify-center mx-auto text-[#E50914] shadow-lg shadow-red-950/20">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">
              {error ? 'Failed to Load Movie' : 'Movie Not Found'}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {error || 'This title could not be found or may have been removed from the catalog.'}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <a
              href="/movies"
              className="bg-[#E50914] hover:bg-[#b81d24] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-red-950/50"
            >
              Browse Movies
            </a>
            <a
              href="/"
              className="bg-neutral-800 hover:bg-neutral-700 text-gray-200 hover:text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Back Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  //render details
  return (
    <MovieDetailComponent
      id={movie.id}
      title={movie.title}
      poster_path={movie.poster_path}
      backdrop_path={movie.backdrop_path}
      overview={movie.overview}
      vote_average={movie.vote_average}
      vote_count={movie.vote_count}
      release_date={movie.release_date}
      tagline={movie.tagline}
      runtime={movie.runtime}
      status={movie.status}
      genres={movie.genres}
      budget={movie.budget}
      revenue={movie.revenue}
      original_language={movie.original_language}
      popularity={movie.popularity}
      production_companies={movie.production_companies}
      director={movie.director}
      cast={movie.cast}
      trailerKey={movie.trailerKey}
      episodes={movie.episodes}
    />
  );
}
