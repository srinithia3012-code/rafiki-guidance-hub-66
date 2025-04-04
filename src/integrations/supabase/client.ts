
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Get environment variables or use fallback values for development/preview
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://mhbhyimkykyvuphbefwg.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oYmh5aW1reWt5dnVwaGJlZndnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3NjE3MjEsImV4cCI6MjA1NzMzNzcyMX0.q42WQ2LzGfzxch1ghkMOoArCGNo0jxfiqOwY9SQsXnQ';

// Log configuration info for debugging
console.log('Supabase URL:', SUPABASE_URL);
console.log('Environment mode:', import.meta.env.MODE);
console.log('Base URL:', import.meta.env.BASE_URL);

// Determine the redirectTo URL based on environment
const getRedirectUrl = () => {
  // For GitHub Pages deployment
  if (import.meta.env.MODE === 'production' && window.location.hostname.includes('github.io')) {
    return `${window.location.origin}/rafiki-guidance-hub-66/auth/callback`;
  }
  // For local development or Lovable preview
  return `${window.location.origin}/auth/callback`;
};

// Create the Supabase client with the correct configuration
export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      flowType: 'pkce',
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? localStorage : undefined,
    },
    global: {
      headers: {
        'x-application-name': 'rafiki-guidance-hub'
      }
    }
  }
);

// Initialize the session if we're in a browser context
if (typeof window !== 'undefined') {
  // Get the current session - no longer using the deprecated setSettings method
  supabase.auth.getSession().then(({ data }) => {
    if (!data.session) {
      console.log('No active session found');
    }
  });
}
