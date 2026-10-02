//about page
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import TeamSection from '@/components/team/TeamSection';
import BrandLogo from '@/components/brand/BrandLogo';

//seo metadata
export const metadata: Metadata = {
  title: "About",
  description: "Learn about ISTAD Studio and the student development team behind the project.",
  keywords: ["about istad studio", "istad students", "movie streaming", "cinema team", "cambodia developers"],
  openGraph: {
    title: "About | ISTAD Studio",
    description: "Learn about ISTAD Studio, powered by students at ISTAD.",
    images: ["/logo.png"],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-14">
        
        {/* hero header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center py-2">
            <BrandLogo size="lg" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            About ISTAD Studio
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            A modern cinema discovery and drama streaming hub built by the student development team at ISTAD in Phnom Penh, Cambodia.
          </p>
        </div>

        {/* team section */}
        <div className="bg-[#181818] rounded-2xl p-6 sm:p-10 border border-neutral-800 shadow-xl space-y-8">
          <TeamSection />
        </div>

        {/* contact redirect cta */}
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white">Need to reach out to our campus?</h3>
            <p className="text-xs text-gray-400">
              Check out our campus location, hotline, and interactive map on the contact page.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-[#E50914] hover:bg-[#b81d24] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 shrink-0"
          >
            Go to Contact &amp; Map →
          </Link>
        </div>

        {/* footer nav */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 pt-4">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>•</span>
          <Link href="/movies" className="hover:text-white transition-colors">
            Movies
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact &amp; Map
          </Link>
          <span>•</span>
          <Link href="/faq" className="hover:text-white transition-colors">
            FAQ
          </Link>
        </div>

      </div>
    </div>
  );
}
