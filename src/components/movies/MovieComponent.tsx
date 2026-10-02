//movie card
import React from 'react';
import Image from 'next/image';

export type MovieCardProps = {
  id?: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  release_date?: string;
  genre_ids?: number[];
  highlightQuery?: string;
  isUpcoming?: boolean;
};

//tmdb genre mapping from api
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

export default function MovieComponent(props: MovieCardProps) {
  //check if movie is upcoming
  const isUpcoming = Boolean(
    props.isUpcoming ||
      (props.release_date && new Date(props.release_date).getTime() > Date.now())
  );

  //poster image url
  const posterUrl = props.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.poster_path}`
    : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80';

  //extract release year
  const releaseYear = props.release_date ? props.release_date.split('-')[0] : 'N/A';

  //extract primary genre from tmdb api
  const primaryGenre = props.genre_ids && props.genre_ids.length > 0 && TMDB_GENRES[props.genre_ids[0]]
    ? TMDB_GENRES[props.genre_ids[0]]
    : null;

  //highlight matching start/query text in title
  const renderHighlightedTitle = () => {
    if (!props.highlightQuery || !props.highlightQuery.trim()) {
      return props.title;
    }

    const q = props.highlightQuery.trim();
    const title = props.title;
    const lowerTitle = title.toLowerCase();
    const lowerQ = q.toLowerCase();

    const matchIndex = lowerTitle.indexOf(lowerQ);
    if (matchIndex === -1) {
      return title;
    }

    const before = title.slice(0, matchIndex);
    const match = title.slice(matchIndex, matchIndex + q.length);
    const after = title.slice(matchIndex + q.length);

    return (
      <>
        {before}
        <span className="text-[#E50914] underline decoration-red-500/60 font-black">
          {match}
        </span>
        {after}
      </>
    );
  };

  return (
    <div className="group relative bg-[#181818] rounded-lg overflow-hidden border border-neutral-800 hover:border-[#E50914] transition-all duration-300 hover:shadow-2xl hover:shadow-red-950/40 hover:-translate-y-1.5 flex flex-col h-full">
      {/* poster image */}
      <div className="relative w-full aspect-[2/3] bg-neutral-900 overflow-hidden">
        <Image
          src={posterUrl}
          alt={props.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
            isUpcoming ? 'brightness-75' : ''
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent opacity-80" />

        {/* top badge */}
        <div className="absolute top-2.5 right-2.5 z-10">
          {isUpcoming ? (
            <span className="text-amber-400 text-[11px] font-black tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
              UPCOMING
            </span>
          ) : (
            <span className="text-[#E50914] text-[11px] font-black tracking-wider drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
              HD
            </span>
          )}
        </div>

        {/* year & genre badge */}
        <div className="absolute top-2.5 left-2.5 text-gray-200 text-xs font-semibold flex items-center gap-1.5 z-10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
          <span>{releaseYear}</span>
          {primaryGenre && (
            <>
              <span className="text-gray-400">&bull;</span>
              <span className="text-gray-300 text-[11px] font-medium">{primaryGenre}</span>
            </>
          )}
        </div>

        {/* Dark tint on poster for upcoming movies */}
        {isUpcoming && (
          <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />
        )}

        {/* hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4 z-20">
          {isUpcoming ? (
            <span className="text-white font-black text-sm uppercase tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              UPCOMING
            </span>
          ) : (
            <span className="bg-[#E50914] hover:bg-[#b81d24] text-white font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 transition-transform group-hover:scale-105">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play Now
            </span>
          )}
        </div>
      </div>

      {/* card info */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-[#E50914] transition-colors line-clamp-1">
            {renderHighlightedTitle()}
          </h3>

          <p className="text-gray-400 text-[11px] sm:text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {props.overview || 'No storyline summary available.'}
          </p>
        </div>

        {/* card footer */}
        <div className="mt-3 pt-2.5 border-t border-neutral-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <span>★</span>
            <span>{props.vote_average ? props.vote_average.toFixed(1) : 'N/A'}</span>
            <span className="text-gray-500 font-normal text-[10px]">/ 10</span>
          </div>
          <span className="text-xs font-semibold text-gray-300 group-hover:text-[#E50914] flex items-center gap-1 transition-colors">
            {isUpcoming ? 'Upcoming' : 'Watch'}
            <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
