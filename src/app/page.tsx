//home page
import { Metadata } from "next";
import MovieHeroHeader from "@/components/movies/MovieHeroHeader";
import MovieListComponent from "@/components/movies/MovieListComponent";

//seo metadata
export const metadata: Metadata = {
  title: "Home",
  description: "Explore the latest popular movies, trending cinema hits, storyline summaries, and ratings.",
  keywords: ["movies", "cinema", "trending films", "top rated", "netflix style"],
  openGraph: {
    title: "Home | ISTAD Studio",
    description: "Explore the latest popular movies, trending cinema hits, and ratings.",
    images: [
      {
        url: "/Thumbernail.jpg",
        width: 1200,
        height: 630,
        alt: "ISTAD Studio - Movie Campaigns",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | ISTAD Studio",
    description: "Explore the latest popular movies, trending cinema hits, and ratings.",
    images: ["/Thumbernail.jpg"],
  },
};

//fetch hero movies from api
async function getHeroMovies() {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=0e42297fbdb49b4a24879c7d54325351",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.results && data.results.length > 0 ? data.results.slice(0, 8) : [];
  } catch (error) {
    console.error("Hero movie error:", error);
    return [];
  }
}

export default async function Home() {
  const heroMovies = await getHeroMovies();

  return (
    <div className="bg-[#141414] text-white min-h-screen">
      {/* hero header */}
      <MovieHeroHeader movies={heroMovies} movie={heroMovies[0] || null} />

      {/* movie catalog */}
      <MovieListComponent initialCategory="popular" />
    </div>
  );
}
