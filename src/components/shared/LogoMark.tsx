'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoMarkProps {
  variant?: 'full' | 'symbol' | 'wordmark';
  className?: string;
  height?: number | string;
  forceDark?: boolean;
}

export function LogoMark({ variant = 'full', className, height = 32, forceDark = false }: LogoMarkProps) {
  const isSymbol = variant === 'symbol';
  const alt = isSymbol ? 'OrigoHOST Monogram' : 'OrigoHOST Logo';

  // Extract integer height value for Next.js Image component
  const heightVal = typeof height === 'number' ? height : parseInt(height, 10) || 32;
  
  // Full logo Wordmark is roughly 3.6:1 ratio in the new assets
  const widthVal = heightVal * 3.6;

  return (
    <div
      className={cn('inline-flex items-center select-none relative', className)}
      style={{ height }}
    >
      {forceDark ? (
        <Image
          src="/images/brand/origohost_1_dark.png"
          alt={alt}
          width={widthVal}
          height={heightVal}
          className="h-full w-auto object-contain block"
          style={{ maxHeight: height, width: 'auto' }}
          unoptimized
        />
      ) : (
        <>
          <Image
            src="/images/brand/origohost_1_light.png"
            alt={alt}
            width={widthVal}
            height={heightVal}
            className="h-full w-auto object-contain block dark:hidden"
            style={{ maxHeight: height, width: 'auto' }}
            unoptimized
          />
          <Image
            src="/images/brand/origohost_1_dark.png"
            alt={alt}
            width={widthVal}
            height={heightVal}
            className="h-full w-auto object-contain hidden dark:block"
            style={{ maxHeight: height, width: 'auto' }}
            unoptimized
          />
        </>
      )}
    </div>
  );
}
