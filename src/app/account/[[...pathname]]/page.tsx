"use client";

import { AccountView } from '@neondatabase/neon-js/auth/react/ui';
import { use } from 'react';

export default function AccountPage({ params }: { params: Promise<{ pathname?: string[] }> }) {
  const resolvedParams = use(params);
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
      <AccountView pathname={pathname} />
    </div>
  );
}
