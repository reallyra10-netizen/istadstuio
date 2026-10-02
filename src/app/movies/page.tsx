//movies catalog page
import { Metadata } from "next";
import MovieListComponent from "@/components/movies/MovieListComponent";

type PageProps = {
  searchParams: Promise<{
    category?: 'popular' | 'now_playing' | 'top_rated' | 'upcoming';
    search?: string;
    genre?: string;
  }>;
};

//dynamic seo metadata matching navbar page name
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.searchParams;

  let pageName = "All Movies";
  if (params.genre) {
    const formatted = params.genre
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' & ');
    pageName = `${formatted} Movies`;
  } else if (params.search) {
    pageName = `Search: ${params.search}`;
  } else if (params.category === "popular") {
    pageName = "Popular";
  } else if (params.category === "top_rated") {
    pageName = "Top Rated";
  } else if (params.category === "upcoming") {
    pageName = "Upcoming";
  } else if (params.category === "now_playing") {
    pageName = "Now Playing";
  }

  return {
    title: pageName,
    description: `Explore ${pageName} on ISTAD Studio with trailers, reviews, and storyline overviews.`,
    keywords: ["movies", pageName.toLowerCase(), "streaming", "istad studio"],
    openGraph: {
      title: `${pageName} | ISTAD Studio`,
      description: `Explore ${pageName} on ISTAD Studio with trailers, reviews, and storyline overviews.`,
      images: ["/Thumbernail.jpg"],
    },
  };
}

export default async function MoviePage(props: PageProps) {
  const params = await props.searchParams;

  return (
    <div className="min-h-screen bg-[#141414] text-white py-6">
      <MovieListComponent
        initialCategory={params.category || 'popular'}
        searchQuery={params.search || ''}
        genre={params.genre || ''}
      />
    </div>
  );
}
