import { createClient } from '@neondatabase/neon-js';
import { BetterAuthReactAdapter } from '@neondatabase/neon-js/auth/react/adapters';

const authUrl = process.env.NEXT_PUBLIC_NEON_AUTH_URL || '';

// @ts-expect-error type definitions are currently broken in neon-js beta
export const neon: any = typeof window !== 'undefined' ? createClient({
  auth: {
    url: authUrl,
    adapter: BetterAuthReactAdapter(),
  },
}) : { auth: {} };
