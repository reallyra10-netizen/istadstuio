'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* page header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Contact Us
          </h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Have questions or feedback? Reach out to our campus team in Phnom Penh.
          </p>
        </div>

        {/* headquarters & interactive map block */}
        <div className="bg-[#181818] rounded-2xl p-6 sm:p-10 border border-neutral-800 shadow-xl space-y-8">
          
          <div className="relative z-10 space-y-8">
            <div className="border-b border-neutral-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#E50914]">
                  Campus Headquarters
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  ISTAD Studio
                </h2>
              </div>
              <span className="inline-flex items-center text-xs font-bold bg-neutral-900 text-gray-300 px-3 py-1.5 rounded-lg border border-neutral-700">
                Phnom Penh, Cambodia
              </span>
            </div>

            {/* 2-column layout: Left details, Right Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              {/* left: campus details & social */}
              <div className="space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* address */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-red-900/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#E50914">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider">Campus Address</h4>
                      <p className="text-sm font-semibold text-white mt-1 leading-snug">
                        No. 40, St. 273, Sangkat Boeung Kak I, Khan Toul Kork, Phnom Penh, Cambodia
                      </p>
                    </div>
                  </div>

                  {/* hotline */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-red-900/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#E50914">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider">Direct Hotline</h4>
                      <p className="text-sm font-bold text-white mt-1 flex flex-wrap gap-2">
                        <span>(+855) 1230 910</span>
                        <span className="text-neutral-600">|</span>
                        <span>(+855) 66 900 910</span>
                      </p>
                    </div>
                  </div>

                  {/* email */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-red-900/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#E50914">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider">Official Email</h4>
                      <a
                        href="mailto:info.stadstuio@gmail.com"
                        className="text-sm font-semibold text-white hover:text-gray-300 hover:underline mt-1 block"
                      >
                        istadstuio@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
                    Connect &amp; Community Channels
                  </span>
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#1877F2] transition-colors cursor-pointer group">
                      <div className="w-4 h-4 text-[#1877F2]">
                        <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </div>
                      <span className="text-xs font-semibold text-gray-300 group-hover:text-white">
                        Facebook
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#FF0000] transition-colors cursor-pointer group">
                      <div className="w-4 h-4 text-[#FF0000]">
                        <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </div>
                      <span className="text-xs font-semibold text-gray-300 group-hover:text-white">
                        YouTube
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#229ED9] transition-colors cursor-pointer group">
                      <div className="w-4 h-4 text-[#229ED9]">
                        <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.946z" />
                        </svg>
                      </div>
                      <span className="text-xs font-semibold text-gray-300 group-hover:text-white">
                        Telegram
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* right: interactive map */}
              <div className="flex flex-col h-full min-h-[380px] sm:min-h-[440px] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl relative bg-neutral-900 group">
                <div className="bg-white/[0.06] border-b border-white/10 px-4 py-3 flex items-center justify-between shrink-0">
                  <span className="text-xs font-bold text-gray-200 tracking-wide">
                    Toul Kork Campus Location
                  </span>
                  <a
                    href="https://www.google.com/maps?ll=11.585256,104.901402&z=16&t=m&hl=en&gl=KH&mapclient=embed&cid=7738996414289594316"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#E50914] hover:text-white font-bold transition-colors"
                  >
                    Open Google Maps ↗
                  </a>
                </div>

                <div className="flex-1 w-full relative min-h-[320px]">
                  <iframe
                    title="ISTAD Campus Map Location"
                    src="https://maps.google.com/maps?q=11.585256,104.901402&hl=en&z=16&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full absolute inset-0 grayscale-[15%] contrast-[105%] group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* direct message form */}
        <div className="bg-[#181818] border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {sent ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-red-950/60 border border-red-800/50 flex items-center justify-center mx-auto text-[#E50914]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">Message Dispatched!</h3>
              <p className="text-gray-300 text-sm max-w-md mx-auto">
                Thank you for contacting ISTAD Studio. Our student engineering team has received your message and will review it promptly.
              </p>
              <button
                onClick={() => {
                  setFormData({ name: '', email: '', subject: '', message: '' });
                  setSent(false);
                }}
                className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Send Direct Feedback or Inquiries</h3>
                <p className="text-xs text-gray-400">Our student inbox is monitored daily.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="contactName" className="block text-xs uppercase tracking-wider font-bold text-gray-300">
                    Full Name <span className="text-[#E50914]">*</span>
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E50914] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contactEmail" className="block text-xs uppercase tracking-wider font-bold text-gray-300">
                    Email Address <span className="text-[#E50914]">*</span>
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E50914] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contactSubject" className="block text-xs uppercase tracking-wider font-bold text-gray-300">
                  Subject
                </label>
                <input
                  id="contactSubject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E50914] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contactMsg" className="block text-xs uppercase tracking-wider font-bold text-gray-300">
                  Message <span className="text-[#E50914]">*</span>
                </label>
                <textarea
                  id="contactMsg"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E50914] transition-colors resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={sending}
                  className="bg-[#E50914] hover:bg-[#b81d24] disabled:opacity-50 text-white font-bold text-sm px-8 py-3 rounded-xl shadow-lg shadow-red-950/50 transition-all hover:scale-105 flex items-center gap-2"
                >
                  {sending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>Send Message ✉️</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* footer quick navigation */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>•</span>
          <Link href="/faq" className="hover:text-white transition-colors">
            FAQ
          </Link>
          <span>•</span>
          <Link href="/request-drama" className="hover:text-white transition-colors">
            Request Drama
          </Link>
          <span>•</span>
          <Link href="/about" className="hover:text-white transition-colors">
            About Team
          </Link>
        </div>

      </div>
    </div>
  );
}
