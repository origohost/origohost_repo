'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[GlobalError] Critical root layout error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center min-h-screen text-center px-6 py-24 bg-[#0a0f1e] text-white">
        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-6 border border-orange-500/20 mx-auto">
          <AlertTriangle className="h-8 w-8" aria-hidden="true" />
        </div>

        <span className="text-xs font-mono uppercase tracking-widest font-bold text-orange-400 mb-2 block">
          Critical Error
        </span>

        <h1 className="text-3xl font-bold mb-3 text-white">
          Application System Error
        </h1>

        <p className="max-w-md text-base text-white/60 mb-8 mx-auto leading-relaxed">
          A critical error occurred in the application root layout. Our systems have been notified. Please reload the page.
        </p>

        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0a0f1e] font-bold rounded-lg hover:bg-white/90 transition-colors cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Reload Application
        </button>
      </body>
    </html>
  );
}
