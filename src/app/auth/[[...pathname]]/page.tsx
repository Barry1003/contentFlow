"use client";

import { AuthView } from '@neondatabase/neon-js/auth/react/ui';
import { use } from 'react';

export default function AuthPage({ params }: { params: Promise<{ pathname?: string[] }> }) {
  const resolvedParams = use(params);
  // Next.js catch-all params come as an array, Neon Auth expects a slash-separated string
  const pathname = resolvedParams.pathname ? resolvedParams.pathname.join('/') : '';
  
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <AuthView pathname={pathname} />
    </div>
  );
}
