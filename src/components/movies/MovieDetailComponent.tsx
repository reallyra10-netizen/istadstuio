//movie details
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type CastMemberType = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type ProductionCompanyType = {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country?: string;
};

//episode prop type
export type EpisodeType = {
  id: number | string;
  episodeNumber: number;
  title: string;
  duration?: string;
  overview?: string;
  still_path?: string | null;
};

export type MovieDetailType = {
  id?: number;
  title: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  overview: string;
  vote_average: number;
  vote_count?: number;
  release_date?: string;
  tagline?: string;
  runtime?: number;
  status?: string;
  genres?: { id: number; name: string }[];
  budget?: number;
  revenue?: number;
  original_language?: string;
  popularity?: number;
  production_companies?: ProductionCompanyType[];
  director?: string | null;
  cast?: CastMemberType[];
  trailerKey?: string | null;
  episodes?: EpisodeType[];
};

export default function MovieDetailComponent(props: MovieDetailType) {
  //poster and backdrop urls
  const posterUrl = props.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.poster_path}`
    : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80';

  const backdropUrl = props.backdrop_path
    ? `https://image.tmdb.org/t/p/original${props.backdrop_path}`
    : null;

  const releaseYear = props.release_date ? props.release_date.split('-')[0] : 'N/A';

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* backdrop hero banner */}
      <div className="relative w-full h-[48vh] min-h-[360px] max-h-[520px] bg-black overflow-hidden">
        {backdropUrl && (
          <Image
            src={backdropUrl}
            alt={props.title}
            fill
            priority
            className="object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/80 via-transparent to-transparent" />
      </div>

      {/* main content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* movie poster */}
          <div className="w-56 sm:w-72 aspect-[2/3] flex-shrink-0 mx-auto md:mx-0 rounded-xl overflow-hidden shadow-2xl border-2 border-neutral-700 bg-neutral-900 relative">
            <Image
              src={posterUrl}
              alt={props.title}
              fill
              className="object-cover"
            />
          </div>

          {/* movie info */}
          <div className="flex-1 space-y-4">
            
            {/* title & tagline */}
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {props.title}
              </h1>
              {props.tagline && (
                <p className="text-gray-400 italic text-sm sm:text-base mt-1">
                  "{props.tagline}"
                </p>
              )}
            </div>

            {/* badges row with live tmdb data */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
              <span className="bg-[#E50914] text-white font-bold px-3 py-1 rounded shadow flex items-center gap-1">
                <span>★</span>
                <span>{props.vote_average ? props.vote_average.toFixed(1) : 'N/A'} / 10</span>
              </span>
              <span className="bg-neutral-800 text-gray-300 font-medium px-3 py-1 rounded border border-neutral-700">
                Released: {props.release_date || releaseYear}
              </span>
              {props.runtime ? (
                <span className="bg-neutral-800 text-gray-300 font-medium px-3 py-1 rounded border border-neutral-700">
                  {props.runtime} Minutes
                </span>
              ) : null}
              {props.status && (
                <span className="bg-neutral-800 text-gray-300 font-medium px-3 py-1 rounded border border-neutral-700">
                  {props.status}
                </span>
              )}
              {props.original_language && (
                <span className="bg-neutral-800 text-gray-300 font-medium px-2.5 py-1 rounded border border-neutral-700 uppercase">
                  Language: {props.original_language}
                </span>
              )}
            </div>

            {/* genres */}
            {props.genres && props.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {props.genres.map((g) => (
                  <span
                    key={g.id}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-neutral-800/80 text-gray-200 border border-neutral-700"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {/* director */}
            {props.director && (
              <div className="pt-2 text-sm text-gray-300">
                <span className="text-gray-500 font-medium">Director: </span>
                <span className="font-semibold text-white">{props.director}</span>
              </div>
            )}

            {/* storyline */}
            <div className="pt-4 border-t border-neutral-800">
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#E50914] rounded-sm" />
                Storyline Overview
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                {props.overview || 'No storyline summary available for this movie.'}
              </p>
            </div>

            {/* live api metrics grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-neutral-800 text-xs">
              <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-800">
                <span className="text-gray-500 block">Total Votes</span>
                <span className="text-white font-bold text-sm">
                  {props.vote_count ? props.vote_count.toLocaleString() : 'N/A'}
                </span>
              </div>
              <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-800">
                <span className="text-gray-500 block">Budget</span>
                <span className="text-white font-bold text-sm">
                  {props.budget && props.budget > 0 ? `$${props.budget.toLocaleString()}` : 'Not Disclosed'}
                </span>
              </div>
              <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-800">
                <span className="text-gray-500 block">Revenue</span>
                <span className="text-white font-bold text-sm">
                  {props.revenue && props.revenue > 0 ? `$${props.revenue.toLocaleString()}` : 'Not Disclosed'}
                </span>
              </div>
              <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-800">
                <span className="text-gray-500 block">Popularity Score</span>
                <span className="text-white font-bold text-sm">
                  {props.popularity ? props.popularity.toFixed(1) : 'N/A'}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* top cast section from real api */}
        {props.cast && props.cast.length > 0 && (
          <div className="mt-14 pt-8 border-t border-neutral-800">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#E50914] rounded-sm" />
              Featured Cast
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {props.cast.map((actor) => {
                const actorImg = actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=185&auto=format&fit=crop&q=80';

                return (
                  <div
                    key={actor.id}
                    className="bg-neutral-900/70 p-3 rounded-xl border border-neutral-800 flex flex-col items-center text-center group hover:border-[#E50914] transition-colors"
                  >
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mb-2 border border-neutral-700 bg-neutral-800">
                      <Image
                        src={actorImg}
                        alt={actor.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-xs font-bold text-white line-clamp-1">
                      {actor.name}
                    </span>
                    <span className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">
                      {actor.character}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* official trailer section from real api */}
        {props.trailerKey && (
          <div className="mt-14 pt-8 border-t border-neutral-800">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#E50914] rounded-sm" />
              Official Trailer
            </h3>
            <div className="relative w-full aspect-video max-w-4xl rounded-xl overflow-hidden border border-neutral-800 shadow-2xl bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${props.trailerKey}`}
                title={`${props.title} Official Trailer`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* episodes section under trailer */}
        {props.episodes && props.episodes.length > 0 && (
          <div className="mt-14 pt-8 border-t border-neutral-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#E50914] rounded-sm" />
                Episodes
              </h3>
              <span className="text-xs text-gray-400 font-medium">
                Season 1 &bull; {props.episodes.length} Episodes
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {props.episodes.map((ep) => {
                const epImage = ep.still_path
                  ? `https://image.tmdb.org/t/p/w500${ep.still_path}`
                  : posterUrl;

                return (
                  <div
                    key={ep.id}
                    className="bg-neutral-900/60 rounded-xl overflow-hidden border border-neutral-800 hover:border-[#E50914] transition-all group flex flex-col cursor-pointer"
                  >
                    <div className="relative aspect-video w-full bg-neutral-950 overflow-hidden">
                      <Image
                        src={epImage}
                        alt={ep.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                        <div className="w-10 h-10 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-lg">
                          <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* episode number badge */}
                      <span className="absolute bottom-2 left-2 text-xs font-bold bg-black/70 text-white px-2 py-0.5 rounded border border-neutral-700">
                        EP {ep.episodeNumber}
                      </span>

                      {/* duration */}
                      {ep.duration && (
                        <span className="absolute bottom-2 right-2 text-xs font-medium text-gray-300 bg-black/70 px-2 py-0.5 rounded">
                          {ep.duration}
                        </span>
                      )}
                    </div>

                    <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-[#E50914] transition-colors line-clamp-1">
                          {ep.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                          {ep.overview}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}



      </div>
    </div>
  );
}
