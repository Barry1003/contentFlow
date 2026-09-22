"use client";

import React, { useEffect, useState } from 'react';
import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';
import '@neondatabase/neon-js/ui/css';
import { neon } from '../lib/neon';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NeonAuthUIProvider authClient={neon.auth}>
      {children}
    </NeonAuthUIProvider>
  );
}
