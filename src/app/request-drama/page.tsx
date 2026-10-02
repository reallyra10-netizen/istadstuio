'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface DramaRequestData {
  title: string;
  country: string;
  year: string;
  genre: string;
  notes: string;
  requesterName: string;
  requesterEmail: string;
}

const COUNTRIES = [
  'South Korea (K-Drama)',
  'China (C-Drama)',
  'Japan (J-Drama)',
  'Cambodia',
  'Thailand',
  'Taiwan',
  'Western / Hollywood',
  'Other',
];

const GENRES = [
  'Romance',
  'Action / Thriller',
  'Historical / Costume',
  'Comedy',
  'Fantasy / Sci-Fi',
  'Mystery / Crime',
  'Horror / Supernatural',
  'Family / Melodrama',
];

export default function RequestDramaPage() {
  const [formData, setFormData] = useState<DramaRequestData>({
    title: '',
    country: 'South Korea (K-Drama)',
    year: '2024',
    genre: 'Romance',
    notes: '',
    requesterName: '',
    requesterEmail: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      title: '',
      country: 'South Korea (K-Drama)',
      year: '2024',
      genre: 'Romance',
      notes: '',
      requesterName: '',
      requesterEmail: '',
    });
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* page header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Request a Drama or Movie
          </h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Can&apos;t find a title you want to watch? Let us know and our student team will add it to the catalog.
          </p>
        </div>

        {submitted ? (
          /* confirmation card */
          <div className="bg-[#181818] border border-neutral-800 rounded-2xl p-8 sm:p-10 text-center space-y-6">
            
            <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-800/50 flex items-center justify-center mx-auto text-[#E50914] shadow-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white">Request Received!</h2>
              <p className="text-gray-300 text-sm sm:text-base max-w-md mx-auto">
                Thank you! Your request for <span className="text-[#E50914] font-bold">&quot;{formData.title}&quot;</span> has been sent to the ISTAD Studio student engineering team.
              </p>
            </div>

            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 max-w-md mx-auto text-left text-xs sm:text-sm space-y-2 font-mono">
              <div className="flex justify-between text-gray-400">
                <span>Origin:</span>
                <span className="text-white font-semibold">{formData.country}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Release Year:</span>
                <span className="text-white font-semibold">{formData.year}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Genre:</span>
                <span className="text-white font-semibold">{formData.genre}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={handleReset}
                className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all"
              >
                Submit Another Request
              </button>
              <Link
                href="/movies"
                className="bg-[#E50914] hover:bg-[#b81d24] text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-red-950/50 transition-all hover:scale-105"
              >
                Browse Current Movies →
              </Link>
            </div>
          </div>
        ) : (
          /* request submission form */
          <form
            onSubmit={handleSubmit}
            className="bg-[#181818] border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6"
          >

            {/* title */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-xs uppercase tracking-wider font-bold text-gray-300">
                Drama / Movie Title <span className="text-[#E50914]">*</span>
              </label>
              <input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E50914] transition-colors"
              />
            </div>

            {/* grid 2 cols: country & year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="country" className="block text-xs uppercase tracking-wider font-bold text-gray-300">
                  Country / Language
                </label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E50914] transition-colors"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c} className="bg-neutral-900 text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="year" className="block text-xs uppercase tracking-wider font-bold text-gray-300">
                  Release Year
                </label>
                <input
                  id="year"
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E50914] transition-colors"
                />
              </div>
            </div>

            {/* genre */}
            <div className="space-y-2">
              <label htmlFor="genre" className="block text-xs uppercase tracking-wider font-bold text-gray-300">
                Primary Genre
              </label>
              <select
                id="genre"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E50914] transition-colors"
              >
                {GENRES.map((g) => (
                  <option key={g} value={g} className="bg-neutral-900 text-white">
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* additional notes */}
            <div className="space-y-2">
              <label htmlFor="notes" className="block text-xs uppercase tracking-wider font-bold text-gray-300">
                Additional Details / Episodes / Cast Notes (Optional)
              </label>
              <textarea
                id="notes"
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E50914] transition-colors resize-none"
              />
            </div>

            {/* requester info (optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-neutral-800">
              <div className="space-y-2">
                <label htmlFor="requesterName" className="block text-xs uppercase tracking-wider font-bold text-gray-400">
                  Your Name (Optional)
                </label>
                <input
                  id="requesterName"
                  type="text"
                  value={formData.requesterName}
                  onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E50914] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="requesterEmail" className="block text-xs uppercase tracking-wider font-bold text-gray-400">
                  Your Email (Optional)
                </label>
                <input
                  id="requesterEmail"
                  type="email"
                  value={formData.requesterEmail}
                  onChange={(e) => setFormData({ ...formData, requesterEmail: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E50914] transition-colors"
                />
              </div>
            </div>

            {/* submit */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-gray-400 text-center sm:text-left">
                Reviewed directly by student developers at ISTAD.
              </span>
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto bg-[#E50914] hover:bg-[#b81d24] disabled:opacity-50 text-white font-bold text-sm px-8 py-3 rounded-xl shadow-lg shadow-red-950/50 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>Submit Drama Request 🚀</>
                )}
              </button>
            </div>
          </form>
        )}

        {/* fast links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
          <Link href="/faq" className="hover:text-white transition-colors">
            Questions? Read our FAQ
          </Link>
          <span>•</span>
          <Link href="/about" className="hover:text-white transition-colors">
            Meet the Student Team
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-white transition-colors">
            Campus Contact &amp; Location
          </Link>
        </div>

      </div>
    </div>
  );
}
