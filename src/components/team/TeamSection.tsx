'use client';

import React from 'react';
import TeamMemberCard, { TeamMemberDetail } from './TeamMemberCard';

const TEAM_MEMBERS: TeamMemberDetail[] = [
  {
    id: '1',
    name: 'Savon Sovannara',
    role: 'Lead Developer',
    bio: 'Frontend architecture, responsive movie components, and video playback.',
    image: '/team/savon-sovannara.png',
  },
  {
    id: '2',
    name: 'Son Vichet',
    role: 'Full-Stack Developer',
    bio: 'Movie search filtering, backend synchronization, and data pipelines.',
    image: '/team/son-vichet.png',
  },
  {
    id: '3',
    name: 'Heng Sokman',
    role: 'Streaming & Media Developer',
    bio: 'Streaming integration, trailer playback, and media performance.',
    image: '/team/heng-sokman.jpg',
  },
  {
    id: '4',
    name: 'Sev Ronich',
    role: 'Quality & Optimization',
    bio: 'Cross-device responsiveness, performance optimization, and testing.',
    image: '/team/sev-ronich.jpg',
  },
  {
    id: '5',
    name: 'Vanna Mengsrun',
    role: 'UI/UX & Design',
    bio: 'Dark mode streaming interface, design tokens, and user experience.',
    image: '/team/vanna-mengsrun.jpg',
  },
];

export default function TeamSection() {
  return (
    <section className="space-y-6">
      {/* section header */}
      <div className="border-b border-neutral-800/80 pb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Our Team
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          The student developers behind ISTAD Studio.
        </p>
      </div>

      {/* team cards list */}
      <div className="space-y-3.5 sm:space-y-4">
        {TEAM_MEMBERS.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}

