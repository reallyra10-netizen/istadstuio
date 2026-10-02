'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'General',
    q: 'What is ISTAD Studio?',
    a: 'ISTAD Studio is a next-generation cinema discovery and streaming platform designed, engineered, and maintained by student software developers at ISTAD in Phnom Penh, Cambodia.',
  },
  {
    category: 'Streaming & Content',
    q: 'How can I discover trending movies and watch trailers?',
    a: 'You can explore trending titles, top rated cinema hits, and upcoming releases from the Home and browse categories. Every movie card features a dedicated details page with official high-definition trailers, storyline overviews, ratings, and cast members.',
  },
  {
    category: 'Drama Requests',
    q: 'Can I request Korean, Chinese, or Asian dramas?',
    a: 'Yes! Navigate to our "Request Drama" page in the header navigation, enter the title, release year, and genre details. Our student curation team reviews all requests and updates our catalog regularly.',
  },
  {
    category: 'Pricing',
    q: 'Is ISTAD Studio free to use?',
    a: 'Yes, ISTAD Studio is 100% free to explore. It was built as a capstone student project demonstrating advanced Next.js 16 App Router architecture, responsive UI craft, and real-time streaming integration.',
  },
  {
    category: 'Accounts',
    q: 'Do I need an account to watch trailers and browse movies?',
    a: 'Browsing, searching, and trailer playback are open to everyone without an account. You can optionally sign in with Google via Clerk to save favorites and track your personalized watchlist.',
  },
  {
    category: 'Contact',
    q: 'Where is the ISTAD Studio campus located?',
    a: 'Our campus is located at No. 40, St. 273, Sangkat Boeung Kak I, Khan Toul Kork, Phnom Penh, Cambodia. You can visit our Contact and About pages to view the live interactive Google Map and direct hotlines.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Find answers to common questions about ISTAD Studio.
          </p>
        </div>

        {/* faqs accordion list */}
        <div className="space-y-4">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#181818] border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden transition-all duration-200 shadow-lg"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#E50914] shrink-0" />
                    <span className="text-base sm:text-lg font-bold text-white">
                      {item.q}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-gray-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#E50914]' : ''
                    }`}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-gray-300 border-t border-neutral-800/80 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* bottom cta */}
        <div className="bg-[#181818] p-8 rounded-2xl border border-neutral-800 text-center space-y-4 shadow-xl">
          <h3 className="text-xl font-bold text-white">Have more questions or want to request a drama?</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            Our student engineering team is always active. Submit your drama requests or reach out to our campus hotline.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/request-drama"
              className="bg-[#E50914] hover:bg-[#b81d24] text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-red-950/50 transition-all hover:scale-105"
            >
              Request a Drama →
            </Link>
            <Link
              href="/contact"
              className="bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all"
            >
              Contact Campus
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
