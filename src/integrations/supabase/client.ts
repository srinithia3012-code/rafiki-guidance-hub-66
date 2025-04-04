
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Get environment variables or use fallback values for production
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://mhbhyimkykyvuphbefwg.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oYmh5aW1reWt5dnVwaGJlZndnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3NjE3MjEsImV4cCI6MjA1NzMzNzcyMX0.q42WQ2LzGfzxch1ghkMOoArCGNo0jxfiqOwY9SQsXnQ';

// Always log the Supabase configuration - useful for debugging GitHub Pages issues
console.log('Supabase URL:', SUPABASE_URL);
console.log('Using environment variables:', !!import.meta.env.VITE_SUPABASE_URL);
console.log('Environment mode:', import.meta.env.MODE);
console.log('Base URL:', import.meta.env.BASE_URL);
console.log('Is GitHub Actions:', import.meta.env.VITE_GITHUB_ACTIONS);
console.log('Public URL:', import.meta.env.PUBLIC_URL);

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Missing Supabase credentials. Using hardcoded fallbacks.");
}

// Create the Supabase client with the appropriate configuration for the environment
export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      flowType: 'pkce',
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      // Configure the redirect URL for GitHub Pages deployment
      ...(import.meta.env.MODE === 'production' && import.meta.env.VITE_GITHUB_ACTIONS === 'true' && {
        redirectTo: window.location.origin + '/rafiki-guidance-hub-66/auth/callback'
      })
    }
  }
);
