"use client";

import React, { useEffect, useState } from 'react';
import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';
import '@neondatabase/neon-js/ui/css';
import { neon } from '../lib/neon';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Suppress Next.js warning about script tags injected by third-party auth providers
    const originalError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag while rendering React component')) {
        return;
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NeonAuthUIProvider emailOTP social={{ providers: ['google'] }} authClient={neon.auth}>
      {children}
    </NeonAuthUIProvider>
  );
}
