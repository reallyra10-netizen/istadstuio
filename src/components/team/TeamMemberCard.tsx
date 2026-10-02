'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export interface TeamMemberDetail {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string | null;
}

interface TeamMemberCardProps {
  member: TeamMemberDetail;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
      }
    );

    const currentEl = cardRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, []);

  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-500 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="bg-[#181818] border border-neutral-800/80 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 hover:border-neutral-700 transition-colors">
        {/* Photo */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 shrink-0 flex items-center justify-center">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              width={120}
              height={120}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-gray-300">
              <span className="text-xl font-bold tracking-wider text-white">
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 text-center sm:text-left space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E50914] block">
            {member.role}
          </span>

          <h3 className="text-lg sm:text-xl font-bold text-white">
            {member.name}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed max-w-xl pt-0.5">
            {member.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

