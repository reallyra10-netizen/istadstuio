'use client';

//brand logo
import React from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function BrandLogo({
  className = '',
  size = 'md',
}: BrandLogoProps) {
  //size dimensions
  const dimensions = {
    sm: { height: 26, width: 118 },
    md: { height: 34, width: 154 },
    lg: { height: 48, width: 216 },
    xl: { height: 64, width: 290 },
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <Image
        src="/logo.png"
        alt="ISTAD Studio"
        width={dimensions.width}
        height={dimensions.height}
        priority
        className="h-auto object-contain drop-shadow"
      />
    </div>
  );
}
